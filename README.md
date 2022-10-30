# Progress

## Getting Started

First, clone the repo from the command line:

    git clone https://github.com/TrackMeAtDixon/Progress.git

Now, you haved checked out the repo locally.
Start in creating an .env file by running `touch .env` at the root of the project.

After this, open the .env file you just created in a text editor and format it like so:

```
PORT=XXXXX
URI=XXXXX
JWT_SECRET_KEY=XXXXX
```

> _Replace the '**XXXX**' with actual values or else the api won't function!_

Now that you've setup the enviornment variables and cloned the repository, it's time to run the dev server.

## Installation

In the root of the project run:
`npm install`

> Execute this command as well in /progress/frontend/

Let's go over the package.json scripts and what each of them do.

    "server": "nodemon index.js",

Start the web server with hot reloading. (restart when src. code changes are made)

    "frontend": "npm start --prefix frontend",

Start the _frontend-only_ webpack development server.

    "dev": "concurrently -k \"npm run server\"  \"npm run frontend\"",

Concurrently start both the frontend and backend. (common)

### Code Formatting

The code base follows a strict prettier style guideline which can be executed with:

    "format": "prettier --write './**/*.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc"

> You must have the package installed and a .prettierrc file in the root directory for this command to work!

After this, you're now ready to run `npm run dev` and start the application!
