import { DateValidatorAdapter } from "../dateValidatorAdapter";
import { AddTaskController } from "../controllers/task/addTask";
import { DbAddTask } from "../../dataSources/db/dbAddTask";
import { TaskMongoRepository } from "../../dataSources/db/repository/taskMongoRepository";

export const taskControllerFactory = () => {
    const dateValidatorAdapter = new DateValidatorAdapter();
    const taskMongoRepository = new TaskMongoRepository();
    const dbAddTask = new DbAddTask(taskMongoRepository);
    return new AddTaskController(dbAddTask, dateValidatorAdapter);
};

