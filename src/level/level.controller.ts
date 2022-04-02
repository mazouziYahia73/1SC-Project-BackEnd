import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LevelService } from './level.service';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { My_Helper } from 'src/MY-HELPER-CLASS';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Post('/create')
   async create(@Body() createLevelDto: CreateLevelDto) {
    return  My_Helper.SUCCESS_RESPONSE( await this.levelService.create(createLevelDto));
  }

  @Get('/all')
  async findAll() {
    return  My_Helper.SUCCESS_RESPONSE(await this.levelService.findAll());
  }


  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() updateLevelDto: UpdateLevelDto) {
    let updatedLevel = await this.levelService.update(+id, updateLevelDto);
    return My_Helper.SUCCESS_RESPONSE(updateLevelDto);
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    await this.levelService.remove(+id);
  return My_Helper.SUCCESS_RESPONSE('level removed with success ');
  }
}
