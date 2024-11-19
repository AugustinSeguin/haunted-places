import GhostRepository from '../repositories/ghost.repository';
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
    public async list(): Promise<GhostModel[]> {
        return await GhostRepository.findAll();
    }

    // Méthode pour lister les lieux hantés
    public async find(id: number): Promise<GhostModel | undefined> {
        return await GhostRepository.find(id);
    }

    // Méthode pour inverser la valeur de `like` pour un ghost spécifique
    public async like(id: number): Promise<GhostModel | undefined> {
        let ghost = await GhostRepository.find(id);
        if (ghost) {
            ghost.like = !ghost.like;
            ghost = await GhostRepository.update(ghost);
        }
        return ghost;
    }
}

export default GhostService.getInstance();