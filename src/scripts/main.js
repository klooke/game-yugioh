const game = {
  player: {
    HandView: document.querySelector("#player-hand"),
    fieldView: document.querySelector("#player-set"),
    cards: [],
  },
  computer: {
    HandView: document.querySelector("#computer-hand"),
    cards: [],
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

function setCard(card, field) {
  field.appendChild(card);
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

function startGame() {
  drawCards();
}

window.addEventListener("DOMContentLoaded", startGame);
