// import {Photo} from './photo';

export type Project = {
  id: number;
  title: string;
  description?: string;
  price: number;
  area: number;
  rooms: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
// photos: Photo[];