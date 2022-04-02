import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({name : 'LevelExist' , async : true})
export class LevelExist implements ValidatorConstraintInterface {


     async validate(value: number, validationArguments?: ValidationArguments) : Promise<boolean>  {
        

        let level;
        try {
           console.log('validating ');
           
        } catch (error) {
           return false;
        }
    
        return (level)? true : false;
       }
        
    defaultMessage?(validationArguments?: ValidationArguments): string {
       return 'level_id does not exist!'
    } 

}