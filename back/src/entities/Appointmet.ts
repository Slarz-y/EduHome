import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({
    name: "appointmets"
})

export class Appointmet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 20
    }) 
    date: string;

    @Column({
        length: 10
    }) 
    time: string;

    @Column()
    status: boolean;

    @ManyToOne(() => User, (user) => user.appointmets)
    user: User;
}