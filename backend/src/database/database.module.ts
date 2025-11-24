import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                autoLoadEntities: true,
                database: configService.get("POSTGRES_DB", "barcommun_db"),
                host: configService.get("POSTGRES_HOST", "localhost"),
                logging: configService.get("NODE_ENV") === "development",
                password: configService.get("POSTGRES_PASSWORD", "postgres"),
                port: configService.get<number>("POSTGRES_PORT", 5432),
                synchronize: configService.get("NODE_ENV") !== "production",
                type: "postgres",
                username: configService.get("POSTGRES_USER", "postgres"),
            }),
        }),
    ],
})
export class DatabaseModule {}
