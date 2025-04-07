import { commentHandlers } from "./comment";
import { postHandlers } from "./post";
import { profileHandlers } from "./profile";
import { roomHandlers } from "./room";

export const handlers = [
  ...roomHandlers,
  ...postHandlers,
  ...commentHandlers,
  ...profileHandlers,
];
