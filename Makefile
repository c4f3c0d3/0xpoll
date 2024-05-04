# include .env file and export its env vars
# (-include to ignore error if it does not exist)
# Note that any unset variables here will wipe the variables if they are set in
# .zshrc or .bashrc. Make sure that the variables are set in .env, especially if
# you're running into issues with fork tests
-include .env

all: install build
# Install forge dependencies (not needed if submodules are already initialized).
install:; forge install && npm install

# Build contracts and inject the Poseidon library.
gen-lib:; node ./src/js/generate-circom-lib.js
build:; forge build

# Run tests, with debug information and gas reports.
test:; forge test -vv --gas-report

# Update forge dependencies.
update:; forge update

clear:; rm -rf node_modules; rm -f package-lock.json
    
# Deploy contracts
deploy-base:; forge script script/ElectoralCommission.s.sol:DeployElectoralCommission --rpc-url ${BASE_SEPOLIA_RPC_URL}  --broadcast --etherscan-api-key ${BASE_SEPOLIA_ETHERSCAN_API_KEY} --verify --slow
deploy-sepolia:; forge script script/ElectoralCommission.s.sol:DeployElectoralCommission --rpc-url ${SEPOLIA_RPC_URL}  --broadcast --etherscan-api-key ${ETHERSCAN_API_KEY} --verify --slow
deploy-polly-test:; forge script script/ElectoralCommission.s.sol:DeployElectoralCommission --rpc-url ${POLLY_TEST_RPC_URL}  --broadcast --slow --legacy

# verify commands
## example: contractAddress=<contractAddress> contractPath=<contract-path> make verify-contract-sepolia
## example: contractAddress=<contractAddress> contractPath=<contract-path> argsFile=args.txt make verify-contract-sepolia
# example with constructor args
# contractAddress=0x213ECE114F6Cc498d944B622172A645E54C37335 contractPath=src/contracts/ElectoralCommission.sol:ElectoralCommission argsFile=args.txt make verify-contract-sepolia
ifneq ($(argsFile),)
    CONSTRUCTOR_ARGS=--constructor-args-path ${argsFile}
endif
verify-contract-sepolia :; forge verify-contract --chain-id 11155111 --watch --etherscan-api-key ${ETHERSCAN_API_KEY} ${contractAddress} ${contractPath} ${CONSTRUCTOR_ARGS}
