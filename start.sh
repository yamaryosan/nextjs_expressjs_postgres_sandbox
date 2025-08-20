#!/bin/bash
set -e

SESSION="my_app"

# すでにセッションがあれば attach
if tmux has-session -t $SESSION 2>/dev/null; then
  echo "tmux session '$SESSION' already exists. Attaching..."
  tmux attach -t $SESSION
  exit 0
fi

echo "Creating new tmux session '$SESSION'..."

# 新しい tmux セッションを作成（バックエンド用ウィンドウ）
tmux new-session -d -s $SESSION -n backend "cd backend && npm run dev"

# フロントエンド用ウィンドウ
tmux new-window -t $SESSION:1 -n frontend "cd frontend && npm run dev"

# Postgres 用ウィンドウ
tmux new-window -t $SESSION:2 -n postgres "cd docker/postgres && docker-compose up"

# セッションにアタッチ
tmux attach -t $SESSION
