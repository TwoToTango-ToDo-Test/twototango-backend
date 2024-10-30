import {
    Get,
    Controller,
    BadRequestException,
    UseGuards,
    Param,
    Body,
    Patch,
    Post,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from "@nestjs/swagger";

import { AuthGuard } from "src/services/auth/auth.guard";
import { CreateNewTaskService, CreateNewTaskServiceRequest, CreateNewTaskServiceResponse } from "src/services/tasks/CreateNewTaskService";
import { GetAllTaskService } from "src/services/tasks/GetAllTaskService";
import type {
    GetAllTaskServiceRequest,
    GetAllTaskServiceResponse,
} from "src/services/tasks/GetAllTaskService";

import { GetTaskByUserIdService } from "src/services/tasks/GetTaskByUserIdService";
import type {
    GetTaskByUserIdServiceResponse,
    GetTaskByUserIdServiceRequest,
} from "src/services/tasks/GetTaskByUserIdService";

import { UpdateTaskService, UpdateTaskServiceRequest } from "src/services/tasks/UpdateTaskService";
import type { UpdateTaskServiceResponse } from "src/services/tasks/UpdateTaskService";

@ApiTags("task")
@Controller("task")
export class TaskControllers {
    public constructor(
        private readonly getAllTaskService: GetAllTaskService,
        private readonly getTaskByIdService: GetTaskByUserIdService,
        private readonly updateTaskService: UpdateTaskService,
        private readonly createNewTaskService: CreateNewTaskService,
    ) {}

    @UseGuards(AuthGuard)
    @Get("getAllByUserId/:id")
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get all tasks" })
    public async getAllByUser(@Param("id") id: string): Promise<GetAllTaskServiceResponse> {
        const request: GetAllTaskServiceRequest = { Id: id };
        const task = await this.getAllTaskService.ExecuteAsync(request);
        if (!task.Success) {
            throw new BadRequestException(task);
        }

        return task;
    }

    @UseGuards(AuthGuard)
    @Get("getByTaskId/:id")
    @ApiBearerAuth()
    public async GetByIdAsync(@Param("id") id: string): Promise<GetTaskByUserIdServiceResponse> {
        const request: GetTaskByUserIdServiceRequest = { Id: id };
        const task = await this.getTaskByIdService.ExecuteAsync(request);
        if (!task.Success) {
            throw new BadRequestException(task);
        }

        return task;
    }

    @UseGuards(AuthGuard)
    @Patch("updateTask")
    @ApiBearerAuth()
    @ApiBody({ type: UpdateTaskServiceRequest })
    public async UpdateTaskAsync(
        @Body() request: UpdateTaskServiceRequest,
    ): Promise<UpdateTaskServiceResponse> {
        const task = await this.updateTaskService.ExecuteAsync(request);
        if (!task.Success) {
            throw new BadRequestException(task);
        }

        return task;
    }

    @UseGuards(AuthGuard)
    @Post("createTask")
    @ApiBearerAuth()
    @ApiBody({ type: CreateNewTaskServiceRequest })
    public async CreateTaskAsync(
        @Body() request: CreateNewTaskServiceRequest,
    ): Promise<CreateNewTaskServiceResponse> {
        const task = await this.createNewTaskService.ExecuteAsync(request);
        if (!task.Success) {
            throw new BadRequestException(task);
        }

        return task;
    }
}
