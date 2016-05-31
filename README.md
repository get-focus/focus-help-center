## Focus help center

## Directory structure

- `api` an independant directory with all the server code (api + db)
- `app` an independant directory with all the client code (the application and the extension)

Each of them have a `package.json` file

## Conventions

### Server

- The spec should be declare using the conventions of swagger
- The server will be written using express
- The database is Sqlite
- Typescript can be use (but the interface should be in separate file)
- There should be a task to populate the db

### Client

- Use of Typescript in `reducers`, `actions` and `service` (only typing). Interface should be decard in a separate file.
- Plain Js inside the components

## What done means

// to fill @Guenolek or @JabX
