const sequelize = require('../config/connection');
const { User, Party, Comment, Meal} = require('../models');

const userData = require('./userData.json');
const partyData = require('./partyData.json');
const mealData = require('./mealData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const party of partyData) {
    await Party.create({
      ...party,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const meal of mealData) {
    await Meal.create({
      ...meal,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    })
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id
    })
  }

  process.exit(0);
};

seedDatabase();