const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail');

let mailer = null;

const devMailer = ({
  send: (msg) => {
    const fileName = msg.to + new Date() + '.html'
    fs.writeFileSync(
      path.resolve(__dirname, 'logs', fileName),
      JSON.stringify(msg, null, 3)
    )
  }
})

const initMailer = (env) => {
  if (env === 'production') {
    sgMail.setApiKey(process.env.MAILER_API_KEY || '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');
  }
  mailer = env === 'production'
    ? sgMail
    : devMailer
}

const sendMail = ({ to, subject, html }) => {
  const msg = {
    from: 'vuburai@gmail.com',
    to,
    subject,
    html
  }

  mailer.send(msg)
}

module.exports = {
  sendMail,
  initMailer,
}