import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    const apiPath = "api";
    app.setGlobalPrefix(apiPath);

    const config = new DocumentBuilder()
        .setTitle("TwoToTango Test API")
        .setDescription("API for test Node.js")
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config, {
        include: [AppModule, UserModule, AuthModule, DatabaseModule],
    });
    SwaggerModule.setup(`${apiPath}/swagger`, app, document);

    await app.listen(5500);
}
void bootstrap();
