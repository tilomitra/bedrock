Bedrock
=======

Bedrock is a minimalist Boilerplate for [Express](http://expressjs.com) apps. It's a fast way to get working on your webapp without having to worry about the setup, and is a collection of modules/libraries that I find myself using in every Express app that I make. Bedrock does things like:

* Setting up your views and layout files
* Configuring a basic Express server
* Having useful Handlebars helpers
* Setting up a place to store config data
* Creating 404/500 pages
* Route Handling
* Loading popular front-end code (jQuery/BootStrap by default)
* Sharing templates/partials with the front-end
* Sharing JavaScript variables with the front-end 

## Project Goals
1. To end the repetition involved with starting a new Node web app.
2. To never install anything outside of the project directory (For easier production deployment).

## Stack
By default, Bedrock is built using the following stack:

* Express 4.x
* Handlebars View Engine
* Common Handlebars Helpers like `{{addLocalJS}}`, `{{addRemoteCSS}}`, and more to make it easy to load CSS/JS on a per-page basis. 
* Uses [express-state](https://github.com/yahoo/express-state) to expose data from the server to the client.
* Allows you to share Handlebars templates/partials between the server and the client.

## Installation
To install and run Bedrock:

```shell
    $ git clone --depth 1 git@github.com:tilomitra/bedrock.git <your-app-folder-name>
    $ git checkout <latest-tag>
    $ npm install
    $ npm start
```

Then, go to [http://localhost:8000](http://localhost:8000).

I recommend using `--depth 1` so that you don't get the commit history in Bedrock, which you probably don't care about since you'll be adding your application-specific commits.

## Other Node.js Starter Apps
This project is not suitable for everyone. Notably, Bedrock does not come with a database, user authentication system, OAuth login support, or build tasks. I want to keep Bedrock simple. However, there are some great open source projects available if you need these features. 

* [Hackathon Starter](https://github.com/sahat/hackathon-starter)
* [Nodember](https://github.com/mgenev/nodember)


## LICENSE
MIT
