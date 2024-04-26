'use strict';

const balanceTransfer = require('./lib/balanceTransfer');

module.exports.BalanceTransfer = balanceTransfer;
module.exports.contracts = [balanceTransfer];