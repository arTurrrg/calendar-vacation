# ICT IFVG Indicator

Pine Script v6 indicator + backtestable strategy implementing the IFVG model
described in `RULESET.md`.

## Status

Not yet implemented. Blocked on watching the source video playlists.

`www.youtube.com`, `youtu.be`, `i.ytimg.com`, `*.googlevideo.com` and
`youtubei.googleapis.com` are refused at CONNECT by this environment's egress
proxy (`403 Forbidden`), so the videos cannot be transcribed from a Claude Code
session until those hosts are allowlisted in the environment's network policy.
See https://code.claude.com/docs/en/claude-code-on-the-web

The network policy is applied at container boot, so a **new session** is needed
after changing it.

## Bootstrap after a fresh session

Containers are ephemeral — `~/.claude` does not persist. Re-install the video
skill with:

```bash
./ict-indicator/setup-watch-skill.sh
```

This installs `yt-dlp` + `ffmpeg`, clones
[bradautomates/claude-video](https://github.com/bradautomates/claude-video)
into `~/.claude/skills/watch`, and verifies YouTube is reachable — failing
loudly with the exact hosts to allowlist if it is not.

Then `/watch <url>` becomes available.
