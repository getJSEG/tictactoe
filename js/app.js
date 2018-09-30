//Getting the start, gameboard, and end screen from the DOM
const startScreen = document.querySelector('#start');
const gameBoard = document.querySelector('#board');
const endScreen = document.querySelector('#finish');

//selecting start screen (1 Player and 2 Player) buttons
const onePlayerButton = document.querySelector('#onePlayerButton .button');
const twoPlayerButton = document.querySelector('#twoPlayerButton .button');

const playerOptions = document.querySelectorAll('.player-option');

//seleting input field (container)div
const onePlayerContainer = document.querySelector('#onePlayer');
const twoPlayerContainer  = document.querySelector('#twoPlayers');

////Start Container
const startContainer = document.querySelector('#startGame');

//Start Button
//const startButton = document.querySelector('#startGame .button');
const header = document.querySelector('#start header');

//selecting all Playable Boxes from the DOM
const boxes = document.querySelectorAll('.box');

// player 1 is always X
const XHeader = document.querySelector('#player1');
const OHeader = document.querySelector('#player2');
const message = document.querySelector('#finish .message');

const winningCombination = [ [0,1,2], [3,4,5], [6,7,8],
                             [0,3,6], [1,4,7], [2,5,8],
                             [0,4,8], [6,4,2]];

let playerXPlayedSpaces = [];
let playerOPlayedSpaces = [];

let isXTurn = true;

let player1Name, player2Name;
let whichButtonIsClicked = '';
let iconSelected = ''; 

let isGameOver = false;

///PLAYER ICON
const O = `
    <svg class="o"  xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-200.000000, -60.000000)" fill="#FFFFFF">
                <g transform="translate(200.000000, 60.000000)">
                    <path class="o-path" d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/>
                </g>
            </g>
        </g>
    </svg>`;
    
    const X = `
    <svg class="x" xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-718.000000, -60.000000)" fill="#FFFFFF">
                <g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)">
                    <path class="x-path" d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/>
                </g>
            </g>
        </g>
    </svg>`;

//display active screen and dont display inactive screens
const displayScreen = (element) => {
     element.activeScreen.style.display = '';    
     for(let index of element.inactiveScreen){ index.style.display = 'none'; }   
}

//adds fuction to startscreen
const startGameScreen = () => {
   displayScreen({
    activeScreen: startScreen, inactiveScreen:[gameBoard, endScreen],
   });
    
    playerButtons();
    playerSelected();
    startContainer.children[0].addEventListener('click', () => {gameBoardScreen(whichButtonIsClicked); });
}

//Adding click event to (1 Player and 2 Player) buttons
const playerButtons = () => {
    let error = document.querySelector('.error');
    
    //display (1 player) button
    onePlayerButton.addEventListener('click', () => {
        //clearing any text if user pressed another button
        whichButtonIsClicked = '1Player';
        player1Name, player2Name = '';

        beginGame({ element:[onePlayerContainer, twoPlayerContainer], displayStyle:['block', 'none'] });
       
        //if user hasent choosen an icon'X/O' disable the input field until the have choosen an icon'X/O'
        setInterval( () => {       
            !iconSelected ? onePlayerContainer.children[1].setAttribute('disabled','true') : onePlayerContainer.children[1].removeAttribute('disabled');  
        });
        //when user click and they have choosent a icon the error will apear
        onePlayerContainer.addEventListener('click',() => {
            if(!iconSelected){
                error.style.display = 'block';
            }else{
               error.style.display = 'none'; 
            }
        });
        
        onePlayerContainer.children[1].addEventListener('keyup', (e) => {
            //sets the input value to the name of the player
                        
            if( e.target.value){                
                switch(iconSelected){
                    case 'X':  player1Name = e.target.value; player2Name = 'Comp.'; 
                        break;
                    case 'O': player1Name = 'Comp.';  player2Name = e.target.value; 
                        break;
                }
            } 
            
            //if condition is true the disaply the start game button
            beginGame({ displaybtn: e.target.value , btn: startContainer });
        });
        
        
    });
    
    
    twoPlayerButton.addEventListener('click', () =>{
        //clearing any text if user pressed another button
        whichButtonIsClicked = '2Player';
        player1Name, player2Name = '';
        let isNotEmpty1, isNotEmpty2;
        beginGame({
            element:[twoPlayerContainer, onePlayerContainer],
            displayStyle:['block', 'none']
        });
        // add event hadle to input fields and get the gametag of the user and set the value to (player1Name, player2Name) variables
        twoPlayerContainer.children[1].addEventListener('keyup', (e) => {   isNotEmpty1 = true;
        //sets the input value to the name of the player
        if( e.target.value){ player1Name = e.target.value; }
        //if condition is true the disaply the start game button
        beginGame({ displaybtn: isNotEmpty1 && isNotEmpty2, btn: startContainer }); });     
        
        twoPlayerContainer.children[3].addEventListener('keyup', (e) => {   isNotEmpty2 = true;
            //sets the input value to the name of the player
            if( e.target.value){  player2Name = e.target.value; }
            //if condition is true the disaply the start game button
            beginGame({ displaybtn: isNotEmpty1 && isNotEmpty2, btn: startContainer }); });
    });    
}

