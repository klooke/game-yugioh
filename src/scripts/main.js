const game = {
  score: {
    winView: document.querySelector("#score-win"),
    drawView: document.querySelector("#score-draw"),
    loseView: document.querySelector("#score-lose"),

    win: 0,
    draw: 0,
    lose: 0,
  },
  player: {
    HandView: document.querySelector("#player-hand"),
    fieldView: document.querySelector("#player-set"),
    cards: [],
  },
  computer: {
    HandView: document.querySelector("#computer-hand"),
    fieldView: document.querySelector("#computer-set"),
    cards: [],
  },
  result: {
    view: document.querySelector("#result-game"),
  },
  card: {
    data: {
      rock: "./res/cards/data-rock.png",
      scissors: "./res/cards/data-scissors.png",
      paper: "./res/cards/data-paper.png",
    },
    frames: {
      link: "./res/cards/link-frame.png",
      trap: "./res/cards/trap-frame.png",
    },
    turn: "./res/cards/card-turn.png",
  },
};

game.player.cards.push(
  createCard(game.card.frames.link, "rock"),
  createCard(game.card.frames.link, "scissors"),
  createCard(game.card.frames.link, "paper")
);

game.computer.cards.push(
  createCard(game.card.frames.trap, "rock"),
  createCard(game.card.frames.trap, "scissors"),
  createCard(game.card.frames.trap, "paper")
);

function onCardClick(event) {
  if (game.player.fieldView.childElementCount > 0) return;

  var card = event.target.parentNode;
  card.removeEventListener("click", onCardClick);

  setCard(card, game.player.fieldView);

  var randCard = setRandomCard(game.computer.cards, game.computer.fieldView);

  checkResult(card, randCard);
}

function createCard(frame, name) {
  var card = document.createElement("div");
  card.style.backgroundImage = `url(${frame})`;
  card.classList.add("card");

  var title = document.createElement("h4");
  title.textContent = name;
  card.appendChild(title);

  var img = document.createElement("img");
  img.src = game.card.data[name];
  card.appendChild(img);

  return card;
}

function getCardResistance(cardName) {
  var listCard = Object.keys(game.card.data);
  var cardIndex = listCard.indexOf(cardName);
  var cardResistenceIndex = (cardIndex + 1) % listCard.length;

  return listCard[cardResistenceIndex];
}

function setCard(card, field) {
  field.appendChild(card);
}

function setRandomCard(listCards, field) {
  var randID = parseInt(Math.random() * listCards.length);

  var card = listCards[randID];
  card.classList.remove("card-turn");

  field.appendChild(card);

  return card;
}

function drawCards() {
  game.player.cards.forEach((card) => {
    card.addEventListener("click", onCardClick);
    game.player.HandView.appendChild(card);
  });

  game.computer.cards.forEach((card) => {
    card.classList.add("card-turn");
    game.computer.HandView.appendChild(card);
  });
}

function checkResult(playerCard, computerCard) {
  var playerCardName = playerCard.children[0].textContent || "";
  var computerCardName = computerCard.children[0].textContent || "";

  if (getCardResistance(playerCardName) === computerCardName)
    return checkCondition("win");

  if (getCardResistance(computerCardName) === playerCardName)
    return checkCondition("lose");

  return checkCondition("draw");
}

function showResult(textContent) {
  game.result.view.textContent = textContent;
  game.result.view.classList.remove("hidde");
}

function checkCondition(condition) {
  var textContent = "";

  switch (condition) {
    case "win":
      game.score.win++;
      game.score.winView.textContent = game.score.win;
      textContent = "Vitória";

      break;
    case "draw":
      game.score.draw++;
      game.score.drawView.textContent = game.score.draw;
      textContent = "Empate";

      break;
    case "lose":
      game.score.lose++;
      game.score.loseView.textContent = game.score.lose;
      textContent = "Derrota";

      break;
    default:
      return;
  }

  showResult(textContent);

  var id = setTimeout(() => {
    resetGame();
    clearTimeout(id);
  }, 2000); //ms
}

function startGame() {
  drawCards();
}

function resetGame() {
  game.player.fieldView.innerHTML = "";
  game.computer.fieldView.innerHTML = "";

  game.result.view.classList.add("hidde");

  drawCards();
}

window.addEventListener("DOMContentLoaded", startGame);
