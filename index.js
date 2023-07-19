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

function generateResponse(code, message, data) {
    return {
        code: code,
        message: message,
        data: data,
    };
}

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
    // by artis -> req.params.artis = ?

    // pastikan playlist tidak kosong
    if (playlist.length == 0) {
        res.status(404).json(generateResponse(404, "lagu tidak ada", null));
        return;
    }

    // kalau ada, sort dia berdasrkan count_play
    // id,
    // title,
    // artist,
    // url,
    // countplay,
    playlist.sort((playA, playB) => playB.countplay - playA.countplay);

    res.status(200).json(
        generateResponse(
            200,
            "berhasil mendapatkan list song populer",
            playlist
        )
    );
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
// datanya array atau object
app.get("/playlist/play/:id", (req, res) => {
    // pastikan playlist tidak kosong
    if (playlist.length == 0) {
        res.status(404).json(generateResponse(404, "lagu tidak ada", null));
        return;
    }

    // get index
    const id = req.params.id;

    // find object by id == index
    let song = playlist.find((item) => {
        // playlists => array
        //   playlist = {
        //     id,
        //     title,
        //     artist,
        //     url,
        //     countplay,
        // }; // object
        if (playlist.id == id) {
            item.countplay++;
            return item;
        }
    });

    // jika song tidak ada
    if (song === undefined || song === null) {
        res.status(404).json(generateResponse(404, "lagu tidak ada", null));
        return;
    }

    // langsung redirect
    res.redirect(song.url);
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
