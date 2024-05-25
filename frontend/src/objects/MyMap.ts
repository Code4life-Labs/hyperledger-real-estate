/**
 * This my is same as Map of Javascript, but has more convenient methods
 */
export class MyMap<K, V> extends Map<K, V> {
  /**
   * Use to map a MyMap to another type. Receive a callback and return an array of elements
   * that are returned by callback.
   * @param fn 
   * @returns 
   */
  map<R>(fn: (value: V | undefined, key: K, index: number) => R) {
    let rs: Array<R> = [];
    let keys = this.keys();
    let index = 0;
    for (let key of keys) {
      let r = fn(this.get(key), key, index);
      if(r) rs.push(r);
      index++;
    }

    return rs;
  }

  /**
   * Use this function to check the value in map.
   * If there are one or some value(s) satify the condition in `fn`,
   * return true.
   * @param fn 
   */
  some(fn: (value: V | undefined, key: K) => boolean) {
    let keys = this.keys();
    let result = false;
    for (let key of keys) {
      result = fn(this.get(key), key);
      if(result) return result;
    }
  }

  /**
   * Use this function to check the value in map.
   * If there are just one value doesn't satisfy the condition in `fn`,
   * return false.
   * @param fn 
   */
  every(fn: (value: V | undefined, key: K) => boolean) {
    let keys = this.keys();
    let result = false;
    for (let key of keys) {
      result = fn(this.get(key), key);
      if(!result) return result;
    }
  }

  /**
   * Use this method to get an __array__ of value from `from` index to `to` index.
   * Have a option for kind of return value (key, value or both).
   * @param from 
   * @param to 
   */
  inRange<R>(from?: number, to?: number, valueType: "key" | "value" | "both" = "value") {
    let result = [];
    let pointer = 0;
    let entries = this.entries();

    if(!from) from = 0;
    if(!to) to = this.size;

    for(let entry of entries) {
      if(pointer >= from! && pointer <= to!) {
        if(valueType === "value") {
          result.push(entry[1]);
        }

        if(valueType === "key") {
          result.push(entry[0]);
        }

        if(valueType === "both") {
          result.push(entry);
        }

      }

      if(pointer > to) break;

      pointer += 1;
    }

    return result as R;
  }

  /**
   * Use to convert a MyMap to an object with keys as properties.
   * @returns
   */
  toObject(): object {
    let o: any = {};
    let keys = this.keys();
    for (let key of keys) {
      o[key] = this.get(key);
    }
    return o;
  }
}