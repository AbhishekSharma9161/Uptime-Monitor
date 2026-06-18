# Deployment Guide

This guide covers how to deploy UptimeKit to various platforms. The key issue to address is setting the correct backend URL for your frontend when deploying across different services.

## Environment Variables

### Frontend (`VITE_BACKEND_URL`)
This is the URL where your frontend will communicate with the backend API. This variable is **required** for deployment and must be set before building the Docker image or deploying to cloud platforms.

- **Local Development**: `http://localhost:3000`
- **Docker Compose**: `http://backend:3000`
- **Cloud Deployment**: Set to your deployed backend URL (e.g., `https://your-backend-url.com`)

## Deployment to Render

### Backend Deployment

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Root Directory**: `backend`
   - **Environment Variables**:
     - `PORT=3000`
     - `NODE_ENV=production`
     - `FRONTEND_URL=https://your-frontend-url.onrender.com` (set after frontend is deployed)

4. Deploy and copy the backend URL (e.g., `https://your-backend.onrender.com`)

### Frontend Deployment

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the following:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview` (or use static site with the dist folder)
   - **Root Directory**: `frontend`
   - **Environment Variables**:
     - `VITE_BACKEND_URL=https://your-backend.onrender.com` (use the backend URL from step 1)

4. Deploy the frontend

### Update Backend CORS

Once your frontend URL is deployed, update your backend's `FRONTEND_URL` environment variable to match your frontend URL.

## Deployment to Vercel + Render

### Backend on Render

Follow the "Backend Deployment" steps above.

### Frontend on Vercel

1. Push your code to GitHub
2. Import your project in Vercel
3. Set the following:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**:
     - Key: `VITE_BACKEND_URL`
     - Value: `https://your-backend.onrender.com`

4. Deploy

## Docker Compose (Local Development)

When using Docker Compose locally, the backend URL is automatically set to `http://backend:3000` due to Docker's internal networking.

```bash
docker-compose up --build
```

Frontend will be available at: `http://localhost:5173`
Backend will be available at: `http://localhost:3000`

## Important Notes

- **CORS Configuration**: Make sure your backend has the correct `FRONTEND_URL` set to allow requests from your frontend domain.
- **Environment Variable Timing**: `VITE_BACKEND_URL` must be set before the frontend build occurs (not at runtime).
- **API Communication**: All API calls from the frontend are routed through `VITE_BACKEND_URL`, so ensure it's correctly configured for your deployment environment.

## Troubleshooting

### "Error Loading Monitors - Unable to connect to the backend server"

This error means the frontend cannot reach the backend API. Common causes:

1. **Incorrect `VITE_BACKEND_URL`**: Verify it matches your actual backend URL and includes the protocol (http:// or https://)
2. **Backend not running**: Ensure your backend service is deployed and accessible
3. **CORS Issues**: Check that your backend has the correct `FRONTEND_URL` environment variable set
4. **Network issues**: Check browser console (F12 → Network tab) to see the exact failed request

### Solution Steps

1. Check the browser's Network tab to see what URL the frontend is trying to reach
2. Verify that URL is accessible and returns the API response
3. Update `VITE_BACKEND_URL` if incorrect and redeploy the frontend
4. Update the backend's `FRONTEND_URL` to match your frontend's domain
