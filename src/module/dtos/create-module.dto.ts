import { IsNumberString, IsString } from "class-validator";

export class CreateModuleDto {

    @IsNumberString()
    levelId : number;

    @IsNumberString()
    semester : number;

    @IsString()
    name : string;
      
    @IsString( )
    shortName : string;

    @IsString()
    description : string;

    @IsString()
    imageUrl : string;
    
}