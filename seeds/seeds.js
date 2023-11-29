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
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
};

module.exports = seedUsers;
