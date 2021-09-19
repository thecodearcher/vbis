import { Index } from 'typeorm';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ObjectIdColumn, ObjectID } from 'typeorm-plus';

@Entity({name: 'users'})
export class User extends BaseEntity {
    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    public firstname: string;

    @Column()
    public lastname: string;

    @Index()
    @Column({ unique: true })
    public email: string;

    @Column()
    public password: string;

    @Column()
    public role: string;

    @Column({ type: 'date' })
    public dob: Date;

    @Column({ type: 'timestamp' })
    public lastLogIn: Date;

    @CreateDateColumn()
    public createdAt: string;

    @UpdateDateColumn()
    public updatedAt: string;

    public toJSON() {
        delete (this.password);

        return this;
    }
}
