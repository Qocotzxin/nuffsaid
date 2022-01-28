import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
  ComponentWithClasses,
  NoReturningFunction,
} from "../../../@types/generic";
import { withStyles, createStyles } from "@material-ui/core/styles";

interface SubHeaderActionsProps extends ComponentWithClasses {
  onToggleMessagesServiceervice: NoReturningFunction;
  onClearMessage: NoReturningFunction;
  isMessageServiceStopped: boolean;
}

const styles = createStyles(() => ({
  root: {
    padding: "2rem 0",
  },
  clear: {
    background: "#4db6ac",
    color: "white",
    "&:hover": {
      background: "#80cbc4",
    },
  },
}));

/**
 * Returns a container with 2 buttons that appears right after the header.
 * Used to perform bulk actions.
 */
const SubHeaderActions: React.FC<SubHeaderActionsProps> = ({
  onToggleMessagesServiceervice,
  onClearMessage,
  classes,
  isMessageServiceStopped,
}) => {
  return (
    <Grid container spacing={24} className={classes?.root}>
      <Grid item xs={6}>
        <Grid container justify="flex-end">
          <Button
            variant="contained"
            color={isMessageServiceStopped ? "primary" : "secondary"}
            onClick={onToggleMessagesServiceervice}
          >
            {isMessageServiceStopped ? "Resume" : "Stop"}
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container justify="flex-start">
          <Button
            className={classes?.clear}
            variant="contained"
            onClick={onClearMessage}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(memo(SubHeaderActions));
