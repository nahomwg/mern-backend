import express from 'express';
import {
  getSongs,
  createSong,
  updateSong,
  deleteSong,
  getStatsOverview,
  getStatsByGenre,
} from '../controllers/songController';

const router = express.Router();

router.get('/songs', getSongs);
router.post('/songs', createSong);
router.put('/songs/:id', updateSong);
router.delete('/songs/:id', deleteSong);

router.get('/stats/overview', getStatsOverview);
router.get('/stats/by-genre', getStatsByGenre);

export default router;