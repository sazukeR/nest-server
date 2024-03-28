import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', {
        unique: true,
    })
    description: string;

}
