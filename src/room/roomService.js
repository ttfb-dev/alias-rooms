import { storage, defaultValues } from "./roomStorage.js";
import logger from "../logger.js";

const settingKeys = ["name", "lang", "stepDuration", "pointsToWin"];

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
  pointsToWin: (points) => {
    return typeof points === "number" && points <= 90 && points >= 30;
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
    for (const setting of settings) {
      if (!storage.isSettingValid(setting)) {
        logger.critical("invalid setting", { setting });
        throw new Error("Invalid settings");
      }
    }

    return await storage.setSettings(roomId, settings);
  },

  set: async (roomId, setting) => {
    if (!storage.isSettingValid(setting)) {
      logger.critical("invalid setting", { setting });
      throw new Error("Invalid settings");
    }

    return await storage.setSetting(roomId, setting);
  },

  isSettingValid: (setting) => {
    return settingKeys.includes(setting.key) && validator[key](setting.value);
  },
};

export default roomService;
