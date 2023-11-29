const User = require('./User');
const Comments = require('./Comments');
const Posts = require('./Posts');

User.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comments, {
    foreignKey: 'user_id'
});

Posts.belongTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comments.belongTo(User, {
    foreignKey: 'user_id'
});

Posts.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comments.belongTo(Posts, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Comments, Posts }