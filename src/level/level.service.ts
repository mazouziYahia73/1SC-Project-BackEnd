import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { My_Helper } from 'src/MY-HELPER-CLASS';
import { Repository } from 'typeorm';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { Level } from './entities/level.entity';

@Injectable()
export class LevelService {


  constructor(@InjectRepository(Level) private levelRepo : Repository<Level>) { }

 async create(createLevelDto: CreateLevelDto) {
    let level;
    try {
     level = await this.levelRepo.save({level : createLevelDto.level ,
       name : createLevelDto.name});
    } catch (error) {
      throw (new HttpException(My_Helper.FAILED_RESPONSE('level Exist !') , 201))
    }
      return level;
  }

 async findAll() { 
    return await this.levelRepo.find({loadEagerRelations : true , loadRelationIds : true});
  }

 async findOne ( id : number ){ 
  let level;
  try {
      level = await this.levelRepo.findOne({id : id});
    } catch ( e ) { 
      throw (new HttpException(My_Helper.FAILED_RESPONSE('Something wrong !') , 201))
   } 

   if(!level) throw (new HttpException(My_Helper.FAILED_RESPONSE('level not Exist !') , 201))
    return level;

 }

  async findOneForUpdate(id: number) {
    let level; 
    try {
        level = await this.levelRepo.findOne({id : id }, );
     } catch (error) {
       throw (new HttpException(My_Helper.FAILED_RESPONSE('something wrong !') , 201))
     }

     if ( !level) { 
       throw new HttpException( My_Helper.FAILED_RESPONSE('level not found !') , 201);
     }
     return (level);

  }

  async update(id: number, updateLevelDto: UpdateLevelDto) {
     let level = await this.findOneForUpdate(id);
     Object.assign(level ,updateLevelDto );

     try { 
      await this.levelRepo.save(level);
     }catch( e) { 
         throw new HttpException(My_Helper.FAILED_RESPONSE('this level already exist!') , 201)
     }

     return level;
  }

 async remove(id: number) {
    let level = await this.findOneForUpdate(id);
    try { 
      this.levelRepo.remove(level);
    }catch( e){ 
      throw new HttpException(My_Helper.FAILED_RESPONSE('something wrong') , 201);
    }
  }


  public async levelExist( id ) : Promise<boolean> { 
    console.log(' Excuting ...');
    
   let level;
    try {
       level =  await this.levelRepo.findOne({id : id});
    } catch (error) {
       return false;
    }

    return (level)? true : false;
  }

}
