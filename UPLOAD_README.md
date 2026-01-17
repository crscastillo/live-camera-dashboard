# File Upload in Production

## Issue
The file upload feature works locally but fails in production on Vercel because the filesystem is read-only in serverless environments.

## Solutions

### Option 1: Use Vercel Blob Storage (Recommended)
1. Set up Vercel Blob in your project dashboard
2. Add `BLOB_READ_WRITE_TOKEN` to your environment variables
3. The code is ready to use Vercel Blob (see route-blob.ts.example)

### Option 2: Manual Update via Git
Update the `data/agenda.json` file locally and push to GitHub. Vercel will automatically redeploy.

### Option 3: Use a Database
Store the JSON content in a database like Vercel Postgres or MongoDB.

## Current Workaround
For now, update the agenda by:
1. Editing `data/agenda.json` locally
2. Committing and pushing to GitHub
3. Vercel will auto-deploy the changes
