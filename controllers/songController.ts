import { Request, Response } from 'express';
import { Song } from '../models/Song';

export const getSongs = async (req: Request, res: Response) => {
  const songs = await Song.find();
  res.json(songs);
};

export const getSong = async (req:Request, res: Response) => {
  if(!req?.params?.id)
    return res.status(400).json({'message': 'no data found'})
  const song = await Song.findOne({_id:req.params.id}).exec();
  if(!song){
    return res.status(400).json({'message': 'no data found'});
  }
  res.status(200).json(song);
}
export const createSong = async (req: Request, res: Response) => {
  if(!req?.body?.title || !req?.body?.artist || !req?.body?.album){
    return res.status(400).json({'message': 'Title, artis, and album fields are required'})
  }
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (error) {
    res.status(400).json({ message: 'Error creating song', error });
  }

};
export const updateSong = async (req: Request, res: Response) => {
  if(!req?.body?.id){
    return res.status(400).json({'message': 'Id parameter is required'})
  }
  const song = await Song.findOne({_id: req.body.id}).exec();
  if(!song){
    return res.status(204).json({'message':'no employee data found'})
  }
  
  const updated = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.json(updated);
};

export const deleteSongEx = async (req: Request, res: Response) => {
  if(!req?.body?.id)
    return res.status(400).json({'message': 'song id required'})
  const song = await Song.findOne({_id: req.body.id}).exec();
  if(!song)
    return res.status(400).json({'message': `song with id:${req.body.id} was not found`})
  await Song.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
export const deleteSong = async (req: Request, res: Response) => {
  const { id } = req.params; // ✅ Get ID from URL params
  if (!id) return res.status(400).json({ message: 'Song ID required' });

  const song = await Song.findOne({ _id: id }).exec();
  if (!song) return res.status(400).json({ message: `Song with id:${id} not found` });

  await Song.findByIdAndDelete(id);
  res.status(204).end(); // No content, successfully deleted
};

export const getStatsOverview = async (_req: Request, res: Response) => {
  const total = await Song.countDocuments();
  const artists = await Song.distinct('artist');
  const albums = await Song.distinct('album');
  const genres = await Song.distinct('genre');

  res.json({
    totalSongs: total,
    totalArtists: artists.length,
    totalAlbums: albums.length,
    totalGenres: genres.length,
  });
};

export const getStatsByGenre = async (_req: Request, res: Response) => {
  const data = await Song.aggregate([
    { $group: { _id: '$genre', count: { $sum: 1 } } }
  ]);
  res.json(data);
};