#!/bin/bash

# First method: Targeted extraction
output1=$(flatpak list | sed '1d' | awk '{
  for (i=1; i<=NF; i++) {
    if ($i ~ /[a-z]+\.[a-z]+/) {
      print $i
      break
    }
  }
}')

# Second method: Simple extraction of the second column
output2=$(flatpak list)
IFS=$'\n' read -rd '' -a lines <<< "$output2"

app_ids2=()
for line in "${lines[@]}"; do
  if [[ -n "$line" && "$line" != *"Name"* ]]; then
    app_id=$(echo "$line" | awk '{print $2}')
    app_ids2+=("$app_id")
  fi
done

# Combine and remove duplicates
combined_output=$(echo "$output1"$'\n'${app_ids2[@]})
unique_app_ids=($(echo "$combined_output" | sort -u))

# Print unique Application IDs
for app_id in "${unique_app_ids[@]}"; do
  echo "$app_id"
done

read -p "Press Enter to continue..."

