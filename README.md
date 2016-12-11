# Bedrock (v2)

Bedrock is a quick way to setup a production-ready NodeJS server with a React front-end. Bedrock encapsulates my preferred stack when building CRUD web servers. 

## Built With
- Sails: Like Ruby on Rails but for NodeJS. Built using Express.
- React: Front-end framework that lets you create composable user interfaces
- React-Router: Front-end routing framework
- NuclearJS: Flux-inspired Immutable Data flow Library
- Webpack: Incremental builds on file saves

## Features
- Built-in support for Controllers, Models, and Views, and a CLI for generating them
- Waterline ORM for working with MySQL, Postgres and Mongo Databases
- Front-end Routing
- Automatic REST API Generation
- React and Flux connecting to generated REST API
- CSRF
- Middleware and policies

## Installation
```
git clone git@github.com:tilomitra/bedrock.git
npm install
sails lift
```

Then go to http://localhost:1337

