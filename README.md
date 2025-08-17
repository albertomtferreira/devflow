# DevFlow

**Streamline Your Development Workflow**

DevFlow is your all-in-one toolkit to organize projects, manage code snippets, track learning, and bookmark resources. Focus on what matters: building great software.

![DevFlow Dashboard](https://placehold.co/800x400/png?text=DevFlow+Dashboard)

## ✨ Features

### 🎯 **Project Dashboard**

- Visualize and manage all your projects from a centralized, intuitive dashboard
- Custom project statuses with predefined workflow templates
- Real-time project status tracking with color-coded indicators

### 💾 **Code Vault**

- Store, tag, and quickly retrieve code snippets
- **AI-powered smart tagging** using Google's Gemini 2.0 Flash
- Syntax highlighting and easy copy-to-clipboard functionality
- Full-text search across all your saved snippets

### 📚 **Learning Logger**

- Document your developer journey and key insights
- Save useful AI prompts and responses
- Track what you've learned on each project

### 🔖 **Bookmark Manager**

- Curate and categorize valuable development resources
- Save articles, tutorials, and documentation links
- Organize by project or topic

### 📊 **Project Management**

- Multiple workflow templates (Web App, Mobile App, Data Science, Simple)
- Custom status creation and management
- Project versioning and milestone tracking
- File and asset management

### 🎨 **Modern UI/UX**

- Clean, distraction-free workspace
- Dark/Light theme toggle
- Responsive design for all devices
- Glassmorphism and modern design elements

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm
- Firebase account
- Google Cloud account (for AI features)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/devflow.git
   cd devflow
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up Firebase**

   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password and Google)
   - Create a Firestore database
   - Copy your Firebase config

4. **Set up Google AI (Gemini)**

   - Go to [Google AI Studio](https://makersuite.google.com)
   - Create an API key for Gemini
   - Enable the Generative Language API

5. **Environment Variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Firebase Config
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Google AI (for smart tagging)
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
   ```

6. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:9002)

## 🎯 How to Use DevFlow

### Creating Your First Project

1. **Sign up** using email/password or Google authentication
2. Click **"New Project"** on your dashboard
3. Choose a **workflow template**:
   - **Web Application**: Planning → In Progress → Code Review → Testing → Deployed
   - **Mobile App**: Concept → UI/UX Design → Development → Testing → Published
   - **Data Science**: Research → Data Collection → Modeling → Validation → Production
   - **Simple**: To Do → In Progress → Done
4. Fill in project details (title, description, tech stack, links)
5. Click **"Create Project"**

### Managing Code Snippets

1. Navigate to your project's **Code Vault**
2. Click **"Add Snippet"**
3. Paste your code and add a title/description
4. Use **"Suggest Tags with AI"** for automatic categorization
5. Save and organize your snippets with tags

### Customizing Project Workflows

1. Go to **Project Settings → Statuses**
2. Add, edit, or reorder project statuses
3. Assign colors and descriptions
4. Set default statuses for new projects
5. Use the **quick status selector** in the project header

### Learning Documentation

1. Visit the **Learning Log** section
2. Document insights, solutions, and learnings
3. Save useful AI prompts and responses
4. Track your growth and knowledge acquisition

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Lucide React** - Beautiful icons

### Backend & Database

- **Firebase Auth** - User authentication
- **Firestore** - NoSQL database
- **Firebase Genkit** - AI integration framework

### AI & ML

- **Google Gemini 2.0 Flash** - AI-powered code analysis and tagging
- **Firebase Genkit** - AI workflow management

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Main dashboard and project pages
│   ├── actions.ts         # Server actions
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── navigation/        # Navigation components
│   ├── projects/          # Project-specific components
│   └── ui/               # Base UI components
├── contexts/             # React Context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
│   ├── actions/          # Database operations
│   └── types.ts          # TypeScript type definitions
└── ai/                   # AI-related code
    ├── flows/            # Genkit AI flows
    └── genkit.ts         # AI configuration
```

## 🎨 Customization

### Themes

DevFlow supports both light and dark themes. Users can toggle between themes using the theme switcher in the sidebar.

### Status Colors

Projects support 10 predefined status colors:

- Blue, Green, Yellow, Orange, Red
- Purple, Gray, Indigo, Pink, Emerald

### Workflow Templates

Create custom workflow templates by modifying `src/lib/types.ts`:

```typescript
{
  id: "your-template",
  name: "Your Workflow",
  description: "Custom workflow description",
  statuses: [
    {
      label: "Status Name",
      color: "blue",
      description: "Status description",
      order: 0,
      isDefault: true,
    },
    // Add more statuses...
  ],
}
```

## 🔒 Security Features

- **Firebase Authentication** with email/password and Google OAuth
- **Row-level security** with Firestore security rules
- **User data isolation** - users can only access their own projects
- **Secure API routes** with proper authentication checks

## 📱 Progressive Web App (PWA)

DevFlow is designed to work seamlessly across all devices:

- **Responsive design** that adapts to mobile, tablet, and desktop
- **Touch-friendly interface** with proper touch targets
- **Offline capabilities** (coming soon)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.
Follow our [Road Map](ROADMAP.md) for more details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs and request features on [GitHub Issues](https://github.com/yourusername/devflow/issues)
- **Discussions**: Join the conversation in [GitHub Discussions](https://github.com/yourusername/devflow/discussions)

## 🎉 Acknowledgments

- **Vercel** for Next.js and hosting platform
- **Firebase** for backend infrastructure
- **Google** for Gemini AI capabilities
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for utility-first styling

---

**Built with ❤️ for developers, by developers.**

_DevFlow - Organize your development life._
