import { Task } from "../../../entities/task";
import { AddATaskModel } from "../../../usecases/addTask";
import { AddTaskRepository } from "../../../usecases/repository/addTaskRepository";
import { MongoManager } from "../../config/mongoManager";

export class TaskMongoRepository implements AddTaskRepository {
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
}
