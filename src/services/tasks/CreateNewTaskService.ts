import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import type {
    ICreateNewTaskService,
    ICreateNewTaskServiceRequest,
    ICreateNewTaskServiceResponse,
    ICreateNewTaskServiceDataResponseData,
} from "src/core/tasks/ICreateNewTaskService";
import { v4 as uuidv4 } from "uuid";
import { TaskRepository } from "src/repositories/task.repository";
import { UserValidations } from "src/services/auth/UserValidations";
import { Task } from "src/models/task.schema";

@Injectable()
export class CreateNewTaskService implements ICreateNewTaskService {
    public constructor(
        private readonly taskValidations: UserValidations,
        private readonly taskModel: TaskRepository,
    ) {}

    public ExecuteAsync = async (
        request: ICreateNewTaskServiceRequest,
    ): Promise<ICreateNewTaskServiceResponse> => {
        const validations = await this.ValidateAsync(request);
        if (validations.length > 0) {
            return new CreateNewTaskServiceResponse({
                Message: "Validation error",
                Errors: validations,
                Success: false,
            });
        }

        const id = uuidv4();
        const initialStatus: number = 1;

        const taskInstance = new Task({
            id: id,
            name: request.Name,
            status: initialStatus,
            userId: request.UserId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await this.taskModel.Create(taskInstance);

        return new CreateNewTaskServiceResponse({
            Message: "User created",
            Errors: undefined,
            Success: true,
        });
    };

    public ValidateAsync = async (request: ICreateNewTaskServiceRequest): Promise<string[]> => {
        const errors: string[] = [];

        return errors;
    };
}

export class CreateNewTaskServiceRequest implements ICreateNewTaskServiceRequest {
    @ApiProperty()
    public UserId!: string;
    @ApiProperty()
    public Name!: string;
}

export class CreateNewTaskServiceDataResponseData implements ICreateNewTaskServiceDataResponseData {
    public Message!: string;
}

export class CreateNewTaskServiceResponse implements ICreateNewTaskServiceResponse {
    public Message?: string;
    public Errors?: string[];
    public Success!: boolean;
    public Data?: CreateNewTaskServiceDataResponseData;

    public constructor(data: ICreateNewTaskServiceResponse) {
        this.Message = data.Message;
        this.Errors = data.Errors;
        this.Success = data.Success;
        this.Data = data.Data;
    }
}
