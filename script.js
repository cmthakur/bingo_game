// http://refresh-sf.com/yui
var emptySquare = 12;
var totalSquare = 27;
window.onload = initializePage;

var usedNumbers = new Array(90);

function initializePage() {
    // so older browsers do not get 24 error messages
    if (document.getElementById) {
       var card = document.getElementById("card");
       card.style.display = "none";
       document.getElementById("reload").onclick = anotherCard();
        // enable creating a new card without reloading page
        // generate the new bingo card
        // newCard();
    } else {
        alert("Please enable javascript on your browsers.");
    }
}

function newCard() {
    for (var i = 0; i < 27; i++) {
        // pass the current i as parameter to setSquare function
        setSquare(i);
    }

    var emptyIndexArray = new Array
    var rowOne = new Array(0,1,2,3,4,5,6,7,8);
    var rowTwo = new Array(9,10,11,12,13,14,15,16,17);
    var rowThree = new Array(18,19,20,21,22,23,24,25,26);

    var emptyRowOne =  new Array
    var emptyRowTwo =  new Array
    var emptyRowThree =  new Array

 do{
    var emptyIndex = Math.floor(Math.random()*27);
    if(rowOne.contains(emptyIndex)){
        if(unique(emptyRowOne).length <= 3){
            emptyRowOne.push(emptyIndex);
            emptyIndexArray.push(emptyIndex);
        }
    }else if(rowTwo.contains(emptyIndex)){
        if(unique(emptyRowTwo).length <=3){
            emptyRowTwo.push(emptyIndex);
            emptyIndexArray.push(emptyIndex);
        }
    }else if(rowThree.contains(emptyIndex)){
       if(unique(emptyRowThree).length <= 3){
        emptyRowThree.push(emptyIndex);
        emptyIndexArray.push(emptyIndex);
      }
    }
   emptyIndexArray =  unique(emptyIndexArray);
 }while(emptyIndexArray.length < 12)


//  console.log("Empty Row Index");
//  console.log(unique(emptyRowThree));
//  console.log(unique(emptyRowTwo));
//  console.log(unique(emptyRowOne));

 do{
    document.getElementById("square"+emptyIndexArray.pop(1)).innerHTML = '';
 }while(emptyIndexArray.length > 0)

}


function setSquare(index) {
    // capture current corresponding html square (via id=)  to current digit that was passed over
    var currentIndex = "square" + index;

    // 1st column =>  1 - 9
    // 2nd column =>  10 - 19
    // 3rd column =>  20 - 29
    // 4th column =>  30 - 39
    // 5th column =>  40 - 49
    // 6th column =>  50 - 59
    // 7th column =>  60 - 69
    // 8th column =>  70 - 79
    // 9th column =>  80 - 89

    var columnPlace = new Array(0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8);

    // capture appropriate column mulitple by referencing current square # as array element
    var columnMultiple = (columnPlace[index] * 10);

    // initialize variable to be used in following do-while loop
    var newNumber;
    // generate newNumber and check if it has been used already, if so loop again
    do {
        // add random number to the particular column multiple
        newNumber = columnMultiple + getNewNumber()  + 1;
    } while(usedNumbers[newNumber]);

    // prevent duplicate numbers by testing if the newNumber has already been used once on this card
    if (!usedNumbers[newNumber]) {
        // if duplicate was not found, this must be an original #, so set this element to true
        usedNumbers[newNumber] = true;

        // assign randomized newNum to current square
        document.getElementById(currentIndex).innerHTML = newNumber;
    }
}

function getNewNumber() {
    // capture random number between 1 and 10 for bingo values
        // math.random() returns random number between 0 and 1
        // math.floor() returns floor of a decimal number (ex. 1.75 becomes 1)
        return Math.floor(Math.random() * 10)
    }

function anotherCard() {
    console.log("hello")
    var number = 0 //parseInt(document.getElementById("number_of_cards").value);
    console.log(number);

    do{

    // housekeeping: reset the usedNumbers flag arrays to all false
    for (var i = 1; i < usedNumbers.length; i++) {
        usedNumbers[i] = false;
    }

    console.log(number);
    var div = document.createElement('div'+number);
    var body = document.getElementsByTagName('body') [0];
    var cardHTML = document.getElementById("card").innerHTML;
    var table = document.getElementById("table");

    div.innerHTML = cardHTML;


    changeSquareId(number);

    var _card = document.getElementById("card")

    document.body.insertBefore(div, _card);

    newCard();
    return false;

    }while(number > 0)
 }



 function changeSquareId(nextId){
    for(var i=0; i < totalSquare; i++){
        var square = document.getElementById("square"+i);
        square.id = nextId+"square"+i;
    }
    table = document.getElementById("table")
    table.id = "table"+nextId
 }


//  override array methods
Array.prototype.contains = function(k) {
    for(var p in this)
        if(this[p] === k)
            return true;
    return false;
}

function unique(array){
   var unique=array.filter(function(itm,i,a){
    return i==array.indexOf(itm);
 });
   return unique;
}