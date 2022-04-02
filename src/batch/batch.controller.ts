import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { My_Helper } from 'src/MY-HELPER-CLASS';
import { BatchService } from './batch.service';
import { AddSepcialityDto } from './dto/addSepciality.dto';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';

@Controller('batch')
export class BatchController {
  constructor(private readonly batchService: BatchService) {}

  @Post('/create')
  async create(@Body() createBatchDto: CreateBatchDto) {

    let batch = await this.batchService.create(createBatchDto) ;
    return My_Helper.SUCCESS_RESPONSE(batch );
  }

  @Get('/all')
 async findAll() {
    let batchs = await this.batchService.findAll();
  return My_Helper.SUCCESS_RESPONSE(batchs);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return My_Helper.SUCCESS_RESPONSE( await this.batchService.findOne(+id) );
  }

  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() updateBatchDto: UpdateBatchDto) {
    let updatedBatch = await this.batchService.update(+id , updateBatchDto);
    return My_Helper.SUCCESS_RESPONSE(updateBatchDto);
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
     await this.batchService.remove(+id);   
     return My_Helper.SUCCESS_RESPONSE('Batch removed with success .');
    }


  @Post('/addSpeciality')
  async addSpeciality ( @Body() addSpeciality : AddSepcialityDto ) {
       await this.batchService.addSepciality(addSpeciality.batch_Id , addSpeciality.speciality_Id);
return My_Helper.SUCCESS_RESPONSE('Speciality added with success ')
   }

}
