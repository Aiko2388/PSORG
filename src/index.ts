import { Client } from "discord.js";
import Enmap from "enmap";
import dotenv from "dotenv";
import { registerEvents, registerSlash } from "./function";
import chalk from "chalk";

const env = dotenv.config().parsed;

const client = new Client({
  intents: ["GuildMembers", "GuildMessages", "Guilds"],
});

export const enmap = new Enmap({ autoEnsure: true, autoFetch: true });

registerEvents(client, "./events");
registerSlash(client, "register", "./commands");

if (!env?.DISCORDTOKEN)
  console.log(chalk.red(`Discord Token is not defined in .env!`));
else
  client.login(env?.DISCORDTOKEN).catch(() => {
    console.log(
      chalk.red(`There was unexpected error with client login attempted`)
    );
  });
