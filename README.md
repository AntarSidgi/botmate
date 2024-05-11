# botmate

![banner](https://github.com/botmate/botmate/assets/31907722/6c9310fc-d79a-4005-bdff-8c2ec1813453)

BotMate is a modern bot development platform for Telegram. It allows you to rapidly create and deploy bots for Telegram using a simple and easy-to-use UI. With BotMate, you can create custom plugins to extend the functionality of your bot, write custom handlers in JavaScript to handle incoming messages, commands, and more, and access and manage your bot's data using the built-in database system.

![Text-Banner](https://github.com/botmate/botmate/assets/31907722/02818878-9109-40e2-b536-7dc2c2295df6)

# Features

BotMate comes with a variety of features to help you create and deploy bots for Telegram. The main focus of BotMate is to provide a simple and easy-to-use platform for bot development.

Here are some of the features of BotMate:

## 🚀 Rapid Development

BotMate provides a simple and easy-to-use UI to create and deploy bots for Telegram. You can create a bot in minutes and deploy it with a single click.

## 🧩 Plugin System

With a powerful plugin system that allows you to extend the functionality of your bot. You can create custom plugins or use pre-built plugins from the community.

## 📦 Handlers

Write custom handlers in JavaScript to handle incoming messages, commands, and more. You can create custom handlers for your bot to perform specific actions.

## 🖇️ Database Access

Easily access and manage your bot's data using the built-in database system. You can store and retrieve data from the database using simple API functions.

## 📡 Webhooks

BotMate supports webhook mode, which allows you to receive updates from Telegram in real-time. You can set up webhooks for your bot with a single click.

_and much more!_

![Text-Banner](https://github.com/botmate/botmate/assets/31907722/593a3b1b-e9c1-4faa-8da9-fd573c1cd539)

# Installation

There are several ways to install BotMate. You can install BotMate using Docker, or you can install it manually on your server.

## Docker (Recommended)

The easiest way to install BotMate is to use Docker. You can run BotMate in a Docker container with a single command.

```bash
mkdir botmate
cd botmate
docker run -d -p 3000:3000 -v ./data:/data botmate/botmate
```

🥳 That's it you do no need any extra setup. Access BotMate at `http://localhost:3000` in your browser.

## CLI (Recommended)

You can also install BotMate using the CLI. The CLI provides a simple and easy way to install and manage BotMate on your server.

1. Install the CLI

```bash
npm install -g botmate-cli
```

2. Start BotMate

```bash
botmate start
```

## Manual Installation

1. Clone the repository

```bash
git clone https://github.com/botmate/botmate
```

2. Install dependencies

```bash
cd botmate
pnpm install
mkdir data
pnpm db:push
pnpm run build
```

3. Start the server

```bash
pnpm start
```

# 📕 Documentation

For more information on how to use BotMate, please refer to the [documentation](https://botmate.github.io/docs).

# 🤝 Contributing

BotMate is an open-source project and we welcome contributions from the community. If you would like to contribute to BotMate, please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information.

# 📝 License

BotMate is licensed under the [MIT License](LICENSE).
