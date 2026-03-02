import type { UpdateItem } from "../student";

export interface SocketPayload {
  notification?: {
    id: string;
    type: UpdateItem["type"];
    title: string;
    message: string;
    link?: string | null;
    imageUrl?: string | null;
    createdAt: string;
  };
}
