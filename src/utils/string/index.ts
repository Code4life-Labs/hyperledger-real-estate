import { concateCallBack } from "./index.types";

/**
 * Use to concatenate string. Pass a string to first parameter and pass other strings,
 * functions or just a string to second parameter.
 * @param o original string, is a string you want to be concatenated with `vals`.
 * @param vals can be a function, string, array of function or array of string.
 * @returns 
 */
function concate(o: string, vals: Array<string | typeof concateCallBack | undefined> | string | typeof concateCallBack | undefined) {
  if(Array.isArray(vals)) {
    for(let val of vals) {
      o = concate(o, val);
    }
    return o;
  }

  if(typeof vals === "string") {
    if(!vals) return vals;
    return o + " " + vals;
  }

  if(typeof vals === "function" && vals()) {
    return o + " " + vals();
  } else {
    return o;
  }
}

export const StringUtils = {
  concate
};