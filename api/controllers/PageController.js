/*
 * PageController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

"use strict";

module.exports = {
    index: function(req, res) {
        res.view("index", { layout: "home" });
    },
    renderLoggedInReactPage: function(req, res) {
        res.view("pages/react-template");
    },
    login: function(req, res) {
        res.view("pages/login", { layout: "blank" });
    },
    signup: function(req, res) {
        res.view("pages/signup", { layout: "blank" });
    },

    app: function(req, res) {
        sails.hooks.http.app.expose(req.session.store.id, "App.Store.id");
        sails.hooks.http.app.expose(req.session.store.name, "App.Store.name");
        sails.hooks.http.app.expose(req.session.store.nonce, "App.Store.nonce");
        res.view("pages/react-template", {
            nonce: res.locals.nonce
        });
    }
};
