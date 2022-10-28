# Progress

## MongoDB Connection Guide
Once you checkout the repo locally, create a .env file in the root of the project. <br>
```
frontend
.env <--- Here
README.md
index.js
```
By running: <br>
``` touch .env ```
<br>
After this, create a structure like so:

```
PORT= [Insert '8080' here]

URI= mongodb+srv://[insert username here]:[insert password here]@progress.xp1usq9.mongodb.net/?retryWrites=true&w=majority
```

You're now good to run **"npm install"** and then **"npm run server"** to start the web server.