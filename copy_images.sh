#!/bin/bash

# Source directory
SOURCE_DIR="/datos/adsl/web/aplicacion/public/assets/images/"

# Destination directory
DESTINATION_DIR="/home/web_worker/images/"

# Create the destination directory if it doesn't exist
mkdir -p "$DESTINATION_DIR"

# Use inotifywait to monitor the source directory
inotifywait -m -e create --format '%f' "$SOURCE_DIR" | while read NEWFILE
do
    # Check if the new file is an image (jpg, jpeg, png, gif)
    case "${NEWFILE,,}" in
        *.jpg|*.jpeg|*.png|*.gif)
            cp "$SOURCE_DIR$NEWFILE" "$DESTINATION_DIR"
            echo "Copied $NEWFILE to $DESTINATION_DIR"
            ;;
        *)
            echo "$NEWFILE is not an image file."
            ;;
    esac
done

