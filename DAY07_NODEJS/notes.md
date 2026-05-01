# Node.js Complete Course Notes - Lecture 6
## Git, GitHub, Environment Variables, MongoDB Atlas, and Deployment

---

## Part 1: What is Git?

**Git is a Time Machine for your code.**

- Takes snapshots (photos) of your code at different points in time
- Each snapshot is called a **version**
- You can go back to any previous version if something breaks

**Why Git?**
- When you make changes and code breaks, you can go back to working version
- In big projects with 40+ files, manually reverting changes is very difficult
- Git manages everything automatically

---

## Part 2: Installing Git

1. Go to: `git-scm.com`
2. Download for your operating system
3. Install
4. Verify installation:
```bash
git --version
```

---

## Part 3: Basic Git Commands

### 3.1 Initialize Git in your project
```bash
git init
```

### 3.2 Check status (see what files changed)
```bash
git status
```
- **Red files** = not yet added to Git (untracked)
- **Green files** = added and ready to commit

### 3.3 Add files to Git (stage them)
```bash
# Add all files
git add .

# Add specific file
git add server.js
```

### 3.4 Commit (take a snapshot)
```bash
git commit -m "Your message here"
```

Example:
```bash
git commit -m "First version of our hotel API"
```

### 3.5 Check commit history
```bash
git log
```

---

## Part 4: .gitignore File

**Never track these files/folders:**

Create a file called `.gitignore` in your project root:

```gitignore
node_modules/
.env
```

**Why?**
- `node_modules/` is very large (17GB+). Anyone can recreate it with `npm install`
- `.env` contains passwords and sensitive information (security risk)

**Remove node_modules if already added:**
```bash
git rm -r --cached node_modules
```

---

## Part 5: GitHub (Remote Repository)

### 5.1 What is GitHub?
- Online backup for your code
- Makes your code accessible from anywhere
- Employers look at your GitHub profile

### 5.2 Create Repository on GitHub
1. Sign up at github.com
2. Click "New" button
3. Give repository a name (e.g., `hotel`)
4. Choose **Public**
5. Click "Create repository"

### 5.3 Connect Local Git to GitHub

GitHub shows you these commands after creating repo:

```bash
# Add remote connection
git remote add origin https://github.com/YOUR_USERNAME/hotel.git

# Push your code to GitHub
git push -u origin main
```

### 5.4 Push and Pull
```bash
# Push local changes to GitHub
git push

# Pull changes from GitHub to local
git pull
```

---

## Part 6: .env File (Environment Variables)

### 6.1 The Problem
Your database connection string contains username and password. If you push to GitHub, everyone can see your password.

### 6.2 The Solution - .env file

Create `.env` file in project root:

```env
PORT=3000
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/hotel
```

### 6.3 Install dotenv
```bash
npm install dotenv
```

### 6.4 Use dotenv in your code

**In server.js (at the VERY TOP):**
```javascript
require('dotenv').config();
```

**Access variables:**
```javascript
const PORT = process.env.PORT || 3000;
const mongoURL = process.env.MONGODB_URL;
```

### 6.5 Add .env to .gitignore
```gitignore
node_modules/
.env
```

**Never push .env to GitHub!**

---

## Part 7: MongoDB Atlas (Cloud Database)

### 7.1 What is MongoDB Atlas?
- MongoDB's free cloud database service
- Your database is online 24/7
- Accessible from anywhere (not just your computer)

### 7.2 Setup Steps

1. Go to `mongodb.com/atlas`
2. Sign up for free account
3. Create a **free cluster** (shared tier)
4. Choose cloud provider (AWS) and region (Mumbai)
5. Click "Create Cluster" (wait 1-2 minutes)

### 7.3 Create Database User
1. Go to "Database Access"
2. Add new user
3. Username: `your_choice`
4. Password: `your_choice` (save this!)
5. Built-in role: "Read and write to any database"

### 7.4 Allow Network Access
1. Go to "Network Access"
2. Add IP address
3. Allow from anywhere: `0.0.0.0/0`

