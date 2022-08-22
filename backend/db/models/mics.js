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
    // Mics.hasMany(models.Comment, { foreignKey: 'pictureId'})
  };
  return Mics;
};


/**
 *
 * 'use strict';
module.exports = (sequelize, DataTypes) => {
  const Picture = sequelize.define('Picture', {
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    imageLink: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    private: DataTypes.BOOLEAN,
    longitude: DataTypes.DECIMAL,
    latitude: DataTypes.DECIMAL
  }, {});
  Picture.associate = function (models) {
    Picture.belongsTo(models.User, { foreignKey: 'userId' })
    Picture.belongsTo(models.Album, { foreignKey: 'albumId' })
    Picture.hasMany(models.Comment, { foreignKey: 'pictureId' })
  };
  return Picture;
};
 */
