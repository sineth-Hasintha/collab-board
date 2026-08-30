const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory data store for M2
let users = [];

const generateToken = (id, email, name) => {
  return jwt.sign({ id, email, name }, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const userExists = users.find(u => u.email === email);
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password: hashedPassword
    };

    users.push(newUser);

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser.id, newUser.email, newUser.name),
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const user = users.find(u => u.email === email);

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id, user.email, user.name),
      });
    } else {
      res.status(401);
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    // req.user is populated by protect middleware
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getMe };
