/*
 * PageController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 "use strict";

module.exports = {
    index: function (req, res) {
        res.view("index", { isIndex: true });
    }
};
