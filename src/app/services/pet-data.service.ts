import { Injectable } from '@angular/core';
import { PetProfile } from '../models/pet.model';
import { WANGCAI_PROFILE, XIAOXUE_PROFILE, DOUDOU_PROFILE, TUANZI_PROFILE } from '../pets';

@Injectable({
  providedIn: 'root'
})
export class PetDataService {

  private readonly pets: PetProfile[] = [
    WANGCAI_PROFILE,
    XIAOXUE_PROFILE,
    DOUDOU_PROFILE,
    TUANZI_PROFILE
  ];

  getAllPets(): PetProfile[] {
    return this.pets;
  }

  getPetById(id: string): PetProfile | undefined {
    return this.pets.find(p => p.id === id);
  }
}
