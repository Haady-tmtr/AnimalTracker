import { Animal } from './animal.model';

export interface Observation {
  id?: number;
  date: Date; 
  latitude: number;
  longitude: number;
  description: string;
  animal: string;
}
