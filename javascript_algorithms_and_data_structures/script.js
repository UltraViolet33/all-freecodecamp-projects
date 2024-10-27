function palindrome(str) {
  return (
    str.replace(/[\W_]/g, "").toLowerCase() ===
    str.replace(/[\W_]/g, "").toLowerCase().split("").reverse().join("")
  );
}
console.log(palindrome("almostomla"));

function convertToRoman(num) {
  const romanNbList = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];

  const decimalNbList = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

  const romanNb = [];

  for (let i = 0; i < decimalNbList.length; i++) {
    for (let j = 0; j < romanNbList.length; j++) {
      while (num >= decimalNbList[i]) {
        romanNb.push(romanNbList[i]);
        num -= decimalNbList[i];
      }
    }
  }

  return romanNb.join("");
}

convertToRoman(36);

function rot13(str) {
  const alphabetList = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const new_string = [];

  for (let i = 0; i < str.length; i++) {
    // non alphabetic characters
    if (alphabetList.indexOf(str[i]) === -1) {
      new_string.push(str[i]);
    } else {
      let index = alphabetList.indexOf(str[i]);

      let new_index = index - 13;

      if (new_index < 0) {
        new_index = alphabetList.length - Math.abs(new_index);
      }

      new_string.push(alphabetList[new_index]);
    }
  }
  return new_string.join("");
}

function telephoneCheck(str) {
  const rex1 = /^(1\s?)?\d{3}([-\s]?)\d{3}\2\d{4}$/;
  const rex2 = /^(1\s?)?\(\d{3}\)\s?\d{3}[-\s]?\d{4}$/;

  return rex1.test(str) || rex2.test(str);
}

telephoneCheck("555-555-5555");

function checkCashRegister(price, cash, cid) {
  const denomination = [10000, 200, 1000, 500, 100, 25, 10, 5, 1];

  function transaction(price, cash, cid) {
    let changeNeeded = (cash - price) * 100;
    let moneyProvided = [
      ["ONE HUNDRED", 0],
      ["TWENTY", 0],
      ["TEN", 0],
      ["FIVE", 0],
      ["ONE", 0],
      ["QUARTER", 0],
      ["DIME", 0],
      ["NICKEL", 0],
      ["PENNY", 0],
    ];

    let availCash = [...cid].reverse().map((el) => [el[0], el[1] * 100]);
    // console.log("available cash " + availableCash);
    let sumOfCash = availCash.reduce((a, b) => a + b[1], 0) / 100;

    // console.log("sumOfCash  " + sumOfCash);
    if (sumOfCash === changeNeeded / 100) {
      return { status: "CLOSED", change: [...cid] };
    } else
      for (let i = 0; i < availCash.length; i++) {
        while (denomination[i] <= changeNeeded && availCash[i][1] > 0) {
          moneyProvided[i][1] += denomination[i];
          changeNeeded -= denomination[i];
          availCash[i][1] -= denomination[i];
        }
      }
    let change = moneyProvided
      .map((el) => [el[0], el[1] / 100])
      .filter((el) => el[1] !== 0);

    let changeTotal = change.reduce((a, b) => a + b[1], 0);
    if (changeTotal < changeNeeded) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    }

    return { status: "OPEN", change };
  }

  let answer = transaction(price, cash, cid);
  return answer;
}

checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);
