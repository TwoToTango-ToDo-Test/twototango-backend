import { Injectable } from "@nestjs/common";
import type {
    IGetAllTaskService,
    IGetAllTaskServiceRequest,
    IGetAllTaskServiceResponse,
    IGetAllTaskServiceDataResponseData,
    ITasksInfo,
} from "src/core/tasks/IGetAllTaskService";
import { UserValidations } from "../auth/UserValidations";
import { TaskRepository } from "src/repositories/task.repository";

@Injectable()
export class GetAllTaskService implements IGetAllTaskService {
    public constructor(
        private readonly taskValidations: UserValidations,
        private readonly taskModel: TaskRepository,
    ) {}

    public ExecuteAsync = async (): Promise<IGetAllTaskServiceResponse> => {
        const validations = await this.ValidateAsync();
        if (validations.length > 0) {
            return new GetAllTaskServiceResponse({
                Message: "Validation error",
                Errors: validations,
                Success: false,
            });
        }

        const tasks = await this.taskModel.GetAll();

        const taskInfo: ITasksInfo[] = tasks.map((task) => {
            return {
                Id: task.id.toString(),
                Name: task.name,
                Status: task.status as unknown as number,
                CreatedAt: task.createdAt,
                UpdatedAt: task.updatedAt,
            };
        });

        return new GetAllTaskServiceResponse({
            Message: "Task created",
            Errors: undefined,
            Success: true,
            Data: { TaskInfo: taskInfo },
        });
    };

    public ValidateAsync = async (): Promise<string[]> => {
        const errors: string[] = [];

        const tasks = await this.taskModel.GetAll();

        if (tasks.length === 0) {
            errors.push("No tasks found");
        }

        return errors;
    };
}

export class GetAllTaskServiceRequest implements IGetAllTaskServiceRequest {}

export class GetAllTaskServiceDataResponseData implements IGetAllTaskServiceDataResponseData {
    public TaskInfo!: ITasksInfo[];
}

export class GetAllTaskServiceResponse implements IGetAllTaskServiceResponse {
    public Message?: string;
    public Errors?: string[];
    public Success!: boolean;
    public Data?: GetAllTaskServiceDataResponseData;

    public constructor(data: IGetAllTaskServiceResponse) {
        this.Message = data.Message;
        this.Errors = data.Errors;
        this.Success = data.Success;
        this.Data = data.Data;
    }
}
