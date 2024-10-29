import { Module } from "@nestjs/common";
import { AuthModule } from "src/module/auth.module";
import { DatabaseModule } from "src/module/database.module";
import { TaskModule } from "src/module/task.module";

@Module({
    imports: [TaskModule, AuthModule, DatabaseModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
