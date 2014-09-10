/* global beforeEach, describe, it */
'use strict';

var express = require('express');
var slash = require(__dirname + '/../');
var request = require('supertest');

describe('App', function () {
    var app;

    beforeEach(function () {
        var respond = function (req, res) {
            res.send('done.');
        };

        app = express();

        app.enable('strict routing');
        app.use(slash());

        app.get('/slash/', respond);
        app.put('/slash/', respond);
        app.post('/slash/', respond);
        app.get('/noslash', respond);
    });

    it('adds slashes when they are needed', function (done) {
        request(app)
            .get('/slash')
            .expect('location', '/slash/')
            .expect(301, done);
    });

    it('removes slashes when they are not needed', function (done) {
        request(app)
            .get('/noslash/')
            .expect('location', '/noslash')
            .expect(301, done);
    });

    it('only works with GET requests', function (done) {
        request(app).put('/slash').expect(404, function () {
            request(app).post('/slash').expect(404, done);
        });
    });

    it("doesn't do anything if the requested method doesn't have any routes", function (done) {
        request(app)
            .head('/slash')
            .expect(404, done);
    });


    it("doesn't do anything if the requested route is correct", function (done) {
        request(app)
            .get('/slash/')
            .expect(200, done);
    });
});

describe('Router', function () {
    var app, router;

    beforeEach(function () {
        var respond = function (req, res) {
            res.send('done.');
        };

        app = express();
        app.enable('strict routing');

        router = express.Router({
            strict: app.get('strict routing')
        });

        app.use(router);
        app.use(slash());

        router.get('/slash/', respond);
        router.put('/slash/', respond);
        router.post('/slash/', respond);
        router.get('/noslash', respond);
    });

    it('adds slashes when they are needed', function (done) {
        request(app)
            .get('/slash')
            .expect('location', '/slash/')
            .expect(301, done);
    });

    it('removes slashes when they are not needed', function (done) {
        request(app)
            .get('/noslash/')
            .expect('location', '/noslash')
            .expect(301, done);
    });

    it('only works with GET requests', function (done) {
        request(app).put('/slash').expect(404, function () {
            request(app).post('/slash').expect(404, done);
        });
    });

    it("doesn't do anything if the requested method doesn't have any routes", function (done) {
        request(app)
            .head('/slash')
            .expect(404, done);
    });


    it("doesn't do anything if the requested route is correct", function (done) {
        request(app)
            .get('/slash/')
            .expect(200, done);
    });
});

describe('Nested Router', function () {
    var app, router;

    beforeEach(function () {
        var respond = function (req, res) {
            res.send('done.');
        };

        app = express();
        app.enable('strict routing');

        router = express.Router({
            strict: app.get('strict routing')
        });

        router.get('/slash/', respond);
        router.put('/slash/', respond);
        router.post('/slash/', respond);
        router.get('/noslash', respond);

        app.use('/', router);
        app.use('/nested/', router);
        app.use(slash());

    });

    it('adds slashes when they are needed', function (done) {
        request(app)
            .get('/slash')
            .expect('location', '/slash/')
            .expect(301, done);
    });

    it('removes slashes when they are not needed', function (done) {
        request(app)
            .get('/noslash/')
            .expect('location', '/noslash')
            .expect(301, done);
    });

    it('only works with GET requests', function (done) {
        request(app).put('/slash').expect(404, function () {
            request(app).post('/slash').expect(404, done);
        });
    });

    it("doesn't do anything if the requested method doesn't have any routes", function (done) {
        request(app)
            .head('/slash')
            .expect(404, done);
    });


    it("doesn't do anything if the requested route is correct", function (done) {
        request(app)
            .get('/slash/')
            .expect(200, done);
    });

    it('adds slashes when they are needed (for nested routes)', function (done) {
        request(app)
            .get('/nested/slash')
            .expect('location', '/nested/slash/')
            .expect(301, done);
    });

    it('removes slashes when they are not needed (for nested routes)', function (done) {
        request(app)
            .get('/nested/noslash/')
            .expect('location', '/nested/noslash')
            .expect(301, done);
    });

    it('only works with GET requests (for nested routes)', function (done) {
        request(app).put('/nested/slash').expect(404, function () {
            request(app).post('/nested/slash').expect(404, done);
        });
    });

    it("doesn't do anything if the requested method doesn't have any routes (for nested routes)", function (done) {
        request(app)
            .head('/nested/slash')
            .expect(404, done);
    });


    it("doesn't do anything if the requested route is correct (for nested routes)", function (done) {
        request(app)
            .get('/nested/slash/')
            .expect(200, done);
    });
});
