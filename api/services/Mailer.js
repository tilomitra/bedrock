"use strict";

var nodemailer      = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var smtpOptions = sails.config.email.smtpConf;

module.exports = nodemailer.createTransport(smtpTransport(smtpOptions));
