import { Request, Response } from 'express';
import VideoService from '../services/video.service';
import { VideoModel } from '../models/video.dto';

class VideoController {
    public static async createVideo(req: Request, res: Response): Promise<void> {
        const { title, description, url } = req.body;

        try {
            const video: VideoModel = await VideoService.createVideo(title, description, url);
            res.status(201).json(video);
        } catch (error) {
            console.error('Error creating video:', error);
            res.status(400).json({ error: error.message });
        }
    }

    public static async getVideoById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const video: VideoModel | null = await VideoService.getVideoById(Number(id));
            if (video) {
                res.status(200).json(video);
            } else {
                res.status(404).json({ error: 'Video not found' });
            }
        } catch (error) {
            console.error('Error retrieving video:', error);
            res.status(400).json({ error: error.message });
        }
    }

    public static async getAllVideos(req: Request, res: Response): Promise<void> {
        try {
            const videos: VideoModel[] = await VideoService.getAllVideos();
            res.status(200).json(videos);
        } catch (error) {
            console.error('Error retrieving videos:', error);
            res.status(400).json({ error: error.message });
        }
    }

    public static async updateVideo(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { title, description, url } = req.body;

        try {
            await VideoService.updateVideo(Number(id), title, description, url);
            res.status(200).json({ message: 'Video updated successfully' });
        } catch (error) {
            console.error('Error updating video:', error);
            res.status(400).json({ error: error.message });
        }
    }

    public static async deleteVideo(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            await VideoService.deleteVideo(Number(id));
            res.status(200).json({ message: 'Video deleted successfully' });
        } catch (error) {
            console.error('Error deleting video:', error);
            res.status(400).json({ error: error.message });
        }
    }
}

export default VideoController;