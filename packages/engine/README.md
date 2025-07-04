# TWIN Engine

Engine implementation.

## Installation

```shell
npm install @twin.org/engine
```

## Testing

The tests developed are functional tests and need the following components to be running:

### Quick Setup (Recommended)

The simplest way to set up the testing environment using our unified container:

```shell
# Start the unified container with Redis + Gas Station
docker run -d --name twin-gas-station-test \
  -p 6379:6379 -p 9527:9527 -p 9184:9184 \
  twinfoundation/twin-gas-station-test:latest

# Wait a moment for services to start, then verify
docker exec twin-gas-station-test redis-cli ping  # Should return: PONG
curl http://localhost:9527/  # Should return: OK

# Configure your test environment variables (see Environment Configuration below)
# Then run tests
npm run test

# When finished, cleanup
docker stop twin-gas-station-test && docker rm twin-gas-station-test
```

That's it! The unified container includes:

- Redis server (port 6379)
- IOTA Gas Station (port 9527, metrics 9184)
- Pre-configured with test keypair and settings
- Health checks and proper startup sequencing

### Environment Configuration

The tests require environment variables to be configured. Create a `.env.dev` file in the `tests` directory with your test mnemonics:

```env
TEST_MNEMONIC="your test mnemonic phrase here"
TEST_2_MNEMONIC="second test mnemonic phrase here"
TEST_NODE_MNEMONIC="node mnemonic phrase here"
```

### Test Coverage

The test suite includes:

- **16 standard engine tests**: Basic engine operations and configuration
- **7 gas station integration tests**: Comprehensive centralized configuration testing

The gas station integration tests validate:

- Configuration with and without gas station
- Centralized IOTA DLT configuration
- Error handling for invalid configurations
- Integration with live Gas Station services

### Alternative Setup Methods

For advanced users who prefer alternative setups:

#### Option A: Standalone Docker Images

If you prefer to run services separately:

```shell
# Pull the required Docker images
docker pull redis:7-alpine
docker pull iotaledger/gas-station:latest

# Start Redis
docker run -d --name gas-station-redis -p 6379:6379 redis:7-alpine

# Create gas station config file
cat > gas-station-config.yaml << EOF
signer-config:
  local:
    keypair: AKT1Ghtd+yNbI9fFCQin3FpiGx8xoUdJMe7iAhoFUm4f
rpc-host-ip: 0.0.0.0
rpc-port: 9527
metrics-port: 9184
storage-config:
  redis:
    redis_url: "redis://127.0.0.1:6379"
fullnode-url: "https://api.testnet.iota.cafe"
coin-init-config:
  target-init-balance: 100000000
  refresh-interval-sec: 86400
daily-gas-usage-cap: 1500000000000
access-controller:
  access-policy: disabled
EOF

# Start IOTA Gas Station
docker run -d --name gas-station \
  -p 9527:9527 -p 9184:9184 \
  -v $(pwd)/gas-station-config.yaml:/config/config.yaml \
  --network host \
  -e GAS_STATION_AUTH=qEyCL6d9BKKFl/tfDGAKeGFkhUlf7FkqiGV7Xw4JUsI= \
  iotaledger/gas-station:latest \
  --config-path /config/config.yaml

# Verify services are running
redis-cli ping  # Should return: PONG
curl http://localhost:9527/  # Should return: OK

# Cleanup when finished
docker stop gas-station gas-station-redis && docker rm gas-station gas-station-redis
```

#### Option B: Local Installation

For development purposes, you may also install and run services locally. See the [IOTA Gas Station documentation](https://github.com/iotaledger/gas-station) for more details.

## Examples

Usage of the APIs is shown in the examples [docs/examples.md](docs/examples.md)

## Reference

Detailed reference documentation for the API can be found in [docs/reference/index.md](docs/reference/index.md)

## Changelog

The changes between each version can be found in [docs/changelog.md](docs/changelog.md)
