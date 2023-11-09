import { IParticipant, IRawParticipant } from "../IParticipant";

export const transformData = (data: IRawParticipant[]): IParticipant[] => {
  const transformed: IParticipant[] = [];

  data.forEach((person) => {
    const primaryRecord: IParticipant = {
      name: person.name,
      date_of_birth: person.date_of_birth,
      address: person.address,
      phone_number: person.phone_number,
    };
    if (person.name) transformed.push(primaryRecord);

    // Check and add secondary record if it exists
    if (person.name_1 || person.address_1 || person.phone_number_1) {
      const secondaryRecord: IParticipant = {
        name: person.name_1 ?? "Unknown",
        address: person.address_1 ?? "Unknown",
        phone_number: person.phone_number_1 ?? "Unknown",
      };

      transformed.push(secondaryRecord);
    }
  });

  return transformed;
};

export const cleanRowParticipants = (
  rowParticipants: IRawParticipant[]
): IParticipant[] => {
  const participants = rowParticipants.map((participant) => {
    return {
      name: participant["name"],
      date_of_birth: participant["date_of_birth"]
        ? new Date(participant["date_of_birth"]).toISOString()
        : undefined,
      phone_number: participant["phone_number"],
      address: participant["address"],
    };
  });
  return transformData(participants);
};


