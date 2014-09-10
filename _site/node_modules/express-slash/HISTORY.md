Express Slash Change History
============================

2.0.1 (2014-07-09)
------------------

* Fix bug with routers mounted with a `use()` path prefix. ([#5][] @awakenalive)

[#5]: https://github.com/ericf/express-slash/issues/5


2.0.0 (2014-07-02)
------------------

* __[!]__ Added support for Express 4.x; this version does *not* work with
  Express 3.x anymore. ([#4][])

[#4]: https://github.com/ericf/express-slash/issues/4


1.0.1 (2014-07-02)
------------------

* Added tests. ([#3][] @balaclark)

[#3]: https://github.com/ericf/express-slash/issues/3


1.0.0 (2014-01-03)
------------------

* __[!]__ Stable.

* Defined a previously undefined `var`.


0.2.1 (2013-11-06)
------------------

* Add "modown" keyword to package.json


0.2.0 (2013-04-20)
------------------

* Changed the behavior of this middleware to be smarter about whether it should
  check for a route matching the new URL path that ends *with* or *without* a
  trailing slash.

* Limited this middleware to only attempt to handle GET and HEAD HTTP requests.


0.1.0 (2013-03-09)
------------------

* Initial release.
