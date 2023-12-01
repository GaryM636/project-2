const sequelize = require('../config/connection');
const { User, Posts, Games } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const gameData = require('./gameData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Promise.all(postData.map(async (post) => {
    return await Posts.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }));

  const games = await Games.bulkCreate(gameData);

  process.exit(0);
};

seedDatabase();
