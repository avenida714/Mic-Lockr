'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
      {
        userId: 1,
        micId: 1,
        body: 'Wow, what a microphone.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        micId: 2,
        body: '...Please do not drop it.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        micId: 3,
        body: 'I want to be like Mic.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Comments');
  }
};
