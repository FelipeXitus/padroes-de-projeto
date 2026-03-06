import { AddTaskController } from "../controllers/task/addTask";
import { DbAddTask } from "../../dataSources/db/dbAddTask";
import { TaskMongoRepository } from "../../dataSources/db/repository/taskMongoRepository";
import { LogErrorControllerDecorator } from "../decorators/logErrorControllerDecorator";
import { LogErrorMongoRepository } from "../../dataSources/db/repository/logErrorMongoRepository";
import { addTaskValidationCompositeFactory } from "./addTaskValidationCompositeFactory";

export const taskControllerFactory = () => {
    const taskMongoRepository = new TaskMongoRepository();
    const dbAddTask = new DbAddTask(taskMongoRepository);
    const taskController = new AddTaskController(dbAddTask, addTaskValidationCompositeFactory());
    const logErrorMongoRepository = new LogErrorMongoRepository();
    return new LogErrorControllerDecorator(taskController, logErrorMongoRepository);
};
