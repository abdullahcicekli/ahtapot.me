# Fonts

Both faces are self-hosted. The site makes no third-party font requests.

| File | Face | License | Source |
| --- | --- | --- | --- |
| `UncutSans-Variable.woff2` | Uncut Sans, variable (`wght` 300–700, `ital` 0–11) | SIL OFL 1.1 | https://github.com/kaspernordkvist/uncut_sans |
| `CommitMono-400.woff2` | Commit Mono 400 (v1.143) | OFL | https://github.com/eigilnikolajsen/commit-mono |

Both are subset to `U+0000-00FF,U+0100-017F,U+0180-024F,U+2000-206F,U+2190-21FF,U+25A0-25FF`,
which covers Latin, Latin Extended-A/B (Turkish included), general punctuation, arrows,
and geometric shapes.

Regenerate with the `pyftsubset` commands in
`docs/superpowers/plans/2026-08-21-website-rebrand.md`, Task 3. Turkish coverage
(`ı İ ş Ş ğ Ğ ç Ç ö Ö ü Ü`) must be re-verified after any change.
