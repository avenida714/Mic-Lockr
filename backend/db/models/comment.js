'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', { //singular not plural
    userId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER,
    body: DataTypes.STRING
  }, {});

  Comment.associate = function(models) {
    Comment.belongsTo(models.Mic, {foreignKey:'micId'}); //make these singular not plural
    Comment.belongsTo(models.User, {foreignKey:'userId'})
  };
  return Comment;
};
