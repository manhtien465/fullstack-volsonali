
export interface Game {
  id: number;
  src: string;
  name?: string;
  tag?: string;
}

export interface Tag {
  id: number;
  name: string;
}