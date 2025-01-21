export interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  imageUrl: string;
  description: string;
  color: string;
  gender: string;
  location: string;
}

export interface AddPetFormData {
  species: string;
  name: string;
  breed: string;
  sex: string;
  age: string;
  color: string;
  location: string;
  contactNo: string;
  description: string;
  imageUrl?: string;
}
