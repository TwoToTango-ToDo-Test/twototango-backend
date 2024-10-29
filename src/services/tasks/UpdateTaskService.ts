import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import type {
    IUpdateTaskService,
    IUpdateTaskServiceRequest,
    IUpdateTaskServiceResponse,
    IUpdateTaskServiceDataResponseData,
} from "src/core/tasks/IUpdateTaskService";
import { TaskRepository } from "src/repositories/task.repository";

@Injectable()
export class UpdateTaskService implements IUpdateTaskService {
    public constructor(private readonly taskModel: TaskRepository) {}

    public ExecuteAsync = async (
        request: IUpdateTaskServiceRequest,
    ): Promise<IUpdateTaskServiceResponse> => {
        const validations = await this.ValidateAsync(request);
        if (validations.length > 0) {
            return new UpdateTaskServiceResponse({
                Message: "Validation error",
                Errors: validations,
                Success: false,
            });
        }

        const task = await this.taskModel.GetById(request.Id);

        task.name = request.Name;

        task.status = request.Status;
        task.updatedAt = new Date();

        await this.taskModel.Update(task);

        return new UpdateTaskServiceResponse({
            Message: "User information updated",
            Errors: undefined,
            Success: true,
        });
    };

    public ValidateAsync = async (request: IUpdateTaskServiceRequest): Promise<string[]> => {
        const errors: string[] = [];

        if (!request.Name) {
            errors.push("Name is required");
        }
        if (!request.Status) {
            errors.push("Status is required");
        }

        return errors;
    };
}

export class UpdateTaskServiceRequest implements IUpdateTaskServiceRequest {
    @ApiProperty()
    public Id!: string;
    @ApiProperty()
    public Name!: string;
    @ApiProperty()
    public Status!: number;
}

export class UpdateTaskServiceDataResponseData implements IUpdateTaskServiceDataResponseData {}

export class UpdateTaskServiceResponse implements IUpdateTaskServiceResponse {
    public Message?: string;
    public Errors?: string[];
    public Success!: boolean;
    public Data?: UpdateTaskServiceDataResponseData;

    public constructor(data: IUpdateTaskServiceResponse) {
        this.Message = data.Message;
        this.Errors = data.Errors;
        this.Success = data.Success;
    }
}
