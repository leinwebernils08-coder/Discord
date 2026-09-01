# LUMA Discord Bot

## Railway setup
1. Upload all files from this folder to GitHub.
2. Connect the repository to Railway.
3. Add these Railway Variables:
   - DISCORD_TOKEN
   - CLIENT_ID
   - GUILD_ID
4. Railway runs:
   `npm start`
5. The bot should log:
   - Slash command registered.
   - LUMA Bot online as ...

## Discord
Use `/shop` in the Discord server whose ID is set as `GUILD_ID`.

## Editing products
Edit `config.js` to change categories, products, prices, descriptions and buy links.

## Important
Never upload your real `.env` file or Discord token to GitHub.
