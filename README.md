````markdown
# Mood Journal

A modern, AI-powered journaling application that helps track your emotions and provides insights into your mental wellbeing.

<div style="display: flex; gap: 10px; margin-bottom: 20px;">
    <img src="./public/screenshots/s2.png" alt="Mood Journal Dashboard" width="48%">
    <img src="./public/screenshots/s1.png" alt="Journal Entry View" width="48%">
</div>

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
- **Design**: Responsive UI with dark/light mode support.

## Getting Started

### Prerequisites

- Node.js 16.8+ and npm/yarn.
- A Clerk account for authentication ([https://clerk.dev](https://clerk.dev)).
- An OpenAI API key for AI analysis functionality.

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
     ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Journal Entries

Write your thoughts in the editor and click **"Save & Analyze"** to get AI-generated insights about your mood, subject matter, and emotional tone.

### History View

Review past entries and track how your mood has changed over time.

### Dashboard

See an overview of your journaling habits and emotional trends.

## Project Structure
````

/public/screenshots/ # Screenshots for the README
/src/ # Source code
/components/ # React components
/pages/ # Next.js pages
/styles/ # Tailwind CSS styles

````

## Screenshots Setup

To display the screenshots in the README:

1. Create a `screenshots` directory:
     ```bash
     mkdir -p public/screenshots
     ```

2. Add your screenshots to this directory:
     ```
     public/screenshots/dashboard.png
     public/screenshots/journal.png
     ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository.
2. Create your feature branch:
     ```bash
     git checkout -b feature/amazing-feature
     ```
3. Commit your changes:
     ```bash
     git commit -m 'Add some amazing feature'
     ```
4. Push to the branch:
     ```bash
     git push origin feature/amazing-feature
     ```
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/).
- Authentication by [Clerk](https://clerk.dev/).
- AI analysis powered by [OpenAI](https://openai.com/).
- Icons from [Heroicons](https://heroicons.com/).
- Made with ❤️ by Chouaib Atmani.
````
