'use strict';

const { Contract } = require('fabric-contract-api');

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
  "length",
  "width",
  "parts",
  "no",
  "localNo"
];

class RealEstate extends Contract {
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
  async listRealEstates(ctx) {
    // const queryString = `{"selector":{"date":{"year":${year}}},"use_index":["_design/indexYearDoc", "indexYear"]}`;
    // Queries all
    const limit = 5;
    const skip = 0;
    // const queryString = `{"selector":{ "owner": ${owner} }, "limit": ${limit}, "skip": ${skip}}`;
    // const queryString = `{"selector":{ "id": "A1" }, "limit": ${limit}, "skip": ${skip}}`;
    const queryString = `{"selector":{}}`;
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
    data.length = typeof data.length === "string" ? parseInt(data.length) : data.length;
    data.width = typeof data.width === "string" ? parseInt(data.width) : data.width;

    // Check parts of real estate
    let totalLengthOfParts = data.parts.reduce((acc, curr) => { return acc + curr.length }, 0);
    // If total length of parts is greater than real estate's length,
    // that means this is a invalid real estate data
    if(totalLengthOfParts > data.length)
      throw new Error("The total length of parts doesn't match with real estate's length");

    let totalWidthOfParts = data.parts.reduce((acc, curr) => { return acc + curr.width }, 0);
    // If total width of parts is greater than real estate's width,
    // that means this is a invalid real estate data
    if(totalWidthOfParts > data.width)
      throw new Error("The total width of parts doesn't match with real estate's width");

    // If
    //   - total width of parts is equal to real estate's width and total length of parts is less than real estate's length
    //   - total length of parts is equal to real estate's length and total width of parts is less than real estate's width
    // that means this is a invalid real estate data
    if(
      (totalWidthOfParts == data.width && totalLengthOfParts < data.length) ||
      (totalWidthOfParts < data.width && totalLengthOfParts == data.length)
    )
      throw new Error("Use ");

    if(totalWidthOfParts == data.width && totalLengthOfParts == data.length)
      return data;

    // Remaining length and width is use for nothing, It will be placed `useFor = empty`
    data.parts.push({
      width: data.width - totalWidthOfParts,
      length: data.length - totalLengthOfParts,
      useFor: "empty"
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