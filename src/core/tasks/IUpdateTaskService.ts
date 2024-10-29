import type { IService, IServiceRequest, IServiceResponse } from "../IService";

export interface IUpdateTaskService
    extends IService<
        IUpdateTaskServiceRequest,
        IUpdateTaskServiceResponse,
        IUpdateTaskServiceDataResponseData
    > {}

export interface IUpdateTaskServiceRequest extends IServiceRequest {
    Id: string;
    Name: string;
    Status: number;
}

export interface IUpdateTaskServiceResponse
    extends IServiceResponse<IUpdateTaskServiceDataResponseData> {}

export interface IUpdateTaskServiceDataResponseData {}
