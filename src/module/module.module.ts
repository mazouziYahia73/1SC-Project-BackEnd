import { Module } from '@nestjs/common';
import { Module as ModuleEntity } from './module.entity';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ModuleService],
  controllers: [ModuleController] ,
  imports : [TypeOrmModule.forFeature([ModuleEntity])]
})
export class ModuleModule {}
