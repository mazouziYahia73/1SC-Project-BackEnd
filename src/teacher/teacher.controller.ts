import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { My_Helper } from 'src/MY-HELPER-CLASS';
import { CreateTeacherDto } from './dtos/create-teacher-dto';
import { TeacherService } from './teacher.service';
import * as bcrypt from 'bcrypt';
import { LoginTeacherDto } from './dtos/teacher-login.dto';
import { UpdateTeacherDto } from './dtos/update-teacher.dto';

@Controller('teacher')
export class TeacherController {


    constructor ( private teacherService : TeacherService)
    {

     }
    @Post('/create')
    async create( @Body() teacherData : CreateTeacherDto) {         
      
        let hashedPassword = await bcrypt.hash(teacherData.password , 12);
        teacherData.password = hashedPassword;
        await this.teacherService.createTeacher(teacherData);

       return My_Helper.SUCCESS_RESPONSE('user Created with success ');
    }

    @Get('/all')
    async displayAllTeachers ( ) { 
        let teachers = await this.teacherService.getAllTeachers( )
        return My_Helper.SUCCESS_RESPONSE(teachers);
    }



    @Get('/:id')
    async findTeacherById ( @Param('id') teacherId : string) { 
        let teacher= await this.teacherService.findTeacherById( Number(teacherId));
        return My_Helper.SUCCESS_RESPONSE(teacher);
    }



    @Post('login')
    async login(@Body( ) body : LoginTeacherDto) {
    
        let teacher = await this.teacherService.TeacherLogin(body );
    return My_Helper.SUCCESS_RESPONSE(teacher);

    }



    @Patch('/update/:id') 
    async updateTeacher( @Param('id') teacherId : number, @Body() body : UpdateTeacherDto) {
        let updatedAdmin = await this.teacherService.updateTeacher(teacherId,body);
        return My_Helper.SUCCESS_RESPONSE('teacher information updated with success')
     }


     @Delete('/delete/:id')
     async removeTeacher( @Param('id') id : number ) {
         await this.teacherService.removeTeacher(id);
         return My_Helper.SUCCESS_RESPONSE('teacher has been removed with success !')
     }


}
