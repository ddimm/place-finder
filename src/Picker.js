import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import React, { useEffect, useState } from "react";
import MapGL, { Marker } from "react-map-gl";
import { VariableSizeList } from "react-window";

const API_KEY = process.env.REACT_APP_API_KEY;
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX;
const CORS = `https://cors-anywhere.herokuapp.com/`;

export default function Picker({ search, setSelected, results, setResults }) {
  const [isReady, setReady] = useState(false);
  const [checked, setChecked] = useState();
  const [viewport, setViewport] = useState({
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14,
    bearing: 0,
    pitch: 0
  });

  const classes = useStyles();

  useEffect(() => {
    if (results.length <= 0) {
      const URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?parameters&query=${search}&key=${API_KEY}&type=restaurant&opennow`;
      fetch(CORS + URL, { headers: { Origin: true } })
        .then(resp => {
          console.log(resp);
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
    setViewport({
      zoom: 14,
      bearing: 0,
      pitch: 0,
      latitude: results[index].geometry.location.lat,
      longitude: results[index].geometry.location.lng
    });
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

          {new Array(
            Math.round(results[index].price_level) > 0
              ? Math.round(results[index].price_level)
              : 1
          )
            .fill(true)
            .map((_, index) => {
              return (
                <AttachMoneyIcon key={index} fontSize="small"></AttachMoneyIcon>
              );
            })}
          {results[index].rating > 3 ? (
            <ThumbUpIcon fontSize="small" />
          ) : (
            <ThumbDownIcon fontSize="small" />
          )}
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
        <MapGL
          {...viewport}
          width="100%"
          height={200}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          onViewportChange={setViewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
        >
          <Marker
            latitude={
              checked !== undefined
                ? results[checked].geometry.location.lat
                : viewport.latitude
            }
            longitude={
              checked !== undefined
                ? results[checked].geometry.location.lng
                : viewport.longitude
            }
            offsetLeft={-20}
            offsetTop={-10}
          >
            <div>
              {checked !== undefined
                ? results[checked].name
                : "nothing selected"}
            </div>
          </Marker>
        </MapGL>
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
