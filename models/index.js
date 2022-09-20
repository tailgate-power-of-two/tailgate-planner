const User = require('./User');
const Party = require('./Party');
const Comment = require('./Comment');
const Meal = require('./Meal');

User.hasMany(Party, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Meal, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Party.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Party.hasMany(Comment, {
  foreignKey: 'Party_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Party, {
  foreignKey: 'Party_id',
  onDelete: 'CASCADE'
});

Meal.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});


module.exports = { User, Post, Comment };
