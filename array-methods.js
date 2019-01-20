var dataset = require('./dataset.json');
let bankBalances = dataset.bankBalances;

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
const getAmounts = (i) => {
  return i.amount > 100000;
}

var hundredThousandairs = bankBalances.filter(getAmounts);

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object

const getSums = (add, curr) => {
  return add + parseInt(curr.amount)
};

var sumOfBankBalances = bankBalances.reduce(getSums, 0);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest dollar 
  and then sum it all up into one value saved to `sumOfInterests`
 */

const filteredStates = (i) => {
  let states = ['DE', 'WI', 'OH', 'IL', 'WY', 'GA'];
  return states.includes(i.state)
};

const getSomeInterest = (add, curr) => {
  return add + Math.round(parseInt(curr.amount) * 0.189);
};

var sumOfInterests = bankBalances.filter(filteredStates).reduce(getSomeInterest, 0)

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest dollar

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */
const aggregatedSums = (acct, curr) => {
  if (acct.hasOwnProperty(curr.state)) {
    acct[curr.state] += Math.round(parseInt(curr.amount));
  } else {
    acct[curr.state] = Math.round(parseInt(curr.amount));
  }
  return acct;
}

var stateSums = bankBalances.reduce(aggregatedSums, {});

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest dollar before moving on.
  )
 */

var sumOfHighInterests = bankBalances.filter(i => {
  return !['WI', 'IL', 'WY', 'OH', 'GA', 'DE'].includes(i.state)
}).reduce((acct, curr) => {
  let interest = Math.round(stateSums[curr] * 0.189);
})


/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
var lowerSumStates = null;

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
var higherStateSums = null;

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs: hundredThousandairs,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};