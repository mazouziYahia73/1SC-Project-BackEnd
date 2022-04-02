import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { My_Helper } from 'src/MY-HELPER-CLASS';
import { AdminService } from './admin.service';
import { LoginAdminDto } from './dtos/login-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';

@Controller('admin')
export class AdminController {

    constructor ( private adminService : AdminService ) { }

    @Post('/login')
    async login ( @Body(  ) body : LoginAdminDto ) { 
        let admin = await this.adminService.login(body);
        return My_Helper.SUCCESS_RESPONSE(admin);
    }





    @Patch('/update') 
    async updateAdmin( @Body() body : UpdateAdminDto) {
        let updatedAdmin = await this.adminService.update(body);
        return My_Helper.SUCCESS_RESPONSE('admin information updated with success')
     }



}
