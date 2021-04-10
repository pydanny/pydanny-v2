---
date: "2021-04-09T23:45:00.00Z"
published: true
description: By default VSCode doesn't include this keybinding. Here's how you add it.
slug: git-cheatsheet
tags:
  - vscode
  - howto
time_to_read: 1
title: Switching between VSCode terminals using hotkeys
type: post
---

By default [VSCode](https://code.visualstudio.com/) doesn't include this keybinding. Here's how you add it:

## Step 1

Use `ctrl+p` (`cmd+p` on the Mac) and type `keybindings.json` and select the file from the drop downlist. This will open a file that looks like this:

```json
// Place your key bindings in this file to
// override the defaults
[]
```

## Step 2

Replace the content with this for Windows or Linux:

```json
// Place your key bindings in this file to
// override the defaults
[
  {
    "key": "ctrl+down",
    "command": "workbench.action.terminal.focusNext",
    "when": "terminalFocus"
  },
  {
    "key": "ctrl+up",
    "command": "workbench.action.terminal.focusPrevious",
    "when": "terminalFocus"
  }
]
```

Or this when using the Mac:

```json
// Place your key bindings in this file to
// override the defaults
[
  {
    "key": "cmd+down",
    "command": "workbench.action.terminal.focusNext",
    "when": "terminalFocus"
  },
  {
    "key": "cmd+up",
    "command": "workbench.action.terminal.focusPrevious",
    "when": "terminalFocus"
  }
]
```

Now you can use the keyboard to change terminals in VS Code.
