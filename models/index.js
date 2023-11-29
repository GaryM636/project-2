const User = require('./User');
const Posts = require('./Posts');
const Comments = require('./Comments');

User.hasMany(Posts, {
  onDelete: 'set null'
});

Posts.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comments, {
    onDelete: 'set null'
  });
  
  Comments.belongsTo(User, {
    foreignKey: 'user_id'
  });

module.exports = { User, Posts, Comments };