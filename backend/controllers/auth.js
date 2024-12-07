const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const ms = require('ms');
const formatToISO = require('../utils/dateUtils');
const { body, validationResult } = require('express-validator');

const cadastro = [
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, cpf, rg, birthDate, role } = req.body;

    try {
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(400).json({ error: 'E-mail já cadastrado!' });
      }

      const existingCpf = await User.findOne({ where: { cpf } });
      if (existingCpf) {
        return res.status(400).json({ error: 'CPF já cadastrado!' });
      }

      const existingRg = await User.findOne({ where: { rg } });
      if (existingRg) {
        return res.status(400).json({ error: 'RG já cadastrado!' });
      }

      const formattedBirthDate = formatToISO(birthDate);

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
          id: uuidv4(),
          name,
          email,
          password: hashedPassword,
          cpf,
          rg,
          birthDate: formattedBirthDate,
          role,
      });

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      const expiresInMs = ms(process.env.JWT_EXPIRES_IN);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: expiresInMs,
        sameSite: 'Strict'
      });
      return res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
];

const login = [
  body('email').notEmpty().withMessage('Email é obrigatório'),
  body('password').notEmpty().withMessage('Senha é obrigatória'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Senha incorreta!!' });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN } 
      );

      const expiresInMs = ms(process.env.JWT_EXPIRES_IN);

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: expiresInMs,
        sameSite: 'Strict'
      });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
];

const logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logout realizado com sucesso' });
};

module.exports = {
  cadastro,
  login,
};