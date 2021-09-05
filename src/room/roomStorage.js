import prs from "../prs.js";

const storageKeys = {
  settings: "settings",
};

const defaultValues = {
  name: "",
  lang: "",
  stepDuration: 60,
  pointsToWin: 60,
};

export const storage = {
  getSetting: async (roomId, key) => {
    return (await storage.getSettings(roomId)[key]) ?? defaultValues[key];
  },

  getSettings: async (roomId) => {
    return await prs.getRoomParam(roomId, storageKeys.settings, defaultValues);
  },

  setSetting: async (roomId, key, value) => {
    return await storage.setSetting(roomId, [{ key, value }]);
  },

  setSettings: async (roomId, settings) => {
    const currSettings = await this.getSettings(roomId);
    for (const setting of settings) {
      currSettings[setting.key] = setting.value;
    }

    await prs.setRoomParam(roomId, storageKeys.settings, currSettings);
  },
};
