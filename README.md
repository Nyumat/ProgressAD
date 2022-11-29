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

## API Reference

```
/api/users/register | register a user
method: POST 
input: username, pin, weight, height, BMI, bloodType (optional)
output: status code, msg, token

/api/users/login | log in a user
method: POST 
input: username, pin
output: status code, msg, token 

/api/users/logout | logout a user
method: PATCH
input: username
output: status code, msg

/api/users/init_login | (pending deletion?) set inital login to false
method: PATCH 
input: username
output: status code, msg

/api/users/get | Get the user {username}'s document from MongoDB
method: GET
input: username
output: status code, msg, user

/api/workouts/create | Create a new workout for a user
method: POST 
input: username, workoutType, workoutIntensity
output: status code, msg

/api/workout/machines/add | Add a new machine to a user's workout
method: POST 
input: username, machine_id
output: status code, msg

/api/workout/machines/sets/add | Append a new set to a Strength type machine
method: PUT
input: username, reps, weight, machine_id
output: status code, msg

/api/workout/machines/cardio/add | Append a new exercise to a Cardio type machine
method: PUT
input: username, distance, timeSpent, machine_id
output: status code, msg

/api/machines/create | Upload a new machine to the Dixon Rec. Center collection.
method: POST
input: machine_name, machine_type 
output: status code, message

/api/machines/get | Get all the machines in the Dixon collection.
method: GET
input: none
output: msg, 
machines{machine_name,machine_id,machine_type,machine_status,machine_image}

/api/machines/update_status | Update the status of a machine at Dixon.
method: PUT
input: machine_id, username 
output: status code, msg, machines

/api/users/update | Update and save the profile of the user.
method: PUT
input: old_username, username, weight,  height, BMI, age, firstName, lastName
output: status code, msg, user

/api/workouts/get | Get the user's current workout and past saved workouts
method: GET
input: username 
output: status code, msg, currentWorkout, savedWorkouts

/api/workout/rate | Rate the user's workout before ending.
method: PATCH
input: username, effortLevel, tirednessLevel
output: status code, msg

/api/workout/end | End the user's current workout
method: PATCH
input: username
output: status code, msg, savedWorkouts
```
