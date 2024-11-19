import { RowDataPacket } from 'mysql2/promise';

export interface Ghost extends RowDataPacket {
    id: number;
    lieudit: string;
    adresse: string;
    like: boolean;
    fear: string;
    created_at: Date;
    updated_at: Date;
}

export class GhostModel {
    id: number;
    lieudit: string;
    adresse: string;
    like: boolean;
    fear: string;
    created_at: Date;
    updated_at: Date;

    constructor(
        id: number,
        lieudit: string,
        adresse: string,
        like: boolean,
        fear: string,
        created_at: Date,
        updated_at: Date
    ) {
        this.id = id;
        this.lieudit = lieudit;
        this.adresse = adresse;
        this.like = like;
        this.fear = fear;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}