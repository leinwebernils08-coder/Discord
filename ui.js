import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} from "discord.js";

import { SHOP_NAME, categories, products } from "./config.js";

const brand = 0x8b5cf6;

function homeButtons() {
  const rows = [];
  for (let i = 0; i < categories.length; i += 5) {
    rows.push(
      new ActionRowBuilder().addComponents(
        categories.slice(i, i + 5).map(cat =>
          new ButtonBuilder()
            .setCustomId(`cat:${cat.id}`)
            .setLabel(cat.name)
            .setEmoji(cat.emoji)
            .setStyle(ButtonStyle.Primary)
        )
      )
    );
  }
  return rows;
}

export function home() {
  const embed = new EmbedBuilder()
    .setColor(brand)
    .setTitle(`✨ ${SHOP_NAME} Shop`)
    .setDescription("Welcome to the LUMA shop. Choose a category below.");

  for (const cat of categories) {
    embed.addFields({
      name: `${cat.emoji} ${cat.name}`,
      value: cat.description,
      inline: true
    });
  }

  return { embeds: [embed], components: homeButtons() };
}

export function category(categoryId) {
  const cat = categories.find(c => c.id === categoryId);
  const categoryProducts = products.filter(p => p.category === categoryId);

  const embed = new EmbedBuilder()
    .setColor(brand)
    .setTitle(`${cat?.emoji ?? "📦"} ${cat?.name ?? "Category"}`)
    .setDescription(categoryProducts.length ? "Choose a product." : "No products available yet.");

  const rows = [];
  if (categoryProducts.length) {
    rows.push(
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`group:${categoryId}`)
          .setLabel("View products")
          .setStyle(ButtonStyle.Primary)
      )
    );
  }
  rows.push(
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("home")
        .setLabel("Back to home")
        .setStyle(ButtonStyle.Secondary)
    )
  );

  return { embeds: [embed], components: rows };
}

export function productList(categoryId) {
  const categoryProducts = products.filter(p => p.category === categoryId);

  const embed = new EmbedBuilder()
    .setColor(brand)
    .setTitle("🛒 Products")
    .setDescription(categoryProducts.length ? "Select a product below." : "No products available.");

  const rows = [];
  for (let i = 0; i < categoryProducts.length; i += 5) {
    rows.push(
      new ActionRowBuilder().addComponents(
        categoryProducts.slice(i, i + 5).map(product =>
          new ButtonBuilder()
            .setCustomId(`product:${product.id}`)
            .setLabel(product.name)
            .setStyle(ButtonStyle.Primary)
        )
      )
    );
  }

  rows.push(
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("home")
        .setLabel("Home")
        .setStyle(ButtonStyle.Secondary)
    )
  );

  return { embeds: [embed], components: rows };
}

export function productPage(productId) {
  const product = products.find(p => p.id === productId);

  const embed = new EmbedBuilder()
    .setColor(brand)
    .setTitle(`📦 ${product?.name ?? "Product"}`)
    .setDescription(product?.description ?? "Product not found.")
    .addFields({ name: "Price", value: product?.price ?? "-", inline: true });

  return {
    embeds: [embed],
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`details:${productId}`)
          .setLabel("Details")
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
          .setCustomId(`buy:${productId}`)
          .setLabel("Buy")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId(`backgroup:${productId}`)
          .setLabel("Back")
          .setStyle(ButtonStyle.Primary)
      )
    ]
  };
}

export function detailsPage(productId) {
  const product = products.find(p => p.id === productId);

  const embed = new EmbedBuilder()
    .setColor(brand)
    .setTitle(`ℹ️ ${product?.name ?? "Product"} — Details`)
    .setDescription(product?.details ?? "No details available.");

  return {
    embeds: [embed],
    components: [
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`product:${productId}`)
          .setLabel("Back")
          .setStyle(ButtonStyle.Secondary)
      )
    ]
  };
}

export function buyPage(productId) {
  const product = products.find(p => p.id === productId);
  const url = product?.buyUrl;

  const embed = new EmbedBuilder()
    .setColor(brand)
    .setTitle("🛒 Purchase")
    .setDescription(url && url.startsWith("http")
      ? `Click the button below to buy **${product.name}**.`
      : "Set a valid buyUrl in config.js.");

  const button = new ButtonBuilder()
    .setLabel("Open checkout")
    .setStyle(ButtonStyle.Link)
    .setURL(url && url.startsWith("http") ? url : "https://example.com");

  return {
    embeds: [embed],
    components: [
      new ActionRowBuilder().addComponents(button),
      new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`product:${productId}`)
          .setLabel("Back")
          .setStyle(ButtonStyle.Secondary)
      )
    ]
  };
}

export function groupForProduct(productId) {
  return products.find(p => p.id === productId)?.category ?? "fortnite";
}
