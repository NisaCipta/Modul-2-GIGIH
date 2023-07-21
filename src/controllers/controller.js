import express from "express";
import bodyParser from "body-parser";

import morgan from "morgan";

import playlistService from "./../services/service.js";
import playlistRepo from "./../models/model.js";

const app = express();

app.use(bodyParser.json());
app.use(morgan("combined"));

const validateData = (title, artist, url) => {
  if (title == null || title == undefined || title == "" || title == Number || !title) {
    throw new Error("Title not true");
  }

  if (artist == null || artist == undefined || artist == "" || artist == Number || !artist) {
    throw new Error("Artist not true");
  }

  if (url == null || url == undefined || url == "" || url == Number || !url) {
    throw new Error("url not true");
  }
};

app.get("/", (req, res) => {
  res.render("index.ejs");
});

function responGenerate(code, message, data) {
  return {
    code: code,
    message: message,
    data: data,
  };
}

// Daftar Putar lagu, awalnya
app.post("/playlist", async (req, res) => {
  try {
    let payload = req.body;
    const song = playlistService.createSong(payload);
    res.status(201).json(responGenerate(201, "success created song", song));
  } catch (error) {
    res.status(400).json("error create song");
  }
});

app.get("/playlist", async (req, res) => {
  try {
    const song = playlistService.getAllSong();
    res.status(200).json(responGenerate(200, "success get all song", song));
  } catch (error) {
    res.status(400).json("error Get all song");
  }
});

app.get("/playlist/popular", async (req, res) => {
  try {
    const song = playlistService.getSortAllSong();
    res.status(200).json(responGenerate(200, "success get all song", song));
  } catch (error) {
    res.status(400).json("error Get all sort song");
  }
});

app.get("/playlist/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const song = playlistService.getById(id);
    res.status(201).json(responGenerate(201, "success get song by id", song));
  } catch (error) {
    res.status(400).json("error Get song by id");
  }
});

app.put("/playlist/:id", async (req, res) => {
  try {
    // get param from url not from query params
    const id = req.params.id;

    // proses build object song. passing req.body
    const payloadSong = playlistRepo.validateSong(req.body);

    const updatedSong = playlistService.updateSong(id, payloadSong);
    res.status(201).json(responGenerate(201, "success update song by id", updatedSong));
  } catch (error) {
    res.status(400).json("error update song by id");
  }
});

app.delete("/playlist/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteSong = playlistService.deleteSong(id);
    res.status(201).json(responGenerate(201, "success delete song by id", deleteSong));
  } catch (error) {
    res.status(400).json("error delete song by id");
  }
});

app.get("/playlist/play/:index", async (req, res) => {
  try {
    const id = req.params.index;
    const urlSong = playlistService.playSong(id);
    res.redirect(urlSong);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default app;
