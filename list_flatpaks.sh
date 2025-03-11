#!/bin/bash
flatpak list | awk 'NR>1 {print $2}'
