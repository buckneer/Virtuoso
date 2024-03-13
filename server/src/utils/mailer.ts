import nodemailer from "nodemailer";
import "dotenv/config"
import path from 'path';
import hbs from 'nodemailer-express-handlebars';

let pass = process.env.GOOGLE_PASS as string;
let name = process.env.GOOGLE_NAME as string;

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: name,
      pass: pass,
    },
});

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./src/utils/views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./src/utils/views/'),
}

//@ts-ignore
transporter.use('compile', hbs(handlebarOptions))

export const sendEmailConfirmMail = (name: string, code: string, email: string) => {

    const mailOptions = {
        from: '"Virtuoso" app.virtuoso@gmail.com ', // sender address
        template: "index", // the name of the template file, i.e., email.handlebars
        to: email,
        subject: `Welcome to Virtuoso, ${name}`,
        context: {
          user: name,
          code: code,
          email: email
        },
      };


    // const mailOptions = {
    //     from: "app.virtuoso@gmail.com",
    //     to: "miftarisimel@gmail.com",
    //     subject: "Hello from Nodemailer",
    //     text: "This is a test email sent using Nodemailer.",
    // };    

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
        } else {
          console.log("Email sent: ", info.response);
        }
    });
}

export const sendResetPasswordEmail = async (name: string, email: string, code: string) => {


  let urlReset = `http://localhost:1337/reset?email=${email}&code=${code}`;

  const mailOptions = {
      from: '"Virtuoso" app.virtuoso@gmail.com ', // sender address
      template: "reset", // the name of the template file, i.e., email.handlebars
      to: email,
      subject: `Password Reset Request for: ${name}`,
      context: {
        user: name,
        code: code,
        email: email,
        resetLink: urlReset
      },
    };

    // !! OVDE JE GRESKA

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
  });
}

