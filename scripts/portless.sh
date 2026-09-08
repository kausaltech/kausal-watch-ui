#!/bin/bash

function stitle() {
  # Set the terminal title
  echo -en "\e]2;$*\a"
}
stitle "portless: kausal-watch-ui"
# Portless is used for theme development and --webpack is needed to preview themes locally
portless --name watch-ui --app-port 8052 pnpm dev --webpack
