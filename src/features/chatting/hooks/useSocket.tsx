import { useState } from "react";
import { Client, IFrame, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useProfileStore } from "@/features/login/store/useProfileStore";

interface MessagesType {
  sender: string; // 보내는 주체
  message: string; // 보내는 메시지
}

function useSocket() {
  const SERVER_URL = `/api/v1/ws`; // STOMP 연결 엔드포인트
  const PUB_ENDPOINT = "/pub/chat/message"; // 메시지를 전송하기 위한 엔드포인트

  // STOMP가 연결되고 생성한 Client를 관리하는 상태 관리
  const [wsClient, setWsClient] = useState<Client>();
  // 채팅방 입장 여부
  const [isEnterChat, setIsEnterChat] = useState<boolean>(false);
  // 채팅에서 누적되는 데이터를 관리합니다.
  const [messages, setMessages] = useState<MessagesType[]>([]);
  // 사용자의 구분을 짓기 위해 임시로 발급한 사용자 아이디
  const { basicProfile } = useProfileStore();
  // 채팅에서 보내지는 데이터를 관리합니다.
  const [messageObj, setMessageObj] = useState<MessagesType>({
    message: "",
    sender: basicProfile?.memberName || "",
  });

  const stompHandler = (() => {
    return {
      /**
       * STOMP 연결을 시도합니다.
       * @returns
       */
      connect: (roomId: string) => {
        // [STEP1] 연결 시 Client 객체를 생성합니다.
        console.log("연결!");
        const SUB_ENDPOINT = `/sub/chat/room/${roomId}`; // 메시지를 수신하기 위한 엔드포인트

        const client = new Client({
          webSocketFactory: () => new SockJS(SERVER_URL),

          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
          // [STEP2] 웹 소켓 연결

          onConnect: (conn: IFrame) => {
            console.log("[+] WebSocket 연결이 되었습니다.", conn);
            setIsEnterChat(true); // 채팅방 입장여부 상태를 변경
            // [WebSocket - Subscribe] 특정 엔드포인트로 메시지를 수신합니다.
            client.subscribe(SUB_ENDPOINT, (message: IMessage) => {
              const receiveData = JSON.parse(message.body);
              console.log("receiveData", receiveData);
              setMessages((prevMessages) => [
                ...prevMessages,
                {
                  message: receiveData.message,
                  sender: receiveData.sender,
                },
              ]);
            });
          },

          // 웹 소켓 연결 종료
          onWebSocketClose: (close) => {
            console.log("[-] WebSocket 연결이 종료 되었습니다.", close);
          },
          // 웹 소켓 연결 에러
          onWebSocketError: (error) => {
            console.error("[-] 웹 소켓 연결 오류가 발생하였습니다.", error);
          },
          // STOMP 프로토콜 에러
          onStompError: (frame) => {
            console.error("Broker reported error: " + frame.headers["message"]);
            console.error("Additional details: " + frame.body);
          },
          debug: (err) => console.log(err),
        });
        console.log("setClient", client);

        client.activate(); // Client를 활성화 합니다.
        setWsClient(client); // 구성한 Client 객체를 상태 관리에 추가합니다.
        console.log("setClient2", wsClient);
        return () => {
          console.log("onConnect연결종료!");
          stompHandler.disconnect(); // Socket 연결을 종료합니다.
        };
      },
      /**
       * 웹 소켓 메시지를 전송합니다.
       */
      sendMessage: (roomId: string) => {
        console.log("wsClient", wsClient);

        if (wsClient && messageObj.message.trim() !== "") {
          // [WebSocket - Publish] 특정 엔드포인트로 메시지를 전송합니다.
          console.log("messageObj", messageObj);
          wsClient.publish({
            destination: PUB_ENDPOINT,
            body: JSON.stringify({
              roomId,
              ...messageObj,
            }),
          });
          console.log("messageObj", messageObj);
          // 입력한 값을 초기화합니다.
          setMessageObj((prev) => {
            return {
              ...prev,
              message: "",
              sender: basicProfile?.memberName || "",
            };
          });
        }
      },
      /**
       * 웹 소켓 연결을 종료합니다.
       */
      disconnect: () => {
        console.log("[-] 웹 소켓 연결을 종료합니다.");
        if (wsClient) {
          wsClient.deactivate();
          setWsClient(undefined);
          setIsEnterChat(false);
        }
      },
    };
  })();

  return {
    messages,
    stompHandler,
    messageObj,
    setMessageObj,
    isEnterChat,
    userId: basicProfile?.memberName || "",
  };
}
export default useSocket;
