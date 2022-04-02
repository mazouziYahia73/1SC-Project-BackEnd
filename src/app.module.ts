import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeacherModule } from './teacher/teacher.module';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { ModuleModule } from './module/module.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher/teacher.entity';
import { Admin } from './admin/admin.entity';
import { Module as ModuleEntity } from './module/module.entity';
import { Student } from './module/student.entity';
import { BatchModule } from './batch/batch.module';
import { Batch } from './batch/entities/batch.entity';
import { LevelModule } from './level/level.module';
import { Level } from './level/entities/level.entity';
import { SpecialityModule } from './speciality/speciality.module';
import { Speciality } from './speciality/entities/speciality.entity';
import { Section } from './section/entities/section.entity';



@Module({
  imports: [ TeacherModule, AdminModule, StudentModule, ModuleModule ,
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database:'test',
      autoLoadEntities: true,
      entities: [Teacher , Admin , ModuleEntity , Student  , Batch , Level , Speciality , Section],
      synchronize: true,
    }),
    
    BatchModule,
    
    LevelModule,
    
    SpecialityModule,  
   
  ], 
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule { 

}
