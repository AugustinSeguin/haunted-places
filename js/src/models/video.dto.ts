import { RowDataPacket } from 'mysql2/promise';

export interface Video extends RowDataPacket {
    id: number;
    title: string;
    description: string;
    url: string;
    created_at: Date;
    updated_at: Date;
}

export class VideoModel {
    id: number;
    title: string;
    description: string;
    url: string;
    created_at: Date;
    updated_at: Date;

    constructor(
        id: number,
        title: string,
        description: string,
        url: string,
        created_at: Date,
        updated_at: Date
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.url = url;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}