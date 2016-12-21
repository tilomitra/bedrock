var nodemailer = require('nodemailer');
var emailConfig = sails.config.email;



module.exports = {
    sendMail: function (options, callback) {

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: emailConfig.gmail.auth
        });

        transporter.sendMail({
            from: options.from || emailConfig.gmail.fromAddress,
            to: options.to,
            subject: options.subject,
            text: options.text
        }, callback);
    }
}