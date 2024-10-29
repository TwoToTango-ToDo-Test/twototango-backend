import { Injectable } from "@nestjs/common";
import { Task } from "src/models/task.schema";
import { Status } from "src/models/status.schema";
import type { Repository } from "./repository";

@Injectable()
export class TaskRepository implements Repository<Task> {
    public constructor() {
    }

    public Create = async (task: Task): Promise<Task> => {
        return await task.save();
    };

    public Update = async (task: Task): Promise<Task> => {
        return await task.save();
    };

    public Delete = async (task: Task): Promise<Task> => {
        const userToDelete = await Task.findByPk(task.id);
        if (!userToDelete) {
            throw new Error(`Task with id ${task.id} not found`);
        }
        await userToDelete.destroy();
        return userToDelete;
    };

    public GetAll = async (): Promise<Task[]> => {
        const tasks = await Task.findAll({
            include: [
                {
                    model: Status,
                    attributes: ["name"],
                },
            ],
        });

        return tasks;
    };

    public GetById = async (id: string): Promise<Task> => {
        const task = await Task.findByPk(id);
        if (!task) {
            throw new Error(`Task with id ${id} not found`);
        }
        return task;
    };

    public GetByName = async (name: string): Promise<Task> => {
        const task = await Task.findOne({ where: { name } });
        if (!task) {
            throw new Error(`Task with email ${name} not found`);
        }
        return task;
    };
}
