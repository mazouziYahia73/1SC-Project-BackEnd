import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Batch } from 'src/batch/entities/batch.entity';
import { My_Helper } from 'src/MY-HELPER-CLASS';
import { Repository } from 'typeorm';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { Speciality } from './entities/speciality.entity';

@Injectable()
export class SpecialityService {

  constructor(@InjectRepository(Speciality) private specialityRepo : Repository<Speciality> , 
      @InjectRepository(Batch) private batchRepo : Repository<Batch>
  ) {
    
  }




  private async findBatchById ( batch_Id : number ) { 
    let batch;
    try {
       batch = await this.batchRepo.findOne({id : batch_Id});
    } catch (error) {
       throw new HttpException(My_Helper.FAILED_RESPONSE('something wrong') , 201);
    }

 
    if (!batch) { 
      throw new HttpException(My_Helper.FAILED_RESPONSE('Batch not found , so you cant create Speciality') , 201);
    }
  return batch;

  }


 private async findSpecialityByIdoOrThrowExp( id : number ) { 
  let speciality ; 
  try {
    speciality = await this.specialityRepo.findOne({id : id}); 
  } catch (error) {
     throw ( 
       new HttpException(My_Helper.FAILED_RESPONSE('Something Wrong !' ) , 
       201)
   );
     }
   
     if ( !speciality) throw new HttpException(
       My_Helper.FAILED_RESPONSE('Speciality not found !') ,
        201 );

        return speciality;
    }



  async create(createSpecialityDto: CreateSpecialityDto) {
  //  let batch = await this.findBatchById( createSpecialityDto.batch_Id);
    let speciality;
    try {
          speciality =  this.specialityRepo.create(
           {name : createSpecialityDto.name , 
           description : createSpecialityDto.description
          });
        
    //  speciality.batch = batch;
          await this.specialityRepo.save (speciality);
     } catch (error) {
       console.log(error.message);
       
       throw new HttpException(My_Helper.FAILED_RESPONSE('speciality name Exist') , 201) ;
     }

     return speciality;

  }

  async findAll() { 
    try {
      return await this.specialityRepo.find();
    } catch (error) {
       throw new HttpException(My_Helper.FAILED_RESPONSE('something wrong !') , 201 );
    }
  }

 async  findOne(speciality_Id: number) {
    let speciality;
    try {
       speciality = await this.specialityRepo.findOne({id : speciality_Id} , {loadRelationIds:true});
    } catch (error) {
       throw new HttpException(My_Helper.FAILED_RESPONSE('something wrong') , 201);
    }
 
    if (!speciality) { 
      throw new HttpException(My_Helper.FAILED_RESPONSE('Speciality not found !') , 201);
    }
  return speciality;
  }

  async update(id: number, updateSpecialityDto: UpdateSpecialityDto) {
    let speciality = await this.findSpecialityByIdoOrThrowExp(id); 
    Object.assign(speciality , updateSpecialityDto);
    
    try {
      await this.specialityRepo.save(speciality);
    } catch (e) {
      throw (
        new HttpException( 
          My_Helper.FAILED_RESPONSE('name Exist , you cant update to this name  !')
          ,
          201
        )
      );
    }

    return speciality;

  }

  async remove(id: number) {
    let speciality = await this.findSpecialityByIdoOrThrowExp(id);
    await this.specialityRepo.remove(speciality);

     return speciality;
  }
}
