import React from "react";
import GameCard from "./Card";
import Timer from "./Timer";
import { shuffle } from "lodash";
import { Grid, Typography, Button } from "@material-ui/core";

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
    showHideButton: false,
    counter: 0,
    won: false
  };

  showCard = (value, id) => {
    const {
      cards,
      counter,
      lastCardValue,
      lastCardId,
      showHideButton
    } = this.state;

    if (!showHideButton) {
      let showCurrentCard = Array.from(cards);
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
        let removeCurrentCards = Array.from(cards);
        removeCurrentCards[id].exists = false;
        removeCurrentCards[lastCardId].exists = false;

        this.setState({
          lastCardValue: null,
          lastCardId: null,
          cards: cards,
          counter: counter + 2
        });
      } else {
        this.setState({
          showHideButton: true
        });
      }

      if (counter === 24) {
        this.setState({
          won: true
        });
      }
    }
  };

  hideCurrentCards = () => {
    const { cards, lastCardId, curentCardId } = this.state;

    let hideCurrentCards = Array.from(cards);
    hideCurrentCards[curentCardId].shown = false;
    hideCurrentCards[lastCardId].shown = false;

    this.setState({
      lastCardValue: null,
      lastCardId: null,
      cards: hideCurrentCards,
      showHideButton: false
    });
  };

  render() {
    const { cards, won, showHideButton } = this.state;
    return (
      <>
        <Timer />
        <Grid className="board" container spacing={4}>
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
        {showHideButton && (
          <Button onClick={this.hideCurrentCards}>Hide Cards</Button>
        )}
        {won && <Typography>You Win!</Typography>}
      </>
    );
  }
}

// timer, tests, animations, hooks, functional, error boundary, proptypes
