const otpGenerrator = require('otp-generator');
const crypto = require('crypto');
var nodemailer = require('nodemailer');
// for custom template
const path = require('path');
var hbs = require("nodemailer-express-handlebars");

const key = "EfGwOPExvP";
var otp;

// Method for genrating the OTP
async function sendOtp(params , callback){
    otp = otpGenerrator.generate(
        6,{
            digits :true,
            upperCaseAlphabets : false,
            specialChars: false,
            lowerCaseAlphabets: false,
        }
    );
    const ttl = 5 * 60 * 1000; // otp is valid for 5 min
    const expires = Date.now() + ttl;
    const data = `${params.email}.${otp}.${expires}`;
    const hash = crypto.createHmac('sha256',key).update(data).digest('hex');
    const fullHash = `${hash}.${expires}`;

    // This the Email OTP template that is send to user if possible then in otpMessage we can send HTMl code also.
    var model = {
        email : params.email,
        subject : "Email OTP for varification",
    };


    // Useing Already Defined Send EMail Method
    sendEmail(model,(error, result) =>{
        if(error){
           return callback(error);
        }

        else{
            return callback(null, fullHash);
        }
    });
}

// Method for verifying the OTP
async function verifyOTP(params, callback){
    let [hashValue , expires] = params.hash.split('.');

    let now = Date.now();

    if(now > parseInt(expires)) return callback('OTP Expired');

    let data = `${params.email}.${params.otp}.${expires}`;

    let newCalculatedHash = crypto.createHmac("sha256",key).update(data).digest('hex');

    if(newCalculatedHash === hashValue){
        return callback(null, "Success");
    }

    return callback("Invalid OTP");
    
}


// Method that send the Email with OTP
async function sendEmail(params, callback){
  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: 'laxmansinghaaa64@gmail.com',
          pass: 'lhmgughohoisdqfd'
      }
  });

  const handlebarsOptions = {
    viewEngine : {
      extName : ".handlebars",
      partialsDir: path.resolve('./views'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./views'),
    extName : ".handlebars",
  }

  transporter.use('complie',hbs(handlebarsOptions));

  var mailOptions = {
      from :{
          name:"Registration OTP",
          address:"verify@marfa.io",
      },
      to: params.email,
      subject: params.subject,
      template : 'email',
      context : {
        otp : otp
      }
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
    sendOtp,
    verifyOTP
}


