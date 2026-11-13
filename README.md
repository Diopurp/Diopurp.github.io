# Manas Hanwat — Personal Portfolio Website
### Engineering, Robotics & Autonomous Systems Archive

A minimalist, high-craft personal archive featuring dual full-page aesthetic environments:
- **Day Mode**: Traditional Japanese ink-wash (sumi-e) landscape, mountain mist, cherry blossom branch, and weathered bonsai pine.
- **Night Mode**: Erupting volcano over a colossal submerged iceberg that tapers into a slender glacial spire deep in the dark abyss, with glowing bioluminescent particles.
- **Interactive Particle System**: Golden-angle Fibonacci spiral ($\theta = n \times 137.5^\circ$) when clicking and dragging anywhere across the screen, with theme-dependent particle physics (golden-green fireflies in Day Mode; volcanic embers above the waterline, glacial cyan below, and periodically flaring bioluminescent organisms in the deep dark water in Night Mode).
- **Featured Project**: Comprehensive technical documentation of **Columbus Maximus** — an autonomous indoor differential-drive mobile robot (ROS 2 Humble, LDS-02 LiDAR, DWM3001C UWB, ESP32, and EKF state estimation).

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
5. Do **not** initialize it with a README, .gitignore, or license (the local repository already contains everything).

### Step 2: Push Local Code to GitHub
Run the following commands in your terminal from this folder (`/home/manas/Projects/manas-personal-site`):

```bash
# Check current git status and branch
git status

# Add the remote repository URL
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
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `/ (root)`
4. Click **Save**.
5. Within 1–2 minutes, your website will be live at:
   👉 **`https://diopurp.github.io`**

---

## 3. Directory Structure

```text
├── index.html                   # Homepage (Hero, Columbus Maximus card, About, Footer)
├── styles.css                   # Responsive layout, translucent glass surfaces, typography
├── script.js                    # Particle system, Fibonacci spiral, theme persistence, Easter egg
├── README.md                    # Project documentation and setup guide
├── assets/
│   ├── day-landscape.svg        # Japanese sumi-e ink landscape, bonsai & cherry blossom
│   └── night-volcano-iceberg.svg# Erupting volcano, ocean waterline, and tapering submerged glacier
└── projects/
    └── columbus.html            # Complete 10-point technical documentation of Columbus Maximus
```

---

## 4. Features & Interactions

- **Full-Page Background Artwork**: The artwork constitutes the actual full-page document background, continuing behind all content panels as you scroll down.
- **Fibonacci Spiral Mouse Interaction**: Dragging the mouse anywhere on the screen progressively arranges the particles in a golden angle spiral ($\theta = n \times 137.5^\circ$).
- **Theme Persistence**: Theme toggles between Day and Night mode and persists across page reloads via `localStorage`.
- **Keyboard Easter Egg**:
  - Enter the Konami Code: `↑ ↑ ↓ ↓ ← → ← → B A`
  - Or type `columbus` on your keyboard.
  - Unlocks an engineering telemetry HUD modal with live diagnostic state for Columbus Maximus.
- **Accessibility**: Full compliance with `prefers-reduced-motion` to disable animations and particle motion when requested by the OS.
