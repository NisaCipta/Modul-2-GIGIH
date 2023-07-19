const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Daftar Putar lagu, awalnya
let playlist = [];

// ADD lagu
app.post("/playlist", (req, res) => {
  const { title, artist, url } = req.body;
  let id = playlist.length + 1;
  let countplay = 0;
  const song = {
    id,
    title,
    artist,
    url,
    countplay,
  };
  playlist.push(song);
  res.status(201).json({ message: "Lagu berhasil ditambahkan" });
});

// GET lagu
app.get("/playlist", (req, res) => {
  res.status(200).json(playlist);
});

// GET lagu popular
app.get("/playlist/popular", (req, res) => {
  const popular = req.params.popular;
  if (popular >= 0 && popular < playlist.length) {
    const song = playlist.sort(
      (countplay = (a, b) => {
        res.status(200).json(playlist(a-b));
        return song
      })
    );
  } else {
    res.status(404).json({ message: "Lagu tidak ada" });
  }
});

// Update lagu
app.put("/playlist/:index", (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < playlist.length) {
    const { title, artist, url } = req.body;
    const updatedSong = { title, artist, url };
    playlist[index] = updatedSong;
    res.status(200).json({ message: "Lagu berhasil di update" });
  } else {
    res.status(404).json({ message: "lagu tidak ada" });
  }
});

//delete lagu
app.delete("/playlist/:index", (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < playlist.length) {
    playlist.splice(index, 1);
    res.status(200).json({ message: "Lagu berhasil dihapus " });
  } else {
    res.status(404).json({ message: "lagu tidak ada" });
  }
});

// Memainkan lagu dari daftar putar
app.get("/playlist/play/:index", (req, res) => {
  const index = req.params.index;
  if (index >= 0 && index < playlist.length) {
    const song = playlist[index];
    playlist[index].countplay++;
    res.redirect(song.url);
  } else {
    res.status(404).json({ message: "Lagu tidak ada" });
  }
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
