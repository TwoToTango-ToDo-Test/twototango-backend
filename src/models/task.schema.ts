import {
    Table,
    Column,
    Model,
    PrimaryKey,
    DataType,
    ForeignKey,
    BelongsTo,
} from "sequelize-typescript";
import { User } from "./user.schema";
import { Status } from "./status.schema";

export interface ITask {
    id: string;
    name: string;
    status: number;
    createdAt?: Date;
    updatedAt?: Date;
}

@Table
export class Task extends Model<ITask> {
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

    @ForeignKey(() => Status)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public status!: number;

    @BelongsTo(() => Status, { as: "statusData" })
    public statusAssociation!: Status;

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    public userId!: string;

    @BelongsTo(() => User)
    public user!: User;

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