### 7.5 Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Driver: Node.js
4. Copy the connection string
5. Replace `<password>` with your actual password

### 7.6 Add to .env file
```env
MONGODB_URL=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/hotel
```

**That's it! Just change the URL from local to this online one.**

---

## Part 8: Deploy Node.js Server to Render

### 8.1 What is Render?
- Free hosting service for Node.js applications
- Your server runs 24/7
- Gives you a public URL

### 8.2 Deploy Steps

1. Go to `render.com`
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - Name: `hotel` (or your choice)
   - Branch: `main`
   - Build Command: `npm install`
   - Start Command: `node server.js`
6. Click "Advanced" → Add Environment Variables
   - Add `PORT = 3000`
   - Add `MONGODB_URL` = (your Atlas connection string)
7. Click "Create Web Service"

### 8.3 Important for Port
**Your code MUST use process.env.PORT:**

```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### 8.4 Get Your Live URL
After deployment, Render gives you a URL like:
`https://hotel.onrender.com`

Test it:
- `https://hotel.onrender.com/person`
- `https://hotel.onrender.com/menu`

---

## Part 9: Complete Git Workflow Summary

```bash
# 1. Initialize Git (one time)
git init

# 2. Check what changed
git status

# 3. Add changes
git add .

# 4. Commit snapshot
git commit -m "Description of changes"

# 5. Push to GitHub
git push origin main

# 6. Pull changes from GitHub (if others made changes)
git pull origin main
```

---

## Part 10: Key Points to Remember

| Concept | What it does |
| :--- | :--- |
| **git init** | Start Git tracking |
| **git add .** | Stage all files for commit |
| **git commit -m "msg"** | Take a snapshot |
| **git push** | Send snapshot to GitHub |
| **git pull** | Download latest from GitHub |
| **.gitignore** | Tell Git what NOT to track |
| **.env** | Store passwords (never commit) |
| **dotenv** | Load .env variables |
| **MongoDB Atlas** | Cloud database (free) |
| **Render** | Cloud hosting for Node.js (free) |

**Final Result:** Your API is live on the internet with a public URL that anyone can access!

KEY TAKE AWAYS 
You are absolutely right. I apologize.

Looking back at the video transcript, the **ONLY topics taught** in this lecture are:

---

# Lecture 6 - What Was Actually Taught

## 1. Git Basics
- `git init` - start tracking
- `git status` - see changed files (red = untracked, green = tracked)
- `git add .` or `git add filename` - stage files
- `git commit -m "message"` - take snapshot
- `git log` - see commit history

## 2. .gitignore File
- Create `.gitignore` file
- Add `node_modules/` (never track - too big, 17GB+)
- Add `.env` (never track - has passwords)

## 3. GitHub
- Create account on github.com
- Create new repository (Public)
- Copy commands from GitHub:
  - `git remote add origin <url>`
  - `git push -u origin main`

## 4. .env File (Environment Variables)
- Create `.env` file
- Write: `PORT=3000`
- Write: `MONGODB_URL=your_connection_string`
- Install: `npm install dotenv`
- Add at top of server.js: `require('dotenv').config()`
- Use: `process.env.PORT` and `process.env.MONGODB_URL`
- NEVER push `.env` to GitHub

## 5. MongoDB Atlas
- Go to mongodb.com/atlas
- Sign up free
- Create free cluster
- Create database user (username + password)
- Allow network access: `0.0.0.0/0`
- Get connection string
- Replace `<password>` with your password
- Copy to `.env` file

## 6. Render (Deployment)
- Go to render.com
- Sign up with GitHub
- Click "New" → "Web Service"
- Connect your GitHub repo
- Build command: `npm install`
- Start command: `node server.js`
- Add environment variables (PORT, MONGODB_URL)
- Deploy
- Get public URL like `https://hotel.onrender.com`

---

That's it. Nothing else.

**No routes, no controllers, no express code, no database operations - JUST deployment setup.**