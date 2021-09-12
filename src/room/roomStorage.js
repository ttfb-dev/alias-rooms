import prs from "../prs.js";

const storageKeys = {
  settings: "settings",
};

export const defaultValues = {
  name: "",
  lang: "",
  stepDuration: 60,
  scoreToWin: 60,
  takeOffScore: true,
};

export const storage = {
  getSetting: async (roomId, key) => {
    return (await storage.getSettings(roomId)[key]) ?? defaultValues[key];
  },

  getSettings: async (roomId) => {
    const settings = await prs.getRoomParam(
      roomId,
      storageKeys.settings,
      defaultValues
    );

    return storage.fillWithMissSettings(settings);
  },

  setSetting: async (roomId, key, value) => {
    const setting = {};
    setting[key] = value;
    return await storage.setSettings(roomId, setting);
  },

  setSettings: async (roomId, settings) => {
    const currSettings = await storage.getSettings(roomId);
    const newSettings = { ...currSettings, ...settings };

    await prs.setRoomParam(roomId, storageKeys.settings, newSettings);
  },

  fillWithMissSettings: (settings) => {
    return { ...defaultValues, ...settings };
  },
};
