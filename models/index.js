const User = require('./User');
const Comments = require('./Comments');
const Posts = require('./Posts');
const Games = require('./Games');

Games.hasMany(Posts, {
    foreignKey: 'game_id',
    onDelete: 'CASCADE'
});

Posts.belongsTo(Games, {
    foreignKey: 'game_id',
    onDelete: 'CASCADE'
});

User.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comments, {
    foreignKey: 'user_id'
});

Posts.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(User, {
    foreignKey: 'user_id'
});

Posts.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(Posts, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Comments, Posts , Games }
