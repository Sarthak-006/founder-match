"use client"

import { useState, useEffect } from "react"

export default function FounderMatch() {
  // State for mentors and founders
  const [mentors, setMentors] = useState([])
  const [founders, setFounders] = useState([])
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState({})

  // State for form inputs
  const [activeTab, setActiveTab] = useState("home")
  const [newMentor, setNewMentor] = useState({
    name: "",
    expertise: "",
    industry: "",
    experience: "",
    interests: "",
    availability: "",
    bio: "",
  })
  const [newFounder, setNewFounder] = useState({
    name: "",
    startup: "",
    industry: "",
    stage: "",
    needs: "",
    vision: "",
    bio: "",
  })

  // Load sample data on initial render
  useEffect(() => {
    // Sample mentors data
    const sampleMentors = [
      {
        id: "m1",
        name: "Sarah Johnson",
        expertise: "Product Development, UX Design",
        industry: "SaaS, FinTech",
        experience: "15 years as CTO at multiple startups",
        interests: "AI, Blockchain, Sustainable Tech",
        availability: "Weekly, 2-3 hours",
        bio: "Former CTO at two successful startups with exits. Passionate about helping founders build scalable products.",
        rating: 4.8,
        matches: 12,
      },
      {
        id: "m2",
        name: "Michael Chen",
        expertise: "Fundraising, Pitch Development",
        industry: "Healthcare, BioTech",
        experience: "Angel investor, Former VC Partner",
        interests: "MedTech, Health Innovation, Digital Health",
        availability: "Bi-weekly, 1-2 hours",
        bio: "Angel investor who has helped startups raise over $50M in funding. Specializes in healthcare innovations.",
        rating: 4.6,
        matches: 8,
      },
      {
        id: "m3",
        name: "Aisha Patel",
        expertise: "Marketing, Growth Strategy",
        industry: "E-commerce, D2C",
        experience: "CMO at Fortune 500, Growth Advisor",
        interests: "Consumer Brands, Retail Tech, Marketplaces",
        availability: "Monthly, 4 hours",
        bio: "Marketing executive who scaled multiple D2C brands from zero to $10M+ in revenue.",
        rating: 4.9,
        matches: 15,
      },
    ]

    // Sample founders data
    const sampleFounders = [
      {
        id: "f1",
        name: "David Rodriguez",
        startup: "EcoShip",
        industry: "Sustainable Logistics",
        stage: "Seed",
        needs: "Product development, Market strategy",
        vision: "Creating carbon-neutral shipping solutions for e-commerce",
        bio: "First-time founder with background in logistics and environmental science.",
        feedback: {},
      },
      {
        id: "f2",
        name: "Lisa Wong",
        startup: "MediConnect",
        industry: "Healthcare",
        stage: "Pre-seed",
        needs: "Fundraising, Technical co-founder",
        vision: "Building a platform to connect patients with specialized care providers",
        bio: "Healthcare professional with 10 years of clinical experience.",
        feedback: {},
      },
      {
        id: "f3",
        name: "Jamal Edwards",
        startup: "FinLearn",
        industry: "FinTech, EdTech",
        stage: "Series A",
        needs: "Scaling operations, International expansion",
        vision: "Making financial education accessible to underserved communities",
        bio: "Second-time founder, previously built an education platform.",
        feedback: {},
      },
    ]

    setMentors(sampleMentors)
    setFounders(sampleFounders)
  }, [])

  // Handle form input changes for mentors
  const handleMentorChange = (e) => {
    const { name, value } = e.target
    setNewMentor((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form input changes for founders
  const handleFounderChange = (e) => {
    const { name, value } = e.target
    setNewFounder((prev) => ({ ...prev, [name]: value }))
  }

  // Add new mentor
  const addMentor = (e) => {
    e.preventDefault()
    const mentorWithId = {
      ...newMentor,
      id: `m${mentors.length + 1}`,
      rating: 0,
      matches: 0,
    }
    setMentors([...mentors, mentorWithId])
    setNewMentor({
      name: "",
      expertise: "",
      industry: "",
      experience: "",
      interests: "",
      availability: "",
      bio: "",
    })
    setActiveTab("mentors")
  }

  // Add new founder
  const addFounder = (e) => {
    e.preventDefault()
    const founderWithId = {
      ...newFounder,
      id: `f${founders.length + 1}`,
      feedback: {},
    }
    setFounders([...founders, founderWithId])
    setNewFounder({
      name: "",
      startup: "",
      industry: "",
      stage: "",
      needs: "",
      vision: "",
      bio: "",
    })
    setActiveTab("founders")
  }

  // Generate matches using API
  const generateMatches = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ founders, mentors }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate matches');
      }

      const data = await response.json();
      setMatches(data.matches);
    } catch (error) {
      console.error('Error generating matches:', error);
      alert('There was an error generating matches. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Provide feedback for a match
  const provideFeedback = async (matchId, rating, comments) => {
    try {
      // Find the match details
      const match = matches.find(m => `${m.founderId}-${m.mentorId}` === matchId);

      if (!match) {
        throw new Error('Match not found');
      }

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matchId,
          rating,
          comments,
          founderId: match.founderId,
          mentorId: match.mentorId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      // Update local state with the feedback
      setFeedback(prev => ({
        ...prev,
        [matchId]: { rating, comments, timestamp: new Date().toISOString() }
      }));

      alert('Thank you for your feedback!');
    } catch (error) {
      console.error('Error providing feedback:', error);
      alert('There was an error submitting your feedback. Please try again.');
    }
  };

  // Render different tabs based on activeTab state
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="home-content">
            <h2 className="text-2xl font-bold mb-6">Welcome to FounderMatch</h2>
            <p className="mb-4">
              FounderMatch uses advanced machine learning algorithms to connect startup founders with the perfect
              mentors to help them succeed.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">For Founders</h3>
                <p>Find experienced mentors who can guide you through your startup journey.</p>
                <button
                  onClick={() => setActiveTab("add-founder")}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Register as Founder
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">For Mentors</h3>
                <p>Share your expertise and help the next generation of entrepreneurs succeed.</p>
                <button
                  onClick={() => setActiveTab("add-mentor")}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Register as Mentor
                </button>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">View Matches</h3>
                <p>See our AI-powered recommendations for founder-mentor pairings.</p>
                <button
                  onClick={() => setActiveTab("matches")}
                  className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                >
                  View Matches
                </button>
              </div>
            </div>
          </div>
        )

      case "mentors":
        return (
          <div className="mentors-content">
            <h2 className="text-2xl font-bold mb-6">Our Mentors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <div key={mentor.id} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{mentor.name}</h3>
                  <p className="text-gray-600 mb-4">{mentor.expertise}</p>
                  <div className="mb-2">
                    <strong>Industry:</strong> {mentor.industry}
                  </div>
                  <div className="mb-2">
                    <strong>Experience:</strong> {mentor.experience}
                  </div>
                  <div className="mb-2">
                    <strong>Interests:</strong> {mentor.interests}
                  </div>
                  <div className="mb-2">
                    <strong>Availability:</strong> {mentor.availability}
                  </div>
                  <div className="mb-4">
                    <strong>Bio:</strong> {mentor.bio}
                  </div>
                  {mentor.rating > 0 && (
                    <div className="flex items-center mb-2">
                      <strong className="mr-2">Rating:</strong>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400">
                            {i < Math.floor(mentor.rating) ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                      <span className="ml-2">({mentor.rating.toFixed(1)})</span>
                    </div>
                  )}
                  <div>
                    <strong>Successful Matches:</strong> {mentor.matches}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setActiveTab("add-mentor")}
              className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add New Mentor
            </button>
          </div>
        )

      case "founders":
        return (
          <div className="founders-content">
            <h2 className="text-2xl font-bold mb-6">Our Founders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {founders.map((founder) => (
                <div key={founder.id} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{founder.name}</h3>
                  <p className="text-gray-600 mb-4">
                    {founder.startup} - {founder.stage}
                  </p>
                  <div className="mb-2">
                    <strong>Industry:</strong> {founder.industry}
                  </div>
                  <div className="mb-2">
                    <strong>Needs:</strong> {founder.needs}
                  </div>
                  <div className="mb-2">
                    <strong>Vision:</strong> {founder.vision}
                  </div>
                  <div className="mb-4">
                    <strong>Bio:</strong> {founder.bio}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setActiveTab("add-founder")}
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add New Founder
            </button>
          </div>
        )

      case "add-mentor":
        return (
          <div className="add-mentor-content">
            <h2 className="text-2xl font-bold mb-6">Register as a Mentor</h2>
            <form onSubmit={addMentor} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newMentor.name}
                  onChange={handleMentorChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Expertise</label>
                <input
                  type="text"
                  name="expertise"
                  value={newMentor.expertise}
                  onChange={handleMentorChange}
                  className="w-full p-2 border rounded"
                  required
                  placeholder="e.g., Product Development, Fundraising, Marketing"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={newMentor.industry}
                  onChange={handleMentorChange}
                  className="w-full p-2 border rounded"
                  required
                  placeholder="e.g., SaaS, FinTech, Healthcare"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={newMentor.experience}
                  onChange={handleMentorChange}
                  className="w-full p-2 border rounded"
                  required
                  placeholder="e.g., Former CTO, Angel Investor, 10 years in startups"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Interests</label>
                <input
                  type="text"
                  name="interests"
                  value={newMentor.interests}
                  onChange={handleMentorChange}
                  className="w-full p-2 border rounded"
                  required
                  placeholder="e.g., AI, Blockchain, Sustainable Tech"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Availability</label>
                <input
                  type="text"
                  name="availability"
                  value={newMentor.availability}
                  onChange={handleMentorChange}
                  className="w-full p-2 border rounded"
                  required
                  placeholder="e.g., Weekly, 2-3 hours"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={newMentor.bio}
                  onChange={handleMentorChange}
                  className="w-full p-2 border rounded"
                  rows="4"
                  required
                  placeholder="Tell us about your background and why you want to mentor founders"
                ></textarea>
              </div>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Register
              </button>
            </form>
          </div>
        )

      case "add-founder":
        return (
          <div className="add-founder-content">
            <h2 className="text-2xl font-bold mb-6">Register as a Founder</h2>
            <form onSubmit={addFounder} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newFounder.name}
                  onChange={handleFounderChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Startup Name</label>
                <input
                  type="text"
                  name="startup"
                  value={newFounder.startup}
                  onChange={handleFounderChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={newFounder.industry}
                  onChange={handleFounderChange}
                  className="w-full p-2 border rounded"
                  required
                  placeholder="e.g., SaaS, FinTech, Healthcare"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Stage</label>
                <select
                  name="stage"
                  value={newFounder.stage}
                  onChange={handleFounderChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Stage</option>
                  <option value="Idea">Idea</option>
                  <option value="Pre-seed">Pre-seed</option>
                  <option value="Seed">Seed</option>
                  <option value="Series A">Series A</option>
                  <option value="Series B">Series B</option>
                  <option value="Series C+">Series C+</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Needs</label>
                <input
                  type="text"
                  name="needs"
                  value={newFounder.needs}
                  onChange={handleFounderChange}
                  className="w-full p-2 border rounded"
                  required
                  placeholder="e.g., Product development, Fundraising, Marketing strategy"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Vision</label>
                <input
                  type="text"
                  name="vision"
                  value={newFounder.vision}
                  onChange={handleFounderChange}
                  className="w-full p-2 border rounded"
                  required
                  placeholder="What's your startup's mission and vision?"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={newFounder.bio}
                  onChange={handleFounderChange}
                  className="w-full p-2 border rounded"
                  rows="4"
                  required
                  placeholder="Tell us about your background and entrepreneurial journey"
                ></textarea>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Register
              </button>
            </form>
          </div>
        )

      case "matches":
        return (
          <div className="matches-content">
            <h2 className="text-2xl font-bold mb-6">Mentor-Founder Matches</h2>

            {matches.length === 0 && !loading && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <p>No matches generated yet. Click the button below to generate matches.</p>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <p className="ml-4">Generating optimal matches using ML algorithms...</p>
              </div>
            ) : (
              <>
                {matches.length > 0 && (
                  <div className="grid grid-cols-1 gap-6 mb-6">
                    {matches.map((match, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                          <div className="mb-4 md:mb-0">
                            <h3 className="text-xl font-semibold">
                              {match.founderName} ({match.founderStartup}) + {match.mentorName}
                            </h3>
                            <div className="mt-2">
                              <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                                Compatibility: {match.compatibilityScore}%
                              </span>
                            </div>
                          </div>

                          <div className="flex">
                            <button
                              onClick={() => {
                                const rating = prompt("Rate this match from 1-5:")
                                const comments = prompt("Any comments about this match?")
                                if (rating && !isNaN(rating) && rating >= 1 && rating <= 5) {
                                  provideFeedback(
                                    `${match.founderId}-${match.mentorId}`,
                                    Number.parseInt(rating),
                                    comments,
                                  )
                                }
                              }}
                              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                            >
                              Provide Feedback
                            </button>
                          </div>
                        </div>

                        <div className="mb-4">
                          <strong>Why this is a good match:</strong>
                          <p className="mt-1">{match.reasonForMatch}</p>
                        </div>

                        {feedback[`${match.founderId}-${match.mentorId}`] && (
                          <div className="mt-4 p-3 bg-gray-50 rounded">
                            <h4 className="font-semibold">Your Feedback</h4>
                            <div className="flex mt-1">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-yellow-400">
                                  {i < feedback[`${match.founderId}-${match.mentorId}`].rating ? "★" : "☆"}
                                </span>
                              ))}
                            </div>
                            {feedback[`${match.founderId}-${match.mentorId}`].comments && (
                              <p className="mt-1 text-sm">
                                {feedback[`${match.founderId}-${match.mentorId}`].comments}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={generateMatches}
                  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  disabled={loading || mentors.length === 0 || founders.length === 0}
                >
                  {matches.length > 0 ? "Regenerate Matches" : "Generate Matches"}
                </button>

                {(mentors.length === 0 || founders.length === 0) && (
                  <p className="mt-2 text-red-500">You need at least one mentor and one founder to generate matches.</p>
                )}
              </>
            )}
          </div>
        )

      default:
        return <div>Page not found</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">FounderMatch</h1>
          <p className="mt-2">ML Algorithm for Optimal Mentor-Founder Matching</p>
        </div>
      </header>

      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6">
          <ul className="flex overflow-x-auto">
            <li className="py-4 px-6 cursor-pointer hover:bg-gray-100" onClick={() => setActiveTab("home")}>
              Home
            </li>
            <li className="py-4 px-6 cursor-pointer hover:bg-gray-100" onClick={() => setActiveTab("mentors")}>
              Mentors
            </li>
            <li className="py-4 px-6 cursor-pointer hover:bg-gray-100" onClick={() => setActiveTab("founders")}>
              Founders
            </li>
            <li className="py-4 px-6 cursor-pointer hover:bg-gray-100" onClick={() => setActiveTab("matches")}>
              Matches
            </li>
          </ul>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">{renderContent()}</main>

      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="container mx-auto">
          <p>© 2025 FounderMatch - Powered by Groq AI and Machine Learning</p>
          <p className="mt-2 text-gray-400">Connecting the best mentors with promising founders</p>
        </div>
      </footer>
    </div>
  )
}
