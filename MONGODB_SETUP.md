# MongoDB Setup Guide for Windows

## Option 1: Install MongoDB Community Server (Local)

### Step 1: Download MongoDB
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0 or 6.0)
   - Platform: Windows
   - Package: MSI
3. Click "Download"

### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose "Complete" installation
3. **Important**: Check "Install MongoDB as a Service"
4. Check "Run service as Network Service user"
5. Check "Install MongoDB Compass" (GUI tool - optional but helpful)
6. Click "Install"

### Step 3: Verify Installation
Open a new PowerShell/Command Prompt and run:
```bash
mongod --version
```

### Step 4: Start MongoDB Service
MongoDB should start automatically as a Windows service. If not:

1. Open Services (Win + R, type `services.msc`)
2. Find "MongoDB" service
3. Right-click → Start (if not running)

Or run in PowerShell (as Administrator):
```powershell
net start MongoDB
```

### Step 5: Test Connection
```bash
mongosh mongodb://127.0.0.1:27017
```

---

## Option 2: Use MongoDB Atlas (Cloud - Recommended for Beginners)

### Step 1: Create Free Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose "FREE" (M0) tier
3. Select a cloud provider and region (closest to you)
4. Click "Create"

### Step 3: Create Database User
1. Go to "Database Access" → "Add New Database User"
2. Username: `gymverse_user`
3. Password: Create a strong password (save it!)
4. Database User Privileges: "Atlas admin" or "Read and write to any database"
5. Click "Add User"

### Step 4: Whitelist IP Address
1. Go to "Network Access" → "Add IP Address"
2. Click "Add Current IP Address" (or "Allow Access from Anywhere" for development: `0.0.0.0/0`)
3. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `gymverse`

Example:
```
mongodb+srv://gymverse_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/gymverse?retryWrites=true&w=majority
```

### Step 6: Update .env File
Update your `backend/.env`:
```
MONGODB_URI=mongodb+srv://gymverse_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/gymverse?retryWrites=true&w=majority
```

---

## Quick Start (If MongoDB is Already Installed)

If MongoDB is installed but not running:

### Check if MongoDB service exists:
```powershell
Get-Service MongoDB
```

### Start MongoDB service:
```powershell
# Run PowerShell as Administrator
net start MongoDB
```

### Or start manually:
```powershell
# Navigate to MongoDB bin directory (usually)
cd "C:\Program Files\MongoDB\Server\7.0\bin"
mongod --dbpath "C:\data\db"
```

**Note**: Create the data directory first:
```powershell
mkdir C:\data\db
```

---

## Troubleshooting

### Error: "connect ECONNREFUSED"
- MongoDB service is not running
- Start the service using methods above

### Error: "Port 27017 already in use"
- Another MongoDB instance is running
- Check: `netstat -ano | findstr :27017`
- Kill the process or use a different port

### Can't find MongoDB installation
- Check: `C:\Program Files\MongoDB\Server\`
- Add MongoDB bin to PATH:
  - System Properties → Environment Variables
  - Add: `C:\Program Files\MongoDB\Server\7.0\bin` to Path

---

## Recommended: Use MongoDB Atlas (Cloud)
For development, MongoDB Atlas free tier is easier:
- No installation needed
- Works immediately
- 512MB free storage
- Perfect for development/testing






