// data playlist
const playlists = [];

// ({ title, artist, url, count_play }) -> proses destucturing
const validateSong = ({ title, artist, url, count_play }) => {
  let song = {
    title: title,
    artist: artist,
    url: url,
    count_play: count_play,
  };

  return song;
};

// generate id custom
function generateId() {
  return Math.random().toString(10).substr(2, 6);
}

// mendapatkan semua playlist
function getAllSong() {
  return playlists;
}

function getSortAllSong() {
  return playlists.sort((playlistA, playlistB) => {
    return playlistB.count_play - playlistA.count_play;
  });
}

function playSong(id) {
  let song = getSongById(id);
  song.count_play = song.count_play + 1;
  return song.url;
}

// mendapatkan lagu by id
const getSongById = (id) => {
  const song = playlists.find((song) => {
    return song.id === id;
  });
  return song;
};

// menambah lagu ke playlists
const createSong = (payload) => {
  let song = validateSong(payload);

  let songWithID = {
    id: generateId(),
    ...song,
    count_play: 0,
  };
  // push song kedalam array playlist
  playlists.push(songWithID);

  return songWithID;
};

// update lagu pada playlist
const updateSong = (id, payloadSong) => {
  let song = getSongById(id);

  if (payloadSong.title != "") {
    song.title = payloadSong.title;
  }

  if (payloadSong.artist != "") {
    song.artist = payloadSong.artist;
  }

  if (payloadSong.url != "") {
    song.url = payloadSong.url;
  }

  if (payloadSong.count_play != 0) {
    song.count_play = payloadSong.count_play;
  }
};

const deleteSong = (id) => {
  let song = getSongById(id);
  let index = playlists.indexOf(song);
  // splice => (index yang akan didelete, delete 1 data)
  playlists.splice(index, 1);
};

export default { createSong, getSongById, getAllSong, updateSong, deleteSong, validateSong, playSong, getSortAllSong };
