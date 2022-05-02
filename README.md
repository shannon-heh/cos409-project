# SOC / COS 409 Final Project

### Title: Cy-Botanics
### Site: https://cy-botanics.herokuapp.com/

### Team Members 
* Shannon (dev), Lydia (dev), Wendi, Aleeza

### Public endpoints

- `/`: Home page
  - Where the player begins the game by entering an alias
- `/workshop`: Workshop page 
  - Laid out as a virtual workshop, invites players to learn about sustainable materials for computer parts and drag & drop these materials to their worktable and "collect them"
- `/garden`: Garden page 
  - Displays "gifts" from other players and asks player to give their own "gift", i.e. a reimaginign of the computer into something more sustainable
- `/action`: Take Action page 
  - Shows collected materials and a list of actionable items for the player to carry forward after they finish the game
- `/about`: About page 
  - Introduces team members and the philosophy behind our game 
- `/design`: Idea Gallery page 
  -  A description and gallery of our peers' creative ideas from our in-class Design Workshop

### Development process

**Pull from main.** Install the newest dependencies (below).

If you haven't already, create an `.env` file to store sensitive DB credentials. **Ask Shannon for the most up-to-date `.env`.** Each time before you make a commit, make sure `.env` is NOT committed!

**Start node server:**

```
>> cd cos409-project
>> npx nodemon
Listening on port PORT
```

Visit **`localhost:PORT/`**. The `PORT` is specified in the console log.

Now you're ready to make changes!

### Dependencies

The following are dependencies specified in `package-lock.json`, installed using `npm`.

- `dotenv`: loads environment variables from `.env`
- `ejs`: templating engine to generate HTML with JS
- `express`: node.js framework to build APIs in JS
- `pg`: allows interfacing with PostgreSQL database
- `nodemon`: auto-restarts node server when changes made to JS files in current directory
- `interact.js`: JS library to make drag & drop functionality easier

**To install these dependencies and update your `package-lock.json`:**

```
>> cd cos409-project
>> npm install
```

The following dependencies are imported in our HTML files. No need to do extra installation steps.

- `jquery`: JS library that simplifies DOM traversal, event handling, requests
- `bootstrap`: front-end framework that provides components to ease UI-building

### Directory organization

- `server.js`: starts the server that listens for client requests; specifies API routes
- `views/`: stores `.ejs` templates to render HTML pages. You can edit these templates like normal HTML.
  - `partials/`: stores tempaltes for partial HTML components (e.g. the header, script tags)

### Connect to DB via Postgres CLI

Only follow these steps if you would like to query or interact with the DB.

If you haven't already, install Postgres CLI [here](https://www.postgresql.org/download/).

```
>> psql -h HOST_NAME -p PORT -U USER_NAME DB_NAME
>> enter PASSWORD
```

If `psql` cannot be found, then do:

```
>> export PATH=/Library/PostgreSQL/14/bin:$PATH
```

To get DB credentials, go to the app in Heroku > Resources > Heroku Postgres > Settings.
