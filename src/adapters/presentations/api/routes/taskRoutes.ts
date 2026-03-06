import { Router } from "express";
import { expressRouteAdapter } from "../../../expressRouteAdapter";
import { taskControllerFactory, deleteTaskControllerFactory } from "../../../factories/index";

export default (router: Router): void => {
    router
        .post("/tasks", expressRouteAdapter(taskControllerFactory()))
        .delete("/tasks", expressRouteAdapter(deleteTaskControllerFactory()));
};
