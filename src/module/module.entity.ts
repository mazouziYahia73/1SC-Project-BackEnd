import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Module { 



    @PrimaryGeneratedColumn({type:'integer'})
    id : number;

    @Column({type:'integer' , nullable : false})
    levelId : number;

    @Column({type : 'tinyint'})
    semester : number;

    @Column({type:"varchar" , unique : true})
    name : string;

    @Column({type : 'varchar' , nullable : true} , )
    shortName : string; 

    @Column({type : 'varchar'})
    description : string;

    @Column({type:'varchar'})
    imageUrl : string;

    @CreateDateColumn({type:'datetime'})
    created_at : string;

    @UpdateDateColumn({type :'datetime'})
    updated_at : string;

}