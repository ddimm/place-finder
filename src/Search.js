import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import React from "react";

export default function Search({ search, setSearch }) {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={event => setSearch(event.target.value)}
            required
            id="search"
            label="What's Cookin'?"
            fullWidth
            value={search}
          />
        </Grid>
      </Grid>
    </>
  );
}
