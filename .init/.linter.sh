#!/bin/bash
cd /home/kavia/workspace/code-generation/dark-theme-app-name-generator-128234/gen_ai_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

