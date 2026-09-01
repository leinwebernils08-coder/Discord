import "dotenv/config";
import {
  Client,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder
} from "discord.js";

import { home, category, productList, productPage, detailsPage, buyPage, groupForProduct } from "./ui.js";

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
  console.error("Missing DISCORD_TOKEN, CLIENT_ID or GUILD_ID in .env");
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Open the LUMA shop")
    .toJSON()
];

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);

try {
  await rest.put(
    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
    { body: commands }
  );
  console.log("Slash command registered.");
} catch (error) {
  console.error("Could not register command:", error);
}

client.once(Events.ClientReady, readyClient => {
  console.log(`LUMA Bot online as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  try {
    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === "shop") {
        await interaction.reply({ ...home(), ephemeral: false });
      }
      return;
    }

    if (!interaction.isButton()) return;

    const id = interaction.customId;

    if (id === "home") return interaction.update(home());

    if (id.startsWith("cat:")) {
      return interaction.update(category(id.split(":")[1]));
    }

    if (id.startsWith("group:")) {
      return interaction.update(productList(id.split(":")[1]));
    }

    if (id.startsWith("product:")) {
      return interaction.update(productPage(id.split(":")[1]));
    }

    if (id.startsWith("details:")) {
      return interaction.update(detailsPage(id.split(":")[1]));
    }

    if (id.startsWith("buy:")) {
      return interaction.update(buyPage(id.split(":")[1]));
    }

    if (id.startsWith("backgroup:")) {
      return interaction.update(productList(groupForProduct(id.split(":")[1])));
    }
  } catch (error) {
    console.error(error);
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({ content: "Something went wrong.", ephemeral: true });
    }
  }
});

client.login(DISCORD_TOKEN);
