import { InjectRepository } from "@nestjs/typeorm";
import { IsDateString, IsInt, IsNumberString, IsString, Validate, ValidateIf, ValidatePromise } from "class-validator";
import { Level } from "src/level/entities/level.entity";
import { Repository } from "typeorm";
import { LevelExist } from "../custom-validator/LevelExist.validator";

export class CreateBatchDto {
    
    @IsNumberString()
    level_id : number;

    @IsNumberString()
    year : number;
 
    @IsString()
    name : string;

}
