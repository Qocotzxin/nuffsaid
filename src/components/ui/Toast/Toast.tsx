import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import { NoReturningFunction } from "../../../@types/generic";
import { Message } from "../../../Api";

interface ToastProps {
  lastMessage: Message | null;
}

export function handleClose(onClose: NoReturningFunction, reason?: string) {
  if (reason === "clickaway") {
    return;
  }

  onClose();
}

const Toast: React.FC<ToastProps> = ({ lastMessage }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    if (lastMessage?.priority === 0) {
      setIsOpened(true);
      setMessageText(lastMessage?.message || "");
    }
  }, [lastMessage, isOpened]);

  function onClose() {
    setIsOpened(false);
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isOpened}
      autoHideDuration={2000}
      onClose={(event, reason) => handleClose(onClose, reason)}
      message={<span>{messageText}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={() => handleClose(onClose)}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
};

export default Toast;
