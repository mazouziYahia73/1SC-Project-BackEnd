import { Batch } from "src/batch/entities/batch.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Level {

    @PrimaryGeneratedColumn()
    id : number ; 

    @Column({type : 'integer' , unsigned : true , unique : true})
    level : number;

    @Column({type:'varchar', nullable : true})
    name :string;


    @CreateDateColumn()
    created_at: string;
   
    @UpdateDateColumn()
    updated_at: string;


    @OneToMany(type => Batch , batch => batch.level )
    batches : Batch[];
    

}


