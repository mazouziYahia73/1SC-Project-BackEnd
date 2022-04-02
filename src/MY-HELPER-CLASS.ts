import { UsersEnum } from "./Enums";

export class My_Helper {

  public static SUCCESS_RESPONSE( successMessage ) {
    return { success : true  , message : successMessage };
  }

  public static FAILED_RESPONSE( errorMessage ) {
    return { success : false  , message : errorMessage };
  }


  public static   getUploadPath( user : UsersEnum){
    
    const filePath : string = './uploads/profileImages/'
    switch ( user ) { 
      case UsersEnum.Student :
        return filePath+'students' 
      case UsersEnum.Teacher :
        return filePath+'teachers'
      case UsersEnum.Admin : 
      return filePath+'admin' 
    }

  }


  

}