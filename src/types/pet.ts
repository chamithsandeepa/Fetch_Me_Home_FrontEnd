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
  gender: string;
  location: string;
  contactNo: string;
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

export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role:string;
}

export interface SignInFormData {
  email: string;
  password: string;
}
