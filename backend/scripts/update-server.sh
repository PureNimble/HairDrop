#!/bin/bash

# filepath: /root/projects/HairDrop/backend/scripts/update-server.sh

# Navigate to the project directory
cd /root/HairDrop

# Pull the latest changes from the repository
git pull

# Check if there are any changes
if [ $? -eq 0 ]; then
    echo "Changes detected, building the project..."
    
    ./root/HairDrop/backend/scripts/build.sh
    
    # Set the appropriate permissions
    chmod +x /root/HairDrop/target/release/*
    
    # Restart the service
    systemctl restart rust_backend.service
    
    echo "Service restarted successfully."
else
    echo "No changes detected."
fi