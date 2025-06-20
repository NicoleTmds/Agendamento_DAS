const nodemailer = require('nodemailer');
// É uma boa prática carregar o dotenv aqui também
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

console.log("Verificando a conexão com o Mailtrap...");
transporter.verify(function(error, success) {
    if (error) {
        console.error("FALHA NA CONEXÃO COM MAILTRAP:", error);
    } else {
        console.log("SUCESSO: Conexão com Mailtrap estabelecida. O serviço está pronto.");
    }
});

module.exports = transporter;