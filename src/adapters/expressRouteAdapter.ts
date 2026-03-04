import { Controller } from "./interfaces/controller";
import { Request, Response } from "express";

export const expressRouteAdapter = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const httpRequest = {
            body: req.body
        };
        const httpReponse = await controller.handle(httpRequest);

        if (httpReponse.statusCode == 201) {
            res.status(httpReponse.statusCode).json(httpReponse.body);
        } else {
            res.status(httpReponse.statusCode).json({
                error: httpReponse.body.message
            });
        }
    };
};
