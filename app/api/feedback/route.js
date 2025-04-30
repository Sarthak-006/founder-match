export async function POST(req) {
    try {
        const { matchId, rating, comments, founderId, mentorId } = await req.json();

        if (!matchId || !rating || !founderId || !mentorId) {
            return Response.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // In a real application, you would store this in a database
        // For this demo, we'll just return a success response

        // Example: if you had a database connection
        // await db.collection('feedback').insertOne({
        //   matchId,
        //   rating,
        //   comments,
        //   founderId,
        //   mentorId,
        //   createdAt: new Date()
        // });

        return Response.json({
            success: true,
            message: "Feedback submitted successfully",
            feedback: {
                matchId,
                rating,
                comments,
                founderId,
                mentorId,
                createdAt: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error("Error saving feedback:", error);
        return Response.json(
            { error: "Failed to save feedback" },
            { status: 500 }
        );
    }
} 