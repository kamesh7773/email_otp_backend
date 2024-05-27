var nodemailer = require('nodemailer');

async function sendEmail(params, callback){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'laxmansinghaaa64@gmail.com',
            pass: 'lhmgughohoisdqfd'
        }
    });

    var mailOptions = {
        from :{
            name:"Registration OTP",
            address:"verify@marfa.io",
        },
        to: params.email,
        subject: params.subject,
        html: params.html,
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