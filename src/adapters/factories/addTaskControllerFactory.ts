import { AddTaskController } from "../controllers/task/addTask";
import { DbAddTask, TaskMongoRepository, LogErrorMongoRepository } from "../../dataSources/index";
import { LogErrorControllerDecorator } from "../decorators/logErrorControllerDecorator";
import { addTaskValidationCompositeFactory } from "./addTaskValidationCompositeFactory";

export const taskControllerFactory = () => {
    const taskMongoRepository = new TaskMongoRepository();
    const dbAddTask = new DbAddTask(taskMongoRepository);
    const taskController = new AddTaskController(dbAddTask, addTaskValidationCompositeFactory());
    const logErrorMongoRepository = new LogErrorMongoRepository();
    return new LogErrorControllerDecorator(taskController, logErrorMongoRepository);
};
