import { Request, Response } from "express";
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
            res.json(ghosts);
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
                res.json(ghost);
            } else {
                res.status(404).json({ error: 'Ghost not found' });
            }
        } catch (error) {
            console.error('Error fetching ghost:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Fonction pour gérer la requête HTTP et inverser la valeur de `like`
    public async toggleGhostLike(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const ghost = await GhostService.like(Number(id));
            if (ghost) {
                res.status(200).json({ message: 'Like toggled successfully', data: ghost });
            } else {
                res.status(404).json({ error: 'Ghost not found' });
            }
        } catch (error) {
            console.error('Error toggling like:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Fonction pour gérer la requête HTTP et liker un ghost
    public async like(req: Request, res: Response): Promise<void> {
        const ghost: GhostModel = req.body;
        try {
            const updatedGhost = await GhostService.like(ghost.id);
            if (updatedGhost) {
                res.status(200).json({ message: 'Ghost updated successfully', data: updatedGhost });
            } else {
                res.status(404).json({ error: 'Ghost not found' });
            }
        } catch (error) {
            console.error('Error updating ghost:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default GhostController.getInstance();