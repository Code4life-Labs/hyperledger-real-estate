// Base Class

export class API {
  base!: string;

  constructor(base: string) {
    this.base = base;
  }

  get [Symbol.toStringTag]() {
    return "API";
  }
}