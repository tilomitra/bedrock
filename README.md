Node Boilerplate
================

Node Boilerplate makes it easy to start building a NodeJS app. Its a fast way to get working on your Node website without having to worry about the setup. It takes care of all the boring parts like:

* Setting up your views and layout files
* Configuring a basic Express server
* Having useful Handlebars helpers
* Setting up a place to store config data
* 404/500 pages
* Route Handling
* Loading popular front-end code (jQuery/BootStrap by default)
* Sharing templates/partials with the front-end
* Sharing JavaScript variables with the front-end 

## Goals
1. To end the repetition involved with starting a new Node web app.
2. To never install anything outside of the project directory (For easier production deployment).

## Stack
By default, Node Boilerplate comes with the following:

* Express 4.x
* Handlebars View Engine
* Common Handlebars Helpers like `{{addLocalJS}}`, `{{addRemoteCSS}}`, and more to make it easy to load CSS/JS on a per-page basis. 
* Uses [express-state](https://github.com/yahoo/express-state) to expose data from the server to the client.
* Allows you to share Handlebars templates/partials between the server and the client.

## Installation
To install and run the Node Boilerplate template app:

```shell
    $ git clone github.com/tilomitra/node-boilerplate/ <your-app-folder-name>
    $ npm install
    $ npm start
```

Then, go to [http://localhost:8000](http://localhost:8000).

## Other Node.js Starter Apps
This project is not suitable for everyone. Notably, Node Boilerplate does not come with a database, user authentication system, OAuth login support, or build tasks. I want to keep Node Boilerplate simple. However, there are some great open source projects available if you need these features. 

* [Hackathon Starter](https://github.com/sahat/hackathon-starter)
* [Nodember](https://github.com/mgenev/nodember)


## LICENSE
This software is free to use under the Yahoo! Inc. BSD license. See the LICENSE file for license text and copyright information.
