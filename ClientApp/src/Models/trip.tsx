import { Profile } from "./profiles";

// Typescript interface
export interface Trip {
  id: string;
  title: string;
  author?: string;
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
  isCancelled?: boolean;
  attendees?: Profile[];
}
