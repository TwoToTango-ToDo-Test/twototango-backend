import type { IService, IServiceRequest, IServiceResponse } from "../IService";

export interface ICreateNewTaskService
    extends IService<
        ICreateNewTaskServiceRequest,
        ICreateNewTaskServiceResponse,
        ICreateNewTaskServiceDataResponseData
    > {}

export interface ICreateNewTaskServiceRequest extends IServiceRequest {
    UserId: string;
    Name: string;
}

export interface ICreateNewTaskServiceResponse
    extends IServiceResponse<ICreateNewTaskServiceDataResponseData> {}

export interface ICreateNewTaskServiceDataResponseData {
    Message: string;
}
