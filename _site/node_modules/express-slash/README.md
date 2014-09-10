Express Slash
=============

[![Dependency Status](https://gemnasium.com/ericf/express-slash.png)](https://gemnasium.com/ericf/express-slash)
[![npm Version](https://badge.fury.io/js/express-slash.png)](https://npmjs.org/package/express-slash)

[Express][] middleware for people who are anal about trailing slashes.

If you're a good person, then you enable Express' `"strict routing"` because
you understand the difference between `/about` and `/about/`. You know that
these URLs are not the same and they have different meanings. The trouble is,
being a good person and caring about your trailing slashes is harder than not.
Plus, you also care about other people, and it would be rude to 404 them when
they forget the trailing slash. Luckily, there's this package to solve all your
trailing slash problems :D

**This Express middleware should come after your app's `router` middleware.**
It will handle [GET and HEAD] requests for URLs which did not have a matching
route by either adding or removing a trailing slash to the URL's path, then
checking the app's router for a matching route for the new URL, in which case it
will redirect the client (301 by default) to that URL.

**Note:** Choose the correct version of this package for your Express version:

* `v1.x`: Express 3.x
* `v2.x`: Express 4.x


[Express]: https://github.com/visionmedia/express


Installation
------------

Install using npm:

```shell
$ npm install express-slash
```


Usage
-----

Enable Express' `"strict routing"` setting, and add this middleware after your
app's `router` middleware:

```javascript
var express = require('express'),
    slash   = require('express-slash');

var app = express();

// Because you're the type of developer who cares about this sort of thing!
app.enable('strict routing');

// Create the router using the same routing options as the app.
var router = express.Router({
    caseSensitive: app.get('case sensitive routing'),
    strict       : app.get('strict routing')
});

// Add the `slash()` middleware after your app's `router`, optionally specify
// an HTTP status code to use when redirecting (defaults to 301).
app.use(router);
app.use(slash());

router.get('/', function (req, res) {
    res.send('Home');
});

router.get('/about/', function (req, res) {
    res.send('About');
});

router.get('/about/people', function (req, res) {
    res.send('People');
});

app.listen(3000);
```

Now when someone navigates to `/about`, they'll be redirected to `/about/`, and
when someone navigates to `/about/people/`, they'll be redirected to
`/about/people`.


License
-------

This software is free to use under the MIT license.
See the [LICENSE file][] for license text and copyright information.


[LICENSE file]: https://github.com/ericf/express-slash/blob/master/LICENSE
