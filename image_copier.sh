#!/bin/bash

# Source directory
SOURCE_DIR="/datos/adsl/web/aplicacion/public/assets/images/"

# Destination directory
DESTINATION_DIR="/home/web_worker/images/"

# Create the destination directory if it doesn't exist
mkdir -p "$DESTINATION_DIR"

# Copy .jpg files if they exist
if ls "$SOURCE_DIR"*.jpg 1> /dev/null 2>&1; then
    cp "$SOURCE_DIR"*.jpg "$DESTINATION_DIR"
    echo "JPG files copied to $DESTINATION_DIR"
else
    echo "No JPG files found."
fi

# Copy .jpeg files if they exist
if ls "$SOURCE_DIR"*.jpeg 1> /dev/null 2>&1; then
    cp "$SOURCE_DIR"*.jpeg "$DESTINATION_DIR"
    echo "JPEG files copied to $DESTINATION_DIR"
else
    echo "No JPEG files found."
fi

# Copy .png files if they exist
if ls "$SOURCE_DIR"*.png 1> /dev/null 2>&1; then
    cp "$SOURCE_DIR"*.png "$DESTINATION_DIR"
    echo "PNG files copied to $DESTINATION_DIR"
else
    echo "No PNG files found."
fi

# Copy .gif files if they exist
if ls "$SOURCE_DIR"*.gif 1> /dev/null 2>&1; then
    cp "$SOURCE_DIR"*.gif "$DESTINATION_DIR"
    echo "GIF files copied to $DESTINATION_DIR"
else
    echo "No GIF files found."
fi
