'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mic = sequelize.define('Mic', {
    userId: DataTypes.INTEGER,
    imageURL: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});

  Mic.associate = function(models) {
    Mic.belongsTo(models.User, {
      foreignKey: 'userId'
    })

  Mic.hasMany(models.Comment, {
      foreignKey: 'micId',
      onDelete: 'CASCADE',
      hooks:true
    })
  };
  return Mic;
};
