import { BadRequestException, HttpException, Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/module/student.entity';
import { Repository } from 'typeorm';
import { LoginStudentDto } from './dtos/student-login.dto';
import * as brcypt from 'bcrypt';
import { CreateStudentDto } from './dtos/createStudent.dto';
import { UsersEnum } from 'src/Enums';
import { My_Helper } from 'src/MY-HELPER-CLASS';
import path = require('path')
import { join } from 'path';
const fs = require('fs')

@Injectable()
export class StudentService {

    constructor ( @InjectRepository(Student) private studentRep : Repository<Student> ) { }
    private salt : number = 9;


    async create( createStudentDto : CreateStudentDto ) { 

     try {
       let HashedPassword = await brcypt.hash(createStudentDto.password , this.salt);
       delete createStudentDto.password;

       let student = await this.studentRep.create(createStudentDto);
       student.password = HashedPassword;
      
        await this.studentRep.save(student);
        
        return student;

     } catch (error) {
       
      throw (new HttpException({ success : false , 
      message : 'Email Exist' } , 201))

     }
    
    }



     async findStudentById ( idStudent : number ) {

        if (isNaN(idStudent)) {
          throw (( new HttpException({ 
            success : false , 
            message : 'Id must be an integer !'
        } , 201)));
        }

        let student;
        try { 
           student = await this.studentRep.findOne({ id : idStudent});
        }catch (e) {
             throw ( new HttpException( { success : false , 
            statusCode : 201 , 
            message : 'Something wrong !'
        } , 201))
         }


         if (!student)  throw (( new HttpException({ 
          success : false , 
          message : 'Student not found '
      } , 201)));
         return student;

    }


async studentLogin( loginStudentDto : LoginStudentDto ) { 

    let student;
    try { 
         student = await this.studentRep.findOne( { email : loginStudentDto.email} );
       } catch (e) {
         console.log(e.message)
         throw (( new HttpException({ 
          success : false , 
          message : 'Wrong email or password'
      } , 201)) );

       }

    if ( !student || !await brcypt.compare(loginStudentDto.password , student.password) )
    throw (( new HttpException({ 
      success : false , 
      message : 'Wrong email or password'
  } , 201)));
    

  return student;
}




async updateStudent( id : number, updateStudent : Partial<Student> ) {
     let student = await this.findStudentById(id);

     if (updateStudent.password) {
         let hashedPassword = await brcypt.hash(updateStudent.password , this.salt);
         updateStudent.password = hashedPassword;
        }

     Object.assign(student , updateStudent);

     let savedStudent;

         try { 
            savedStudent = await this.studentRep.save(student);
            return savedStudent;
         }catch ( e ) { 
            throw (new HttpException({ success:false , 
            message : 'cant update , this email exist !'
            } , 201))

         }

}


  async allStudents( ) { 
     let students = await this.studentRep.find({select : [
      'id' , 
      'name' ,
      'lastName' , 
      'dateOfBirth' ,
      'email' ,
      'profileImage' ,
      'created_at'  ,
      'updated_at' 
   ]});

 return students;
    }


async deleteStudent(id : number) {


  let student = await this.findStudentById(id);

 
  if (student.profileImage) { 
  
  const path =My_Helper.getUploadPath(UsersEnum.Student)+'/'+student.profileImage ;

  try {

    fs.unlinkSync(path)
  } catch(err) {
   console.log(err.message);
    
   throw new HttpException(My_Helper.FAILED_RESPONSE(' something wrong ! , maybe cant remove profile image' ), 201);
  }
  
}
  await this.studentRep.remove(student);
 }



async getProfileImage( @Res()  res , profileImage : string){
 
   try {
      let file = await res.sendFile(join(process.cwd() , My_Helper.getUploadPath(UsersEnum.Student)+'/'+profileImage));         
      return file;
   } catch (error) {
       
      throw new HttpException(My_Helper.FAILED_RESPONSE('image not found') , 201);
       
   }
   
}


}
