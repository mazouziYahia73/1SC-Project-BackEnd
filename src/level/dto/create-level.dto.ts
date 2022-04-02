import { IsIn, IsInt, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateLevelDto {

    @IsNumberString()
    level : number;
    
    @IsOptional()
    @IsString()
    name  : string;




}
