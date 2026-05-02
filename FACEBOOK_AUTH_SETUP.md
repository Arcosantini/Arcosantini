# Facebook OAuth Setup Guide for MSS (Main Street Social)

This guide will walk you through setting up Facebook authentication for your Main Street Social application using Supabase.

## Overview

Facebook OAuth allows users to sign in to your app using their Facebook account, providing a seamless authentication experience without needing to create a separate password.

## Prerequisites

- A Supabase project with your MSS database
- A Facebook Developer account
- Your app deployed or running locally with HTTPS (Facebook requires HTTPS for OAuth)

---

## Step 1: Configure Facebook OAuth in Supabase Dashboard

### 1.1 Get Your Callback URL from Supabase

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your MSS project
3. Navigate to **Authentication** → **Providers**
4. Find **Facebook** in the list of providers
5. Copy the **Callback URL** (it will look like: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`)
6. Keep this tab open - you'll need to paste credentials here later

---

## Step 2: Create a Facebook App

### 2.1 Go to Facebook Developers

1. Visit [Facebook Developers](https://developers.facebook.com/)
2. Click **My Apps** in the top right
3. Click **Create App**

### 2.2 Choose App Type

1. Select **Consumer** as the app type
2. Click **Next**

### 2.3 Configure Basic App Information

1. **App Name**: Enter "Main Street Social" (or your preferred name)
2. **App Contact Email**: Enter your email address
3. Click **Create App**
4. Complete the security check if prompted

---

## Step 3: Add Facebook Login Product

### 3.1 Add Facebook Login

1. In your Facebook App dashboard, scroll down to **Add Products to Your App**
2. Find **Facebook Login** and click **Set Up**
3. Select **Web** as the platform
4. For **Site URL**, enter your app's URL:
   - Local development: `http://localhost:3000`
   - Production: `https://yourdomain.com`
5. Click **Save** and **Continue**

### 3.2 Configure OAuth Settings

1. In the left sidebar, click **Facebook Login** → **Settings**
2. In **Valid OAuth Redirect URIs**, add your Supabase callback URL:
   ```
   https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
   ```
3. Also add your app's callback URL:
   ```
   http://localhost:3000/auth/callback
   https://yourdomain.com/auth/callback
   ```
4. **Client OAuth Login**: Set to **Yes**
5. **Web OAuth Login**: Set to **Yes**
6. **Enforce HTTPS**: Set to **Yes**
7. Click **Save Changes**

---

## Step 4: Get Your Facebook App Credentials

### 4.1 Get App ID and Secret

1. In the left sidebar, click **Settings** → **Basic**
2. You'll see:
   - **App ID**: Copy this value
   - **App Secret**: Click **Show**, complete security check, and copy this value
3. Keep these credentials safe and secure

---

## Step 5: Configure Supabase with Facebook Credentials

### 5.1 Add Facebook Provider in Supabase

1. Return to your Supabase Dashboard
2. Go to **Authentication** → **Providers**
3. Find **Facebook** and click to expand
4. Toggle **Enable Sign in with Facebook** to **ON**
5. Enter your credentials:
   - **Facebook Client ID**: Paste your Facebook App ID
   - **Facebook Client Secret**: Paste your Facebook App Secret
6. Click **Save**

---

## Step 6: Make Your Facebook App Live

### 6.1 Complete Required Settings

1. In Facebook Developer dashboard, go to **Settings** → **Basic**
2. Add required information:
   - **Privacy Policy URL**: Add your privacy policy URL
   - **Terms of Service URL** (optional but recommended)
   - **App Icon**: Upload a 1024x1024 PNG icon
3. Click **Save Changes**

### 6.2 Switch App to Live Mode

1. At the top of your Facebook App dashboard, you'll see a toggle that says **In Development**
2. Click the toggle to switch it to **Live**
3. Select a category for your app (e.g., "Social Networking")
4. Confirm the switch

---

## Step 7: Test Facebook Authentication

### 7.1 Test Sign Up

1. Go to your app's sign-up page: `http://localhost:3000/auth/sign-up`
2. Click the **Sign up with Facebook** button
3. You should be redirected to Facebook's login page
4. Log in with your Facebook credentials
5. Authorize the app to access your basic profile information
6. You should be redirected back to your app at `/feed`

### 7.2 Verify User in Supabase

1. Go to Supabase Dashboard → **Authentication** → **Users**
2. You should see a new user with:
   - Email from Facebook
   - Provider: facebook
   - Full name from Facebook profile

### 7.3 Check Profile Table

1. Go to Supabase Dashboard → **Table Editor** → **profiles**
2. Verify a profile was created with the user's information

---

## Step 8: Production Deployment

### 8.1 Update Facebook OAuth Redirect URIs

1. In Facebook Developer dashboard, go to **Facebook Login** → **Settings**
2. Add your production domain to **Valid OAuth Redirect URIs**:
   ```
   https://yourdomain.com/auth/callback
   ```
3. Click **Save Changes**

### 8.2 Verify Production Environment

1. Ensure your production app has the correct Supabase environment variables
2. Test the Facebook login flow in production
3. Monitor the Supabase logs for any authentication issues

---

## Troubleshooting

### Common Issues

**Issue**: "URL Blocked: This redirect failed because the redirect URI is not whitelisted"
- **Solution**: Make sure you've added all callback URLs to Facebook OAuth settings

**Issue**: "App Not Setup: This app is still in development mode"
- **Solution**: Switch your Facebook app to Live mode (see Step 6.2)

**Issue**: "Invalid OAuth redirect URI"
- **Solution**: Double-check that the Supabase callback URL matches exactly in Facebook settings

**Issue**: User created but no profile
- **Solution**: Check your Supabase database triggers and ensure the profiles table has proper RLS policies

### Getting Help

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
- [Supabase Discord Community](https://discord.supabase.com)

---

## Security Best Practices

1. **Never commit** your Facebook App Secret to version control
2. Use environment variables for sensitive credentials
3. Enable HTTPS in production (required by Facebook)
4. Regularly review authorized users in your Facebook App dashboard
5. Set up proper data deletion callbacks if required by Facebook
6. Review Facebook's Platform Terms and Policies regularly

---

## Next Steps

Once Facebook authentication is working:

1. Consider adding other OAuth providers (Google, Apple, LinkedIn, X)
2. Implement email verification for email/password sign-ups
3. Add profile completion flow for new users
4. Set up proper error handling and user feedback
5. Monitor authentication metrics in Supabase

---

## Summary

You've successfully set up Facebook OAuth authentication for Main Street Social! Users can now sign up and log in using their Facebook accounts. The authentication flow is handled securely by Supabase, and user profiles are automatically created in your database.
