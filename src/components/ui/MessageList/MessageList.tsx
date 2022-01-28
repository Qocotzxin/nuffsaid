import Grid from "@material-ui/core/Grid";
import { createStyles, withStyles } from "@material-ui/core/styles";
import React, { memo } from "react";
import { ListItem } from "..";
import { ComponentWithClasses } from "../../../@types/generic";
import { Priority } from "../../../Api";
import { ExtendedMessage } from "../../../contexts/MessagesContext";
import { Action } from "../ListItem/ListItem";
import Typography from "@material-ui/core/Typography";

interface MessageListProps extends ComponentWithClasses {
  messages: ExtendedMessage[];
  onClearMessage: (index: number) => void;
  listPriority: Priority;
}

const styles = createStyles(() => ({
  item: {
    width: "100%",
  },
}));

/**
 * Returns a vertical list of ListItem(s).
 */
const MessageList: React.FC<MessageListProps> = ({
  messages,
  listPriority,
  onClearMessage,
  classes,
}) => {
  const action: Action = {
    text: "Clear",
    callback: onClearMessage,
  };

  return (
    <Grid
      container
      direction="column"
      spacing={16}
      justify="center"
      alignItems="center"
    >
      <Grid item xs className={classes?.item}>
        <Typography
          variant="h5"
          component="h2"
          align="left"
        >{`${Priority[listPriority]} Type ${listPriority}`}</Typography>
        <Typography
          variant="body1"
          align="left"
        >{`Count ${messages.length}`}</Typography>
      </Grid>
      {messages.map((message) => {
        return (
          <Grid
            item
            xs
            className={classes?.item}
            key={`${message.message}-${message.index}`}
          >
            <ListItem incomingMessage={message} action={action} />
          </Grid>
        );
      })}
    </Grid>
  );
};

function areEqual(
  prevProps: MessageListProps,
  nextProps: MessageListProps
): boolean {
  if (prevProps.messages.length === nextProps.messages.length) {
    return true;
  }

  return false;
}

export default withStyles(styles)(memo(MessageList, areEqual));
