import Typography from "@material-ui/core/Typography";
import React from "react";

// const useStyles = makeStyles(theme => ({
//   listItem: {
//     padding: theme.spacing(1, 0)
//   },
//   total: {
//     fontWeight: 700
//   },
//   title: {
//     marginTop: theme.spacing(2)
//   }
// }));

export default function Review({ selected }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Reach out and Say Hello
      </Typography>
      <p>{selected.name}</p>
      <p>{selected.formatted_address}</p>
    </React.Fragment>
  );
}
