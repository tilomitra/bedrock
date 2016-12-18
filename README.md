# Bedrock
Bedrock lets you set up a production-ready webapp in under 10 minutes.

It is a collection of popular frameworks that work well together. 

## Features Overview

- An Sails (Express) server with user authentication
- Auto-generated REST API for all your models
- Signup, Login, Reset Password Pages
- SMTP Email Support
- Server-side rendered pages
- Client-side rendered components using React
- Communication between React and Server-side API with Flux. 
- Client-side routing with React Router
- Incremental builds using Webpack, facilitated through Grunt.
- Migrations to help coordinate database changes
- Production-ready such as API access tokens, CSRF protection, CORS, and more.
- Support for multiple environments (dev, stage, prod)

## Why should you use it?
Use Bedrock to set up a production-ready Node webapp in under 10 minutes. 

You get user authentication, security, a front-end framework, and more.

At SoundHound, we use a version of Bedrock for many of our internal web applications. It is great for dashboards, CRUD webapps, and more.


## Quickstart
We will talk about the installation in more detail in the next section, but here is the quickstart guide.

```
git clone ... <project-name>
cd <project-name>
npm install
```
Then, open config/connections.js and update your database connection details.

Then, run the migrations to create the relevant database tables.

```
# Run migrations
grunt db:migrate:up
```

Then, start the server. You will be taken to the signup page.

```
# Start the server
sails lift
```

## Detailed Installation and Setup
Bedrock is the *starting point* of your Node application. To install, you should clone the project, and then build on top of it.

```
git clone ... <project-name>
cd <project-name>
npm install
```

Next, you will want to configure some settings. Bedrock is a Sails Server, so if you have ever used Sails before, the next steps will be familiar.

If you haven't used Sails before, don't worry. You'll just need to edit some JSON files.

### Configure Database Connection

Go into `config/connections.js`. Update the `mysql` connection details. At this point, you may need to create a new database.

If you want to use a different database (PostgreSQL or Mongo), remove the `mysql` connection, and create a new connection, as shown in the comments in the file.

### Migrate database tables
Bedrock sets up authentication for your server, and creates Login, Signup, and Reset password pages. It uses PassportJS to accomplish this.

To facilitate this, you need to run a migration to create the `Users` and `Passports` table. Just run this from the command line:

```
grunt db:migrate:up
```
After it runs, check your database and you should see `Users` and `Passports` table created.

We will talk more about migrations in the Best Practices section.

## Server-side Features
Bedrock is built on [Sails](http://sailsjs.org), so it has all of the great features that Sails ships with.

This includes, but is not limited to:

- Reusable Security Policies (Middleware)
- Works with any database
- Configurable 
- Waterline ORM
- Auto-generate REST APIs (or don't)
- Follows MVC conventions

[Check out all the features](http://sailsjs.com/features) on the Sails documentation page.


## Client-side Features
Bedrock lets you build reusable components using React and call its API via Flux Actions. Pages are linked together using React Router

Here's how it works at a high level:

1. User navigates to a page
2. Page route triggers React Router to display a component, and execute certain Flux Actions.
3. Flux actions trigger API requests.
4. API responses trigger Flux Stores to change.
5. Flux stores change automatically re-renders React components that are watching the store.

It is simple, one-way communication that scales to hundreds of components (We have 100+ components in our internal fork of Bedrock).


## Built With
Bedrock is composed of these open-source frameworks.

[Sails](http://sailsjs.com/): Sails makes it easy to build custom, enterprise-grade Node.js apps. It is designed to emulate the familiar MVC pattern of frameworks like Ruby on Rails, but with support for the requirements of modern apps: data-driven APIs with a scalable, service-oriented architecture

[React](https://facebook.github.io/react/): A JavaScript Library for building user interfaces

[React Router](https://github.com/ReactTraining/react-router): React Router is a complete routing library for React.

[NuclearJS](https://github.com/optimizely/nuclear-js): Traditional Flux architecture built with ImmutableJS data structures. Very similar to Redux.

[Webpack](https://webpack.github.io/): A module bundler for front-end assets. It is used in Bedrock for chunking JavaScript files to be loaded on demand.

