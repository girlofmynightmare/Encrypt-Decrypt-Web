# DECAY // OS  V2
## Client-Side Encrypt / Decrypt Web Tool

![Client-Side Encryption](https://img.shields.io/badge/security-client--side%20encryption-00ff41?style=flat)
![No Backend](https://img.shields.io/badge/backend-none-black?style=flat)
![Zero Knowledge Proofs](https://img.shields.io/badge/zkp-not%20implemented-lightgrey?style=flat)

A minimalist web-based tool for encrypting and decrypting text directly in the browser.  
No accounts. No backend. No data leaves your device.

## Live Demo
🔗 https://decay.vercel.app/

---

## Features
- Text encryption and decryption
- Fully client-side execution
- No backend, no database
- No external runtime dependencies
- Open and inspectable source code

---

## How It Works
- User inputs plaintext and a passphrase
- Encryption and decryption are performed locally in the browser using the Web Crypto API
- The hosting server never sees plaintext or passwords

---

## Security System Overview
This project implements **Client-Side Encryption (CSE)**.

### Cryptography
- **Algorithm:** AES-256-GCM (Authenticated Encryption)
- **Key Derivation:** PBKDF2 (HMAC-SHA-256)
- **Iterations:** 600,000
- **Salt:** 16-byte cryptographically secure random value per encryption
- **IV (Nonce):** 12-byte unique value per encryption

All cryptographic operations are executed locally in the browser’s execution environment.

---

## Security Model Clarification
- **Client-Side Encryption:** ✔ Implemented  
- **End-to-End Encryption (E2EE):** ❌ Not applicable (local tool)  
- **Zero-Knowledge Proofs (ZKP):** ❌ Not implemented  

---

## Security Considerations
This project is designed for learning, demonstration, and basic privacy use cases.

### Known Limitations
- Vulnerable to XSS and malicious browser extensions
- Ciphertext can be brute-forced offline if a weak password is used
- Security depends entirely on user passphrase entropy
- Plaintext may temporarily exist in browser memory

**Not recommended for highly sensitive or regulated data.**

---

## Tech Stack
- HTML
- CSS
- JavaScript (Web Crypto API)

---

## Transparency
- No intentional backdoors
- No trackers
- No analytics
- No hidden data exfiltration
- Fully inspectable client-side code

