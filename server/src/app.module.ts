import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingsController } from './Buildings/buildings.controller';
import { BuildingsService } from './Buildings/buildings.service';
import { Buildings } from './Buildings/buildings.entity';
import { Rooms } from './Rooms/rooms.entity';
import { RoomsContoller } from './Rooms/rooms.controller';
import { RoomsService } from './Rooms/rooms.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'database',
      entities: [Buildings, Rooms],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Buildings, Rooms])
  ],
  controllers: [BuildingsController, BuildingsService],
  providers: [RoomsContoller, RoomsService]

})
export class AppModule {}
