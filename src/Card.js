import React from "react";
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
    <Grid item xs={2} className="card removed"></Grid>
  );
}
