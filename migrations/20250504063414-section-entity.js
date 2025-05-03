'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      heading: {
        allowNull: false,
        type: Sequelize.STRING(128),
      },
      subHeading: {
        allowNull: true,
        type: Sequelize.STRING(128),
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING(512),
        defaultValue: null
      },
      sectionColour: {
        allowNull: false,
        type: Sequelize.STRING(10),
        defaultValue: '#fff'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
      },
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sections');
  }
};
