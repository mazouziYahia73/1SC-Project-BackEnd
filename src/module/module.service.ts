import { HttpException, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { STATUS_CODES } from 'http';
import { Repository } from 'typeorm';
import { CreateModuleDto } from './dtos/create-module.dto';
import { Module } from './module.entity';

@Injectable()
export class ModuleService {

constructor( @InjectRepository(Module) private moduleRepository : Repository<Module>){}

    async createModule ( moduleInfo : CreateModuleDto ){
       let module;
        try {
             module = await this.moduleRepository.save({
                 levelId : moduleInfo.levelId , 
                 semester : moduleInfo.semester , 
                 name : moduleInfo.name , 
                 shortName : moduleInfo.shortName , 
                 description : moduleInfo.description , 
                 imageUrl : moduleInfo.imageUrl , 
             }); 
        } catch ( e ) { 
            console.log(e);
            throw new HttpException({ 



             success : false , 
             message : 'Module name exist in database !' , 
             statusCode : STATUS_CODES.EXIST_IN_DB
            } , 404)
        }

        return module;

     }

     async updateModule ( moduleId : number , updatedData : Partial<Module>) { 
      
        let foundedModule;
        try {
            foundedModule = await this.moduleRepository.findOne({id : moduleId});     
         } catch (error) {
            throw( new HttpException({success : false , 
            statusCode : 404 , 
            message : 'Something wrong !'
         } , 400) );
        
        }
        if (!foundedModule) throw new NotFoundException('Module not found');

        Object.assign(foundedModule , updatedData);

        try { 
            await this.moduleRepository.save(foundedModule);
            return foundedModule;
   
        }catch ( e ) { 
            throw new HttpException({ 

                success : false , 
                message : ' this Module name already exist in database !' , 
                statusCode : STATUS_CODES.EXIST_IN_DB
               } , 404)
        }
          }

     async listAll ( ) { 
 
        try { 
             let modules = await this.moduleRepository.find( );
             return modules;
            } catch ( error ) { 
            throw (new HttpException({ 
                success : false , 
                message : 'something wrong !',
            } , 404))
          }

     } 

    async remove( id : number ){ 
        let moduleToRemove;
        try { 
            moduleToRemove = await this.moduleRepository.findOne({id : id});
            console.log(moduleToRemove);
          } 
        catch( e ) { 

            throw ( new HttpException( {
                success : false , 
                message : 'Something wrong !'
             }, 205));

        }

        if (!moduleToRemove) {
            throw  new NotFoundException('this Module does not exist !'); }

        await this.moduleRepository.delete(moduleToRemove);

    }



}
