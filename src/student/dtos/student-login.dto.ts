import { IsEmail, IsSemVer, IsString } from "class-validator";

export class LoginStudentDto { 

    @IsEmail()
    email : string;

    @IsString( ) 
    password : string;
}