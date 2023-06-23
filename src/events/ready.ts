import { Events } from "discord.js";
import { Event } from "../interface";
import _function from "../function";
import chalk from "chalk";

const { commandArray, eventArray } = _function;

export default {
  name: Events.ClientReady,
  once: true,
  run: async (client): Promise<void> => {
    console.log(chalk.green(`${client.user?.username} is up and running!`));
    console.log(
      chalk.cyan(
        `Slash Loaded: ${commandArray.length} - Event Loaded: ${eventArray.length}`
      )
    );
  },
} as Event;
