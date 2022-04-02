import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';

@Module({
  controllers: [LevelController],
  providers: [LevelService] , 
  exports : [ LevelService], 
  imports : [TypeOrmModule.forFeature([Level])]
})
export class LevelModule {}
