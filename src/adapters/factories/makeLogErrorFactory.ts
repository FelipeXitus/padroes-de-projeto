import { LogErrorFallbackRepository, LogErrorFileRepository, LogErrorMongoRepository } from "../../dataSources/index";
import { LogErrorRepository } from "../../usecases/repository/logErrorRepository";

export const makeLogErrorRepository = (): LogErrorRepository => {
    const mongoRepo = new LogErrorMongoRepository();
    const fileRepo = new LogErrorFileRepository();

    return new LogErrorFallbackRepository(mongoRepo, fileRepo);
};