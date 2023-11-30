const sequelize = require('../config/connection');
const { User, Posts } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
// Reworked the seeds so that the posts would work better for me and it loads faster when npm run seed is run
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  let posts = [];

  for (const post of postData) {
    posts.push(await Posts.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    }));
  }
  process.exit(0);
}

seedDatabase();
