#!/bin/sh -x

# This script generates the objects needed to create the gateway and then starts the gateway.
export PATH="/usr/local/opt/node@14/bin:$PATH"
npm run generate-schema-types
npm ci
#npm run start-gateway
npm run debug-gateway
