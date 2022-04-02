import { Speciality } from "src/speciality/entities/speciality.entity";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Section { 

    @PrimaryGeneratedColumn()
    id : number;

    @PrimaryColumn()
    name : string;

    @CreateDateColumn()
    created_at: string;
   
    @UpdateDateColumn()
    updated_at: string;

    @ManyToOne(type => Speciality , {onDelete : 'RESTRICT' , onUpdate : 'RESTRICT'})
    @JoinColumn({name : 'speciality_Id'})
    speciality : Speciality;
    
}
