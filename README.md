# hx-password-security-engine

Deep password security analysis engine with CLI and policy scoring.

## Why this exists

Product teams need a richer engine than a one-liner entropy script — still fully local
and authorized-use only.

## Features

- Modular scoring and policy checks
- TypeScript CLI with build step
- Jest regression suite

## Install

```bash
git clone https://github.com/HackerX-official/hx-password-security-engine.git
cd hx-password-security-engine
npm install && npm run build
```

## Quick start

```bash
npm run dev
```

## Output

Structured CLI reports on stdout.

## Develop

```bash
npm test
npm run format:check
```

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for module layout and extension points.

## Ethics

Use only on systems and content you are **authorized** to test. See
[SECURITY.md](./SECURITY.md).

## License

Licensed under the [HackerX License](./LICENSE). Redistributions must retain copyright,
license text, and [NOTICE](./NOTICE) attribution per the license terms.
