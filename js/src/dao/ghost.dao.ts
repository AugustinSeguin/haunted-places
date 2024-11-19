import { Request, Response } from "express";
import { GhostModel } from '../models/ghost.dto';
import GhostService from '../services/ghost.service';

class GhostDAO {
    private static instance: GhostDAO;

    private constructor() { }

    public static getInstance(): GhostDAO {
        if (!GhostDAO.instance) {
            GhostDAO.instance = new GhostDAO();
        }
        return GhostDAO.instance;
    }

    // Fonction pour gérer la requête HTTP et inverser la valeur de `like`
    public async toggleGhostLike(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const ghost = GhostService.like(Number(id));
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

    // Fonction pour gérer la requête HTTP et renvoyer les ghosts
    public async findAll(req: Request, res: Response): Promise<void> {
        try {
            const ghosts = GhostService.list();
            res.json(ghosts);
        } catch (error) {
            console.error('Error fetching ghosts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async find(req: Request, res: Response): Promise<void> {
        try {
            const ghost = GhostService.find(Number(req.params.id));
            res.json(ghost);
        } catch (error) {
            console.error('Error fetching ghosts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default GhostDAO.getInstance();