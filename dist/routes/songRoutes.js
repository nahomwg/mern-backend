"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const songController_1 = require("../controllers/songController");
const router = express_1.default.Router();
router.get('/songs', songController_1.getSongs);
router.post('/songs', songController_1.createSong);
router.put('/songs/:id', songController_1.updateSong);
router.delete('/songs/:id', songController_1.deleteSong);
router.get('/stats/overview', songController_1.getStatsOverview);
router.get('/stats/by-genre', songController_1.getStatsByGenre);
exports.default = router;
