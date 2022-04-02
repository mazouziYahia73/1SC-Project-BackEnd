import { BadRequestException, Body, Controller, Get, HttpException, Param, Patch, Post } from '@nestjs/common';
import { My_Helper } from 'src/MY-HELPER-CLASS';
import { CreateModuleDto } from './dtos/create-module.dto';
import { updateModuleDto } from './dtos/updateModule.dto';
import { ModuleService } from './module.service';

@Controller('module')
export class ModuleController {

constructor ( private moduleService : ModuleService ) {}

    @Post('/create')
    async create( @Body() moduleData : CreateModuleDto){ 
       let createdModule = await this.moduleService.createModule(moduleData);
       return My_Helper.SUCCESS_RESPONSE(createdModule);
    }


    @Patch('/update/:id')
    async update(@Param('id') moduleId: number ,  @Body() body : updateModuleDto ) {


        if (isNaN(moduleId)) return 'Id Is not a  NUMBER BITCH'
        //  let moduelId : number = parseInt(id);

        //  if (!moduelId) throw (new BadRequestException('id must be number'));

       let updatedModule = await this.moduleService.updateModule( moduleId , body);
    return My_Helper.SUCCESS_RESPONSE(updatedModule);
    
    }

    @Get('/remove/:id')
    remove ( @Param('id') id : number) { 
        this.moduleService.remove(id);
        return My_Helper.SUCCESS_RESPONSE('module has been removed with success');
    }

    @Get('/all')
    async list ( ) { 
        let modules = await this.moduleService.listAll();
   
        return My_Helper.SUCCESS_RESPONSE(modules);
   
    }

}
