#!/bin/bash

# Start MongoDB
mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db

# Start Backend
cd /app/backend
npm start &

# Start Frontend
cd /app/frontend
npm run build && npm start &

# Keep the container running
tail -f /dev/null
