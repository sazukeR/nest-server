import {  Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    title: string;

    @Column('text', {
        nullable: true,
    })
    description: string;

    @Column('bool', {
        default: false,
      })
      isDone: boolean;




      

/*     @BeforeInsert()
    checkSlugInsert() {

        this.title = this.title
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')

    } */

}
