import { LogErrorFallbackRepository } from "../../dataSources/db/repository/logErrorFallbackRepository";
import { LogErrorFileRepository } from "../../dataSources/db/repository/logErrorFileRepository";
import { LogErrorMongoRepository } from "../../dataSources/db/repository/logErrorMongoRepository";
import { LogErrorRepository } from "../../usecases/repository/logErrorRepository";

export const makeLogErrorRepository = (): LogErrorRepository => {
    const mongoRepo = new LogErrorMongoRepository();
    const fileRepo = new LogErrorFileRepository();

    return new LogErrorFallbackRepository(mongoRepo, fileRepo);
};