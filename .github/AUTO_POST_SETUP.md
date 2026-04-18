# Auto-Post Setup — 3 posta svakih 6h

Ovaj dokument pokriva kako automatizirati pokretanje
[AUTO_POST_PROMPT.md](./AUTO_POST_PROMPT.md) na cron rasporedu.

**Cilj:** 3 nove vijesti svakih 6 sati = **4 runa dnevno = ~12 postova**.

Preporuceni rasporedi (UTC ili lokalno):

- `00:00 06:00 12:00 18:00` (cetiri runa, ravnomjerno)
- Samo radni dio dana: `08:00 14:00 20:00` (3 runa × 3 posta = 9 dnevno)

Cron izraz za 4 runa svakih 6h: `0 */6 * * *`

---

## Opcija A — Windows Task Scheduler (lokalno)

**Uvjet:** laptop mora biti upaljen i online u trenutku pokretanja. Ako spava
ili je off — run se preskace.

### 1. Kreiraj batch skriptu

Spremi kao `D:\repo\ggvijesti\scripts\auto-post.bat`:

```bat
@echo off
cd /d D:\repo\ggvijesti
claude --dangerously-skip-permissions --model sonnet -p "$(type .github\AUTO_POST_PROMPT.md)" > logs\auto-post-%date:~-4%-%date:~3,2%-%date:~0,2%-%time:~0,2%.log 2>&1
```

> **Napomena o flagovima:**
> - `--dangerously-skip-permissions` = non-interactive, neće pitati za dozvole (potrebno za cron)
> - `--model sonnet` = Sonnet je jeftiniji od Opusa za rutinski posao; promijeni ako želiš kvalitetniji output
> - `-p` = jedan prompt, zatvori po završetku (non-interactive)

### 2. Dodaj Task

Otvori **Task Scheduler** (`taskschd.msc`) → **Create Task**:

- **General:**
  - Name: `GGVijesti Auto-Post`
  - Run whether user is logged on or not: ✓
  - Run with highest privileges: nepotrebno

- **Triggers → New:**
  - Begin: On a schedule
  - Daily, Start: `00:00:00`
  - Repeat every: `6 hours` for duration of `1 day`

- **Actions → New:**
  - Program: `D:\repo\ggvijesti\scripts\auto-post.bat`
  - Start in: `D:\repo\ggvijesti`

- **Conditions:** ukljuci "Wake the computer to run this task" ako zelis budjenje iz sleepa.

### 3. Test run

Desni klik na task → **Run**. Provjeri `D:\repo\ggvijesti\logs\*.log` za output.

---

## Opcija B — GitHub Actions (cloud, always-on)

**Uvjet:** repo je na GitHubu, koristis GitHub Actions minutes (free tier:
2000 min/mj za private, unlimited za public).

Ovo zahtijeva da Claude Code / Anthropic API kljuc bude u GitHub secrets i da
workflow koristi npr. Anthropic API direkt (ne Claude Code CLI).

### 1. Kreiraj workflow

Spremi kao `.github/workflows/auto-post.yml`:

```yaml
name: Auto-post news

on:
  schedule:
    - cron: "0 */6 * * *"   # every 6 hours UTC
  workflow_dispatch:        # manual trigger button

jobs:
  write-post:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install Claude Code CLI
        run: npm install -g @anthropic-ai/claude-code

      - name: Run auto-post
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          git config user.name "GGVijesti Bot"
          git config user.email "brankogusic02@gmail.com"
          PROMPT=$(cat .github/AUTO_POST_PROMPT.md)
          claude --dangerously-skip-permissions --model sonnet -p "$PROMPT"

      - name: Push changes
        run: |
          git push || echo "nothing to push"
```

### 2. Dodaj secrets

GitHub → Settings → Secrets and variables → Actions → **New repository secret:**

- `ANTHROPIC_API_KEY` — tvoj API kljuc iz [console.anthropic.com](https://console.anthropic.com/)

### 3. Enable Actions

Actions tab → Enable workflows → potvrdi `auto-post.yml`.

---

## Opcija C — Manual `/loop` u Claude Code session-u

Ako zelis samo dok ti je session otvoren (testiranje, power user workflow):

```
/loop 6h $(cat .github/AUTO_POST_PROMPT.md)
```

Ovo pokrece prompt svakih 6h sve dok je session zivljuci.

---

## Troubleshooting

| Problem | Uzrok | Fix |
| --- | --- | --- |
| "nothing to commit" u logu | Nije bilo news-worthy story | OK — by design |
| Push fail: non-fast-forward | Netko (ti) je pushao u medjuvremenu | Cron ce sam `git pull --rebase` retry — provjeri log |
| Cover slike ne ucitavaju | Unsplash ID expired | Update listu u AUTO_POST_PROMPT.md |
| Double-posts iste teme | Dedup failed — slicne tagove | Pooštri pravilo "last 48h overlap" u promptu |
| API rate limit | Previše runs u kratkom periodu | Prorijedi cron na 8h ili 12h |

## Troskovi (groba procjena)

- **Sonnet 4.6** sa research+write+push: ~$0.15–0.30 po runu
- 4 runa/dan × 30 dana ≈ **$18–36 / mjesec**
- **Opus 4.6/4.7** radi istu tezinu posla: ~$0.60–1.20 po runu → **$72–144 / mjesec**

Preporuka: Sonnet za ovu rutinu, Opus rezerviraj za kompleksne jednokratne
taskove.

## Kill switch

Ugasiti bez diranja koda:

- **Windows Task Scheduler:** desni klik → Disable
- **GitHub Actions:** Actions tab → Auto-post → Disable workflow
- **/loop:** ukucaj `/loop stop` u Claude Code session-u

Fajl [AUTO_POST_PROMPT.md](./AUTO_POST_PROMPT.md) ostaje — samo scheduler stane.
