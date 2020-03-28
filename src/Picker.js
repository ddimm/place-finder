import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import CommentIcon from "@material-ui/icons/Comment";
import React, { useEffect, useState } from "react";
import { VariableSizeList } from "react-window";
const API_KEY = process.env.REACT_APP_API_KEY;

const CORS = `https://cors-anywhere.herokuapp.com/`;

export default function Picker({ search, setSelected, results, setResults }) {
  const [isReady, setReady] = useState(false);
  const [checked, setChecked] = useState();

  const classes = useStyles();

  useEffect(() => {
    if (results.length <= 0) {
      const URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?parameters&query=${search}&key=${API_KEY}&type=restaurant`;
      fetch(CORS + URL, { headers: { Origin: true } })
        .then(resp => {
          return resp.json();
        })
        .then(obj => {
          setResults(obj.results);
          setReady(true);
        });
    } else {
      setReady(true);
    }
  }, [search, setResults, results]);

  function handleClick(index) {
    setChecked(index);
    setSelected(results[index]);
  }
  function Row({ index, style }) {
    const labelId = `checkbox-list-label-${index}`;
    return (
      <div style={style}>
        <ListItem
          key={index}
          role={undefined}
          dense
          button
          onClick={() => {
            handleClick(index);
          }}
        >
          <ListItemIcon>
            <Radio
              edge="start"
              checked={index === checked}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": labelId }}
            ></Radio>
          </ListItemIcon>
          <ListItemText id={labelId} primary={`${results[index].name}`} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="comments">
              <CommentIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </div>
    );
  }

  if (isReady) {
    return (
      <div className={classes.root}>
        <VariableSizeList
          itemCount={results.length}
          height={200}
          width={"100%"}
          itemSize={index => 50}
        >
          {Row}
        </VariableSizeList>
      </div>
    );
  } else {
    return <p>Loading</p>;
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: 400,
    backgroundColor: theme.palette.background.paper
  }
}));
