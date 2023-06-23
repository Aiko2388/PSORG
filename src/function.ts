import { Client, Collection } from "discord.js";
import fs from "fs/promises";
import path from "path";
import { Command, Event } from "./interface";
import chalk from "chalk";

const eventArray: Event[] = [];
const commandArray: Command[] = [];
const cmd = new Collection();

export async function registerEvents(
  client: Client,
  ...dirstart: string[]
): Promise<void> {
  for (const first of dirstart) {
    const files = await fs.readdir(path.join(__dirname, first));
    for (const second of files) {
      const stat = await fs.stat(path.join(__dirname, first, second));
      if (second.includes("-ignore")) continue;
      if (stat.isDirectory()) {
        await registerEvents(client, path.join(first, second));
      } else {
        try {
          const eventModule = (
            await import(path.join(__dirname, first, second))
          ).default;
          if (eventModule?.once)
            client.once(
              eventModule.name,
              async (...args) => await eventModule.run(client, ...args)
            );
          else
            client.on(
              eventModule.name,
              async (...args) => await eventModule.run(client, ...args)
            );
          eventArray.push(eventModule.name);
        } catch (e) {
          console.log(
            chalk.red(
              `Error Event - Location: ${path.join(
                __dirname,
                first,
                second
              )} - ${e}`
            )
          );
        }
      }
    }
  }
}

export async function registerSlash(
  client: Client,
  type: String,
  ...dirstart: string[]
): Promise<void> {
  for (const first of dirstart) {
    const files = await fs.readdir(path.join(__dirname, first));
    for (const second of files) {
      const stat = await fs.stat(path.join(__dirname, first, second));
      if (second.includes("-ignore")) continue;
      if (stat.isDirectory()) {
        await registerSlash(client, type, path.join(first, second));
      } else {
        try {
          const commandModule = (
            await import(path.join(__dirname, first, second))
          ).default as Command;
          cmd.set(commandModule.name, commandModule);
          if (type == "update") commandArray.push(commandModule);
        } catch (e) {
          console.log(
            chalk.red(
              `Error Slash Command - Location: ${path.join(
                __dirname,
                first,
                second
              )} - ${e}`
            )
          );
        }
      }
    }
  }
}

export default { commandArray, eventArray };
