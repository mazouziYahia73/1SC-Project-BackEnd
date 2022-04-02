import { IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateSpecialityDto {
    @IsString()
    name : string;

    @IsString()
    @IsOptional()
    description : string; 
     
    @IsString()
    @IsOptional()
    imageUrl : string;

}

