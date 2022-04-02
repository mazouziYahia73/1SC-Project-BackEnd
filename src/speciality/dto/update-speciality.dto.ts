import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialityDto } from './create-speciality.dto';

export class UpdateSpecialityDto extends PartialType(CreateSpecialityDto) {}
