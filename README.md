# Manas Hanwat — Personal Portfolio Website
### Automation, Robotics, Control Systems, Robot Learning & Engineering Archive

A minimalist, high-craft personal archive featuring dual realistic full-page Japanese aesthetic environments:
- **Day Mode**: Traditional Japanese Sumi-e landscape with atmospheric mountain ridgelines, morning sun corona, gnarled Bonsai pine (*Matsu*) with *Jin* deadwood, delicate cherry blossoms (*Sakura*), cascading Kasumi mist, bamboo grove, and Zen gravel stones.
- **Night Mode (Moonlit Japan)**: Distant Japanese mountain ranges under a realistic, cloud-obscured moon, quiet starry sky, nocturnal Bonsai pine with silver-slate needle highlights, calm lake with shimmering moonlit reflection, nocturnal bamboo grove, and moonlit Zen stones.
- **Organic Fluid Particle System**: Natural wandering drift with fluid mouse & touch interaction (aerodynamic wake disturbance on hover, fluid gathering vortex on click/drag/touch). High Day Mode contrast with warm sunlit amber and golden bronze particles; nocturnal moonlit silver and pale slate-indigo particles in Night Mode.
- **Featured Project**: **Columbus Maximus** — Autonomous indoor differential-drive mobile robot documented as an authentic engineering journal, featuring the real hardware prototype photograph and direct GitHub repository links.
- **About Me**: Integration of core interests in Automation, Robotics, Control Systems, Robot Learning, Embedded Systems, CAD Design, and Production Engineering, alongside a personal dimension reflecting an appreciation for art and observation.

---

## 1. Local Preview

Run a lightweight local HTTP server from the root directory:

```bash
# Using Python 3:
python3 -m http.server 8000

# Or using Node.js / npx:
npx serve .
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

---

## 2. GitHub Pages Setup & Repository Commands

Your GitHub username is **Diopurp** and the canonical website repository is **Diopurp.github.io**.

Follow these exact steps to push this repository and publish the website:

### Step 1: Create the Remote Repository on GitHub
1. Log in to your GitHub account (`Diopurp`).
2. Create a **New Repository**.
3. Name it **exactly**: `Diopurp.github.io`
4. Set visibility to **Public**.
5. Leave "Add a README", "Add .gitignore", and "Choose a license" **unchecked**.

### Step 2: Push Local Code to GitHub
Run the following commands in your terminal from this folder (`/home/manas/Projects/manas-personal-site`):

```bash
# Check current git status and branch
git status

# Add the remote repository URL (if not already added)
git remote add origin https://github.com/Diopurp/Diopurp.github.io.git

# Ensure default branch is main
git branch -M main

# Push all commits and milestone tags to GitHub
git push -u origin main --tags
```

### Step 3: Activate GitHub Pages
1. Go to your repository on GitHub: `https://github.com/Diopurp/Diopurp.github.io`
2. Navigate to **Settings** → **Pages** (under "Code and automation").
3. Under **Build and deployment**:
   * **Source**: `Deploy from a branch`
   * **Branch**: `main` / `/ (root)`
4. Click **Save**.
5. Within 1–2 minutes, your website will be live at:
   👉 **`https://diopurp.github.io`**

---

## 3. Directory Structure

```text
├── index.html                   # Homepage (Hero, Columbus Maximus card, About, Footer)
├── styles.css                   # Responsive layout, restrained nocturnal palettes, typography
├── script.js                    # Fluid particle system, theme persistence, live clock, Easter egg
├── README.md                    # Project documentation and setup guide
├── assets/
│   ├── day-landscape.svg        # Realistic Japanese sumi-e ink landscape, bonsai & sakura
│   ├── night-landscape.svg      # Realistic Moonlit Japan night landscape & moon reflections
│   └── columbus-maximus.jpeg    # Authentic Columbus Maximus prototype hardware photograph
└── projects/
    └── columbus.html            # Columbus Maximus engineering journal documentation
```

---

## 4. Key Links & References

- **Personal Website Repository**: [https://github.com/Diopurp/Diopurp.github.io](https://github.com/Diopurp/Diopurp.github.io)
- **Columbus Maximus Project Repository**: [https://github.com/Diopurp/Columbus-Maximus](https://github.com/Diopurp/Columbus-Maximus)
- **Direct Contact**: [manashanwat@gmail.com](mailto:manashanwat@gmail.com)
- **GitHub Profile**: [https://github.com/Diopurp](https://github.com/Diopurp)
