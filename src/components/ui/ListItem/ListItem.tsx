import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { ComponentWithClasses } from "../../../@types/generic";
import { ExtendedMessage } from "../../../contexts/MessagesContext";

export interface Action {
  text: string;
  callback: (index: number) => void;
}

interface ListItemProps extends ComponentWithClasses {
  incomingMessage: ExtendedMessage;
  priority?: 0 | 1 | 2;
  bg?: string;
  action?: Action;
}

const MESSAGE_TYPE_COLORS = {
  0: "#F56236",
  1: "#FCE788",
  2: "#88FCA3",
};

const styles = createStyles(() => ({
  paper: {
    padding: "1rem",
    width: "100%",
  },
  message: {
    textAlign: "left",
  },
  action: {
    textAlign: "right",
  },
}));

/**
 * Returns a paper components (div) with some elevation which can render
 * a message and a button to perform an action.
 */
const ListItem: React.FC<ListItemProps> = ({
  incomingMessage: { message, priority, index },
  action,
  classes,
}) => {
  const background = isFinite(priority)
    ? MESSAGE_TYPE_COLORS[priority]
    : "#ffffff";
  return (
    <Paper elevation={1} className={classes?.paper} style={{ background }}>
      <Grid container>
        <Grid item xs={action ? 6 : 12}>
          <Typography align="left" variant="body1" className={classes?.message}>
            {message}
          </Typography>
        </Grid>
        {action && (
          <Grid item xs={6} className={classes?.action}>
            <Button onClick={() => action.callback(index)}>
              {action.text}
            </Button>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default withStyles(styles)(ListItem);
