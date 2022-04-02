import { Level } from "src/level/entities/level.entity";
import { Speciality } from "src/speciality/entities/speciality.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, TableForeignKey, UpdateDateColumn } from "typeorm";

@Entity()
export class Batch {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({type : 'varchar' , nullable : true})
    name : string;

    @Column({type:'integer' , unsigned : true , unique : true})
    year : number;

    
    @CreateDateColumn()
    created_at: string;
   
    @UpdateDateColumn()
    updated_at: string;

    @ManyToOne(type => Level  , level => level.batches, {  nullable : false , onUpdate : 'RESTRICT' , onDelete : 'RESTRICT' })
    @JoinColumn({ name: "level_Id" } )
    public level : Level;



    @ManyToMany(type => Speciality , {cascade:true , onDelete : 'RESTRICT' , onUpdate : 'RESTRICT'})
    @JoinTable({ 
        name : 'batch_has_speciality' , 
        joinColumn: { name: 'batch_Id', referencedColumnName: 'id'},
        inverseJoinColumn : {name : 'speciality_Id' , referencedColumnName : 'id'}

    })
    public specialities : Speciality[];


}
