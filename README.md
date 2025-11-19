📡 Event Radar

LIVE SITE: event-radar-zeta.vercel.app

Event Radar is a modern, full-stack event management platform built with Next.js 15. It allows users to discover local events, book tickets, and manage their bookings, while providing administrators with a comprehensive dashboard to manage events, users, and revenue.


🚀 Features

👤 For Users

Browse Events: Discover a variety of events with detailed descriptions, dates, and locations.

Secure Booking: Easy ticket booking system with instant confirmation.

Digital Receipts: Downloadable PDF receipts for all confirmed bookings.

User Dashboard: Manage profile settings and view booking history.

Notifications: Subscribe to email notifications for new event postings.

🛡️ For Admins

Admin Dashboard: Real-time overview of total events, bookings, users, and revenue.

Event Management: Create, update, and delete events seamlessly.

User Management: View and manage registered users.

Revenue Analytics: Visual charts (Pie & Bar) for revenue and booking trends.

Recent Activity: Quick view of the latest bookings and new user signups.

🛠️ Tech Stack

Framework: Next.js 15 (App Router)

Language: TypeScript

Styling: Tailwind CSS & Shadcn UI

Database: MongoDB (via Mongoose)

Authentication: NextAuth.js

Icons: Lucide React

Deployment: Vercel

📦 Getting Started

Follow these steps to set up the project locally on your machine.

Prerequisites

Node.js (v18 or higher)

npm or pnpm or yarn

MongoDB Atlas account (or a local MongoDB instance)

Installation

Clone the repository:

git clone (https://github.com/Shafin-chowdhury/Event_Radar.git)
cd event-radar


Install dependencies:

npm install
# or
pnpm install
# or
yarn install


Set up Environment Variables:
Create a .env.local file in the root directory and add the following variables:

# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/events

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_key_here  # Generate using: openssl rand -hex 32

# (Optional) Email Service Variables if you implemented email sending
# EMAIL_SERVER_USER=...
# EMAIL_SERVER_PASSWORD=...


Run the development server:

npm run dev
# or
pnpm dev


Open your browser:
Navigate to http://localhost:3000 to see the application running.

📂 Project Structure

├── app/
│   ├── admin/          # Admin dashboard routes
│   ├── api/            # Backend API routes (NextAuth, Events, Subscribe)
│   ├── booking/        # Booking pages and logic
│   ├── login/          # Authentication pages
│   └── page.tsx        # Homepage
├── components/
│   ├── admin/          # Admin-specific components (Charts, Tables)
│   ├── ui/             # Reusable UI components (Buttons, Cards, Modals)
│   ├── Header.tsx      # Main navigation header
│   └── Footer.tsx      # Application footer
├── lib/
│   ├── mongodb.ts      # Database connection helper
│   └── auth.ts         # NextAuth configuration
├── models/             # Mongoose models (User, Event, Booking)
└── public/             # Static assets (images, icons)


🔐 Authentication

The app uses NextAuth.js for secure authentication.

Sign Up: Users can create an account with their name, email, and password.

Sign In: Secure login with credentials.

Role-Based Access: Certain routes (like /admin) are protected and only accessible to users with the admin role.

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

Made with ❤️ by Shafin Chowdhury