const beginGame = (obj) => {
    //sets the display value to the element
    if(obj.element && obj.displayStyle){
       for(let index in obj.element){ obj.element[index].style.display = obj.displayStyle[index]; }
    }   
    //if object key exist
    //display button if the condition true, else dont display the button
    if(obj.btn){ obj.displaybtn ? obj.btn.style.display = 'block' : obj.btn.style.display = 'none'; }
}
//for (1Player) get the selection of X OR O Icon
const playerSelected = () => {
    for(let input in playerOptions){
       if(playerOptions.hasOwnProperty(input)){
          playerOptions[input].addEventListener('click', (e) => {
              iconSelected = e.target.value;
          }); 
        }
    }
}

//Dinamically adding X and O SVG to the game board Before Player Starts
const addSVG = () =>{    
    //Looping Through all <li> in boxes and adding the svg directly in the html
    for(let box of boxes){
        addElements({
            element: 'div', property: 'setAttribute',
            propertyValue1: 'class', propertyValue2: 'svg-container',
            multipleInnerHtml: true,
            parentElement: [box], innerHtml:[O, X],
        });
    }
}

//this disaplys the gameboard and sets disaply of all SVG to none
// and add event hadler to each list item/ box to disaply the player 'X OR O'SVG
const gameBoardScreen = (whichButtonIsClicked) => {
    const playerO = document.querySelectorAll('.o-path');
    const playerX = document.querySelectorAll('.x-path');
    
    playerName(whichButtonIsClicked);
    displayScreen({ activeScreen: gameBoard, inactiveScreen:[startScreen, endScreen], });
    
     for(let box in boxes){
        if (boxes.hasOwnProperty(box)) {
            //remove/unundisplay all the X and O in the game board
            playerX[box].style.display = 'none';
            playerO[box].style.display = 'none';
        }
    }
    //set the playerX
    player1.style.background = '#690937';
    switch(whichButtonIsClicked){
        case '1Player':
            for(let box in boxes){
                if (boxes.hasOwnProperty(box)) {                  
                    //player turn              
                    boxes[box].addEventListener('click', (e) => {                
                        switch(iconSelected){
                            case 'X':
                                if(isXTurn) {
                                    isXTurn = false;
                                    switchTurns(player2, player1, '#690937', playerXPlayedSpaces, box, boxes, playerX);
                                }
                               break;
                            case 'O':
                                if(!isXTurn) {
                                    isXTurn = true;
                                    switchTurns(player2,player1, '#690937', playerOPlayedSpaces, box, boxes, playerO);
                                }
                                break;
                               
                        }
                        // calling has won
                        hasWon();
                    });
                    //computer turn
                    setInterval(()=>{ 
                        switch(iconSelected){
                            case 'X':
                                if(!isXTurn) {
                                    isXTurn = true;
                                    computer(playerO, playerOPlayedSpaces, player1,'#fff', player2, 'blue');
                                }
                               break;
                            case 'O':
                                if(isXTurn) {
                                    isXTurn = false;
                                    computer(playerX, playerXPlayedSpaces, player1,'#fff', player2, 'blue');
                                }
                                break;
                        }}, 1000)
                }
            }
            break;
        case '2Player':

            for(let box in boxes){
                if (boxes.hasOwnProperty(box)) {                    
                    boxes[box].addEventListener('click', (e) => {                
                        if(isXTurn){  
                            isXTurn = false;
                            switchTurns(player1, player2, 'blue', playerXPlayedSpaces, box, boxes, playerX);
                        }else {
                            isXTurn = true;
                            switchTurns(player2, player1, 'red', playerOPlayedSpaces, box, boxes, playerO);
                        }
                        // calling has won
                        hasWon();
                    });
                }
            }
            break;
    }
    
}

