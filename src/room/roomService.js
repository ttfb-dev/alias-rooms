import { storage, defaultValues } from "./roomStorage.js";
import logger from "../logger.js";

const settingKeys = [
  "name",
  "lang",
  "stepDuration",
  "scoreToWin",
  "takeOffScore",
];

export const defaultSettings = defaultValues;

const validator = {
  name: (name) => {
    return typeof name === "string" && name.length > 0 && name.length < 20;
  },
  lang: () => {
    return true;
  },
  stepDuration: (duration) => {
    return typeof duration === "number" && duration <= 90 && duration >= 30;
  },
  scoreToWin: (points) => {
    return typeof points === "number" && points <= 90 && points >= 30;
  },
  takeOffScore: (value) => {
    return typeof value === "boolean";
  },
};

const roomService = {
  getAll: async (roomId) => {
    return await storage.getSettings(roomId);
  },

  get: async (roomId, key) => {
    return await storage.getSetting(roomId, key);
  },

  setAll: async (roomId, settings) => {
    for (const key in settings) {
      const value = settings[key];
      if (!roomService.isSettingValid({ key, value })) {
        logger.critical("invalid setting", { key, value });
        delete settings[key];
      }
    }

    return await storage.setSettings(roomId, settings);
  },

  set: async (roomId, key, value) => {
    if (!roomService.isSettingValid({ key, value })) {
      logger.critical("invalid setting", { key, value });
      throw new Error("Invalid settings");
    }

    return await storage.setSetting(roomId, key, value);
  },

  isSettingValid: ({ key, value }) => {
    return settingKeys.includes(key) && validator[key](value);
  },
};

export default roomService;
