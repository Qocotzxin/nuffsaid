import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NoReturningFunction } from "../@types/generic";
import generateMessage, { Message } from "../Api";

interface MessageContextApi {
  messages: ExtendedMessage[];
  onClearMessage: (index: number) => void;
  onClearAllMessages: NoReturningFunction;
  onToggleMessagesService: NoReturningFunction;
  isMessageServiceStopped: boolean;
  lastMessage: Message | null;
}

export interface ExtendedMessage extends Message {
  index: number;
}

const MessageContext = createContext<MessageContextApi | undefined>(undefined);

const MessageProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ExtendedMessage[]>([]);
  const [isMessageServiceStopped, setIsMessageServiceStopped] = useState(false);
  const [lastMessage, setLastMessage] = useState<Message | null>(null);

  /**
   * Removes a message specified by index.
   */
  const onClearMessage = useCallback(
    (originalIndex: number) => {
      setMessages((oldMessages) => {
        const indexToRmove = oldMessages.findIndex(
          (m) => m.index === originalIndex
        );
        oldMessages.splice(indexToRmove, 1);
        return [...oldMessages];
      });
    },
    [setMessages]
  );

  /**
   * Clears all messages.
   */
  const onClearAllMessages = useCallback(() => setMessages([]), [setMessages]);

  /**
   * Toggles messaging service.
   */
  const onToggleMessagesService = useCallback(() => {
    setIsMessageServiceStopped((prevValue) => !prevValue);
  }, [setIsMessageServiceStopped]);

  /**
   * Stores messages and adds index information.
   */
  useEffect(() => {
    const cleanUp = generateMessage((message: Message) => {
      setLastMessage(message);
      setMessages((oldMessages) => [
        ...oldMessages,
        {
          ...message,
          index: oldMessages[oldMessages.length - 1]?.index + 1 || 0,
        },
      ]);
    });

    if (isMessageServiceStopped) {
      cleanUp();
    }
    return cleanUp;
  }, [setMessages, isMessageServiceStopped]);

  const contextValue = useMemo(() => {
    return {
      messages,
      lastMessage,
      onClearMessage,
      onClearAllMessages,
      onToggleMessagesService,
      isMessageServiceStopped,
    };
  }, [
    messages,
    isMessageServiceStopped,
    lastMessage,
    onClearMessage,
    onClearAllMessages,
    onToggleMessagesService,
  ]);

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
};

function useMessageContext(): MessageContextApi {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessageContext must be within MessageProvider");
  }

  return context;
}

export { MessageProvider, useMessageContext };
