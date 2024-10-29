import type { IService, IServiceRequest, IServiceResponse } from "../IService";

export interface IGetTaskByUserIdService
    extends IService<
        IGetTaskByUserIdServiceRequest,
        IGetTaskByUserIdServiceResponse,
        IGetTaskByUserIdServiceDataResponseData
    > {}

export interface IGetTaskByUserIdServiceRequest extends IServiceRequest {
    Id: string;
}

export interface IGetTaskByUserIdServiceResponse
    extends IServiceResponse<IGetTaskByUserIdServiceDataResponseData> {}

export interface IGetTaskByUserIdServiceDataResponseData {
    TaskInfo: ITaskInfo[];
}

export interface ITaskInfo {
    Id: string;
    Name: string;
    Status: number;
    CreatedAt?: Date;
    UpdatedAt?: Date;
}
