import express from "express";
import roomService, { defaultSettings } from "./room/roomService.js";
import logger from "./logger.js";

const app = express();
const port = 80;
app.use(express.json());

app.get("/room/:room_id/settings/default", async (req, res) => {
  const roomId = req.params.room_id;
  try {
    res.status(200).json(defaultSettings);
  } catch (e) {
    logger.critical(e.message, { path: `/room/${roomId}/settings/default` });
    res.status(400).send();
  }
});

app.get("/room/:room_id/settings", async (req, res) => {
  const roomId = req.params.room_id;
  try {
    const settings = await roomService.getAll(roomId);
    res.status(200).json(settings);
  } catch (e) {
    logger.critical(e.message, { path: `/room/${roomId}/settings` });
    res.status(400).send();
  }
});

app.get("/room/:room_id/setting/:key", async (req, res) => {
  const roomId = req.params.room_id;
  const key = req.params.key;
  try {
    const setting = await roomService.get(roomId, key);
    res.status(200).json(setting);
  } catch (e) {
    logger.critical(e.message, { path: `/room/${roomId}/setting/${key}` });
    res.status(400).send();
  }
});

app.post("/room/:room_id/settings", async (req, res) => {
  const roomId = req.params.room_id;
  const settings = req.body;
  try {
    await roomService.setAll(roomId, settings);
    res.status(200);
  } catch (e) {
    logger.critical(e.message, { path: `/room/${roomId}/settings` });
    res.status(400).send();
  }
});

app.post("/room/:room_id/setting/:key", async (req, res) => {
  const roomId = req.params.room_id;
  const key = req.params.key;
  const value = req.body;
  try {
    await roomService.set(roomId, { key, value });
    res.status(200);
  } catch (e) {
    logger.critical(e.message, { path: `/room/${roomId}/setting/${key}` });
    res.status(400).send();
  }
});

app.get("/", async (req, res) => {
  res.status(200).send();
});

app.listen(port);
