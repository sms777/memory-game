import React from "react";
import GameCard from "./GameCard";
import { shuffle } from "lodash";
import { Grid } from "@material-ui/core";

const valueSet = ["Z", "X", "C", "V", "B", "N", "M", "A", "S", "D", "F", "G"];
const twoOfEachValue = shuffle(valueSet.concat(valueSet));
const cards = twoOfEachValue.map(value => ({
  value: value,
  shown: false,
  exists: true
}));

export default class GameBoard extends React.Component {
  state = {
    lastCardValue: null,
    lastCardId: null,
    curentCardId: null,
    cards: cards,
    wait: false,
    won: false
  };

  showCard = (value, id) => {
    const { cards, lastCardValue, lastCardId, wait } = this.state;

    if (!wait) {
      const showCurrentCard = Array.from(cards);
      showCurrentCard[id].shown = true;

      this.setState({
        cards: showCurrentCard,
        curentCardId: id
      });

      if (lastCardValue === null) {
        this.setState({
          lastCardValue: value,
          lastCardId: id
        });
      } else if (lastCardValue === value) {
        const removeCurrentCards = Array.from(cards);
        removeCurrentCards[id].exists = false;
        removeCurrentCards[lastCardId].exists = false;

        this.setState({
          lastCardValue: null,
          lastCardId: null,
          cards: cards
        });

        if (!cards.find(card => card.exists)) {
          this.setState({
            won: true
          });
        }
      } else {
        this.setState({
          wait: true
        });
        setTimeout(() => {
          this.hideCurrentCards();
        }, 1000);
      }
    }
  };

  hideCurrentCards = () => {
    const { cards, lastCardId, curentCardId } = this.state;

    const hideCurrentCards = Array.from(cards);
    hideCurrentCards[curentCardId].shown = false;
    hideCurrentCards[lastCardId].shown = false;

    this.setState({
      lastCardValue: null,
      lastCardId: null,
      cards: hideCurrentCards,
      wait: false
    });
  };

  render() {
    const { cards, won } = this.state;
    return (
      <div className="board">
        <h1>Sam's Memory Game</h1>
        {won ? (
          <h2>You Win!</h2>
        ) : (
          <Grid container>
            {cards.map((card, index) => (
              <GameCard
                key={index}
                id={index} // key might need to be a uuid
                value={card.value}
                shown={card.shown}
                exists={card.exists}
                showCard={this.showCard}
              />
            ))}
          </Grid>
        )}
      </div>
    );
  }
}
