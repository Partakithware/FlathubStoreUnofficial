#!/bin/bash

FLATPAK_APP="$1"

if [ -z "$FLATPAK_APP" ]; then
    echo "No app URL provided."
    exit 1
fi

APP_ID=$(echo "$FLATPAK_APP" | sed -E 's/.*\/([a-zA-Z0-9\._-]+)\.flatpakref/\1/')

if [ -z "$APP_ID" ]; then
    echo "Invalid app URL provided."
    exit 1
fi

# Check if the app is installed
if flatpak list | grep -q "$APP_ID"; then
    # App is installed, prompt for uninstallation
    gnome-terminal -- bash -c "read -p 'App \"$APP_ID\" is already installed. Uninstall? (y/n): ' confirm; if [[ \"\$confirm\" == \"y\" ]]; then flatpak uninstall \"$APP_ID\"; if [ \$? -eq 0 ]; then echo 'Uninstall successful.'; else echo 'Uninstall failed.'; fi; else echo 'Uninstall cancelled.'; fi;"
else
    # App is not installed, prompt for installation
    gnome-terminal -- bash -c "read -p 'Install app \"$APP_ID\"? (y/n): ' confirm; if [[ \"\$confirm\" == \"y\" ]]; then flatpak install \"$FLATPAK_APP\"; if [ \$? -eq 0 ]; then echo 'Install successful.'; else echo 'Install failed.'; fi; else echo 'Install cancelled.'; fi;"
fi
