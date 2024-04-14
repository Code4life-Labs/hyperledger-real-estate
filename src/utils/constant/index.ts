/**
 * This constant file is similar with `env/index.ts` of server project. It's primary task
 * is load all the environment variables in `.env` file (Root Directory) and store as
 * Javascript Object.
 */

/**
 * The base endpoint of primary API.
 */
export const API_ROOT = import.meta.env.VITE_API_ROOT;
export const WS_MESSAGE_KEYS = {
  VITE_NOT_EXIST_ROOM: import.meta.env.VITE_NOT_EXIST_ROOM,
  VITE_FULL_ROOM: import.meta.env.VITE_FULL_ROOM,
  VITE_WRONG_PASSWORD: import.meta.env.VITE_WRONG_PASSWORD,
  VITE_CREATE_GAME_SUCCESSFULLY: import.meta.env.VITE_CREATE_GAME_SUCCESSFULLY,
  VITE_DISCONNECTED: import.meta.env.VITE_DISCONNECTED,
  VITE_RECONNECTED: import.meta.env.VITE_RECONNECTED,
  VITE_LEAVE_GAME: import.meta.env.VITE_LEAVE_GAME,
  VITE_RECONNECTED_GAME_SUCCESSFULLY: import.meta.env.VITE_RECONNECTED_GAME_SUCCESSFULLY,
  VITE_HANDSHAKE: import.meta.env.VITE_HANDSHAKE,
  VITE_JOIN_GAME: import.meta.env.VITE_JOIN_GAME
};
export const GDRIVE_FOLDERS = {
  VITE_GDRIVE_TEXT: import.meta.env.VITE_GDRIVE_TEXT,
  VITE_GDRIVE_ABOUT: import.meta.env.VITE_GDRIVE_ABOUT
};
export const LANG_CODES = import.meta.env.VITE_LANGUAGE_CODES.split(";");
export const ROUTES = {
  Home: "/",
  Game: "/game",
  GameOnline: "/game/online",
  GameOffline: "/game/offline",
  GameRooms: "/rooms",
  Settings: "/settings"
};