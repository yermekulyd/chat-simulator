# Chat Simulator

Chat Simulator is a simple chat application built using **Vue 3** and **TypeScript** that allows users to communicate in real time through Local Storage. This project simulates a chat app where you can select a user to log in as and chat with other users across multiple browser tabs.

## Key Features

- **Local Storage**: All messages are stored in Local Storage, allowing users to see chat history and continue conversations even after reloading the page.
- **Multi-tab Communication**: You can open multiple browser tabs, log in as different users, and communicate between them in real-time.
- **Messenger-inspired Interface**: A simple, minimalist design with a dark color scheme inspired by popular messaging apps.

## Live Demo

You can try the app by visiting the following link:

[Chat Simulator Demo](https://yermekulyd.github.io/chat-simulator/)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
