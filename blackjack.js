//
// Blackjack game
// by
///mehul aggarwal


//card variables
let suits=['Clubs','Spades','Diamonds','Hearts'];
let values=['Ace','King','Queen','Jack',
            'Ten','Nine','Eight','Seven','Six',
            'FIve','Four','Three','Two'];

//DOM variables
let textArea=document.getElementById('text-area');
let newGameButton=document.getElementById('new-game-button');
let hitButton=document.getElementById('hit-button');
let stayButton=document.getElementById('stay-button');

//Game Variables
let gameStarted=false,
    gameOver=false,
    playerWon=false,
    dealerCards=[],
    playerCards=[],
    dealerPoints=0,
    playerPoints=0,
    deck=[];

//textArea.innerText='Welcome to Blackjack!';
hitButton.style.display='none';
stayButton.style.display='none';
showStatus();




function getCardNumericValue(card){
  switch(card.value){
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}

function getScore(cardArray){
  let score=0;
  let hasAce=false;
  for(let i=0;i<cardArray.length;i++)
  {
    let card=cardArray[i];
    score=score+getCardNumericValue(card);
    if(card.value==='Ace')
    {
      hasAce=true;
    }
  }
  if(hasAce&&score+10<=21){
    return score+10;
  }
  return score;
}

function updateScores(){
  dealerPoints=getScore(dealerCards);
  playerPoints=getScore(playerCards);
}

newGameButton.addEventListener('click',function(){
  
  gameStarted=true;
  gameOver=false;
  playerWon=false;
  
  deck=createdeck();
  shuffleDeck(deck);
  dealerCards=[getNextCard(),getNextCard()];
  playerCards=[getNextCard(),getNextCard()];
  
  textArea.innerrText="Started...";
  newGameButton.style.display='none';
  hitButton.style.display='inline';
  stayButton.style.display='inline';
  showStatus();
  
});

hitButton.addEventListener('click',function(){
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener('click',function(){
  gameOver=true;
  checkForEndOfGame();
  showStatus();
});

function createdeck(){
  let deck=[];
  for(let suitidx=0;suitidx<suits.length;suitidx++)
   {
    for(let valueidx=0;valueidx<values.length;valueidx++)
     {
      let card={
        suit:suits[suitidx],
        value:values[valueidx]
      };
      deck.push(card);
     }
   }
   return deck;
}
function getNextCard(){
  return deck.shift();
}
function getCardString(card){
  return card.value +' of '+card.suit;
}
function showStatus(){
  if(!gameStarted)
  {
    textArea.innerText="Welcome to Blackjack!";
    return ;
  }

  let dealerCardString='';
  for(let i=0;i<dealerCards.length;i++){
    dealerCardString+=getCardString(dealerCards[i])+'\n';
  }

  let playerCardString=''
  for(let i=0;i<playerCards.length;i++){
    playerCardString+=getCardString(playerCards[i])+'\n';
  }

  updateScores();

textArea.innerText=
  'Dealer has:\n'+
  dealerCardString+
  '(Score: '+dealerPoints+ ' )\n\n'+
  
  'Player has:\n'+
  playerCardString+
  '(Score: '+playerPoints+ ' )\n\n';


 if(gameOver){
   if(playerWon){
     textArea.innerText+='YOU WIN';
   }
   else{
     textArea.innerText+='DEALER WINS';
   }
    newGameButton.style.display='inline';
  hitButton.style.display='none';
  stayButton.style.display='none';
 }
}
function shuffleDeck(deck){
  for(let i=0;i<deck.length;i++)
  {
    let swapidx=Math.trunc(Math.random()*deck.length);
    let temp=deck[swapidx];
    deck[swapidx]=deck[i];
    deck[i]=temp;
  }
}

function checkForEndOfGame(){
  updateScores();
  if(gameOver){
    //let dealer take card
    while(dealerPoints<playerPoints&&playerPoints<=21&&dealerPoints<=21)
    {
      dealerCards.push(getNextCard());
      updateScores();
    }
  }
  
  if(playerPoints>21){
    playerWon=false;
    gameOver=true;
  }
  else if(dealerPoints>21){
    playerWon=true;
    gameOver=true;
  }
  else if(gameOver){
    if(playerPoints>dealerPoints)
     {playerWon=true;}
     else
     {playerWon=false;}
  
 
  }
} 

 console.log("Welcome to Blackjack");
 console.log("You are dealt: ");

 