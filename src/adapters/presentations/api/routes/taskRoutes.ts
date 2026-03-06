import { Router } from "express";
import { expressRouteAdapter } from "../../../expressRouteAdapter";
import { taskControllerFactory } from "../../../factories/addTaskControllerFactory";
import { deleteTaskControllerFactory } from "../../../factories/deleteTaskControllerFactory";

export default (router: Router): void => {
    router
        .post("/tasks", expressRouteAdapter(taskControllerFactory()))
        .delete("/tasks", expressRouteAdapter(deleteTaskControllerFactory()));
};
