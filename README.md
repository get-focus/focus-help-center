# Focus Help Center

This repository contains the Focus Help Center, which is a standalone Express (NodeJS) app that you can deploy anywhere to provide a help center for your application(s),
whether they are built with Focus or not.

The app provides two views to consult the articles:
* A "full-blown" view (called "Back Office") which provides the full experience, including the redaction of articles
* An "embedded" view (called "Extension") which is supposed to be inserted and shown on demand in another application.

## How to deploy?

The server and client sides are developped separately (respectively in the `api` and `app` directories), so they can be served by different servers
if that suits your needs. The most convenient way to deploy is to package both apps together and have the server serve the client as static content,
and that's the purpose of the `postinstall` script in the root `package.json`. The script requires the dependencies of both apps to be installed
separately first before execution, and it will deliver a `dist` folder containing the packaged app. The command to launch the app with the default
configuration is `node default.js`, from inside the `dist` folder.

## Customization

The server side of the Help Center is meant to be customizable to allow anyone to inject their own login and environment logics. The `index.js` file
exports the basic elements to build the server and the `default.js` file is the default implementation, and you are encouraged to build your own.
In particular, the basic build doesn't include any service (only the `article` service is mandatory, so you have to put it somewhere in your own
config) and doesn't serve anything. The best way to understand what's expected is to take a look at the `default.js` file.

### Configuration

The `config.js` file exports a `setConfig` method you can use to specify the location of the DB file (which defaults in `dist/db/db.sqlite') and URLs
for navigation between apps (Back Office -> App and Extension -> Back Office). The server must publish a service that gives the URLs to the client,
which is the `configService` method of the `index.js` file.

### Database

You have to build the database by calling `db/init.js` either directly or requiring it into your own script if you want to specify another path for the
database with `setConfig`.

### Login

The Help Center only manages one login information: a `connected` boolean that represents the right of a user to access the edition module. It
expects the value of this boolean to be included with each request, accessible in Express in `req.user.signedIn`.

By default, the app uses a token-based authentification (managed by the application) and the client is configured to save and use this token in
requests. The default `signin` service (which you are welcome not to use) defines a GET and a POST route at `/signin` that the client will request
to login (POST) and to get the login information (GET). In addition to the `connected` boolean, if you provide a `userName` attribute to the response
of the GET request, the client will understand that the server uses an external login provider, which has its own login form.

There are then two ways of handling login. Your `signin` service must then define in those cases:
* Internal login: `GET` and `POST` `/signin` routes. `GET` must return `{connected: boolean}` or `{error: string}`. `POST` will be called for both
login and logout.
* External login: `GET /signin` and `GET /signout` routes. `GET /signin` must return `{connected: boolean, userName: string}` or `{error: string}` and
`GET /signout` should call the external login provider.

Note that `POST /signin` is an ajax call but `GET /signout` is a regular call (with a `<a>` tag).

Also note that `POST /signin` being only defined on the internal login logic means that you cannot login from the application to an external login provider.
Which is obvious, since it would be an internal login otherwise.

Truth be told, the login system is the highest common denominator between the original implementation and the first project's to implement it, so it might
need to be expanded in the future to support more scenarios. In particular, the distinction between internal and external lies in the existence or not of
`userName`, which makes impossible for an internal login to use it.

---

Then, you can use whatever you like to handle the login. To store the session on the client, you can use cookies (they will be included with all
requests automaticaly). You could also use a token, but they're only supported with internal login, and `POST /signin` should return `{token}`.

### Environment

You are free to start the server in the way that suits you the most. The services provided by the server (that you have to include in your own `default.js`
file) take a route prefix as first parameter which should handle most environment constraints.

## Development

### Server

- The server must run on Node > 6
- The server is an Express app
- The API is described using Swagger, so it can be requested by Swagger UI (which is served on the standalone server instead of the app).
- The server uses a SQLite database, which is stored in a file in `api/dist/db/db.sqlite`. It can be generated with the `db-init` script (once the
app has been built), or with `db-init:prod` to create an empty database.
- The server is entirely written in Typescript, which compiles into plain ES2015. The build process (gulp) pipes the Typescript result into Babel,
configured with the `babel-preset-node6` to fill the missing gaps in Node 6's ES2015 implementation.

### Client

- The client uses a React/Redux/React-Router stack.
- The client directory is divided into 3 subdirectories `back-office`, `extension` and `common`. Only view-specific content is located under its
respective view directory, and all the logic (including back office-only components such as the edition) is under `common`.
- The client is partially written in Typescript, mainly actions, reducers and tests. There's a `definitions` folder in `common` which must contain
all type definitions for all state and actions objects for use in actions and reducers.
