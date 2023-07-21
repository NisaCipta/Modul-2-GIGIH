import playlistRepo from "./../models/model.js";

const getAllSong = () => {
  return playlistRepo.getAllSong();
};

const getById = (id) => {
  let song = playlistRepo.getSongById(id);

  if (!song) {
    throw new Error("song is not found");
  }

  return song;
};

const createSong = (song) => {
  return playlistRepo.createSong(song);
};

const updateSong = (id, payloadSong) => {
  // cek song
  let song = playlistRepo.getSongById(id);

  if (!song) {
    throw new Error("song is not found");
  }

  // update song
  playlistRepo.updateSong(id, payloadSong);

  return;
};

const playSong = (id) => {
  let song = playlistRepo.getSongById(id);

  if (!song) {
    throw new Error("song is not found");
  }

  return playlistRepo.playSong(id);
};

const deleteSong = (id) => {
  let song = playlistRepo.getSongById(id);

  if (!song) {
    throw new Error("song is not found");
  }

  playlistRepo.deleteSong(id);
  return;
};

const getSortAllSong = () => {
  return playlistRepo.getSortAllSong();
};

export default {
  getAllSong,
  getById,
  createSong,
  updateSong,
  deleteSong,
  playSong,
  getSortAllSong,
};
