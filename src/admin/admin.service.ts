import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { LoginAdminDto } from './dtos/login-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {

    constructor ( @InjectRepository(Admin ) private adminRepository : Repository<Admin>) {     }
     salt : number = 12;

     async login ( adminData : LoginAdminDto) { 
 
      let admin;
        try { 
             admin = await this.adminRepository.findOne( { email : adminData.email} );
           } catch (e) {


             console.log(e.message)
             throw (( new HttpException({ 
              success : false , 
              message : 'Wrong email or password'
          } , 201)));
           }
 

        if ( !admin || !await bcrypt.compare(adminData.password , admin.password) )
        throw ( new HttpException({ 
            success : false , 
            message : 'Wrong email or password'
        } , 201) 
        );
    


      return admin;
    }


   async update( attrs : Partial<Admin> ){ 

      let admin = await this.adminRepository.findOne();
      if (!admin) throw (new NotFoundException('No admin found'));

      if (attrs.password) { 
        let hashedPassword = await bcrypt.hash(attrs.password , this.salt)
        attrs.password = hashedPassword;
      }

      Object.assign(admin , attrs);
     return this.adminRepository.save(admin);

    }



}
