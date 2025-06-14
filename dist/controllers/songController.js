"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatsByGenre = exports.getStatsOverview = exports.deleteSong = exports.deleteSongEx = exports.updateSong = exports.createSong = exports.getSong = exports.getSongs = void 0;
const Song_1 = require("../models/Song");
const getSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield Song_1.Song.find();
    res.json(songs);
});
exports.getSongs = getSongs;
const getSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id))
        return res.status(400).json({ 'message': 'no data found' });
    const song = yield Song_1.Song.findOne({ _id: req.params.id }).exec();
    if (!song) {
        return res.status(400).json({ 'message': 'no data found' });
    }
    res.status(200).json(song);
});
exports.getSong = getSong;
const createSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.title) || !((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.artist) || !((_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.album)) {
        return res.status(400).json({ 'message': 'Title, artis, and album fields are required' });
    }
    try {
        const song = new Song_1.Song(req.body);
        yield song.save();
        res.status(201).json(song);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating song', error });
    }
});
exports.createSong = createSong;
const updateSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id)) {
        return res.status(400).json({ 'message': 'Id parameter is required' });
    }
    const song = yield Song_1.Song.findOne({ _id: req.body.id }).exec();
    if (!song) {
        return res.status(204).json({ 'message': 'no employee data found' });
    }
    const updated = yield Song_1.Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});
exports.updateSong = updateSong;
const deleteSongEx = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.id))
        return res.status(400).json({ 'message': 'song id required' });
    const song = yield Song_1.Song.findOne({ _id: req.body.id }).exec();
    if (!song)
        return res.status(400).json({ 'message': `song with id:${req.body.id} was not found` });
    yield Song_1.Song.findByIdAndDelete(req.params.id);
    res.status(204).end();
});
exports.deleteSongEx = deleteSongEx;
const deleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // ✅ Get ID from URL params
    if (!id)
        return res.status(400).json({ message: 'Song ID required' });
    const song = yield Song_1.Song.findOne({ _id: id }).exec();
    if (!song)
        return res.status(400).json({ message: `Song with id:${id} not found` });
    yield Song_1.Song.findByIdAndDelete(id);
    res.status(204).end(); // No content, successfully deleted
});
exports.deleteSong = deleteSong;
const getStatsOverview = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const total = yield Song_1.Song.countDocuments();
    const artists = yield Song_1.Song.distinct('artist');
    const albums = yield Song_1.Song.distinct('album');
    const genres = yield Song_1.Song.distinct('genre');
    res.json({
        totalSongs: total,
        totalArtists: artists.length,
        totalAlbums: albums.length,
        totalGenres: genres.length,
    });
});
exports.getStatsOverview = getStatsOverview;
const getStatsByGenre = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Song_1.Song.aggregate([
        { $group: { _id: '$genre', count: { $sum: 1 } } }
    ]);
    res.json(data);
});
exports.getStatsByGenre = getStatsByGenre;
