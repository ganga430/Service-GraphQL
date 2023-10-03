#!/bin/sh -x

# This script creates the objects needed to start the services and then starts the services.
export PATH="/usr/local/opt/node@14/bin:$PATH"
npm run generate-schema-types
npm ci
npm run debug-services
#npm run start-services
