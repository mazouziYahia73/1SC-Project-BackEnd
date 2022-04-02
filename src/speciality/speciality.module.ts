import { Module } from '@nestjs/common';
import { SpecialityService } from './speciality.service';
import { SpecialityController } from './speciality.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Speciality } from './entities/speciality.entity';
import { Batch } from 'src/batch/entities/batch.entity';

@Module({
  controllers: [SpecialityController],
  providers: [SpecialityService] , 
  imports : [TypeOrmModule.forFeature([Speciality , Batch])]
})
export class SpecialityModule {}
