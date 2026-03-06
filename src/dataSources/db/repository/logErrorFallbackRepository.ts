import { LogErrorRepository } from "../../../usecases/repository/logErrorRepository";

export class LogErrorFallbackRepository implements LogErrorRepository {
    constructor(
    private readonly primary: LogErrorRepository,   // Mongo
    private readonly fallback: LogErrorRepository   // File
    ) {}

    async log(stack: string): Promise<void> {
        try {
            await this.primary.log(stack);
        } catch (error) {
            await this.fallback.log(stack);
        }
    }
}
