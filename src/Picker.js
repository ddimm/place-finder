import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import { VariableSizeList } from "react-window";
const API_KEY = process.env.REACT_APP_API_KEY;

const CORS = `https://cors-anywhere.herokuapp.com/`;

export default function Picker({ search }) {
  const [isReady, setReady] = useState(false);
  const [results, setResults] = useState([]);
  const [checked, setChecked] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?parameters&query=${search}&key=${API_KEY}&type=restaurant`;
    fetch(CORS + URL, { headers: { Origin: true } })
      .then(resp => {
        return resp.json();
      })
      .then(obj => {
        setResults(obj.results);
        setReady(true);
      });
  }, [search]);

  function handleClick(index) {
    const newChecked = [...checked];
    const currentIndex = checked.indexOf(index);
    if (checked.includes(index)) {
      newChecked.splice(currentIndex, 1);
    } else {
      newChecked.push(index);
    }

    setChecked(newChecked);
  }
  function Row({ index }) {
    const labelId = `checkbox-list-label-${index}`;
    return (
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
          <Checkbox
            edge="start"
            checked={checked.includes(index)}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={`${results[index].name}`} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="comments">
            <CommentIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }

  if (isReady) {
    return (
      <div className={classes.root}>
        <p>Check off what looks good, then hit next</p>
        <VariableSizeList
          itemCount={results.length}
          height={200}
          width={"100%"}
          itemSize={index => 300}
        >
          {Row}
        </VariableSizeList>
        {/* <List>
          {results.map((val, index) => {
            const labelId = `checkbox-list-label-${index}`;

            return (
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
                  <Checkbox
                    edge="start"
                    checked={checked.includes(index)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${val.name}`} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="comments">
                    <CommentIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List> */}
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
