# ProgressAD 🏃 | 🏋️

### A workout tracking system for Oregon State University's Dixon Recreation Center.

#

## Quick Specs

- [React.js](https://reactjs.org/)
  - Declarative Library for developing UI's
- [Redux Toolkit](https://redux-toolkit.js.org/)
  - State management system
- [Express](https://expressjs.com/)
  - Framework for building REST API's with Node.js
- [MongoDB](https://www.mongodb.com/what-is-mongodb)
  - NoSQL Document Database
- [Material-UI](https://mui.com/)
  - React Component Library
- [Mongoose](https://mongoosejs.com/)
  - ODM for MongoDB
- [Webpack](https://webpack.js.org/)
  - Module builder and code splitting
- [Cloudinary SDK](https://cloudinary.com/documentation/node_integration)
  - Free image hosting solution

## Getting Started

First, clone the repo from the command line:

    git clone https://github.com/TrackMeAtDixon/Progress.git

Now that you haved checked out the repo locally, start in creating an .env file by running the command `touch .env` at the root of the project.

After this, open the .env file you just created in a text editor and format it like so:

```
PORT=XXXXX
URI=XXXXX
JWT_SECRET_KEY=XXXXX
CLOUD_NAME=XXXXX
CLOUDINARY_API_KEY=XXXXX
CLOUDINARY_API_SECRET=XXXXX
```

> _--> Replace '**XXXXX**' with the actual values or else the api won't function properly!_ > <br>--> Cloudinary SDK authentication details _[here.](https://cloudinary.com/documentation/node_integration#setting_configuration_parameters_globally)_

Now that you've setup the enviornment variables and cloned the repository, it's time to run the dev server.

## Installation

In the root of the project run:
`npm install`

> Execute this command in /progress/frontend/ as well!

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
