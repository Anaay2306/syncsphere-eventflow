# 🎯 SyncSphere EventFlow

A modern, glassmorphism-inspired event management platform built with cutting-edge technologies.

## ✨ Features

- **Modern UI/UX**: Glassmorphism design with smooth animations
- **Role-Based Access**: Organizer, Attendee, Sponsor, and Vendor dashboards
- **Real-time Collaboration**: Live event management and updates
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Authentication**: Secure user management with Supabase
- **Analytics**: Comprehensive event performance tracking

## 🚀 Live Demo

**URL**: https://lovable.dev/projects/9540d693-a599-4c23-901f-e615c5138f4a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9540d693-a599-4c23-901f-e615c5138f4a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## 🛠️ Technologies Used

This project is built with modern technologies:

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: shadcn/ui, Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Supabase (Authentication, Database)
- **State Management**: TanStack Query
- **Routing**: React Router DOM
- **Deployment**: Railway, Docker

## 🚀 Railway Deployment

### Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **Railway CLI**: Install the Railway CLI
   ```bash
   npm install -g @railway/cli
   ```

### Quick Deploy

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd syncsphere-eventflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Add your Supabase credentials:
     ```env
     VITE_SUPABASE_URL=your_supabase_url_here
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
     ```

4. **Deploy to Railway**
   ```bash
   # Login to Railway
   railway login
   
   # Create and link project
   railway link
   
   # Set environment variables in Railway dashboard
   # Deploy the application
   railway up
   ```

### Manual Railway Setup

1. **Create New Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your repository

2. **Configure Environment Variables**
   In Railway dashboard, go to Variables tab and add:
   ```
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   NODE_ENV=production
   ```

3. **Deploy**
   - Railway will automatically detect the Dockerfile
   - The app will build and deploy automatically
   - You'll get a public URL for your application

### Docker Deployment

The project includes a production-ready Dockerfile:

```bash
# Build the Docker image
docker build -t syncsphere-eventflow .

# Run the container
docker run -p 3000:3000 \
  -e VITE_SUPABASE_URL=your_url \
  -e VITE_SUPABASE_ANON_KEY=your_key \
  syncsphere-eventflow
```

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
syncsphere-eventflow/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   └── Navbar.tsx      # Navigation component
│   ├── pages/              # Page components
│   │   ├── dashboards/     # Dashboard pages
│   │   ├── organizer/      # Organizer-specific pages
│   │   ├── Events.tsx      # Events page
│   │   ├── Profile.tsx     # Profile page
│   │   └── Settings.tsx    # Settings page
│   ├── integrations/       # External service integrations
│   └── hooks/              # Custom React hooks
├── Dockerfile              # Docker configuration
├── railway.json           # Railway deployment config
├── railway.toml           # Railway TOML config
└── deploy.sh              # Deployment script
```

## 🌟 Features Overview

### 🎨 Modern Design System
- **Glassmorphism UI**: Translucent cards with backdrop blur effects
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Layout**: Mobile-first design approach
- **Dark Theme**: Modern dark navy theme with cyan accents

### 👥 Role-Based Dashboards
- **Organizer**: Event management, analytics, speaker coordination
- **Attendee**: Personal agenda, networking, gamification
- **Sponsor**: ROI tracking, brand visibility metrics
- **Vendor**: Service management, booking coordination

### 🔐 Authentication & Security
- **Supabase Auth**: Secure user authentication
- **Protected Routes**: Role-based access control
- **Session Management**: Automatic session handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Contact the development team

---

**Built with ❤️ using modern web technologies**
