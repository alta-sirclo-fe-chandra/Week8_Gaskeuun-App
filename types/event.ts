export type Events = {
  events: event[];
};

export type Event = {
  event: event;
};

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
}
