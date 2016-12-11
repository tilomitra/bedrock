module.exports.email = {
    smtpConf: {
        host           : 'smtp.melodis.com',
        port           : 25,
        debug          : true,
        tls: {
            rejectUnauthorized: false
        }
    },
    address        : 'noreply@houndify.com',
    supportAddress : 'support@houndify.com'
}
