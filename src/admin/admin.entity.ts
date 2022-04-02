import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Admin { 
 

    @PrimaryGeneratedColumn({type : 'bigint'})
    id : number;

    @Column({nullable : false})
    name : string ;

    @Column({type : 'varchar',  nullable :false })
    lastName : string;

    @Column({type :'varchar' , unique : true})
    email : string;
 
    @Column({type : 'varchar'})
    password : string;

    @Column({type:"date" , nullable : true} )
    dateOfBirth : string;

    @Column({type:"varchar" , nullable:true})
     profileImage : string;

    @CreateDateColumn()
    created_at: string;
   
    @UpdateDateColumn()
    updated_at: string;

}