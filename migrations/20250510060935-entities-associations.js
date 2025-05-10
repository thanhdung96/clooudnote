'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('pages', 'sectionId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'sections',
        key: 'id',
      },
    });

    await queryInterface.addColumn('sections', 'notebookId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'notebooks',
        key: 'id',
      },
    });

    await queryInterface.addColumn('notebooks', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    });

    await queryInterface.addColumn('tags', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('pages', 'sectionId');
    await queryInterface.removeColumn('sections', 'notebookId');
    await queryInterface.removeColumn('notebooks', 'userId');
    await queryInterface.removeColumn('tags', 'userId');
  },
};
