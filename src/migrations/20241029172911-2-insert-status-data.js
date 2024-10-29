/* eslint-disable @typescript-eslint/naming-convention */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Status",
            [
                { id: 1, name: "pendiente", createdAt: new Date(), updatedAt: new Date() },
                { id: 2, name: "en progreso", createdAt: new Date(), updatedAt: new Date() },
                { id: 3, name: "completada", createdAt: new Date(), updatedAt: new Date() },
            ],
            {},
        );
    },

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Status", null, {});
    },
};
