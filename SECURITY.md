# Security policy

This repository is a static personal website. It has no server, database, user accounts, forms, cookies or
analytics, and opening the site only ever contacts its own address.

## Reporting a vulnerability

If you believe you have found a security problem in the site or its source, please report it **privately**
rather than opening a public issue:

1. Go to the [Security tab](https://github.com/Soemon007/Soemon007.github.io/security/advisories/new) of this
   repository.
2. Choose **Report a vulnerability** and describe what you found and how to reproduce it.

I will respond as soon as I can. Non-security problems (typos, broken links, accessibility) are welcome as
regular [issues](https://github.com/Soemon007/Soemon007.github.io/issues).

## What is in place

- Secret scanning and push protection are enabled on the repository.
- Dependency vulnerability alerts are enabled.
- The publishing workflow runs only for pushes to `main` by the repository owner, uses the minimum permissions it
  needs, and pins its one third-party action to an exact commit.
