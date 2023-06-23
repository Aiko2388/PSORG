import { ChatInputCommandInteraction, Colors, EmbedBuilder } from "discord.js";

export class embed {
  private interaction: ChatInputCommandInteraction;

  constructor(interaction: ChatInputCommandInteraction) {
    this.interaction = interaction;
  }

  public async error(
    embed = new EmbedBuilder().data,
    components = [],
    ephemeral = false
  ) {
    embed.color = embed?.color || Colors.Red;
    embed.timestamp = Date();

    await this.interaction.editReply({
      embeds: [embed],
      components: components,
      options: {
        ephemeral: ephemeral,
      },
    });
  }

  public async sucess(
    embed = new EmbedBuilder().data,
    components = [],
    ephemeral = false
  ) {
    embed.color = embed?.color || Colors.Green;
    embed.timestamp = Date();

    await this.interaction.editReply({
      embeds: [embed],
      components: components,
      options: {
        ephemeral: ephemeral,
      },
    });
  }
}
