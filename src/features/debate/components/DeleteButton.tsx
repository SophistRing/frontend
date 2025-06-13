import styled from "styled-components";
import { useRoomDelete } from "../query/room.query";
import { MouseEvent } from "react";

const DeleteButtonContainer = styled.button`
  border-radius: 5px;
  width: 45px;
  height: 22px;
  font-size: 0.75rem;
  background-color: #f64f4f;
  color: white;
  border: none;
  margin-right: 10px;
  cursor: pointer;
`;

interface DeleteButtonProps {
  post: string;
  user: string;
  roomId: string;
}

function DeleteButton({ post, user, roomId }: DeleteButtonProps) {
  const isAuthor = user === post;
  const { mutate } = useRoomDelete();
  const onClickDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutate(roomId);
  };

  return (
    <>
      {isAuthor && (
        <DeleteButtonContainer onClick={onClickDelete}>
          삭제
        </DeleteButtonContainer>
      )}
    </>
  );
}

export default DeleteButton;
