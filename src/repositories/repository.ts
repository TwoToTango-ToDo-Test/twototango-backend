import type { IRepository } from "src/core/IRepository";

export abstract class Repository<T> implements IRepository<T> {
    public abstract Create(model: T): Promise<T>;
    public abstract Update(model: T): Promise<T>;
    public abstract Delete(model: T): Promise<T>;
    public abstract GetAll(): Promise<T[]>;
    public abstract GetById(id: string): Promise<T>;
}
