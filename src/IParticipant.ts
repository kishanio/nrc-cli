export interface IRawParticipant {
  name: string;
  date_of_birth?: string;
  address: string;
  phone_number: string;
  name_1?: string;
  address_1?: string;
  phone_number_1?: string;
  name_latin?: string;
}

export interface IParticipant {
  name: string;
  date_of_birth?: string;
  address: string;
  phone_number: string;
}
