import { Table, Column, Model, PrimaryKey, DataType } from "sequelize-typescript";

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

@Table
export class User extends Model<IUser> {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    public override id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public password!: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    public override createdAt?: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    public override updatedAt?: Date;
}
