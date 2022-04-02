import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../module/student.entity';

@Module({
  providers: [StudentService],
  controllers: [StudentController] , 
  imports : [TypeOrmModule.forFeature([Student]) ]
})
export class StudentModule {}
