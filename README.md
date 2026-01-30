# 🧪 IT3040 Assignment 1 - Automation Test Suite
**Student ID:** IT23322776 | **Module:** IT3040

This is a "Robot" (automation script) that tests the **Swift Translator** website for bugs. Follow these simple steps to run it on your own computer.

---

## 🛠️ Step 1: Install Node.js (Required Software)
The automation robot needs **Node.js** to run.
1.  Go to [nodejs.org](https://nodejs.org/).
2.  Download the **LTS Version** (Recommended for most users).
3.  Install it just like any other program (Keep clicking "Next" until finished).
4.  **Restart your computer** to make sure it's ready.

---

## 📥 Step 2: Download this Project
1.  Scroll to the top of this GitHub page.
2.  Click the green **<> Code** button.
3.  Select **Download ZIP**.
4.  Find the downloaded file on your computer and **Unzip (Extract)** it.
    * *Tip: Right-click the zip file -> "Extract All".*

---

## 💻 Step 3: Open the Terminal
1.  Open the unzipped folder (you should see files like `package.json` and `tests`).
2.  **Right-click** anywhere in the empty white space of the folder.
3.  Select **"Open in Terminal"** (or "Open PowerShell window here").
    * *If you don't see that option: Type `cmd` in the folder address bar at the top and press Enter.*

---

## ⚙️ Step 4: Wake up the Robot (Installation)
Copy and paste these commands into the black terminal window one by one. Press **Enter** after each command.

**1. Download the tools:**
```bash
npm install

(Wait for the loading bars to finish. It might take a minute.)

2. Download the browsers:

Bash
npx playwright install
🚀 Step 5: Run the Tests
Now the robot is ready! Choose how you want to run it:

Option A: Watch the Robot Work (Visual Mode)
This will open a Chrome window and you will see the robot typing automatically.

Bash
npx playwright test --project=chromium --headed
Option B: Quick Report (Silent Mode)
This runs faster in the background and just gives you the results.

Bash
npx playwright test
Option C: View the Results Report
See a pretty webpage with Green Ticks ✅ and Red Crosses ❌.

Bash
npx playwright show-report
Note for Evaluator:

Green Ticks (✅) mean the test passed.

Red Crosses (❌) in "Negative Tests" are GOOD. It means the automation successfully found a bug in the website (e.g., the website translated something wrong, and our test caught it!).