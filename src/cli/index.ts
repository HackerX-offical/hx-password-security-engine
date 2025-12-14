#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import inquirer from "inquirer";
import chalk from "chalk";
import { PasswordAnalyzer } from "../core/analyzer";
import { OutputFormatter } from "./formatter";
import { InputValidator } from "../validators";

const runAnalysis = (password: string, json: boolean) => {
  const error = InputValidator.validatePassword(password);
  if (error) {
    if (json) {
      console.log(JSON.stringify({ error }));
    } else {
      console.error(chalk.red(`Error: ${error}`));
    }
    process.exit(1);
  }

  const result = PasswordAnalyzer.analyze(password);
  if (json) {
    console.log(OutputFormatter.formatJSON(result));
  } else {
    console.log(OutputFormatter.formatHuman(result));
  }
};

yargs(hideBin(process.argv))
  .command(
    "analyze",
    "Analyze a password",
    (yargs) => {
      return yargs
        .option("password", {
          alias: "p",
          type: "string",
          description: "The password to analyze",
        })
        .option("json", {
          alias: "j",
          type: "boolean",
          description: "Output in JSON format",
          default: false,
        });
    },
    async (argv) => {
      if (argv.password) {
        runAnalysis(argv.password, argv.json);
      } else {
        // Interactive mode if no password provided
        if (argv.json) {
          console.error(
            JSON.stringify({
              error: "Password argument required for JSON mode",
            })
          );
          process.exit(1);
        }

        console.log(chalk.blue("🔐 Interactive Password Analysis"));
        const answers = await inquirer.prompt([
          {
            type: "password",
            name: "password",
            message: "Enter password to analyze:",
            mask: "*",
            validate: (input) => {
              const err = InputValidator.validatePassword(input);
              return err ? err : true;
            },
          },
        ]);

        runAnalysis(answers.password, false);
      }
    }
  )
  .demandCommand(1, 'You must provide a valid command (e.g., "analyze")')
  .help().argv;
