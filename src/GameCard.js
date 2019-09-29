import React from "react";
import PropTypes from "prop-types";
import { Card, Grid } from "@material-ui/core";

export default function GameCard(props) {
  const { value, shown, id, exists, showCard } = props;

  return exists ? (
    shown ? (
      <Grid item xs={2}>
        <Card className="card show">{value}</Card>
      </Grid>
    ) : (
      <Grid item xs={2}>
        <Card
          className="card hidden"
          onClick={() => {
            showCard(value, id);
          }}
        ></Card>
      </Grid>
    )
  ) : (
    <Grid item xs={2}>
      <Card className="card removed"></Card>
    </Grid>
  );
}

GameCard.propTypes = {
  value: PropTypes.string,
  shown: PropTypes.bool,
  id: PropTypes.number,
  exists: PropTypes.bool,
  showCard: PropTypes.func
};
