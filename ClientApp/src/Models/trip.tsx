import { Profile } from "./profiles";

// Typescript interface
export interface Trip {
  id: string;
  title: string;
  author: string;
  shortDescription: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  picCoverUrl: string;
  rating: number | null;
  location: string;
  cost: number;
  duration: number;
  createdAt: Date;
  isCancelled: boolean;
  isGoing: boolean;
  isHost: boolean;
  host?: Profile;
  attendees?: Profile[];
}

export class Trip implements Trip {
  constructor(init?: TripFormValues) {
    Object.assign(this, init);
  }
}

export class TripFormValues {
  id?: string = undefined;
  title: string = "";
  author: string = "";
  shortDescription: string = "";
  description: string = " ";
  startDate: Date | null = null;
  endDate: Date | null = null;
  picCoverUrl: string = " ";
  rating: number | null = null;
  location: string = "";
  cost: number | null = null;
  duration: number | null = null;

  constructor(trip?: TripFormValues) {
    if (trip) {
      this.id = trip.id;
      this.title = trip.title;
      this.author = trip.author;
      this.description = trip.description;
      this.startDate = trip.startDate;
      this.endDate = trip.endDate;
      this.picCoverUrl = trip.picCoverUrl;
      this.rating = trip.rating;
      this.location = trip.location;
      this.cost = trip.cost;
      this.duration = trip.duration;
    }
  }
}
