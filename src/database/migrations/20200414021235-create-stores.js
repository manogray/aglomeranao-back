'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('stores', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      people_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      grade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 5  
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('stores');
  }
};
