# 🛡️ SELFIX — Decentralized Ethical Antivirus & AI Karmic Governance

**Powered by EDAO-TECH** | **Licensed under Nevermissed Licensed Trust™**  
**Chain:** Cronos | **Token:** SFXC | **Governance:** DAO-Enforced SmartLicense-X™

🌐 [www.selfix.pro](https://www.selfix.pro) • 📄 Whitepaper v1.2 • 📧 support@selfix.pro

---

## 💠 What is SELFIX?

SELFIX is the world’s first decentralized cybersecurity protocol driven by karmic logic and programmable ethics.  
It replaces conventional antivirus software with:

- 🔁 Tokenized Healing Engine (powered by SFXC)
- 🧠 Self-Healing Local AI Modules
- 🛡️ Trap Logic™ deception fields
- 📜 SmartLicense-X™ access enforcement
- 🔐 Karma-based plugin trust logic
- 🧬 DAO-driven upgrades and seeder agents

---

## 🚀 Capabilities

| Feature | Description |
|--------|-------------|
| 🔁 Entropy Healing Daemon | Detects and resolves system entropy & threats autonomously |
| 🔐 Trust-Scoped Modules | Promoted by karma & sandbox validation |
| 🧠 Local AI & CLI Chat | Natural language interface to healing system |
| 📊 HTMX Web Panel | Live metrics on entropy, healing, karma |
| 🧾 Legal Archive | Daily logs stored to `/docs/legal_archive/` |
| 🧬 Antivirus Engine | Real-time scanner using local `selfix_signatures.json` |
| 🖼️ Icon Generator | Automatically generates `.icns`, `.ico`, `.png` for app packaging |
| 📦 App Installer Build | GitHub Actions build `.app`/`.exe` for macOS and Windows |

---

## 📦 Antivirus Engine

SELFIX includes a custom signature-based antivirus scanner, using:

- `antivirus/selfix_scanner.py`: Real-time scanner CLI
- `selfix_signatures.json`: Hash-based detection
- Logging to console, supports signature updates
- Easily extensible to heuristic AI-based scan modules

✅ Sample run:

```bash
python3 antivirus/selfix_scanner.py
✅ Add a new signature:

json
Copy
Edit
{
  "name": "BackdoorXYZ",
  "sha256": "abcdef123456...",
  "description": "Known threat signature"
}
📜 Deployment Details
Key	Value
Token Address	0x342f8cac11E055Ba387942fa06E0e9522616D375
Total Supply	1,000,000,000 SFXC
Deployment	June 6, 2025
Network	Cronos Chain
DAO Cert	AI Digital Law Alignment
License Entity	Nevermissed Licensed Trust™ (ABN 18 552 722 678)

📂 Repo Structure (Post-Reorg)
swift
Copy
Edit
scripts/                 → Installers, daemon tools, CLI helpers
scripts/build/           → Build specs (e.g. py2app, pyinstaller)
scripts/qc/              → Karma tester & validation
scripts/vault/           → Archival & golden module management
scripts/maintenance/     → Cleanup and utility tools
healing_modules/         → All promoted and pending healing logic
api/                     → API layer & CLI entrypoint
assets/                  → GUI icons (.ico, .icns, .png)
antivirus/               → Signature scanner and signatures DB
legal_docs/              → Patent filings, WIPO evidence
.github/workflows/       → GitHub Actions CI/CD scripts
docs/                    → Whitepaper, MD docs, architecture
🧪 Getting Started
Clone and install:

bash
Copy
Edit
git clone https://github.com/EDAO-TECH/SELFIX.git
cd SELFIX
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
Start the daemon & scanner:

bash
Copy
Edit
./scripts/start_all.sh
python3 antivirus/selfix_scanner.py
Run full precheck:

bash
Copy
Edit
python3 scripts/selfix_precheck.py
💻 App Build & Installers
🔧 Icon Generator
bash
Copy
Edit
python3 scripts/generate_selfix_icon.py
Produces:

Copy
Edit
assets/
├── selfix_icon.png
├── selfix_icon.ico
└── selfix_icon.icns
🧱 GitHub Actions (macOS .app)
See .github/workflows/build-macos-app.yml — builds .app via py2app automatically on push to main.

🪟 Windows .exe (Manual)
bash
Copy
Edit
pyinstaller --onefile selfix_gui.py
Creates dist/selfix_gui.exe.

🌐 API Endpoints
Endpoint	Purpose
/api/entropy/graph	Entropy state visualization
/api/plugins/graph	Plugin trust & usage graph
/hx/insight-graphs	Healing logic panel embed

📄 Licensing & Legal
SELFIX is protected under:

🧠 SmartLicense-X™ (Programmable Ethical License)

✅ DAO Certification via Nevermissed Licensed Trust

🪪 ABN 18 552 722 678

See legal documents:

go
Copy
Edit
legal_docs/
├── PCT FILED X LICENSED copy.pdf
└── WIPO reward.pdf
All contributions must comply with Karmic Public Use Covenant in LICENSE.txt.

🤝 Contributions
We welcome karmically-aligned contributors:

Healing modules

Plugin trust escalation logic

Antivirus and rollback validators

✅ PRs must:

Pass sandbox validation

Include metadata headers

Use GPG for .selfix modules

📬 Contact & DAO Relations
Purpose	Email
Support	support@selfix.pro
Legal	legal@daocore.tech
Admin	hello@edao.tech

Full docs at: https://www.selfix.pro/docs

🧬 Developer Certificate of Origin
By contributing, you agree to the DCO 1.1:

The code is yours or permitted
It is legally allowed to be published
It complies with project license and karma principles




Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.


