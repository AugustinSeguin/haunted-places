import { Video, VideoModel } from '../models/video.dto';
import Database from '../database/database';

export class VideoDAO {
    public static async create(title: string, description: string, url: string): Promise<VideoModel> {
        try {
            const connection = await Database.getInstance();
            const [result] = await connection.execute(
                'INSERT INTO video (title, description, url, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
                [title, description, url]
            );

            const videoId = (result as any).insertId;
            const [rows] = await connection.execute('SELECT * FROM video WHERE id = ?', [videoId]);
            const video = (rows as Video[])[0];

            return new VideoModel(video.id, video.title, video.description, video.url, video.created_at, video.updated_at);
        } catch (error) {
            throw new Error('Error creating video: ' + error.message);
        }
    }

    public static async findById(id: number): Promise<VideoModel | null> {
        try {
            const connection = await Database.getInstance();
            const [rows] = await connection.execute('SELECT * FROM video WHERE id = ?', [id]);
            const video = (rows as Video[])[0];

            if (!video) {
                return null;
            }

            return new VideoModel(video.id, video.title, video.description, video.url, video.created_at, video.updated_at);
        } catch (error) {
            throw new Error('Error finding video: ' + error.message);
        }
    }

    public static async findAll(): Promise<VideoModel[]> {
        try {
            const connection = await Database.getInstance();
            const [rows] = await connection.execute('SELECT * FROM video');
            const videos = rows as Video[];

            return videos.map(video => new VideoModel(video.id, video.title, video.description, video.url, video.created_at, video.updated_at));
        } catch (error) {
            throw new Error('Error finding videos: ' + error.message);
        }
    }

    public static async update(id: number, title: string, description: string, url: string): Promise<void> {
        try {
            const connection = await Database.getInstance();
            await connection.execute(
                'UPDATE video SET title = ?, description = ?, url = ?, updated_at = NOW() WHERE id = ?',
                [title, description, url, id]
            );
        } catch (error) {
            throw new Error('Error updating video: ' + error.message);
        }
    }

    public static async delete(id: number): Promise<void> {
        try {
            const connection = await Database.getInstance();
            await connection.execute('DELETE FROM video WHERE id = ?', [id]);
        } catch (error) {
            throw new Error('Error deleting video: ' + error.message);
        }
    }
}