const sequelize = require('../config/connection');
const { User, Posts, Games, Comments } = require('../models');

const gameData = require('./gameData.json');
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json')



const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const games = await Games.bulkCreate(gameData);

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

  const comments = await Promise.all(commentData.map(async (comment) => {
    return await Comments.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });

  }));

  process.exit(0);
};

seedDatabase();
