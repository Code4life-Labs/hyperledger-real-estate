'use strict';

const { Contract } = require('fabric-contract-api');

const accountObjType = "Account";

/**
 * Use this function to validate balance of an account, and receive a validated balance.
 * @param {number} balance 
 * @returns 
 */
function validateBalance(balance) {
  const accountBalance = parseFloat(balance);
  if (accountBalance < 0) {
    throw new Error(`account balance cannot be negative`);
  }
  return accountBalance;
}

class BalanceTransfer extends Contract {
  /**
   * Use this method init a new account.
   * @param ctx 
   * @param {string} id 
   * @param {number} balance 
   */
  async initAccount(ctx, id, balance) {
    if (!ctx.clientIdentity.assertAttributeValue("init", "true")) {
      throw new Error(`you don't have permissions to initialize an account`);
    }

    const accountBalance = validateBalance(balance);

    if (await this._accountExists(ctx, id)) {
      throw new Error(`the account ${id} already exists`);
    }

    const account = this._generateAccount(ctx, id, accountBalance);

    await this._putAccount(ctx, account);
  }

  /**
   * Use this method to set new balance of an existed account. Look like this method has
   * same implementation with `initAccount`, but it interacts with existed account instead of
   * new account.
   * @param ctx 
   * @param {string} id 
   * @param {number} newBalance 
   */
  async setBalance(ctx, id, newBalance) {
    const accountBalance = validateBalance(newBalance);

    if (!(await this._accountExists(ctx, id))) {
      throw new Error(`the account ${id} doesn't exist`);
    }

    const account = this._generateAccount(ctx, id, accountBalance);

    await this._putAccount(ctx, account);
  }

  /**
   * Use this method to transfer an amount of balance from account A with `idFrom` to
   * account B with `idTo`
   * @param ctx 
   * @param {string} idFrom 
   * @param {string} idTo 
   * @param {number} amount 
   */
  async transfer(ctx, idFrom, idTo, amount) {
    // Validate accounts
    let isTransactionValid = (await Promise.all([this._accountExists(ctx, idFrom), this._accountExists(ctx, idTo)])).every(check => check === true);
    if(!isTransactionValid) {
      throw new Error(`the account ${idFrom} or ${idTo} doesn't exists or both of them don't exist`);
    }

    // Validate owner
    let isOwner = await this._validateOwner(ctx, idFrom);
    if(!isOwner) {
      throw new Error(`the account ${idFrom} doesn't have any permission to do this`);
    }

    const [from, to] = await Promise.all([
      this._getAccount(ctx, idFrom), this._getAccount(ctx, idTo)
    ]);

    amount = parseFloat(amount);
    amount = validateBalance(amount);

    let newBalanceOfFrom = validateBalance(parseFloat(from.balance) - amount);

    to.balance = parseFloat(to.balance) + amount;
    from.balance = newBalanceOfFrom;

    await Promise.all([
      this._putAccount(ctx, from), this._putAccount(ctx, to)
    ]);
  }

  /**
   * Use this method to list all account
   * @param ctx 
   */
  async listAccounts(ctx) {
    // const queryString = `{"selector":{"date":{"year":${year}}},"use_index":["_design/indexYearDoc", "indexYear"]}`;
    // Queries all
    const limit = 5;
    const skip = 0;
    const owner = this._getTxCreatorUID(ctx);
    // const queryString = `{"selector":{ "owner": ${owner} }, "limit": ${limit}, "skip": ${skip}}`;
    // const queryString = `{"selector":{ "id": "A1" }, "limit": ${limit}, "skip": ${skip}}`;
    const queryString = `{"selector":{}}`;
    const iteratorPromise = ctx.stub.getQueryResult(queryString);

    let results = [];

    for await(const res of iteratorPromise) {
      const account = JSON.parse(res.value.toString());
      if(account.owner === owner)
        results.push(account);
    };

    return JSON.stringify(results);
  }

  //
  // ALL "PRIVATE" METHODS
  //
  _getTxCreatorUID(ctx) {
    return JSON.stringify({
      mspid: ctx.clientIdentity.getMSPID(),
      id: ctx.clientIdentity.getID()
    });
  }

  _generateAccount(ctx, id, balance) {
    return {
      id,
      owner: this._getTxCreatorUID(ctx),
      balance
    }
  }

  async _validateOwner(ctx, id) {
    const account = await this._getAccount(ctx, id);
    const owner = this._getTxCreatorUID(ctx);
    
    if(account.owner === owner) return true;

    return false;
  }

  async _accountExists(ctx, id) {
    const compositeKey = ctx.stub.createCompositeKey(accountObjType, [id]);
    const accountBytes = await ctx.stub.getState(compositeKey);
    return accountBytes && accountBytes.length > 0;
  }

  async _getAccount(ctx, id) {
    const compositeKey = ctx.stub.createCompositeKey(accountObjType, [id]);

    const accountBytes = await ctx.stub.getState(compositeKey);
    if (!accountBytes || accountBytes.length === 0) {
      throw new Error(`the account ${id} does not exist`);
    }

    return JSON.parse(accountBytes.toString());
  }

  async _putAccount(ctx, account) {
    const compositeKey = ctx.stub.createCompositeKey(accountObjType, [account.id]);
    await ctx.stub.putState(compositeKey, Buffer.from(JSON.stringify(account)));
  }
}

module.exports = BalanceTransfer;