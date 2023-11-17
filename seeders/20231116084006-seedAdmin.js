'use strict';

const { hash } = require('../helper/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let dataAdmin = require('../data/admin.json').map((el) => {
      el.password = hash(el.password),
      el.role = 'admin',
      el.createdAt = new Date()
      el.updatedAt = new Date()
  
      return el
     })
  
     await queryInterface.bulkInsert('Admins', dataAdmin, null)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Admin', null, null)
  }
};
