# Skulwise - AI-Powered Study Platform

Transform your study notes into interactive audio experiences and flashcards with AI-powered summarization.

## Features

- **AI-Powered Summarization**: Upload notes and get intelligent summaries with key points
- **Audio Generation**: Convert summaries to natural-sounding audio for hands-free learning
- **Smart Flashcards**: Automatically generated flashcards with adaptive difficulty levels
- **Gamified Learning**: XP system with levels, streaks, and achievements
- **Progress Tracking**: Comprehensive dashboard to monitor your learning journey
- **Responsive Design**: Beautiful, modern interface that works on all devices

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **AI Integration**: OpenAI GPT-4 & Whisper APIs
- **File Handling**: React Dropzone
- **State Management**: React Hooks
- **Icons**: Lucide React

## Project Structure

```
skulwise/
├── public/
│   ├── icons/
│   ├── images/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── UploadNoteForm.tsx
│   │   └── Flashcard.tsx
│   ├── pages/
│   │   ├── index.tsx            // Landing Page
│   │   ├── dashboard.tsx        // Study Dashboard
│   │   ├── upload.tsx           // Notes to Audio
│   │   ├── flashcards.tsx
│   │   ├── rewards.tsx
│   │   └── api/
│   │       └── summarize.ts     // API route for note summarization
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   └── openai.ts            // GPT/Whisper API functions
│   └── lib/
│       └── xpSystem.ts          // Reward points logic
├── .env.local
├── package.json
├── next.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skulwise
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # OpenAI API Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   
   # Next.js Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Setup

### OpenAI Configuration

1. Sign up for an OpenAI account at [platform.openai.com](https://platform.openai.com)
2. Generate an API key from your dashboard
3. Add the API key to your `.env.local` file
4. Ensure you have sufficient credits for GPT-4 and Whisper API usage

### Supported File Types

- **Text Files**: `.txt`
- **PDF**: `.pdf` (basic support)
- **Word Documents**: `.doc`, `.docx` (basic support)
- **Direct Text Input**: Paste content directly

## Features Overview

### 1. Landing Page (`/`)
- Hero section with feature highlights
- Benefits overview
- Call-to-action buttons

### 2. Dashboard (`/dashboard`)
- Level progress tracking
- XP and streak statistics
- Quick access to features
- Recent activity feed
- Study set overview

### 3. Upload Notes (`/upload`)
- File upload with drag-and-drop
- Text input for direct pasting
- AI summarization with key points
- Audio generation from summaries
- Flashcard preview

### 4. Flashcards (`/flashcards`)
- Interactive flip cards
- Progress tracking
- Difficulty indicators
- Session completion stats
- Navigation controls

### 5. Rewards (`/rewards`)
- Achievement system
- XP progress visualization
- Activity history
- Leaderboard
- Statistics overview

## XP System

### Activities & Rewards
- **Upload Notes**: 50 XP
- **Complete Flashcard**: 10 XP
- **Daily Login**: 20 XP
- **Study Session**: 30 XP

### Achievements
- **Scholar**: Reach level 5
- **Expert**: Reach level 10
- **Master**: Reach level 20
- **Week Warrior**: 7-day streak
- **Monthly Master**: 30-day streak
- **Knowledge Seeker**: 1,000 total XP

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

### Code Structure

- **Components**: Reusable UI components in `src/components/`
- **Pages**: Next.js pages in `src/pages/`
- **API Routes**: Backend endpoints in `src/pages/api/`
- **Utils**: Utility functions in `src/utils/`
- **Lib**: Business logic in `src/lib/`
- **Styles**: Global CSS in `src/styles/`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Digital Ocean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@skulwise.com or create an issue in the repository.

## Roadmap

- [ ] User authentication and profiles
- [ ] Cloud storage for notes and progress
- [ ] Collaborative study groups
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Multiple language support
- [ ] Voice commands
- [ ] Spaced repetition algorithm

## Acknowledgments

- OpenAI for GPT-4 and Whisper APIs
- Radix UI for component primitives
- Lucide for beautiful icons
- Tailwind CSS for styling system
