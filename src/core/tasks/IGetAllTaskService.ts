import type { IService, IServiceRequest, IServiceResponse } from "../IService";

export interface IGetAllTaskService
    extends IService<
        IGetAllTaskServiceRequest,
        IGetAllTaskServiceResponse,
        IGetAllTaskServiceDataResponseData
    > {}

export interface IGetAllTaskServiceRequest extends IServiceRequest {}

export interface IGetAllTaskServiceResponse
    extends IServiceResponse<IGetAllTaskServiceDataResponseData> {}

export interface IGetAllTaskServiceDataResponseData {
    TaskInfo: ITasksInfo[];
}

export interface ITasksInfo {
    Id: string;
    Name: string;
    Status: number;
    CreatedOn?: Date;
    UpdatedOn?: Date;
}
