# TWIN Engine

Engine implementation.

## Installation

```shell
npm install @twin.org/engine
```

## Testing

The engine tests focus on configuration validation and logic testing without requiring external services.

### Running Tests

```shell
# Run all tests
npm run test

# Run specific test suites
npm run test -- tests/index.spec.ts
npm run test -- tests/engineGasStationIntegration.spec.ts
```

### Test Coverage

The test suite includes:

- **7 standard engine tests**: Basic engine operations and configuration
- **8 gas station configuration tests**: Configuration validation and logic testing

The gas station configuration tests validate:

- Configuration structure and validation
- IOTA DLT configuration generation
- Centralized configuration management
- Error handling for invalid configurations
- Mock configuration helpers

All tests run in isolation using mock configurations and do not require external services like Docker, Redis, or live Gas Station instances.

### Configuration Testing

The tests use mock configurations to validate:

- **Gas Station Configuration**: URL, authentication tokens, timeouts, and enabled/disabled states
- **IOTA DLT Configuration**: Node endpoints, networks, coin types, and gas station integration
- **Centralized Configuration**: Proper extraction and usage of centralized DLT configurations
- **Environment Variables**: Proper parsing and application of environment-based configuration

### Test Structure

- `tests/index.spec.ts`: Core engine functionality tests
- `tests/engineGasStationIntegration.spec.ts`: Gas station configuration tests
- `tests/engineEnvBuilder.spec.ts`: Environment variable builder tests
- `tests/setupTestEnv.ts`: Mock configuration helpers and test utilities

## Development

For local development:

```shell
# Install dependencies
npm install

# Run linting
npm run lint

# Build the project
npm run build

# Run tests in watch mode
npm run test:watch
```

## Examples

Usage of the APIs is shown in the examples [docs/examples.md](docs/examples.md)

## Reference

Detailed reference documentation for the API can be found in [docs/reference/index.md](docs/reference/index.md)

## Changelog

The changes between each version can be found in [docs/changelog.md](docs/changelog.md)
