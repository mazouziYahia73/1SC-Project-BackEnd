import {IsEmail , IsString} from 'class-validator';

export class CreateStudentDto { 

    
    @IsString()
    name : string;
    
    @IsString()
    lastName : string;

    @IsEmail()
    email : string;

    @IsString( )
    password : string;

    @IsString( ) 
    wilaya : string;



}