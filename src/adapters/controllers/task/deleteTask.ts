import { DeleteTask } from "../../../usecases/deleteTask";
import { Controller,  HttpRequest, HttpResponse, Validation } from "../../interfaces/index";
import { badRequest, noContent, serverError } from "../../presentations/api/httpResponses/httpResponses";

export class DeleteTaskController implements Controller {
    constructor(private readonly deleteTask: DeleteTask, private readonly validation: Validation) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.body;
            const error = this.validation.validate({ id });
            if (error) {
                return badRequest(error);
            }
            await this.deleteTask.delete({ id });
            return noContent();
        }  catch (error: any) {
            return serverError(error);
        }
    }   
}