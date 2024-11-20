import { Request, Response } from "express";
import axios from 'axios';
import GhostService from '../services/ghost.service';
import { GhostModel } from '../models/ghost.dto';

class GhostController {
    private static instance: GhostController;

    private constructor() { }

    public static getInstance(): GhostController {
        if (!GhostController.instance) {
            GhostController.instance = new GhostController();
        }
        return GhostController.instance;
    }

    // Fonction pour gérer la requête HTTP et renvoyer les ghosts
    public async findAll(req: Request, res: Response): Promise<void> {
        try {
            const ghosts = await GhostService.list();
            const ghostsWithVideos = await Promise.all(ghosts.map(async (ghost) => {
                const video = await this.getVideoById(ghost.id);
                return { ...ghost, video };
            }));
            res.json(ghostsWithVideos);
        } catch (error) {
            console.error('Error fetching ghosts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Fonction pour gérer la requête HTTP et renvoyer un ghost par son identifiant
    public async find(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const ghost = await GhostService.find(Number(id));
            if (ghost) {
                const video = await this.getVideoById(ghost.id);
                res.json({ ...ghost, video });
            } else {
                res.status(404).json({ error: 'Ghost not found' });
            }
        } catch (error) {
            console.error('Error fetching ghost:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Fonction pour gérer la requête HTTP et liker un ghost
    public async like(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            if (!res.headersSent) {
                const updatedGhost = await GhostService.like(Number(id));
                if (updatedGhost) {
                    res.status(200).json({ message: 'Ghost updated successfully', data: updatedGhost });
                } else {
                    res.status(404).json({ error: 'Ghost not found' });
                }
            }
        } catch (error) {
            console.error('Error updating ghost:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Helper function to get video by ID from the video service on port 3001
    private async getVideoById(id: number): Promise<any> {
        try {
            const response = await axios.get(`http://localhost:3001/api/videos/${id}`);
            if (response.status === 404) {
                return null;
            }
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return null; // Video not found
            } else {
                console.error('Error fetching video:', error);
                return null;
            }
        }
    }
}

export default GhostController.getInstance();