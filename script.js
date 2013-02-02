// http://refresh-sf.com/yui

////////////////////copyright @ chandra mohan thakur //////////////
var emptySquare = 12;  //Number of empty square to be made
var totalSquare = 27;  //Total numbers of square in the card
var cardCount = 0;     //Initilize card count and increases when a new card is created
var usedNumbers = new Array(90); //Array of used numbers
var MAXCARDNUMBER = 1000;
var emptyIndexArray = new Array

///////////////////////////////////////////////////////////////////
window.onload = initializePage;

///////////////////////////////////////////////////////////////////
/// Initilize the page ///
function initializePage() {
    // so older browsers do not get 24 error messages
    if (document.getElementById) {
        var card = document.getElementById("card");
        card.style.display = "none";
        // enable creating a new card without reloading page
        document.getElementById("reload").onclick = generareCards;
        // generate the new bingo card
        // newCard();
    } else {
        alert("Please enable javascript on your browsers.");
    }
}

function generareCards(){
    var cardNumber = parseInt(document.getElementById("number_of_cards").value);
    if(cardNumber > MAXCARDNUMBER){
        alert("You can not create cards more then " +MAXCARDNUMBER+ " in one click!");
        return false;
    }else{
        do{
            anotherCard();
            cardNumber = cardNumber - 1;
            // document.getElementById("number").innerHTML = cardNumber;
        }while(cardNumber > 0)

    }
    nameTheCard();
}

// *******************************************************************//
// ************** Name the card **************************************//
function nameTheCard(){
    var all_cards_trs = document.getElementsByClassName("card_name");
    for(var i=0; i < all_cards_trs.length; i++){
        all_cards_trs[i].innerHTML =  "<i> Bingo Card No."+ (i+1) +"</i>"
    }
}


///////////////////////////////////////////////////////////////////
/// Create new card ///
function newCard() {
    //Loop that sets the value of the square
    for (var i = 0; i < 27; i++) {
        // pass the current i as parameter to setSquare function
        setSquare(i)
    }

    // Variables saying which row consist of which numbers
    // var emptyIndexArray = new Array
    var rowOne = new Array(0,1,2,3,4,5,6,7,8);
    var rowTwo = new Array(9,10,11,12,13,14,15,16,17);
    var rowThree = new Array(18,19,20,21,22,23,24,25,26);
    // Variables that are need to store square which should be made empty
    var emptyRowOne =  new Array
    var emptyRowTwo =  new Array
    var emptyRowThree =  new Array
    //Loop thats stores the empty square in the card rows
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

    ///*************** prevent whole column to get blank **********///
     var tipicalArray = new Array([0,9,18],[1,10,19],[2,11,20],[3,12,21],[4,13,22],[5,14,23],[6,15,24],[7,16,25],[8,17,26])
     var checkThisIndexes = emptyIndexArray;
     var sortedColumnValue = new Array();
     for(var i = 0; i < tipicalArray.length; i++){
        var innerTipicalArray = tipicalArray[i];
        var indexsToCount = new Array;
        var columnValues = new Array;
        for(var j = 0; j < 3; j++){
            if(checkThisIndexes.contains(innerTipicalArray[j])){
                indexsToCount.push(innerTipicalArray[j]);
            }
          columnValues.push(parseInt(document.getElementById("square"+innerTipicalArray[j]).innerHTML))
        }

        sortedColumnValue.push(columnValues.sort());
        columnValues = [];

        if(indexsToCount.length == 3){
          var index = emptyIndexArray.indexOf(indexsToCount[Math.floor(Math.random() * 3)]);
          // emptyIndexArray.splice(index,1);
        }
     }

    // *******************************************************************//
    // ************** Sort the column values*******************************//

    for(var i = 0; i < tipicalArray.length; i++){
        var newSortedValue = sortedColumnValue[i];
        var innerTipicalArray = tipicalArray[i];
        for(var j = 0; j < 3; j++){
            var columnValue = newSortedValue[j];
            document.getElementById("square"+innerTipicalArray[j]).innerHTML = columnValue;
        }
        newSortedValue = [];
    }

    ///*******************************************************************///


    do{
        document.getElementById("square"+emptyIndexArray.pop(1)).innerHTML = '';
    }while(emptyIndexArray.length > 0)
}

///////////////////////////////////////////////////////////////////
function getNewNumber() {
    // capture random number between 1 and 10 for bingo values
    // math.random() returns random number between 0 and 1
    // math.floor() returns floor of a decimal number (ex. 1.75 becomes 1)
    return Math.floor(Math.random() * 10)
}

///////////////////////////////////////////////////////////////////
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
        newNumber = columnMultiple + getNewNumber();
    } while(usedNumbers[newNumber]);

    // prevent duplicate numbers by testing if the newNumber has already been used once on this card
    if (!usedNumbers[newNumber]) {
        // if duplicate was not found, this must be an original #, so set this element to true
        usedNumbers[newNumber] = true;
        // assign randomized newNum to current square
        document.getElementById(currentIndex).innerHTML = newNumber;
    }
}

///////////////////////////////////////////////////////////////////
function anotherCard() {
    // housekeeping: reset the usedNumbers flag arrays to all false
    for (var i = 1; i < usedNumbers.length; i++) {
        usedNumbers[i] = false;
    }
    var div = document.createElement('div');
    var body = document.getElementsByTagName('body') [0];
    var cardHTML = document.getElementById("card").innerHTML;
    var _card = document.getElementById("card")
    div.innerHTML = cardHTML;
    document.body.insertBefore(div, _card);

    // generate the new bingo card
    newCard();
    // after creating new card change the square id
    changeSquareId();
    return false;
}

///////////////////////////////////////////////////////////////////
function changeSquareId(){
    for(var i=0; i < totalSquare; i++){
       var square = document.getElementById("square"+i);
       square.id =  "square"+i+"_"+cardCount;
   }
   cardCount = cardCount + 1;
}

///////////////////////////////////////////////////////////////////
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

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
////////////////////////////////////////////////////////////////////