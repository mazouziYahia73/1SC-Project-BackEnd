import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelService } from 'src/level/level.service';
import { My_Helper } from 'src/MY-HELPER-CLASS';
import { Speciality } from 'src/speciality/entities/speciality.entity';
import { In, Repository } from 'typeorm';
import { CreateBatchDto } from './dto/create-batch.dto';
import { Batch } from './entities/batch.entity';

@Injectable()
export class BatchService {


  constructor (@InjectRepository(Batch) private batchRepo : Repository<Batch>  , 
  private levelService : LevelService ,
  @InjectRepository(Speciality) private specRepo : Repository<Speciality>
  ) {}

  async create(createBatchDto: CreateBatchDto) {
    
    let level = await this.levelService.findOne(createBatchDto.level_id);
    let batch;
    try { 
      batch =  this.batchRepo.create({
         year : createBatchDto.year , name : createBatchDto.name }
         );
      batch.level = level;
     await this.batchRepo.save(batch);
    }catch( e ){
      console.log(e.message , e.code);
        throw ( 
        new HttpException(My_Helper.FAILED_RESPONSE('Year Exist ,( Level must have just one batch in one year )') , 201)
        );
     }

     return batch;

  }

 async findAll( ){
try { 
   let batches =  await this.batchRepo.find({ relations : ['level'
  , 'specialities']});
  
    return batches;

}catch( e ){
  console.log(e.message);

  throw ( 
  
  new HttpException(My_Helper.FAILED_RESPONSE(' Something wrong !') , 201)
  );
 }

  }

  async findOne(id: number) {
    let batch; 
    try {
       batch = await this.batchRepo.findOneOrFail(
         {  id : id   } ,
         {  relations : ['level' , 
                        'specialities']
           } );
       //let level = await this.levelService.findOne(batch.level);
       //batch.level = level;

       return batch;
      } catch (e) {
        throw ( 
          new HttpException(My_Helper.FAILED_RESPONSE('Batch not found !') , 201)
          ); 
     }
  }


private async findOneForUpdateAndRemove ( id : number) {
  let batch; 
    try {
        batch = await this.batchRepo.findOne({id : id} , {loadEagerRelations:true , loadRelationIds:true});
     } catch (error) {
       throw (new HttpException(My_Helper.FAILED_RESPONSE('something wrong !') , 201))
     }

     if ( !batch) { 
       throw new HttpException( My_Helper.FAILED_RESPONSE('batch not found !') , 201);
     }
     return (batch);

}


  async update(id: number, attrs : Partial<Batch>) {
   let batchForUpdate = await this.findOneForUpdateAndRemove(id);
   Object.assign(batchForUpdate , attrs);
  
   try {
    batchForUpdate = await this.batchRepo.save(batchForUpdate);
   } catch (error) {
    throw ( 
      new HttpException(My_Helper.FAILED_RESPONSE('Year Exist ,( Year must have just One Batch )') , 201)
      );
   }
   return batchForUpdate;
  }

  async remove(id: number) {
      let batch = await this.findOneForUpdateAndRemove(id);
      try {
        await this.batchRepo.remove(batch);
      } catch (e) {
        throw ( 
          new HttpException(My_Helper.FAILED_RESPONSE('Batch not removed , Something wrong !') , 201)
          );
      }
    }



    private async  findSpecialityByIdOrThrowExp( id : number ) {
     let spec;
      try {
          spec = await this.specRepo.findOne({id : id});
        } catch (error) {
          throw (
            new HttpException( My_Helper.FAILED_RESPONSE('Something wrong happen when searching speciality !'), 201)
          )
        }

        if ( !spec ) throw new HttpException( 
           My_Helper.FAILED_RESPONSE('speciality not found , so you cant add this speciality to this batch')
           ,  
          201
        );


        return spec;
    }


  async addSepciality ( batch_Id : number , speciality_Id : number ) { 
    
    // validating the existing of batch and speciality 
    let newSpec = await this.findSpecialityByIdOrThrowExp(speciality_Id);
    let batch = await this.findOneForUpdateAndRemove(batch_Id);
    


    /* 
     
     the problem here is when you need to add speciality to batch you have 
     to fetch all the old data and push the new speciality to array 
     then you save it 

    */ 

    
    let specialities = [];
    specialities = await this.specRepo.find({where : { 
      id : In(batch.specialities)
    }}) ;
    
    // adding the new item 
    specialities.push(newSpec);

    try { 
            batch.specialities = specialities;
            await this.batchRepo.save(batch);
        } catch ( e ){
        throw ( 
      new HttpException( 
      My_Helper.FAILED_RESPONSE('Something wrong !  ') 
        ,
       201
      )
        );
    }



  }


}
