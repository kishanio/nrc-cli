#!/usr/bin/env node
import { Command } from "commander";
import figlet from "figlet";
import chalk from "chalk";
import ora from "ora";

import config from "./config.json";

import { getWorkbook, convertWorkbookToJson } from "./utils/workbook";
import { cleanRowParticipants } from "./utils/parse";
import { uploadParticipant } from "./utils/api";

console.log(figlet.textSync("NRC Participant Uploader"));

const program = new Command();

program
  .version(config.version)
  .description("Upload participants to a NRC API")
  .option("-f, --file <file>", "XLSX file with participant data")
  .option("-k, --api-key <apiKey>", "API Key to be passed to the NRC API")
  .option(
    "-h, --host <host>",
    "Host to be passed to the NRC API (Optional)",
    config.defaultAPIhost
  )
  .parse(process.argv);

program.showHelpAfterError();

(async () => {
  try {
    const options = program.opts();

    if (!options.file || !options.apiKey) {
      throw new Error("Missing required arguments");
    }

    if (!options.file.endsWith(".xlsx")) {
      throw new Error("File must be a XLSX file");
    }

    // reading the file
    const reading = ora("Reading Excel").start();
    const workbook = getWorkbook(options.file);
    reading.succeed("Excel read successfully");

    const parsing = ora("Cleaning and Parsing Excel").start();
    const participantJson = convertWorkbookToJson(workbook);
    parsing.succeed("Excel cleaned and parsed successfully");

    // cleaning the data
    const cleanedParticipants = cleanRowParticipants(participantJson);


    // uploading the data
    let uploaded = 0;
    for (const participant of cleanedParticipants) {
      const status = await uploadParticipant({
        host: options.host,
        participant,
        apiKey: options.apiKey,
      });

      if (status) {
        uploaded += 1;
      }
    }

    if (uploaded === cleanedParticipants.length) {
      console.log(chalk.green(`Uploaded ${uploaded} participants`));
    } else {
      console.log(
        chalk.red(
          `Failed to upload ${cleanedParticipants.length - uploaded} participants`
        )
      );

    }
  } catch (error) {
    console.error(chalk.red(`Error: ${(error as Error).message}`));
    program.outputHelp({
      error: true,
    });

    process.exit(1);
  }
})();
