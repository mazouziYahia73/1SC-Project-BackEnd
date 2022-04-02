
import {  IsDateString, IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateTeacherDto { 
   
    @IsOptional()
    @IsString()
    name : string ;

    @IsOptional()
    @IsString( )
    lastName : string;


    @IsOptional()
    @IsEmail()
    email : string;
 
    @IsOptional()
    @IsString()
    password : string;


    @IsOptional()
    @IsDateString()
    dateOfBirth : string;

    @IsOptional()
    @IsString()
    profileImage : string;

    @IsOptional()
    @IsString()
    domainName : string ; 




}