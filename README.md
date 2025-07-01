# Skulwise - AI-Powered Study Tools

Skulwise is a modern web application that transforms your study notes into engaging learning materials using artificial intelligence. Convert text into audio summaries, generate interactive flashcards, and gamify your learning experience with XP rewards and achievements.

## 🌟 Features

### Core Features
- **AI Note Summarization**: Transform lengthy notes into concise, digestible summaries
- **Text-to-Speech**: Convert summaries into high-quality audio for on-the-go learning
- **Smart Flashcards**: Auto-generated flashcards from your notes for active recall
- **Gamification**: XP system, achievements, and streaks to motivate learning

### Learning Tools
- **Interactive Flashcard System**: Flip cards, track correct/incorrect answers
- **Audio Learning**: Listen to your notes while commuting or exercising
- **Progress Tracking**: Monitor your study habits and improvements
- **Achievement System**: Unlock badges and climb leaderboards

### User Experience
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Multiple Input Methods**: Upload files, paste text, or record voice notes
- **Real-time Processing**: Fast AI-powered content generation
- **Cross-Platform**: Works on desktop, tablet, and mobile devices

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- OpenAI API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skulwise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
skulwise/
├── public/                 # Static assets
│   ├── icons/             # Icon files
│   │   └── favicon.ico        # Site favicon
│   ├── images/            # Image assets
│   ├── styles/            # CSS styles
│   │   └── globals.css    # Global styles
│   ├── utils/             # Utility functions
│   └── lib/               # Library code
│       └── xpSystem.ts    # XP and achievement logic
├── .env.local             # Environment variables
├── package.json           # Dependencies and scripts
├── next.config.js         # Next.js configuration
└── README.md             # This file
```

## 🔧 Technology Stack

### Frontend
- **Next.js 15** - React framework with pages router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

### Backend
- **Next.js API Routes** - Serverless API functions
- **OpenAI API** - GPT-4 for summarization, Whisper for speech-to-text, TTS for audio

### Development
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📖 API Documentation

### POST /api/summarize

Processes uploaded notes and generates summaries, flashcards, and optional audio.

**Request Body:**
```json
{
  "text": "Your study notes here...",
  "generateAudio": true
}
```

**Response:**
```json
{
  "summary": "AI-generated summary",
  "keyPoints": ["Point 1", "Point 2", "Point 3"],
  "flashcards": [
    {
      "question": "Question text",
      "answer": "Answer text"
    }
  ],
  "audioUrl": "data:audio/mp3;base64,..."
}
```

## 🎮 Gamification System

### XP Rewards
- Upload notes: **+10 XP**
- Complete flashcard: **+5 XP**
- Generate audio: **+8 XP**
- Complete study session: **+20 XP**
- Daily streak: **+15 XP**
- Weekly streak: **+50 XP**

### Achievements
- **First Steps**: Upload your first set of notes
- **Flashcard Master**: Complete 50 flashcards
- **Week Warrior**: Maintain a 7-day study streak
- **Rising Scholar**: Reach level 5
- **Audio Enthusiast**: Generate 25 audio summaries
- **Knowledge Seeker**: Process 100 sets of notes

### Levels
- Level 1: 0-99 XP
- Level 2: 100-149 XP
- Level 3: 150-199 XP
- And so on... (+50 XP per level)

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Add environment variables in Vercel dashboard:**
   - `OPENAI_API_KEY`: Your OpenAI API key
3. **Deploy automatically on every push to main branch**

### Other Platforms

The application can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for AI features | Yes |
| `NEXTAUTH_URL` | Base URL for authentication | Development only |
| `NEXTAUTH_SECRET` | Secret for session encryption | Production only |

## 📝 Usage Examples

### Uploading Notes
1. Navigate to the Upload page
2. Either drag & drop a text file or paste content directly
3. Optionally record voice notes using the microphone
4. Click "Process Notes" to generate AI summaries and flashcards

### Studying with Flashcards
1. Go to the Flashcards page
2. Select a flashcard set
3. Click cards to flip between questions and answers
4. Use the correct/incorrect buttons to track progress
5. Complete sessions to earn XP and achievements

### Tracking Progress
1. Visit the Dashboard to see your stats
2. Check the Rewards page for achievements and leaderboards
3. Monitor your study streak and level progress

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing code style and conventions
- Add proper error handling and validation
- Write descriptive commit messages
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Voice recording requires HTTPS in production
- Large file uploads may timeout (increase API limits as needed)
- Audio playback compatibility varies by browser

## 🔮 Roadmap

### Short Term
- [ ] Add support for PDF and Word document uploads
- [ ] Implement spaced repetition for flashcards
- [ ] Add collaborative study groups
- [ ] Mobile app development

### Long Term
- [ ] Advanced analytics and learning insights
- [ ] Custom AI model training
- [ ] Integration with popular note-taking apps
- [ ] Multi-language support

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for existing problems
2. Create a new issue with detailed information
3. Join our community discussions
4. Contact us at support@skulwise.com

---

**Built with ❤️ for students everywhere**
