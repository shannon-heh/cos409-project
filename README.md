# SOC / COS 409 Final Project

## Title: TBD

## Authors: Shannon, Lydia, Aleeza, Wendi

### Public endpoints

- `/`: Home page (where player enters name & starts)
- `/workshop`: Workshop page (for dress-up game)
- `/garden`: Garden page (displays gift stream)
- `/final`: Final page (after player finishes game)
- `/about`: About page

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

### To install dependencies

```
>> cd cos409-project
>> npm install
```

Our dependencies (specified in `package-lock.json`) include...

- `dotenv`: loads environment variables from `.env`
- `ejs`: templating engine to generate HTML with JS
- `express`: node.js framework to build APIs in JS
- `pg`: allows interfacing with PostgreSQL database
- `nodemon`: auto-restarts node server when changes made to JS files in current directory

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
