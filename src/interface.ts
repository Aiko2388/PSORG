import {
  ChatInputApplicationCommandData,
  Client,
  ChatInputCommandInteraction,
  AutocompleteInteraction,
  Events,
} from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
  name: string;
  description: string;
  type: number;
  category: string;
  onlyGuild: boolean;
  onlyDev?: boolean | false;
  autocomplete?: (client: Client, interaction: AutocompleteInteraction) => void;
  run: (client: Client, interaction: ChatInputCommandInteraction) => void;
}

export interface Event {
  name: Events;
  once: boolean;
  run: (client: Client, ...args: any) => void;
}
