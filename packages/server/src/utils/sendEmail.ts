import nodemailer from 'nodemailer';
export async function sendEmail(
  email: string,
  url: string,
  subject: string
): Promise<void> {
  const account = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  const mailOptions = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: 'Hello world?', // plain text body
    html: `<a href="${url}">${url}</a>`, // html body
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`msg sent:, ${info.messageId}`);
  console.log(`url: ${nodemailer.getTestMessageUrl(info)}`); //only avilable with ethereal mail
}
