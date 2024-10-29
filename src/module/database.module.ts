import { Module } from "@nestjs/common";
import { Sequelize } from "sequelize-typescript";
import { User } from "src/models/user.schema";
import { Task } from "src/models/task.schema";
import { Status } from "src/models/status.schema";

export const databaseProviders = [
    {
        provide: "SEQUELIZE",
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: "mysql",
                host: "twototango-mysql",
                port: 3306,
                username: "testnode",
                password: "testnode",
                database: "testdb",
            });
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            sequelize.addModels([User, Task, Status]);
            await sequelize.sync();
            return sequelize;
        },
    },
];

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
