import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { MembershipsModule } from "./memberships/memberships.module";
import { UserMembershipsModule } from "./user-memberships/user-memberships.module";
import { UsersModule } from "./users/users.module";

@Module({
    controllers: [AppController],
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env",
            isGlobal: true,
        }),
        DatabaseModule,
        UsersModule,
        MembershipsModule,
        UserMembershipsModule,
    ],
    providers: [AppService],
})
export class AppModule {}
