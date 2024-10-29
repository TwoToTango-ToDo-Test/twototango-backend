import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import type {
    IGetTaskByUserIdService,
    IGetTaskByUserIdServiceRequest,
    IGetTaskByUserIdServiceResponse,
    IGetTaskByUserIdServiceDataResponseData,
    ITaskInfo,
} from "src/core/tasks/IGetTaskByIdService";
import { TaskRepository } from "src/repositories/task.repository";
import { UserValidations } from "src/services/auth/UserValidations";

@Injectable()
export class GetTaskByUserIdService implements IGetTaskByUserIdService {
    public constructor(
        private readonly taskModel: TaskRepository,
        private readonly userValidations: UserValidations,
    ) {}

    public ExecuteAsync = async (
        request: IGetTaskByUserIdServiceRequest,
    ): Promise<IGetTaskByUserIdServiceResponse> => {
        const validations = await this.ValidateAsync(request);
        if (validations.length > 0) {
            return new GetTaskByUserIdServiceResponse({
                Message: "Validation error",
                Errors: validations,
                Success: false,
            });
        }

        const task = await this.taskModel.GetById(request.Id);

        const taskInfo: ITaskInfo[] = [
            {
                Id: task.id.toString(),
                Name: task.name,
                Status: task.status as unknown as number,
                CreatedAt: task.createdAt,
                UpdatedAt: task.updatedAt,
            },
        ];

        return new GetTaskByUserIdServiceResponse({
            Message: "User created",
            Errors: undefined,
            Success: true,
            Data: { TaskInfo: taskInfo },
        });
    };

    public ValidateAsync = async (request: IGetTaskByUserIdServiceRequest): Promise<string[]> => {
        const errors: string[] = [];

        const task = await this.taskModel.GetById(request.Id);

        if (!request.Id) {
            errors.push("Id is required");
        }
        if (!task) {
            errors.push("Task not found");
        }

        return errors;
    };
}

export class GetTaskByUserIdServiceRequest implements IGetTaskByUserIdServiceRequest {
    @ApiProperty()
    public Id!: string;
}

export class GetTaskByUserIdServiceDataResponseData
    implements IGetTaskByUserIdServiceDataResponseData
{
    public TaskInfo!: ITaskInfo[];
}

export class GetTaskByUserIdServiceResponse implements IGetTaskByUserIdServiceResponse {
    public Message?: string;
    public Errors?: string[];
    public Success!: boolean;
    public Data?: GetTaskByUserIdServiceDataResponseData;

    public constructor(data: IGetTaskByUserIdServiceResponse) {
        this.Message = data.Message;
        this.Errors = data.Errors;
        this.Success = data.Success;
        this.Data = data.Data;
    }
}
