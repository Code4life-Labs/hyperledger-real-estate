# bring down the current network
./network.sh down

# Pull the images
# ./bootstrap.sh

# Set Path
FABRIC_CFG_PATH=$PWD

# bring up the network
./network.sh up createChannel -ca -s couchdb


# package and install 'auctionchaincode' chaincode on org1 and org2 nodes
./network.sh deployCC -ccn account -ccv 1.0 -ccp ../../chaincodes/account -ccl javascript

# deploy 'auctionchaincode' chaincode on 'defaultchannel'
# ./network.sh deployCC -c defaultchannel -ccn auctionchaincode -ccp ../../../auction-chaincode/src/goauction -ccl go -cci Init -ccsp true