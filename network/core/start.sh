#!/bin/bash

function help() {
echo "Usage: 
  start.sh <mode> [flags]

    Modes:
      down : Down the network.
      new : Start a new network and deploy the main chain code to network.
      deploy <version> <sequence> : Deploy new <version> of chain code. Please note that you use this command when the network
      is running and it already has a deployment of chaincode.

    Flags:
      --help or -h - Show help text

Examples:
  ./start.sh new : Stop all dockers first; start up new network; deploy chaincode (version: 1.0, sequence: 1).
  ./start.sh deploy 1.2 2 : Deploy new version of chaincode to network (version 1.2, sequence: 2).
  ./start.sh down : Stop all dockers; Down network.
"
}

function deloy() {
  version="v$1"
  sequence="$2"
  echo "Version: $version"
  ./network.sh deployCC -ccn real_estate -ccs $sequence -ccv $version -ccp "../../chaincodes/real-estate" -ccl javascript
}

function down() {
  ./network.sh down
}

function new() {
  down

  FABRIC_CFG_PATH=$PWD

  ./network.sh up createChannel -ca -s couchdb

  deloy "1.0" "1"
}

ARG=$1

if [ "$ARG" == "--help" ]; then
  help
elif [ "$ARG" == "-h" ]; then
  help
elif [ "$ARG" == "new" ]; then
  new
elif [ "$ARG" == "down" ]; then
  down
elif [ "$ARG" == "deploy" ]; then
  if [ -n "$2" ] && [ -n "$3" ]; then
    deloy "$2" "$3"
  else
    echo "Version and sequence of new chaincode are required\n" 
  fi
fi