const express = require('express');
const { body, validationResult } = require('express-validator');
const authService = require('../core/auth-service');
const knex = require('../database/connection');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, password } = req.body;

      console.log(`name`, name);
      console.log(`email`, email);
      console.log(`password`, password)

      const userAlreadyExists = await knex('users').where({ email }).first();

      console.log(`User already exists: ${userAlreadyExists}`);
      if (userAlreadyExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = authService.hashPassword(password);

      const id = uuidv4();

      const [user] = await knex('users').insert({
        id,
        name,
        email,
        password: hashedPassword,
      }).returning('*');

      console.log(`User registered: ${user.email}`);

      const token = authService.generateToken(user);

      return res.status(201).json({ user, token });
    } catch (err) {
      console.log(`Could not register user: ${err}`);
      return res.status(500).send('Opps! Could not register user.');
    }
  });

module.exports = router;
