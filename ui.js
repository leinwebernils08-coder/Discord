import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from "discord.js";
import { BRAND, PRODUCTS, findProduct } from "./config.js";

const purple = ButtonStyle.Primary;
const gray = ButtonStyle.Secondary;
const green = ButtonStyle.Success;

function baseEmbed(title, description) {
  return new EmbedBuilder()
    .setColor(BRAND.accent)
    .setTitle(title)
    .setDescription(description)
    .setFooter({ text: BRAND.footer });
}

export function home() {
  return {
    embeds: [baseEmbed("LUMA SHOP", "Welcome to **LUMA**.\nBrowse our available categories and select a product.\n\n🛡️ Secure   ⚡ Fast   🤖 Automated")],
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("cat:fortnite").setLabel("Fortnite").setEmoji("🎮").setStyle(purple),
        new ButtonBuilder().setCustomId("cat:discord").setLabel("Discord").setEmoji("💬").setStyle(purple)
      )
    ]
  };
}

export function category(name) {
  const isFortnite = name === "fortnite";
  return {
    embeds: [baseEmbed(isFortnite ? "FORTNITE" : "DISCORD",
      isFortnite ? "Browse our Fortnite product categories." : "Browse our Discord product categories.")],
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(isFortnite ? "group:fa" : "group:members")
          .setLabel(isFortnite ? "FA Accounts" : "Members")
          .setEmoji(isFortnite ? "🔐" : "👥").setStyle(purple),
        new ButtonBuilder().setCustomId(isFortnite ? "group:vbucks" : "group:accounts")
          .setLabel(isFortnite ? "V-Bucks Accounts" : "Accounts")
          .setEmoji(isFortnite ? "💰" : "👤").setStyle(purple)
      ),
      new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("home").setLabel("Back").setEmoji("←").setStyle(gray)
      )
    ]
  };
}

export function productList(group) {
  const titleMap = {
    fa: "FULL ACCESS ACCOUNTS",
    vbucks: "V-BUCKS ACCOUNTS",
    members: "DISCORD MEMBERS",
    accounts: "DISCORD ACCOUNTS"
  };

  const products = group === "fa" ? PRODUCTS.fortnite.fa
    : group === "vbucks" ? PRODUCTS.fortnite.vbucks
    : group === "members" ? PRODUCTS.discord.members
    : PRODUCTS.discord.accounts;

  const rows = [];
  for (let i = 0; i < products.length; i += 5) {
    rows.push(new ActionRowBuilder().addComponents(
      ...products.slice(i, i + 5).map(p =>
        new ButtonBuilder()
          .setCustomId(`product:${p.id}`)
          .setLabel(`${p.name} • ${p.price}`)
          .setStyle(purple)
      )
    ));
  }

  rows.push(new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(group === "fa" || group === "vbucks" ? "cat:fortnite" : "cat:discord")
      .setLabel("Back")
      .setEmoji("←")
      .setStyle(gray)
  ));

  return {
    embeds: [baseEmbed(titleMap[group], "Select a product to view details.")],
    components: rows
  };
}

export function productPage(id) {
  const product = findProduct(id);
  return {
    embeds: [baseEmbed(product.name,
      `**Category:** ${product.category}\n` +
      `**Price:** ${product.price}\n` +
      `**Status:** In Stock\n` +
      `**Delivery:** Details configured by the seller\n\n` +
      `Select an option below to continue.`)],
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(`buy:${id}`).setLabel("Buy Now").setEmoji("🛒").setStyle(green),
        new ButtonBuilder().setCustomId(`details:${id}`).setLabel("Details").setEmoji("📋").setStyle(gray)
      ),
      new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(`backgroup:${id}`).setLabel("Back to Products").setEmoji("←").setStyle(gray)
      )
    ]
  };
}

export function detailsPage(id) {
  const product = findProduct(id);
  return {
    embeds: [baseEmbed(`${product.name} • DETAILS`,
      `**Price:** ${product.price}\n\n` +
      `Add your exact product description, delivery information, refund policy and requirements here.`)],
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(`product:${id}`).setLabel("Back").setEmoji("←").setStyle(gray)
      )
    ]
  };
}

export function buyPage(id) {
  const product = findProduct(id);
  return {
    embeds: [baseEmbed("ORDER REQUEST",
      `You selected **${product.name}** for **${product.price}**.\n\n` +
      `The payment and delivery system is intentionally not connected yet. This is the next module to add.`)],
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(`product:${id}`).setLabel("Back to Product").setEmoji("←").setStyle(gray)
      )
    ]
  };
}

export function groupForProduct(id) {
  if (id.startsWith("fa_")) return "fa";
  if (id.startsWith("vb_")) return "vbucks";
  if (id.startsWith("m_")) return "members";
  return "accounts";
}
