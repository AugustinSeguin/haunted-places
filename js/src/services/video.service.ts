import { VideoDAO } from '../dao/video.dao';
import { VideoModel } from '../models/video.dto';

class VideoService {
    private static instance: VideoService;

    private constructor() { }

    public static getInstance(): VideoService {
        if (!VideoService.instance) {
            VideoService.instance = new VideoService();
        }
        return VideoService.instance;
    }

    public async createVideo(title: string, description: string, url: string): Promise<VideoModel> {
        try {
            const video = await VideoDAO.create(title, description, url);
            return video;
        } catch (error) {
            throw new Error('Error creating video: ' + error.message);
        }
    }

    public async getVideoById(id: number): Promise<VideoModel | null> {
        try {
            const video = await VideoDAO.findById(id);
            return video;
        } catch (error) {
            throw new Error('Error retrieving video: ' + error.message);
        }
    }

    public async getAllVideos(): Promise<VideoModel[]> {
        try {
            const videos = await VideoDAO.findAll();
            return videos;
        } catch (error) {
            throw new Error('Error retrieving videos: ' + error.message);
        }
    }

    public async updateVideo(id: number, title: string, description: string, url: string): Promise<void> {
        try {
            await VideoDAO.update(id, title, description, url);
        } catch (error) {
            throw new Error('Error updating video: ' + error.message);
        }
    }

    public async deleteVideo(id: number): Promise<void> {
        try {
            await VideoDAO.delete(id);
        } catch (error) {
            throw new Error('Error deleting video: ' + error.message);
        }
    }
}

export default VideoService.getInstance();