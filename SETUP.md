
# How to Run This Birthday Website Locally

This is a step-by-step guide to help you run this birthday celebration website on your own computer. Don't worry if you're not technical - just follow these instructions carefully!

---

## What You Need Before Starting

### 1. Install Node.js

Node.js is a program that lets you run JavaScript code on your computer. You need it to run this website.

**How to install:**
1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the version marked as **"LTS" (Recommended for most users)**
3. Run the installer you just downloaded
4. Click "Next" through all the steps (use default settings)
5. Click "Finish" when done

**How to check if it worked:**
1. Open your computer's **Command Prompt** (Windows) or **Terminal** (Mac/Linux)
   - Windows: Press `Windows Key + R`, type `cmd`, press Enter
   - Mac: Press `Command + Space`, type `terminal`, press Enter
2. Type this command and press Enter:
   ```
   node --version
   ```
3. You should see something like `v18.20.0` or similar
4. Also check npm by typing:
   ```
   npm --version
   ```
5. You should see something like `10.5.0` or similar

If both commands show version numbers, you're ready to continue! ✅

### 2. Get a Code Editor (Optional but Recommended)

A code editor makes it easier to view the project files.

**Recommended: VS Code**
1. Go to [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Download and install it
3. No special setup needed - just install with default settings

---

## Setting Up the Project

### Step 1: Get the Project Files

1. **Download** the project folder to your computer
2. **Extract** it if it's in a ZIP file
3. Remember where you saved it (for example: `C:\Users\YourName\Desktop\birthday-website`)

### Step 2: Open Command Prompt/Terminal in the Project Folder

**Windows:**
1. Open the folder where you extracted the project
2. Hold `Shift` and **right-click** in an empty area of the folder
3. Click **"Open PowerShell window here"** or **"Open command window here"**

**Mac:**
1. Open **Terminal**
2. Type `cd ` (with a space after cd)
3. Drag the project folder into the Terminal window
4. Press Enter

**Check you're in the right place:**
- Type `dir` (Windows) or `ls` (Mac/Linux) and press Enter
- You should see folders named `client`, `server`, and files like `package.json`

### Step 3: Install Required Packages

This step downloads all the tools the website needs to work.

1. In your Command Prompt/Terminal (still in the project folder), type:
   ```
   npm install
   ```
2. Press Enter
3. **Wait patiently** - this will take 2-5 minutes
4. You'll see lots of text scrolling by - this is normal!
5. When it's done, you'll see your command prompt again

**If you see any errors** about missing files, make sure you're in the correct folder (the one with `package.json` in it).

---

## Running the Website

### Start the Website

1. In the same Command Prompt/Terminal window, type:
   ```
   npm run dev
   ```
2. Press Enter
3. Wait about 10-20 seconds
4. You should see a message like:
   ```
   serving on port 5000
   ```

**This means it's working!** 🎉

### View the Website in Your Browser

1. Open your web browser (Chrome, Firefox, Edge, or Safari)
2. In the address bar, type:
   ```
   http://localhost:5000
   ```
3. Press Enter

**You should now see the birthday website!** 🎂

---

## How to Use the Website

The website has multiple pages that flow in sequence:

1. **Welcome Page** - Click on the cat image, it will reveal a START button
2. **Intro Page** - Read the greeting, click "Ready"
3. **Main Page** - Scroll down slowly to see the messages
4. **Counter Page** - Watch it count to 18 with confetti
5. **Birthday Wish** - Read the birthday message, click to continue
6. **Gallery** - View photos and videos in 3D! Drag to rotate

**Tips for the best experience:**
- Use a desktop/laptop computer (works on mobile but better on desktop)
- Turn on your sound/speakers for music
- Allow the website to play audio if your browser asks

---

## Stopping the Website

When you're done:

1. Go back to your Command Prompt/Terminal window
2. Press `Ctrl + C` (Windows/Mac/Linux)
3. If it asks "Terminate batch job?", type `Y` and press Enter
4. You can close the Command Prompt/Terminal window

The website will stop running, but your browser tab will remain open.

---

## Troubleshooting Common Problems

### Problem: "Port 5000 is already in use"

**Solution:**
1. Something else on your computer is using port 5000
2. Close any other programs that might be using it
3. Or restart your computer and try again

### Problem: Website won't load in browser

**Solution:**
1. Make sure you see "serving on port 5000" in the terminal
2. Try typing `http://127.0.0.1:5000` instead of `localhost:5000`
3. Clear your browser cache and try again

### Problem: Music not playing

**Solution:**
1. Make sure your computer sound is turned on
2. Click anywhere on the webpage to enable audio
3. Check that these files exist in the project:
   - `client/src/assets/music/birthday-piano.mp3`
   - `client/src/assets/music/tum-se-hi.mp3`

### Problem: Images/videos not showing

**Solution:**
Make sure these folders have content:
- `client/src/assets/gallery_media/` should have:
  - Images: `img1.jpg` through `img20.jpg`
  - Videos: `vid2.mp4`, `vid3.mp4`, `vid6.mp4`, `vid7.mp4`, `vid8.mp4`, `vid9.mp4`

### Problem: "npm command not found"

**Solution:**
- Node.js didn't install correctly
- Go back to Step 1 and reinstall Node.js
- Make sure to restart your computer after installing

---

## Sharing This Project

If you want to give this project to someone else:

1. **Stop the website** (press `Ctrl + C` in terminal)
2. **Delete the `node_modules` folder** (this is huge and not needed)
3. **Zip the entire project folder**
4. Share the ZIP file
5. Tell them to follow this guide from the beginning

**Important:** Don't delete any other folders or files!

---

## What Each Folder Does (For Your Information)

- `client/` - Contains all the website pages and visual components
- `server/` - Runs the web server that serves the website
- `client/src/assets/` - Contains images, videos, and music
- `client/src/pages/` - Contains the different pages of the website
- `node_modules/` - Downloaded packages (created when you run `npm install`)

---

## Still Having Problems?

If you're stuck:
1. Make sure you followed every step exactly
2. Restart your computer and try again from "Running the Website"
3. Check that you have a stable internet connection
4. Make sure you have at least 2GB of free space on your computer

---

## Requirements Summary

✅ **Minimum computer requirements:**
- 4GB RAM
- Modern web browser (Chrome, Firefox, Edge, or Safari)
- 1GB free disk space
- Internet connection (for initial setup)

✅ **Software needed:**
- Node.js version 18 or higher
- A web browser

---

**Enjoy the birthday celebration!** 🎂✨🎉
