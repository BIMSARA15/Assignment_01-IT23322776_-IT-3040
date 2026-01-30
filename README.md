# 🧪 IT3040 Assignment 1 - Automation Test Suite
**Student ID:** IT23322776 | **Module:** IT3040

This is a "Robot" (automation script) designed to test the **Swift Translator** web application. It runs 36 specific test cases to validate accuracy, robustness, and UI behavior.

---

## ⚠️ Important Note for Evaluators
**Please Read Before Running:**

1.  **Negative Test Cases:** The assignment requires testing "Negative Scenarios" (inputs where the website *fails* to translate correctly).
2.  **The Result:** * **In the HTML Report:** These tests will appear as **PASSED** (Green) because the automation script successfully *detected* the bug without crashing.
    * **In the Terminal (Console):** You will see **RED CROSSES (❌)**. This is **INTENTIONAL**. The Red Cross proves that the website output did *not* match the correct Sinhala translation (i.e., the bug was found).

---

## 🛠️ Step 1: Prerequisites
Ensure you have these installed:
1.  **Node.js**: [Download Here](https://nodejs.org/) (Install the LTS version).
2.  **VS Code**: [Download Here](https://code.visualstudio.com/) (Recommended editor).

---

## 🚀 Step 2: Installation
1.  **Download** this project and **Unzip** it to your desktop.
2.  Open **VS Code**.
3.  Go to **File > Open Folder...** and select the unzipped project folder.
4.  In VS Code, go to the top menu: **Terminal > New Terminal**.
5.  Paste the following commands into the terminal one by one and press **Enter**:

```bash
npm install
```

(Wait for the installation to finish)

```bash
npx playwright install
```

---

## 🏃‍♂️ Step 3: Run the Tests
Choose the command that best fits your needs:

### 🌟 Option A: The "Evaluator Mode" (Recommended)
Use this command to see the browser open, watch the tests run one by one in the correct order, and get a clean list of Green Ticks/Red Crosses in the terminal to compare with Excel.

```bash
npx playwright test --project=chromium --workers=1 --headed
```

### 🌟 Option B: The "Fast" Run (Background)
Runs all tests continuously in the background (Headless mode). Faster, but the terminal output might appear out of order.

```bash
npx playwright test
```

### 🌟 Option C: The "Visual" Run (Parallel)
Opens the browser to show the tests running, but runs multiple browsers at once (Output may be mixed).

```bash
npx playwright test --headed
```

---

## 📊 Step 4: View the Detailed Report
After running the tests, if you want to see the full HTML summary:

```bash
npx playwright show-report
```

**Note:** If you get an error about "Port in use", try this instead:

```bash
npx playwright show-report --port 0
```

📝 Understanding the Terminal Output
When you run Option A, you will see results like this:

✅ **Pos_Fun_001: Pass** → The website translated correctly.

❌ **Neg_Fun_001: Mismatch** → SUCCESSFUL NEGATIVE TEST. The website failed to translate a complex phrase correctly, and our automation caught the bug.

---

## 🔄 Step 6: Push to GitHub
Don't forget to push this updated README to your repository:

```powershell
git add README.md
git commit -m "Updated README with clear VS Code instructions and grading guide"
git push