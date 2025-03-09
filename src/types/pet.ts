export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  sex: string;
  age: string;
  imageUrl: string;
  description: string;
  color: string;
  // gender: string;
  location: string;
  contactNo: string;
  adopted: boolean;
}

export interface AdoptionForm {
  firstName: string;
  lastName: string;
  telephone: string;
  email: string;
  address: string;
  otherPets: string;
  petsNeutered: string;
  secureGarden: string;
  animalSleepLocation: string;
  workHours: string;
  previousRehoming: string;
  happyHome: string;
  childrenUnder16: string;
  homeOwnership: string;
  landlordPermission: string;
  mainRoad: string;
}
