import { Table, Column, Model, PrimaryKey, DataType } from "sequelize-typescript";

export interface IStatus {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

@Table
export class Status extends Model<IStatus> {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
    })
    public override id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public name!: string;

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
