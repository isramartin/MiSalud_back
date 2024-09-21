import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());

  const configService = app.get(ConfigService);
  const apiVersion = configService.get<string>('API_VERSION') || 'v1';
   // Configura el prefijo global
   app.setGlobalPrefix(apiVersion);
 
   app.enableCors();
  await app.listen(3000);
}
bootstrap();
