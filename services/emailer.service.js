var nodemailer = require('nodemailer');

async function sendEmail(params, callback){
    const transporter = nodemailer.createTransport({
        service:"gmail",
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'laxmansinghaaa64@gmail.com',
            pass: 'laxman123#$&'
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