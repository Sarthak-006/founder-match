# FounderMatch

ML Algorithm for Optimal Mentor-Founder Matching

## Project Overview

FounderMatch is an AI-powered platform that leverages machine learning and recommendation systems to optimize mentor-founder pairings, fostering impactful and sustainable startup growth. The platform uses Groq's advanced language models to analyze compatibility and generate optimal matches between startup founders and experienced mentors.

## Live Demo

Visit our production site at [https://founder-match-one.vercel.app/](https://founder-match-one.vercel.app/)

## Key Objectives

- Build a hybrid recommendation system combining collaborative filtering, content-based algorithms, and NLP for profile matching
- Create a model that adapts dynamically to real-time feedback and improves match quality over time
- Showcase measurable outcomes such as improved mentorship success rates or enhanced founder satisfaction

## Features

- **AI-Powered Matching**: Uses Groq's Llama 3 70B model to analyze compatibility between mentors and founders
- **Dynamic Feedback System**: Collects and incorporates user feedback to improve future matches
- **Profile Management**: Comprehensive profiles for both mentors and founders
- **Real-time Analysis**: Instant matching based on multiple compatibility factors
- **Adaptive Learning**: System improves over time based on user feedback and interaction patterns
- **User-Friendly Interface**: Clean, responsive design with intuitive navigation
- **Secure Authentication**: Protected user profiles and data

## Technical Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI Integration**: Groq API (Llama 3 70B)
- **Deployment**: Vercel
- **Version Control**: GitHub
- **Styling**: Tailwind CSS, Shadcn UI components
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 16.8 or later
- npm or yarn package manager
- Groq API key

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/YOUR-USERNAME/founder-match.git
   cd founder-match
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your Groq API key:
   ```
   GROQ_API_KEY="your-groq-api-key-here"
   ```
   
   You can get a Groq API key by signing up at [console.groq.com](https://console.groq.com).

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Endpoints

- `/api/chat` - Chat API for communicating with Groq models
- `/api/matches` - Generates mentor-founder matches using Groq's AI
- `/api/feedback` - Saves feedback for mentor-founder matches

## Matching Algorithm

The platform uses a sophisticated matching algorithm that considers:

1. **Industry Alignment**: Matching mentors with relevant industry experience
2. **Expertise Matching**: Aligning mentor skills with founder needs
3. **Experience Level**: Considering the startup stage and mentor experience
4. **Personal Compatibility**: Analyzing communication styles and working preferences
5. **Feedback Integration**: Incorporating previous match success data
6. **Geographic Proximity**: Considering location for potential in-person meetings
7. **Availability Matching**: Aligning schedules and time commitments

## Deployment

The application is deployed on Vercel:

1. Production URL: [https://founder-match-one.vercel.app/](https://founder-match-one.vercel.app/)
2. Automatic deployments on every push to the main branch
3. Environment variables configured in Vercel dashboard
4. Continuous Integration/Continuous Deployment (CI/CD) pipeline

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Groq for providing the powerful AI models
- Next.js and Vercel for the excellent development platform
- The open-source community for various tools and libraries used in this project
- All contributors and users who provide valuable feedback

## Support

For support, please open an issue in the GitHub repository or contact the development team.
