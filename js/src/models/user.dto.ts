import { RowDataPacket } from 'mysql2/promise';

export interface User extends RowDataPacket {
    id: number;
    username: string;
    password: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

export class UserModel {
    id: number;
    username: string;
    password: string;
    email: string;
    created_at: Date;
    updated_at: Date;

    constructor(
        id: number,
        username: string,
        password: string,
        email: string,
        created_at: Date,
        updated_at: Date
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}
