#!/bin/bash
set -e

SESSION="my_app"

# tmux セッションを kill
if tmux has-session -t $SESSION 2>/dev/null; then
  echo "Killing tmux session '$SESSION'..."
  tmux kill-session -t $SESSION
else
  echo "No tmux session '$SESSION' found."
fi

# Postgres コンテナを stop
if docker ps --format '{{.Names}}' | grep -q '^my_app_postgres$'; then
  echo "Stopping postgres container..."
  docker stop my_app_postgres
else
  echo "No running postgres container named 'my_app_postgres'."
fi
