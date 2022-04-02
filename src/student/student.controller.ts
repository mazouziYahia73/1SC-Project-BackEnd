import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { My_Helper } from 'src/MY-HELPER-CLASS';
import { CreateStudentDto } from './dtos/createStudent.dto';
import { LoginStudentDto } from './dtos/student-login.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';
import { StudentService } from './student.service';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { UsersEnum } from 'src/Enums';
import { join } from 'path';

@Controller('student')
export class StudentController {

constructor( private studentService : StudentService){}


@Post('/create')
async createNewStudent( @Body() createStudentDto : CreateStudentDto) {
     let newStudent = await this.studentService.create(createStudentDto);
     return My_Helper.SUCCESS_RESPONSE(newStudent); 
}


@Post('/login')
async login(@Body() body : LoginStudentDto) { 
     return My_Helper.SUCCESS_RESPONSE( await this.studentService.studentLogin(body) );
}

@Patch('/update/:studentId')
async update(  @Param('studentId') id : number,  @Body() body : UpdateStudentDto) {
     let student = await this.studentService.updateStudent(id , body);
 return My_Helper.SUCCESS_RESPONSE( student );

}





@Delete('/:id')
async deleteStudent (@Param('id') studentId : number) {
     await this.studentService.deleteStudent(studentId);
     return My_Helper.SUCCESS_RESPONSE('student removed with success ');
}


@Get('/all')
async getAllStudents ( ) { 
     return My_Helper.SUCCESS_RESPONSE( await this.studentService.allStudents() );
     
}


@Get('/:id')
async getStudentById (@Param('id') studentId ) { 
     return My_Helper.SUCCESS_RESPONSE( await this.studentService.findStudentById(studentId));
}


@Post('/updateProfileImage/:id')
@UseInterceptors(FileInterceptor('image' , {
storage : diskStorage({
     destination : My_Helper.getUploadPath(UsersEnum.Student) , 
     filename : (req ,file , cb )=>{

         const fileName : string = path.parse(file.originalname).name.replace(/\s/g ,'') + uuidv4()
         const extinction : string = path.parse(file.originalname).ext;

         
          
          cb(null ,`${fileName}${extinction}`)   
     }
})
}))
async updateProfileImage (@Param('id') studentId : number,  @UploadedFile() file : Express.Multer.File) { 
    return await this.studentService.updateStudent(studentId ,{profileImage : file.filename })
}


@Get('/profile-images/:imageName')
async getProfileImage( @Param('imageName') image_profile : string , @Res() res) { 
     await this.studentService.getProfileImage(res , image_profile);
}


}
