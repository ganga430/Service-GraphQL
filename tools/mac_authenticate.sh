#!/bin/sh -x

# This script performs the authentication that is needed every day.
rm ~/.aws/credentials
export PATH="/usr/local/opt/node@14/bin:$PATH"
java -jar ~/.okta/okta-aws-cli.jar aws sts get-caller-identity
#git config --global user.name <username>
#git config --global user.email <email>
#git config -l
#https://github.com/orgs/MGMResorts/sso?authorization_request=<token>
#git config --global credential.helper cache
