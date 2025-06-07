import mongoose from 'mongoose';

export interface ISong extends mongoose.Document {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

const SongSchema = new mongoose.Schema<ISong>({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  genre: { type: String, required: true },
});

export const Song = mongoose.model<ISong>('Song', SongSchema);