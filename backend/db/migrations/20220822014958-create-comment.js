'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', { //this is plural not singular
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users'} //should be plural
      },
      micId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Mics'} //should be plural
      },
      body: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};
