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
let states = ['DE', 'WI', 'OH', 'IL', 'WY', 'GA']
const filteredStates = (i) => {
  return states.includes(i.state);
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
let filterStates = (states, acct) => {
  if (!['DE', 'WI', 'OH', 'IL', 'WY', 'GA'].includes(acct.state)) {
    !states.includes(acct.state) ? states.push(acct.state) : states;
  }
  return states;
}; //filters out unwanted states & pushes the rest into an array

let higherInt = (int, state) => {
  let sum = Math.round(stateSums[state] * 0.189);

  sum > 50000 ? int += sum : int;

  return int;
} //calculates the summed interest of values over 50k


var sumOfHighInterests = bankBalances.reduce(filterStates, []).reduce(higherInt, 0);
/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
const abbreviations = (states, acct) => {
  let state = acct.state;
  !states.includes(state) ? states.push(state) : states;
  return states;
}; // creates array of two-letter state abbreviations

var lowerSumStates = bankBalances.reduce(abbreviations, []).filter(state => {
  return stateSums[state] < 1000000
});

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */

var higherStateSums = bankBalances.reduce(abbreviations, []).reduce((add, curr) => {
  if (stateSums[curr] > 1000000) {
    return add += stateSums[curr];
  } else {
    return add;
  }
}, 0);

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
var areStatesInHigherStateSum = states.every(amt => {
  return stateSums[amt] > 2550000
});

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
var anyStatesInHigherStateSum = states.some(amt => {
  return stateSums[amt] > 2550000
});


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