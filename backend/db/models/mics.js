'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mics = sequelize.define('Mics', {
    userId: DataTypes.INTEGER,
    imageURL: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Mics.associate = function(models) {
    Mics.belongsTo(models.User, {foreignKey: 'userId'})
    Mics.hasMany(models.Comment, { foreignKey: 'pictureId'})
  };
  return Mics;
};
