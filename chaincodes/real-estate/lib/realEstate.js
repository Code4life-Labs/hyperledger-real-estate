'use strict';

const { Contract } = require('fabric-contract-api');
const __Data__ = require('../data/real_estates_data.json');

const realEstateObjectType = "RealEstate";

/*
  Real Estate Type
  id: string
  ownerIds: Array<string>
  imgs: Array<string>
  length: number
  width: number
  parts: Array<{length: number; width: number; userFor: string}>
  no: string
  localNo: string
*/

const _requiredFields = [
  "id",
  "ownerIds",
  "imgs",
  "area",
  "parts",
  "no",
  "localNo"
];

class RealEstate extends Contract {
  // Init default data
  async init(ctx) {
    await Promise.all(
      __Data__.data.map(realEstate => this._put(ctx, realEstate))
    );
  }

  /**
   * Use this method create and add a new real estate information.
   * @param ctx 
   * @param {string} id 
   * @param {string} data 
   */
  async createRealEstate(ctx, data) {
    data = JSON.parse(data);

    // Check if real estate already exists
    if (await this._realEstateExists(ctx, data.id)) {
      throw new Error(`the real estate ${data.id} already exists`);
    }

    // Validate and generate data
    const validatedData = this._validateData(data);

    await this._put(ctx, validatedData);
  }

  /**
   * Use this method to update real estate
   * @param ctx 
   * @param {string} id 
   * @param {number} newBalance 
   */
  async patchRealEstate(ctx, data) {
    data = JSON.parse(data);

    // Get existed data
    const existedData = this._get(ctx, data.id);

    // Validate and generate data
    const validatedData = this._validateData(Object.assign(existedData, data));

    await this._put(ctx, existedData);
  }

  /**
   * Use this method to get a real estate by id
   * @param ctx 
   * @param {string} id
   */
  async getRealEstate(ctx, id) {
    // const queryString = `{"selector":{"date":{"year":${year}}},"use_index":["_design/indexYearDoc", "indexYear"]}`;
    // Queries all
    // const queryString = `{"selector":{ "owner": ${owner} }, "limit": ${limit}, "skip": ${skip}}`;
    // const queryString = `{"selector":{ "id": "A1" }, "limit": ${limit}, "skip": ${skip}}`;
    const queryString = `{"selector":{ "id": "${id}" }}`;
    const iteratorPromise = ctx.stub.getQueryResult(queryString);

    let results = [];

    for await(const res of iteratorPromise) {
      const realEstate = JSON.parse(res.value.toString());
      results.push(realEstate);
    };

    return JSON.stringify(results[0]);
  }

  /**
   * Use this method to list all real estates
   * @param ctx 
   */
  async listRealEstates(ctx, limit, skip) {
    // const queryString = `{"selector":{"date":{"year":${year}}},"use_index":["_design/indexYearDoc", "indexYear"]}`;
    // Queries all
    limit = limit || 10;
    skip = skip || 0;
    // const queryString = `{"selector":{ "owner": ${owner} }, "limit": ${limit}, "skip": ${skip}}`;
    // const queryString = `{"selector":{ "id": "A1" }, "limit": ${limit}, "skip": ${skip}}`;
    const queryString = `{"selector":{}, "limit": ${limit}, "skip": ${skip}}`;
    const iteratorPromise = ctx.stub.getQueryResult(queryString);

    let results = [];

    for await(const res of iteratorPromise) {
      const realEstate = JSON.parse(res.value.toString());
      results.push(realEstate);
    };

    return JSON.stringify(results);
  }

  //
  // ALL "PRIVATE" METHODS
  //
  async _validateOwner(ctx, id) {
    const o = await this._getRealEstate(ctx, id);
    const owner = this._getTxCreatorUID(ctx);
    
    if(o.owner === owner) return true;

    return false;
  }

  async _realEstateExists(ctx, id) {
    const compositeKey = ctx.stub.createCompositeKey(realEstateObjectType, [id]);
    const realEstateBytes = await ctx.stub.getState(compositeKey);
    return realEstateBytes && realEstateBytes.length > 0;
  }

  _validateData(data) {
    _requiredFields.forEach(field => {
      if(data[field] === undefined || data[field] === null)
        throw new Error(`Real Estate requires [${field}], but cannot found any data name [${field}]`);
    });

    // Adjust some properties
    data.area = typeof data.area === "string" ? parseFloat(data.area) : data.area;

    if(!data.parts || data.parts.length === 0)
      throw new Error("A Real Estate must have purposes of use");

    // Check parts of real estate
    let totalAreaOfParts = data.parts.reduce((acc, curr) => { return acc + curr.area }, 0);
    // If total area of parts is greater than real estate's area,
    // that means this is a invalid real estate data
    if(totalAreaOfParts > data.area)
      throw new Error("The total area of parts doesn't match with real estate's area");

    if(totalAreaOfParts == data.area)
      return data;

    // Remaining length and width is use for nothing, It will be placed `useFor = empty`
    data.parts.push({
      area: data.area - totalAreaOfParts,
      useFor: "unknown"
    });

    return data;
  }

  async _put(ctx, o) {
    const compositeKey = ctx.stub.createCompositeKey(realEstateObjectType, [o.id]);
    await ctx.stub.putState(compositeKey, Buffer.from(JSON.stringify(o)));
  }

  async _get(ctx, id) {
    const compositeKey = ctx.stub.createCompositeKey(realEstateObjectType, [id]);

    const realEstateBytes = await ctx.stub.getState(compositeKey);
    if (!realEstateBytes || realEstateBytes.length === 0) {
      throw new Error(`the real estate ${id} does not exist`);
    }

    return JSON.parse(realEstateBytes.toString());
  }
}

module.exports = RealEstate;