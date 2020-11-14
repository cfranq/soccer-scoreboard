//requiring filesystem from node's modules
const fs = require("fs");
//saving text file path to a variable
const matches = "scores.txt";
//using the readFile method from fs to obtain the data inorder to parse through it
let readData = fs.readFileSync(matches, "utf8");
//spliting data into separate line for each match
let eachMatch = readData.split("\n");
//empty array literal to push key value pair of team name and score for each match
let array = [];
//iterating through the array of of objects-each index is an obj of each match
for (let i = 0; i < eachMatch.length; i++) {
  array.push({ [i]: eachMatch[i].split(",") });
}
//console.log(array, ":array")
let arr = [];
//iterate to each index to create key:value pairs in each obj
for (let i = 0; i < array.length; i++) {
  let indexZero = array[i][i][0];
  let indexOne = array[i][i][1];
  //console.log('indexOne:', indexOne)
  //isolating the team name from the score in the first team
  let team = indexZero.substring(0, indexZero.length - 1);
  let score = parseInt(indexZero.substring(indexZero.length - 1));

  //isolating the team name from the score in the second team
  let team2 = indexOne.substring(0, indexOne.length - 1);
  let score2 = parseInt(indexOne.substring(indexOne.length - 1));

  //creating an empty obj literal to store key:value pairs
  let obj = {};

  //creating key:value pairs for teamName:number score
  obj[team.trim()] = score;
  obj[team2.trim()] = score2;

  arr.push(obj);
}
//obj literal to push sum of final scores
let finalScores = {};
//this first for loop checks each match. If the first team listed is greater then the second it will add 3pts and the other team will add 0pts
for (let i = 0; i < arr.length; i++) {
  let values = Object.values(arr[i]);
  let keys = Object.keys(arr[i]);
  if (values[0] > values[1]) {
    if (finalScores.hasOwnProperty([keys[0]])) {
      finalScores[keys[0]] += 3;
    } else {
      finalScores[keys[0]] = 3;
    }
    if (finalScores.hasOwnProperty([keys[1]])) {
      finalScores[keys[1]] += 0;
    } else {
      finalScores[keys[1]] = 0;
    }
  }
}
//this for loop is similar to the one above except it checks if the second team is greater in order to add the 3pts.
//this is breaking the DRY rule but I broke it down in chuncks to make it easier to follow along
for (let i = 0; i < arr.length; i++) {
  let values = Object.values(arr[i]);
  let keys = Object.keys(arr[i]);
  if (values[0] < values[1]) {
    if (finalScores.hasOwnProperty([keys[0]])) {
      finalScores[keys[0]] += 0;
    } else {
      finalScores[keys[0]] = 0;
    }
    if (finalScores.hasOwnProperty([keys[1]])) {
      finalScores[keys[1]] += 3;
    } else {
      finalScores[keys[1]] = 3;
    }
  }
}
//lasting this for loop checks for ties and adds 1pt to each team
for (let i = 0; i < arr.length; i++) {
  let values = Object.values(arr[i]);
  let keys = Object.keys(arr[i]);
  if (values[0] === values[1]) {
    if (!finalScores[keys[0]]) {
      finalScores[keys[0]] = 1;
    } else {
      finalScores[keys[0]] += 1;
    }
    if (!finalScores[keys[1]]) {
      finalScores[keys[1]] = 1;
    } else {
      finalScores[keys[1]] += 1;
    }
  }
}

//after the summation of all the final scores this code below sorts the keys and values from ascending to descending order
let scores = Object.values(finalScores).sort();
let keys = Object.keys(finalScores);
let sortedKeys = keys.sort(function (a, b) {
  return finalScores[a] - finalScores[b];
});
let rankedKeys = keys.reverse();
let rankedScores = scores.reverse();

//this for loop collects the indices of the tied scores
let tiedTeams = [];
for (let i = 0; i < rankedScores.length; i++) {
  if (rankedScores[i] === rankedScores[i + 1]) {
    tiedTeams.push(i, i + 1);
  }
}
//gets rid of duplicates from the above function
let uniqueIndices = [...new Set(tiedTeams)];

//splitting the ranked key into beginning, middle(temp), and end inorder to sort the tied teams' name in alphabetical order and then merge all array together
let beginningOfArr = rankedKeys.slice(0, uniqueIndices[0]);
let temp = rankedKeys.splice(uniqueIndices[0], uniqueIndices.length);
let sortedTies = temp.sort();
let endOfArr = rankedKeys.slice(uniqueIndices.length - 1, rankedKeys.length);
let finalOrder = beginningOfArr.concat(sortedTies, endOfArr);

//below if the for loop responsible for numerating the teams in their rank order and ensuring tied teams have the same number ranking
let finalCount = [];
let j = 0;

for (i = 0; i < rankedScores.length; i++) {
  let current = rankedScores[i];
  let previous = rankedScores[i - 1];
  j++;
  if (current !== previous) {
    finalCount.push(j + ". " + finalOrder[i] + " " + rankedScores[i]);
  }
  if (current === previous) {
    finalCount.push(
      uniqueIndices[0] + 1 + ". " + finalOrder[i] + " " + rankedScores[i]
    );
  }
}


console.log("finalCount:", finalCount);


