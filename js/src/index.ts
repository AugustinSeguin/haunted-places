import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import "dotenv/config";
import { authMiddleware } from "./middlewares/auth.middleware";
import AuthController from "./controllers/auth.controller";
import GhostController from "./controllers/ghost.controller";
import { dosProtectionMiddleware } from "./middlewares/dos.middleware";
import VideoController from "./controllers/video.controller";
import { sayHello } from './controllers/hello';

const app1 = express();
const app2 = express();
const PORT1 = 3000;
const PORT2 = 3001;

// Middleware pour servir les fichiers statiques
app1.use(express.static(path.join(__dirname, "public")));
app2.use(express.static(path.join(__dirname, "public")));

// Use body-parser middleware
app1.use(bodyParser.json());
app1.use(bodyParser.urlencoded({ extended: true }));
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: true }));

// Route principale
app1.get("/api/hello", sayHello);

// Route auth
app1.post("/api/login", (req, res) => AuthController.login(req, res));
app1.post("/api/register", (req, res) => AuthController.register(req, res));
app2.post("/api/login", (req, res) => AuthController.login(req, res));
app2.post("/api/register", (req, res) => AuthController.register(req, res));

// Route ghosts
app1.get("/api/ghosts", (req, res) => GhostController.findAll(req, res));
app1.get("/api/ghosts/:id", authMiddleware, (req, res) => GhostController.find(req, res));
app1.patch("/api/ghosts/:id/like", dosProtectionMiddleware, (req, res) => GhostController.like(req, res));
app2.get("/api/ghosts", (req, res) => GhostController.findAll(req, res));
app2.get("/api/ghosts/:id", authMiddleware, (req, res) => GhostController.find(req, res));
app2.patch("/api/ghosts/:id/like", dosProtectionMiddleware, (req, res) => GhostController.like(req, res));

// Route videos
app1.post("/api/videos", authMiddleware, (req, res) => VideoController.createVideo(req, res));
app1.get("/api/videos/:id", (req, res) => VideoController.getVideoById(req, res));
app1.get("/api/videos", (req, res) => VideoController.getAllVideos(req, res));
app1.put("/api/videos/:id", authMiddleware, (req, res) => VideoController.updateVideo(req, res));
app1.delete("/api/videos/:id", authMiddleware, (req, res) => VideoController.deleteVideo(req, res));
app2.post("/api/videos", authMiddleware, (req, res) => VideoController.createVideo(req, res));
app2.get("/api/videos/:id", (req, res) => VideoController.getVideoById(req, res));
app2.get("/api/videos", (req, res) => VideoController.getAllVideos(req, res));
app2.put("/api/videos/:id", authMiddleware, (req, res) => VideoController.updateVideo(req, res));
app2.delete("/api/videos/:id", authMiddleware, (req, res) => VideoController.deleteVideo(req, res));

// Démarrage des serveurs
app1.listen(PORT1, () => {
    console.log(`Server ghost is running on port ${PORT1}`);
});

app2.listen(PORT2, () => {
    console.log(`Server video is running on port ${PORT2}`);
});