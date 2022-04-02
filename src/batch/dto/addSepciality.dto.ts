import { IsNumberString } from "class-validator";


export class AddSepcialityDto { 
    @IsNumberString()
    batch_Id : number;

    @IsNumberString()
    speciality_Id : number;

}