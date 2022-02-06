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
  date: string;
  description: string;
  location: string;
}
