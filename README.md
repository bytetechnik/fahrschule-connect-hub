# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/ce401a65-97a6-4a6d-a086-e6a728f8013b

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ce401a65-97a6-4a6d-a086-e6a728f8013b) and start prompting.

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

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deploying to Netlify

This project is a Vite + React SPA using mock data (no backend). To deploy on Netlify:

1. Push the repo to GitHub
2. In Netlify, click "New site from Git" and choose your repo
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Ensure SPA routing works via either `public/_redirects` or `netlify.toml` included in the repo

Environment variables are not required for this demo (no APIs).

### Demo Login Credentials

Use any of the following on the Login page to preview role-based dashboards:

- Admin: `admin@fahrschule.de` / `Admin123!`
- Teacher: `teacher@fahrschule.de` / `Teacher123!`
- Student: `student@fahrschule.de` / `Student123!`

### Project Structure

- `src/contexts`: Auth and Language contexts
- `src/components`: UI elements and layout
- `src/pages`: Role-based pages
- `src/lib/mockData.ts`: All mock data and localStorage CRUD helpers
- `src/constants`: App constants

### Development

```sh
npm i
npm run dev
```

