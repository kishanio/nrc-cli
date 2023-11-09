import ora from "ora";
import { IParticipant } from "../IParticipant";
import fetch from "node-fetch";

export const uploadParticipant = async (params: {
  host: string;
  participant: IParticipant;
  apiKey: string;
}) => {
  const uploading = ora(`Uploading ${params.participant.name} to ${params.host}`).start();

  try {
    const response = await fetch(`${params.host}/participants"`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": params.apiKey,
      },
      body: JSON.stringify(params.host),
    });

    if (response.status === 200) {
      uploading.succeed(`Uploaded ${params.participant.name} to ${params.host}`);
      return true;
    } else {
      throw new Error(
        `${response.statusText}: Failed to upload ${params.participant.name} to ${params.host}`
      );
    }
  } catch (error) {
    uploading.fail(`${(error as Error).message}`);

    return false;
  }
};
