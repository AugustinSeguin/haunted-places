import GhostDAO from '../dao/ghost.dao';
import { GhostModel } from '../models/ghost.dto';

class GhostService {
    private static instance: GhostService;

    private constructor() { }

    public static getInstance(): GhostService {
        if (!GhostService.instance) {
            GhostService.instance = new GhostService();
        }
        return GhostService.instance;
    }

    // Méthode pour lister les lieux hantés
    public async findAll(): Promise<GhostModel[]> {
        return await GhostDAO.findAll();
    }

    // Méthode pour lister les lieux hantés
    public async find(id: number): Promise<GhostModel | undefined> {
        return await GhostDAO.find(id);
    }

    // Méthode pour inverser la valeur de `like` pour un ghost spécifique
    public async update(ghost: GhostModel): Promise<GhostModel | undefined> {
        return await GhostDAO.update(ghost);
    }
}

export default GhostService.getInstance();