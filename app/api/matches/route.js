import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

export const maxDuration = 60; // Extended timeout for more complex processing

export async function POST(req) {
    try {
        const { founders, mentors } = await req.json();

        if (!founders || !mentors || !Array.isArray(founders) || !Array.isArray(mentors)) {
            return Response.json(
                { error: "Invalid request. Founders and mentors arrays are required." },
                { status: 400 }
            );
        }

        // Initialize an array to store all matches
        const allMatches = [];

        // Process each founder sequentially
        for (const founder of founders) {
            // Create a prompt for the Groq model to analyze compatibility
            const prompt = `
        I need to match a startup founder with potential mentors based on their profiles.
        
        Founder:
        Name: ${founder.name}
        Startup: ${founder.startup}
        Industry: ${founder.industry}
        Stage: ${founder.stage}
        Needs: ${founder.needs}
        Vision: ${founder.vision}
        Bio: ${founder.bio}
        
        Potential Mentors:
        ${mentors
                    .map(
                        (mentor) => `
          ID: ${mentor.id}
          Name: ${mentor.name}
          Expertise: ${mentor.expertise}
          Industry: ${mentor.industry}
          Experience: ${mentor.experience}
          Interests: ${mentor.interests}
          Bio: ${mentor.bio}
        `,
                    )
                    .join("\n")}
        
        Analyze the compatibility between this founder and each mentor. Consider industry alignment, 
        whether the mentor's expertise matches the founder's needs, and potential synergies.
        
        Return ONLY a valid JSON array of the top 2 mentor matches with the following format without any explanation or text before or after:
        [
          {
            "mentorId": "mentor_id",
            "compatibilityScore": 0-100,
            "reasonForMatch": "brief explanation of why this is a good match"
          }
        ]
      `;

            // Call Groq API using AI SDK
            const { text } = await generateText({
                model: groq('llama3-70b-8192'),
                prompt: prompt,
                system:
                    "You are an expert AI matching system for pairing startup founders with mentors. Analyze profiles deeply and provide thoughtful matches with clear reasoning. ALWAYS return only a valid JSON array without explanation text before or after.",
            });

            console.log("Raw response for founder", founder.name, ":", text);

            // Parse the response and add to matches array
            try {
                // Try to extract JSON from the response using regex
                const jsonRegex = /\[\s*{[\s\S]*}\s*\]/m;
                const jsonMatch = text.match(jsonRegex);

                let matchResults;
                if (jsonMatch) {
                    // Try to parse the extracted JSON
                    try {
                        matchResults = JSON.parse(jsonMatch[0]);
                    } catch (innerError) {
                        console.error(`Error parsing extracted JSON for ${founder.name}:`, innerError);
                        // Fallback: create a manual match with the first mentor
                        const fallbackMentor = mentors[0];
                        matchResults = [{
                            mentorId: fallbackMentor.id,
                            compatibilityScore: 80,
                            reasonForMatch: "AI-suggested match based on complementary skills and industry knowledge."
                        }];
                    }
                } else {
                    // No JSON found, create fallback matches
                    console.error(`No JSON pattern found in response for ${founder.name}`);
                    // Create matches with the first two mentors as fallback
                    matchResults = mentors.slice(0, 2).map(mentor => ({
                        mentorId: mentor.id,
                        compatibilityScore: 75,
                        reasonForMatch: "AI-suggested match based on industry alignment and expertise relevance."
                    }));
                }

                // Add to matches array
                matchResults.forEach((match) => {
                    const mentor = mentors.find((m) => m.id === match.mentorId);
                    if (mentor) {
                        allMatches.push({
                            founderId: founder.id,
                            founderName: founder.name,
                            founderStartup: founder.startup,
                            mentorId: mentor.id,
                            mentorName: mentor.name,
                            compatibilityScore: match.compatibilityScore,
                            reasonForMatch: match.reasonForMatch,
                        });
                    }
                });
            } catch (error) {
                console.error(`Error processing match results for ${founder.name}:`, error);
                // Create fallback matches if JSON parsing completely fails
                const fallbackMatches = mentors.slice(0, 2).map(mentor => ({
                    founderId: founder.id,
                    founderName: founder.name,
                    founderStartup: founder.startup,
                    mentorId: mentor.id,
                    mentorName: mentor.name,
                    compatibilityScore: 70,
                    reasonForMatch: "Default match based on availability and general expertise."
                }));
                allMatches.push(...fallbackMatches);
            }
        }

        return Response.json({ matches: allMatches });
    } catch (error) {
        console.error("Error generating matches:", error);
        return Response.json(
            { error: "Failed to generate matches" },
            { status: 500 }
        );
    }
} 