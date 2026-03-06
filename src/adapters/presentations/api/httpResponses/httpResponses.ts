import { HttpResponse } from "../../../interfaces/http";
import { ServerError } from "../errors/server-error";
// import { UnauthorizedError } from "../errors/unauthorized-error";
import { makeLogErrorRepository } from "../../../factories/makeLogErrorFactory";

const logErrorRepository = makeLogErrorRepository();

export const badRequest = (error: Error): HttpResponse => {
    logErrorRepository.log(error.stack as string);
    return {
        statusCode: 400,
        body: error,
    };
};

export const serverError = (error: Error): HttpResponse => {
    logErrorRepository.log(error.stack as string);
    return {
        statusCode: 500,
        body: new ServerError(error.stack as string),
    };
};

export const created = (data: any): HttpResponse => ({
    statusCode: 201,
    body: data,
});
export const noContent = (): HttpResponse => ({
    statusCode: 204,
});
