import { Module } from "@nestjs/common";

import { AuthControllers } from "src/controllers/auth.controller";
import { UserRepository } from "src/repositories/user.repository";

import { CreateUserService } from "src/services/auth/CreateUserService";
import { LoginService } from "src/services/auth/LoginService";
import { TaskModule } from "./task.module";
import { TaskRepository } from "src/repositories/task.repository";

@Module({
    imports: [TaskModule],
    controllers: [AuthControllers],
    providers: [CreateUserService, LoginService, UserRepository, TaskRepository, UserRepository],
    exports: [UserRepository],
})
export class AuthModule {}
