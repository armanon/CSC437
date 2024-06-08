// src/models/concert.ts
export interface Concert {
  _id: string;
  title: string;
  artists: string;  // Array of artist IDs performing at the concert
}
