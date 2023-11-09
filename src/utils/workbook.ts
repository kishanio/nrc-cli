import xlsx from "xlsx";
import { IRawParticipant } from "../IParticipant";

export const getWorkbook = (filePath: string): xlsx.WorkBook => {
  const workbook = xlsx.readFile(filePath);
  return workbook;
};

export const convertWorkbookToJson = (
  workbook: xlsx.WorkBook
): IRawParticipant[] => {
  let participants: IRawParticipant[] = [];
  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json<IRawParticipant>(sheet, {
      raw: false,
    });
    participants = [...participants, ...data];
  });

  return participants;
};