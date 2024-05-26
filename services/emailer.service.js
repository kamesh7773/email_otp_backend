var nodemailer = require('nodemailer');

async function sendEmail(params, callback){
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'daniella.fay58@ethereal.email',
            pass: 'kTWDqb9XP9bzAWwy7j'
        }
    });

    var mailOptions = {
        from: "kameshsinghaaa64@gmail.com",
        to: params.email,
        subject: params.subject,
        html: params.body,
    }

    transporter.sendMail(mailOptions,function (error,info){
        if(error){
            return callback(error);
        }
        else{
            return callback(null, info.response);
        }
    });
}

module.exports = {
    sendEmail
}