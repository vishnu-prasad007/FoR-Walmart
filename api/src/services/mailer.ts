const nodemailer = require("nodemailer");
async function sendmail(toemailAddress:string,subject:string,text:string) {
    var fromUser = 'ting.bing.test@gmail.com';
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: "ting.bing.test@gmail.com",
      pass: "Ting@123", 
    },
  });
  let info = await transporter.sendMail({
    from: fromUser,
    to: toemailAddress, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}


export{
    sendmail
}