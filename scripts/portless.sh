#!/bin/bash

function stitle() {
  # Set the terminal title
  echo -en "\e]2;$*\a"
}
stitle "portless: kausal-watch-ui"
portless --name watch-ui --app-port 8052 pnpm dev
