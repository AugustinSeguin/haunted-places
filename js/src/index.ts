import express from "express";
import path from "path";
import { sayHello } from "./controllers/hello";
import GhostController from "./controllers/ghost.controller";
import { dosProtectionMiddleware } from "./middlewares/dos.middleware";

const app = express();
const PORT = 3000;

// Middleware pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Route principale
app.get("/api/hello", sayHello);


// Route ghosts
app.get("/api/ghosts", (req, res) => GhostController.findAll(req, res));
app.get("/api/ghosts/:id", (req, res) => GhostController.find(req, res));

// Route pour inverser la valeur de `like` pour un ghost spécifique
app.patch("/api/ghosts/:id/like", dosProtectionMiddleware, (req, res) => GhostController.toggleGhostLike(req, res));

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});