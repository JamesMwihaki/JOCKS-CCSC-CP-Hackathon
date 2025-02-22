import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemoController } from './demo/demo.controller';
import { DemoService } from './demo/demo.service';
import { Demo } from './demo/demo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'database',
      entities: [Demo],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Demo])
  ],
  controllers: [DemoController],
  providers: [DemoService],
})
export class AppModule {}
