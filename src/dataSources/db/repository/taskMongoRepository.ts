import { ObjectId } from "mongodb";
import { Task } from "../../../entities/task";
import { AddATaskModel } from "../../../usecases/addTask";
import { AddTaskRepository } from "../../../usecases/repository/addTaskRepository";
import { DeleteTaskRepository } from "../../../usecases/repository/deleteTaskRepository";
import { MongoManager } from "../../config/mongoManager";
import { InvalidParamError } from "../../../adapters/presentations/api/errors/invalid-param-error";
import { NotFoundError } from "../../../adapters/presentations/api/errors/not-found-error";

export class TaskMongoRepository implements AddTaskRepository, DeleteTaskRepository {
    async add(taskData: AddATaskModel): Promise<Task> {
        const taskCollection = MongoManager.getInstance().getCollection("tasks");
        const {acknowledged, insertedId} = await taskCollection.insertOne(taskData);
        if (!acknowledged) {
            throw new Error("Failed to insert task");
        }
        const insertedTask = await taskCollection.findOne({_id: insertedId});
        if (!insertedTask) {
            throw new Error("Failed to retrieve inserted task");
        }
        const task: Task = {
            id: insertedTask._id.toHexString(),
            title: insertedTask.title,
            description: insertedTask.description,
            date: insertedTask.date
        };
        return task;
    }
    
    async delete(taskData: { id: string }): Promise<void | Error> {
        const taskCollection = MongoManager.getInstance().getCollection("tasks");
        
        if (!ObjectId.isValid(taskData.id)) {
            return new InvalidParamError(taskData.id);
        }
        const { deletedCount } = await taskCollection.deleteOne({
            _id: new ObjectId(taskData.id),
        });
        if (!deletedCount) {
            return new NotFoundError("task");
        }
    }
}