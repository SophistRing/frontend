import TopCard from "@/features/chatting/components/TopCard";
import useSocket from "@/features/chatting/hooks/useSocket";
import styled from "styled-components";
import SubmitIcon from "@/assets/chatSubmit.svg?react";
import useCustomParams from "@/utils/useCustomParams";

export const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 12px;
`;

export const MessageInputContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  bottom: 0;
`;

export const MessageInput = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-right: 10px;
  width: 100%;
`;

export const MessageList = styled.div`
  max-height: 550px;
  min-height: 550px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  position: relative;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
`;

export const MessageItem = styled.div<{ isMe: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isMe ? "flex-end" : "flex-start")};
  width: 100%;
  margin-bottom: 20px;
`;

export const Bubble = styled.div<{ isMe: boolean }>`
  background-color: ${(props) => (props.isMe ? "#d1e7ff" : "#f1f1f1")};
  color: #000;
  padding: 10px 14px;
  border-radius: 16px;
  max-width: 60%;
  word-break: break-word;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 10px;
    ${(props) =>
      props.isMe
        ? `
      right: -8px;
      border-left: 8px solid #d1e7ff;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
    `
        : `
      left: -8px;
      border-right: 8px solid #f1f1f1;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
    `}
  }
`;

export const Meta = styled.span`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

export const MessageAuthor = styled.p<{ isMe: boolean }>`
  font-size: 14px;
  display: ${(props) => (props.isMe ? "none" : "flex")};
  margin-bottom: 10px;
`;

export const EnterButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;
  width: 100px;
`;

function Chatting() {
  const {
    stompHandler,
    messageObj,
    messages,
    isEnterChat,
    setMessageObj,
    userId,
  } = useSocket();
  const roomId = useCustomParams();

  return (
    <ChatContainer>
      <Container>
        <TopCard />
        <MessageList>
          {messages.map((item, index) => (
            <MessageItem
              key={`messages-${index}`}
              isMe={item.sender === userId}
            >
              <MessageAuthor isMe={item.sender === userId}>
                {item.sender}
              </MessageAuthor>
              <Bubble isMe={item.sender === userId}>{item.message}</Bubble>
              <Meta>14:33</Meta>
            </MessageItem>
          ))}
        </MessageList>
        <MessageInputContainer>
          <MessageInput
            type="text"
            placeholder="메세지를 입력하세요."
            value={messageObj.message}
            onChange={(e) =>
              setMessageObj({ ...messageObj, message: e.target.value })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                stompHandler.sendMessage(roomId);
              }
            }}
          />
          <EnterButton onClick={() => stompHandler.sendMessage(roomId)}>
            <SubmitIcon style={{ marginRight: "10px" }} />
            전송
          </EnterButton>
        </MessageInputContainer>
      </Container>
    </ChatContainer>
  );
}

export default Chatting;
