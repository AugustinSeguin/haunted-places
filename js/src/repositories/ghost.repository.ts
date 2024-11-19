import { GhostModel } from '../models/ghost.dto';
import Database from '../helpers/database';
import { RowDataPacket } from 'mysql2';

class GhostRepository {
    private static instance: GhostRepository;
    private ghosts: Map<number, GhostModel> = new Map();

    private constructor() { }

    public static getInstance(): GhostRepository {
        if (!GhostRepository.instance) {
            GhostRepository.instance = new GhostRepository();
        }
        return GhostRepository.instance;
    }

    // Fonction pour récupérer tous les ghosts depuis la base de données
    public async findAll(): Promise<GhostModel[]> {
        const connection = await Database.getInstance();
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM ghost');
        return rows.map(row => ({
            id: row.id,
            lieudit: row.lieudit,
            adresse: row.adresse,
            like: row.like,
            // Add other properties as needed
        } as GhostModel));
    }

    // Fonction pour rechercher un ghost par son identifiant
    public async find(id: number): Promise<GhostModel | undefined> {
        const connection = await Database.getInstance();
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM ghost WHERE id = ?', [id]);
        return rows.length > 0 ? (rows[0] as GhostModel) : undefined;
    }

    // Fonction pour mettre à jour un ghost et retourner le modèle mis à jour
    public async update(ghost: GhostModel): Promise<GhostModel | undefined> {
        const connection = await Database.getInstance();
        await connection.execute(
            'UPDATE ghost SET lieudit = ?, adresse = ?, `like` = ?, fear = ?, created_at = ?, updated_at = ? WHERE id = ?',
            [ghost.lieudit, ghost.adresse, ghost.like, ghost.fear, ghost.created_at, ghost.updated_at, ghost.id]
        );
        const [updatedRows] = await connection.execute<RowDataPacket[]>('SELECT * FROM ghost WHERE id = ?', [ghost.id]);
        return updatedRows.length > 0 ? (updatedRows[0] as GhostModel) : undefined;
    }
}

export default GhostRepository.getInstance();