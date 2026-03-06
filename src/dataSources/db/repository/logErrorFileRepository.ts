import fs from "fs";
import path from "path";
import { LogErrorRepository } from "../../../usecases/repository/logErrorRepository";

export class LogErrorFileRepository implements LogErrorRepository {
    private readonly logPath = path.join(__dirname, "../../../../logs/error.log");

    async log(stack: string): Promise<void> {
        const line = `[${new Date().toISOString()}] ${stack}\n`;

        try {
            fs.appendFileSync(this.logPath, line);
        } catch (err) {
            console.error("Falha ao gravar log em arquivo:", err);
            console.error("Log original:", stack);
        }
    }
}