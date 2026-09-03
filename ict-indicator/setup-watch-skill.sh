#!/usr/bin/env bash
# Bootstrap the claude-video "/watch" skill in a fresh Claude Code session.
# Containers are ephemeral: ~/.claude does not survive a new session, so re-run this.
#
# PREREQUISITE: the environment's network egress policy must allow YouTube.
# Without it yt-dlp fails with "Tunnel connection failed: 403 Forbidden".
set -euo pipefail

SKILL_REPO="https://github.com/bradautomates/claude-video.git"
WORK="$(mktemp -d)"
DEST="$HOME/.claude/skills/watch"

echo "==> Installing python deps (yt-dlp, ffmpeg)"
pip install --quiet --disable-pip-version-check yt-dlp imageio-ffmpeg

echo "==> Cloning $SKILL_REPO"
git clone --depth 1 "$SKILL_REPO" "$WORK/claude-video"

echo "==> Installing skill to $DEST"
mkdir -p "$HOME/.claude/skills"
rm -rf "$DEST"
cp -r "$WORK/claude-video/skills/watch" "$DEST"
rm -rf "$WORK"

# ffmpeg must be on PATH for the skill's frame extraction step.
FFMPEG_BIN="$(python3 -c 'import imageio_ffmpeg; print(imageio_ffmpeg.get_ffmpeg_exe())')"
mkdir -p "$HOME/.local/bin"
ln -sf "$FFMPEG_BIN" "$HOME/.local/bin/ffmpeg"
export PATH="$HOME/.local/bin:$PATH"

echo "==> Verifying egress to YouTube"
if python3 -m yt_dlp --skip-download --print "%(title)s" \
     "https://youtu.be/fm8CiDgTFfc" 2>/dev/null; then
  echo "==> OK: skill installed and YouTube reachable."
else
  echo "!! Skill installed, but YouTube is NOT reachable from this environment." >&2
  echo "!! Allowlist these hosts in the environment's egress policy:" >&2
  echo "!!   www.youtube.com  m.youtube.com  youtu.be" >&2
  echo "!!   youtubei.googleapis.com  *.googlevideo.com  i.ytimg.com" >&2
  echo "!! Then start a NEW session (policy is applied at container boot)." >&2
  exit 1
fi
