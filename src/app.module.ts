import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { HealthController } from './common/health/health.controller';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, TodoModule],
  controllers: [HealthController],
})
export class AppModule {}
