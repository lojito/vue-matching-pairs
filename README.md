# Development:

Open a terminal and have typescript watch for changes in the server directory and compile them automatically.

cd server

tsc -w
<br />
<br />

Open a second terminal and start the express API server.

cd server\dist

nodemon app.js
<br />
<br />

Open a third terminal and start the development server.

cd client

npm run serve
<br />
<br />

# Build for Deployment:

Build out the static assets from the development environment and put it into the server/public directory

cd client

npm run build
<br />
<br />

# Play the game:


https://github.com/lojito/vue-matching-pairs/assets/46691447/a0679b92-a5be-4595-ba51-35218fb196fd

