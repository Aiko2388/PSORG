import { Events } from "discord.js";
import { Event } from "../interface";
import _function from "../function";
import chalk from "chalk";

const { commandArray, eventArray } = _function;

export default {
  name: Events.InteractionCreate,
  once: false,
  run: async (client): Promise<void> => {
  },
} as Event;
