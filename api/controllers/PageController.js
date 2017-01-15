/*
 * PageController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 "use strict";

module.exports = {
    index: function (req, res) {
        res.view("index");
    },
    renderLoggedInReactPage: function (req, res) {
        res.view("pages/react-template");
    },
    login: function (req, res) {
        res.view("pages/login", {layout: 'blank'});
    },
    signup: function (req, res) {
        res.view("pages/signup", {layout: 'blank'});
    }
};
