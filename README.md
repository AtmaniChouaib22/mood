# Mood Journal

A modern, AI-powered journaling application that helps track your emotions and provides insights into your mental wellbeing.

![Dashboard Screenshot](./s1.png)
![Journal Entry Screenshot](./s2.png)

## Features

- ✏️ **Personal Journal**: Write and save your thoughts securely.
- 🧠 **AI Analysis**: Get intelligent insights about your mood and emotions and generates a color based on the mood.
- 📊 **Sentiment Tracking**: Visualize your emotional patterns over time.
- 🔒 **Secure Authentication**: Keep your private thoughts protected.
- 📱 **Responsive Design**: Works beautifully on desktop and mobile devices.

## Tech Stack

- **Frontend**: Next.js 13 with App Router, React, TypeScript, Tailwind CSS.
- **Authentication**: Clerk Authentication.
- **AI Integration**: OpenAI API for mood analysis and sentiment extraction.
- **Database**: PostgreSQL with Prisma ORM.
- **Additional Libraries**: LangChain for advanced AI workflows, Zod for schema validation.
- **Design**: Responsive UI with dark/light mode support.

## Getting Started

### Prerequisites

- Node.js 16.8+ and npm/yarn.
- A Clerk account for authentication ([https://clerk.dev](https://clerk.dev)).
- An OpenAI API key for AI analysis functionality.
- A PostgreSQL database for storing journal entries.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/mood-journal.git
   cd mood-journal
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env.local` file in the root directory.
   - Add the following variables:

     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your key>
     CLERK_SECRET_KEY=<your key>

     NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
     NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
     OPENAI_API_KEY=<your-openai-api-key>
     DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
     ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Journal Entries

Write your thoughts in
