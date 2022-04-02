import { IsNumberString, IsOptional, IsString } from "class-validator";


export class updateModuleDto {

    @IsOptional()    
    @IsNumberString()
    
    levelId : number;
    @IsOptional()
    @IsNumberString()
    semester : number;

    @IsOptional()
    @IsString()
    name : string;
      
    @IsOptional()
    @IsString( )
    shortName : string;

    @IsOptional()
    @IsString()
    description : string;

    @IsOptional()
    @IsString()
    imageUrl : string;
    
}