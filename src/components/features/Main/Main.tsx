import Grid from "@material-ui/core/Grid";
import { createStyles, withStyles } from "@material-ui/core/styles";
import React from "react";
import { ComponentWithClasses } from "../../../@types/generic";
import { useMessageContext } from "../../../contexts/MessagesContext";
import { Header, MessageList, SubHeaderActions, Toast } from "../../ui";

const styles = createStyles(() => ({
  root: {
    height: "100vh",
    padding: "1rem",
    width: "100%",
    overflow: "hidden",
  },
  messages: {
    height: "100%",
    paddingBottom: "150px",
  },
  list: {
    height: "100%",
    overflow: "auto",
  },
}));

const Layout: React.FC<ComponentWithClasses> = ({ classes }) => {
  const {
    messages,
    lastMessage,
    onClearMessage,
    onClearAllMessages,
    onToggleMessagesService,
    isMessageServiceStopped,
  } = useMessageContext();

  return (
    <Grid container>
      <Grid item xs className={classes?.root}>
        <Toast lastMessage={lastMessage} />
        <Header title="nunffsaid.com Coding Challenge" />
        <SubHeaderActions
          onClearMessage={onClearAllMessages}
          onToggleMessagesServiceervice={onToggleMessagesService}
          isMessageServiceStopped={isMessageServiceStopped}
        />
        <Grid container spacing={24} className={classes?.messages}>
          {[0, 1, 2].map((priority) => (
            <Grid item xs key={priority} className={classes?.list}>
              <MessageList
                onClearMessage={onClearMessage}
                messages={messages.filter((m) => m.priority === priority)}
                listPriority={priority}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Layout);
