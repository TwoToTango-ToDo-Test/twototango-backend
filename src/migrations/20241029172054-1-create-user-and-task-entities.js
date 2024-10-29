"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/naming-convention
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });

        await queryInterface.createTable("Status", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });

        await queryInterface.createTable("Tasks", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            Status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Status",
                    key: "id",
                },
            },
            userId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });
    },

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Tasks");
        await queryInterface.dropTable("Status");
        await queryInterface.dropTable("Users");
    },
};
