// src/models/concert.ts
export interface Concert {
  id: string;
  title: string;
  date: Date;
  venue: string;
  artistIds: string[];  // Array of artist IDs performing at the concert
}
