# hx-password-security-engine

**Enterprise-Grade Password Security Analysis Engine & CLI**

> **WARNING**: This tool is for **EDUCATIONAL AND DEFENSIVE PURPOSES ONLY**. It does not
> perform network attacks, brute-force attempts, or exploit vulnerabilities. It is a
> mathematical analysis engine designed to demonstrate password strength concepts.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/language-TypeScript-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## Overview

`hx-password-security-engine` is a modular, extensible TypeScript CLI built to analyze
the theoretical strength of passwords. It uses information theory (Shannon entropy),
combinatorial mathematics, and probabilistic crack-time estimation to provide a deep
report on password resilience against various attacker models.

Unlike simple strength meters, this engine allows for configurable attacker capabilities
(e.g., "Script Kiddie" vs "Nation State") and provides detailed granular feedback based
on industry standards (NIST).

## Features

- **Entropy Engine**: Calculates bit-level entropy based on character set analysis.
- **Attacker Modeling**: Estimates time-to-crack for Offline Fast, Offline Slow, Online
  No-Throttle, and Online Throttled scenarios.
- **Policy Engine**: Validates passwords against configurable rules (NIST SP 800-63B,
  custom enterprise policies).
- **Mutation Analysis**: (Theoretical) Identifies common mutation patterns used by
  attackers (e.g., replacing 'a' with '@').
- **JSON & Human Output**: Integrates into CI/CD pipelines via JSON or provides
  pretty-printed reports for humans.
- **Privacy-First**: All analysis happens locally. No data leaves your machine.

## Architecture

This project follows a strict **Clean Architecture** principle:

```ascii
+---------------------------+
|          CLI Layer        |  <-- Entry Point (yargs/inquirer)
+-----------+---------------+
            |
            v
+---------------------------+
|       Core Orchestrator   |  <-- Coordinates analysis
+----+------+-------+-------+
     |      |       |
     v      v       v
+--------+ +---------+ +--------+
| Entropy| |  Policy | | Crack  |  <-- Domain Engines (Pure Logic)
| Engine | |  Engine | | Time   |
+--------+ +---------+ +--------+
     ^
     |
+----+------+
| Validatos |  <-- Zod Schemas
+-----------+
```

## Installation

```bash
git clone https://github.com/HackerX-offical/hx-password-security-engine.git
cd hx-password-security-engine
npm install
npm run build
```

## Usage

**Interactive Mode:**

```bash
npm start
```

**Single Analysis:**

```bash
npm start analyze -- --password "Correct-Horse-Battery-Staple"
```

**JSON Output:**

```bash
npm start analyze -- --password "123456" --json
```

## Ethical Disclaimer

Information security tools are dual-use. The same math that helps a defender understand
their weakness helps an attacker understand likely targets. By using this software, you
commit to using it only for:

1.  Auditing your own credentials.
2.  Educational research.
3.  Improving the security of systems you are authorized to protect.

**Do not use this tool to harass others or analyze credentials that do not belong to
you.**

## Learning Outcomes for Students

Reading this codebase will teach you:

- **TypeScript Best Practices**: Strict typing, interfaces, and DI patterns.
- **CLI Design**: Building robust, user-friendly command-line tools.
- **Information Theory**: implementation of Shannon entropy algorithms.
- **Security Standards**: Understanding NIST password guidelines programmatically.

---

_Built with  by Suryanshu Nabheet_

## License

Licensed under the [HackerX License](./LICENSE). Redistributions must retain copyright,
license text, and [NOTICE](./NOTICE) attribution per the license terms.
