#!/bin/bash

APP_ID=$(echo "$1" | sed -E 's/.*\/([a-zA-Z0-9\._-]+)\.flatpakref/\1/')

if [ -z "$APP_ID" ]; then
    echo "Invalid app URL provided."
    exit 1
fi

echo "Uninstalling Flatpak app: $APP_ID"
flatpak uninstall -y "$APP_ID"

if [ $? -eq 0 ]; then
    echo "Uninstall successful."
else
    echo "Uninstall failed."
    exit 1
fi
