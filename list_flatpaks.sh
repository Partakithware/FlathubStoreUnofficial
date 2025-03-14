#!/bin/bash
output=$(flatpak list)
IFS=$'\n' read -rd '' -a lines <<< "$output"

app_ids=()

for line in "${lines[@]}"; do
  # Skip empty lines and the header
  if [[ -n "$line" && "$line" != *"Name"* ]]; then
    # Extract the Application ID
    app_id=$(echo "$line" | awk '{print $2}')
    if [[ -n "$app_id" ]]; then
      app_ids+=("$app_id")
    fi
  fi
done

# Print the Application IDs
for app_id in "${app_ids[@]}"; do
  echo "$app_id"
done
