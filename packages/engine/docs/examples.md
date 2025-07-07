# @twin.org/engine - Examples

## Environment Variables

The engine supports various environment variables for configuration. Here are some key examples:

### IOTA DLT Configuration

Basic IOTA configuration:

```bash
# IOTA Node Configuration
IOTA_NODE_ENDPOINT="https://api.devnet.iota.cafe"
IOTA_FAUCET_ENDPOINT="https://faucet.devnet.iota.cafe"
IOTA_EXPLORER_ENDPOINT="https://explorer.iota.org/"
IOTA_NETWORK="devnet"
IOTA_COIN_TYPE="4218"
```

### IOTA Gas Station Configuration (Optional)

The IOTA Gas Station pattern allows for sponsored transactions and improved UX:

```bash
# Gas Station Configuration
IOTA_GAS_STATION_ENDPOINT="https://gas-station.example.com"
IOTA_GAS_STATION_AUTH_TOKEN="your-auth-token"
```

**Configuration Options:**

- `IOTA_GAS_STATION_ENDPOINT`: The URL of the gas station service
- `IOTA_GAS_STATION_AUTH_TOKEN`: Authentication token for the gas station

When gas station is configured, all IOTA-related connectors (wallet, nft, verifiable-storage, identity, identity-resolver) will automatically use the centralized configuration and have access to gas station functionality.