const switchTurns = (playerUnactive, playerActive, playerColor, playedSpaces, box, boxes, player) => {
    //set X OR O SVG display to block
    player[box].style.display = 'block';
    //disable this box when click
    boxes[box].style.pointerEvents = 'none';
    //parsing the index from string to and int then
    //pushing index of box in to playedSpaces array
    playedSpaces.push(parseInt(box,10));
    playerActive.style.background = playerColor;
    playerUnactive.style.background = '#fff';   
}

const computer = (playerSpace, playerArray, computer, computerColor, player, playerColor) => {
    const allPlayedSpaces = playerXPlayedSpaces.concat(playerOPlayedSpaces);
    let randomSquare = Math.floor(Math.random() * 9);
    //when game is over stop this function from executing anything else
    if(isGameOver){ return; }
    //gets a new random number if the original random number is alredy in 'allPlayedSpaces' array
    while(allPlayedSpaces.includes(randomSquare) ){
        randomSquare = Math.floor(Math.random() * 9);
    }
   
    //adds the number to 'playerArray' and add 'X OR O' to the game boad
    if(!allPlayedSpaces.includes(randomSquare)){
         computer.style.background = computerColor;
        player.style.background = playerColor;
        playerArray.push(randomSquare);
        playerSpace[randomSquare].style.display = 'block';
        boxes[randomSquare].style.pointerEvents = 'none';
    }
    //check who has whon
    hasWon();
}


////ADD THE NAME TO THE HEADER OF THE GAME BOARD
const playerName = (whichButtonIsClicked) =>{
    //sets the name of player1 and player 2 to their corresponding header in the gameboard
    switch(whichButtonIsClicked){
        case'1Player':
            iconSelected === 'X' ? addElements({ element:'h3',numberOfElements: 2,  parentElement:[XHeader, OHeader], textContent:[player1Name, player2Name] }) 
                                 : addElements({ element:'h3',numberOfElements: 2,  parentElement:[OHeader, XHeader], textContent:[player2Name, player1Name] });                
            break;
        case '2Player': addElements({ element:'h3',numberOfElements: 2,  parentElement:[XHeader, OHeader], textContent:[player1Name, player2Name] });
            break;
    }

}
// checks who won
const hasWon = () => {
    //Combining both player1 and player2 array to get witch spaces has been played 
    const AllPlayedSpaces = playerXPlayedSpaces.concat(playerOPlayedSpaces);    

    // creating a object of all the winning combination and looping trough it
    for(let [index, win] of winningCombination.entries()){
        //checking if winning combination exist in player1
        //else check if winning combination exist in player2
        //else if both (player 1) and (player 2) array dont have winning combination and all spaces are filled then its a tie
        switch(true){
            case win.every( elem => playerXPlayedSpaces.includes(elem)):
                isGameOver = true;
                    endGameScreen('player1', true);
                break;
            case win.every( elem => playerOPlayedSpaces.includes(elem)):
                isGameOver = true;
                    endGameScreen('player2', true);
                break;
            case AllPlayedSpaces.length >= 9 && !win.every( elem => playerOPlayedSpaces.includes(elem)) && !win.every( elem => playerXPlayedSpaces.includes(elem)):
                isGameOver = true;
                    endGameScreen('tie', true);
                break;
        }
    }
}

//when game ends this displays the game over screen and who won
const endGameScreen = (whoWon, hasGameEnded) => {
    const newGameButton = document.querySelector('#finish .button');
    
    if(hasGameEnded){
        displayScreen({ activeScreen: endScreen, inactiveScreen:[startScreen, gameBoard], });
        //call back function that resets and start new game
        newGameButton.addEventListener('click', reset);         
        switch(whoWon){
            case 'player1':
                message.textContent = player1Name + '   WON!';
                endScreen.style.backgroundColor = '#690937';
               break;
            case 'player2':
                message.textContent = player2Name + '  WON!';
                endScreen.style.backgroundColor = 'blue';
                break;
            case 'tie':
                message.textContent = 'TIE';
                endScreen.style.backgroundColor = '#5fcf80';
                break;                
        }       
    } 
}

//This reset the game
const reset = () =>{
    const playerO = document.querySelectorAll('.o-path');
    const playerX = document.querySelectorAll('.x-path');
    
     for(let box in boxes){
        if (boxes.hasOwnProperty(box)) {
            //reset everithing when player his the reset button
            boxes[box].style.pointerEvents='';
            playerXPlayedSpaces = [];
            playerOPlayedSpaces = [];            
            displayScreen({ activeScreen: gameBoard, inactiveScreen:[startScreen, endScreen], });
            gameBoard.style.display = '';
            playerX[box].style.display = 'none';
            playerO[box].style.display = 'none';
            isXTurn = true;
            isGameOver = false;
        }
     }
}

addSVG();
startGameScreen();