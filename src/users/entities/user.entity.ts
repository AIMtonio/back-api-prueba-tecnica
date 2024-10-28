import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity, Column, PrimaryGeneratedColumn, Generated } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column( {nullable: true})
    first_name: string;

    @Column( {nullable: true})
    last_name: string;

    @Column( {nullable: true})
    date_birth: string;

    @Column( {nullable: true})
    address: string;

    @Column( {nullable: false, default: '11234'}) 
    token: string; //pendiete de definir

    @Column( {nullable: true})
    mobile_phone: string;

    @Column( {nullable: true})
    email: string;

    @Column( {nullable: true})
    password: string;

}
