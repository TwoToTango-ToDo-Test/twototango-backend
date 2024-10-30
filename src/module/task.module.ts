import { Module } from "@nestjs/common";

import { TaskControllers } from "src/controllers/task.controller";
import { GetAllTaskService } from "src/services/tasks/GetAllTaskService";
import { GetTaskByUserIdService } from "src/services/tasks/GetTaskByUserIdService";
import { UpdateTaskService } from "src/services/tasks/UpdateTaskService";
import { TaskRepository } from "src/repositories/task.repository";

import { JwtModule } from "@nestjs/jwt";
import { UserValidations } from "src/services/auth/UserValidations";
import { UserRepository } from "src/repositories/user.repository";
import { CreateNewTaskService } from "src/services/tasks/CreateNewTaskService";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: "nodetest",
            signOptions: { expiresIn: "3600s" },
        }),
        UserValidations,
    ],
    controllers: [TaskControllers],
    providers: [
        GetAllTaskService,
        GetTaskByUserIdService,
        UpdateTaskService,
        CreateNewTaskService,
        UserValidations,
        UserRepository,
        TaskRepository,
    ],
    exports: [TaskRepository, UserValidations, UserRepository],
})
export class TaskModule {}
