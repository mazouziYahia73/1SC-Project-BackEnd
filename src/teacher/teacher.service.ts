import { BadRequestException, HttpException, Injectable, NotFoundException,  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dtos/create-teacher-dto';
import { Teacher } from './teacher.entity';
import * as bcrypt from 'bcrypt'
import { LoginTeacherDto } from './dtos/teacher-login.dto';
import { My_Helper } from 'src/MY-HELPER-CLASS';



@Injectable()
export class TeacherService {

    constructor (@InjectRepository(Teacher) private teacherRepository : Repository<Teacher>){ }
   private salt : number = 9;
    async createTeacher ( teacherData : CreateTeacherDto) {
        let teacher;
    try {    
          teacher = await this.teacherRepository.save(teacherData);       
    } catch ( e ){
        
        console.log(e.message)
        throw (new HttpException({ success : false , 
        message : 'Email Exist' } , 201))
    }


     delete teacher.password;
    return teacher;    

    }


   async getAllTeachers( ){ 
        try {
            return await this.teacherRepository.find({select : [
             'id' , 
             'name' ,
             'lastName' , 
             'dateOfBirth' ,
             'email' ,
             'profileImage' ,
             'created_at'  ,
             'updated_at' ]});

        } catch( e ) {
            throw (new HttpException({ 
                success : false , 
                message : 'something wrong !',
            } , 201))
         }
    }




    async TeacherLogin (  param : LoginTeacherDto ) { 
        let teacher ;
      
        try { 
         teacher = await this.teacherRepository.findOne( { email : param.email }) ; 
         }
         catch ( e ){ 

            throw ( new HttpException( {
                success : false , 
                message : 'Something wrong !'
             }, 201));

        }

        if (! teacher || ! await bcrypt.compare( param.password , teacher.password) ) { 
            throw ( new HttpException( { 
                success : false , 
                message : 'Wrong email or password !',
            } , 201));


        } 
        delete teacher.password;
        return teacher;
    }

    async updateTeacher(teacherId : number , attrs : Partial<Teacher> ) { 
        
        let teacher;
        try { 
            console.log(teacherId);
               teacher = await this.teacherRepository.findOne({id : teacherId});
        } catch (e) {
            
            throw new HttpException(
              {
                success : false  , 
                message : 'Something wrong but ana khatini , ana manish ana , piratawni!'
              },
              201)

         }
                if (!teacher) { 
            throw new HttpException({
                success : false , 
                message : 'This teacher not exist !',
            } , 201);
        }
        

        if (attrs.password) { 
            let newHashedPassword = await bcrypt.hash(attrs.password , this.salt);
            attrs.password = newHashedPassword;
        }

        Object.assign(teacher , attrs);

        try { 
            await this.teacherRepository.save(teacher);
        } catch ( e )  { 
            throw new HttpException({
                success : false , 
                message : 'Email exist , you cant update !',
            } , 201);
        }
      
        delete teacher.password;
        return teacher;
    }

  async findTeacherById ( id : number ) {

        if (isNaN(id)) {
            throw new BadRequestException('Id must be number!')
        }

        let teacher;
        try { 
           teacher = await this.teacherRepository.findOne({ id : id});
        }catch (e) {
             throw ( new HttpException( { success : false , 
            message : 'Something wrong !'
        } , 201))
         }


         if (!teacher) throw new HttpException(My_Helper.FAILED_RESPONSE( 'Teacher not found !' ) , 201);
         delete teacher.password;
         return teacher;

    }



    async removeTeacher( id : number) {
          let teacher = await this.findTeacherById(id);  
           await this.teacherRepository.remove(teacher);
    }



}
