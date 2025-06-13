import styled from "styled-components";
import useSocket from "@/features/chatting/hooks/useSocket";
import useCustomParams from "@/utils/useCustomParams";
import TopCard from "@/features/chatting/components/TopCard";
import SubmitIcon from "@/assets/chatSubmit.svg?react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ChatBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const MessageList = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  min-height: 400px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MessageItem = styled.div<{ isMe: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isMe ? "flex-end" : "flex-start")};
`;

const BubbleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 6px;
`;

const Bubble = styled.div<{ isMe: boolean }>`
  background-color: ${(props) => (props.isMe ? "#e5efff" : "#f2f2f2")};
  padding: 12px 16px;
  border-radius: 12px;
  max-width: 70%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  font-size: 0.7rem;
  line-height: 1.4;
`;

const Time = styled.span`
  font-size: 0.6rem;
  color: #aaa;
  white-space: nowrap;
`;

const MessageInputWrapper = styled.div`
  display: flex;
  margin-top: 12px;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 5px;
  font-size: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-right: 10px;
`;

const SendButton = styled.button`
  width: 100px;
  background: black;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
`;

function formatTime(timestamp?: string | number) {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function Chatting() {
  const { stompHandler, messageObj, messages, setMessageObj, userId } =
    useSocket();
  const roomId = useCustomParams();
  const [isEnterChat, setIsEnterChat] = useState(false);

  useEffect(() => {
    const adminMsg = messages.find((msg) => msg.sender === "admin");
    if (adminMsg && !isEnterChat) {
      toast.success(`${adminMsg.message}님이 입장했습니다.`);
      setIsEnterChat(true);
    }
  }, [messages, isEnterChat]);

  return (
    <ChatContainer>
      <ChatBox>
        <TopCard />
        <MessageList>
          {messages.map((msg, idx) => {
            const isMe = msg.sender === userId;
            return (
              <>
                {msg.sender !== "admin" && (
                  <MessageItem key={idx} isMe={isMe}>
                    <BubbleWrapper>
                      {isMe ? (
                        <>
                          <Time>
                            {formatTime(msg.timestamp) || "오전 09:00"}
                          </Time>
                          <Bubble isMe={isMe}>{msg.message}</Bubble>
                        </>
                      ) : (
                        <>
                          <Bubble isMe={isMe}>{msg.message}</Bubble>
                          <Time>
                            {formatTime(msg.timestamp) || "오전 09:00"}
                          </Time>
                        </>
                      )}
                    </BubbleWrapper>    
                  </MessageItem>
                )}
              </>
            );
          })}
        </MessageList>
        <MessageInputWrapper>
          <MessageInput
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
            placeholder="메시지를 입력하세요"
          />
          <SendButton onClick={() => stompHandler.sendMessage(roomId)}>
            <SubmitIcon />
            전송
          </SendButton>
        </MessageInputWrapper>
      </ChatBox>
    </ChatContainer>
  );
}

export default Chatting;
