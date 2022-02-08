import {User} from "./User"

export type Events = {
  events: event[];
  totalPage: number
};

export type Event = {
  event: event;
};

export interface participants {
  id: number
  name: string
  email: string
  imageUrl: string
}

export interface comment {
  id: number
  comment: string
  user: User
  updatedAt: string
}
interface event {
  id: number;
  userId: number;
  categoryId: number;
  title: string;
  host: string;
  date: Date;
  description: string;
  location: string;
  image: string
  participants: participants[]
  Comments: comment[]
}
