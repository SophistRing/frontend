import { commentHandlers } from "./comment";
import { postHandlers } from "./post";
import { roomHandlers } from "./room";

export const handlers = [...roomHandlers, ...postHandlers, ...commentHandlers];
