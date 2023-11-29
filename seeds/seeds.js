const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = [
  {
    userName: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'Password1',
  },
  {
    userName: 'jane_smith',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'Password1',
  },
];

const seedUsers = async () => {
  await sequelize.sync ({ force: true }) 
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
};

seedUsers();