# Admin Setup Guide

Follow these steps to set yourself up as an admin user for the leaderboard system.

## Step 1: Update Your Email

1. Open `src/libs/firebase/auth.ts`
2. Find this line:

```typescript
const ADMIN_EMAILS = [
  "your-email@gmail.com", // Replace with your actual email
  // Add more admin emails as needed
];
```

3. Replace `"your-email@gmail.com"` with your actual Gmail address
4. Example:

```typescript
const ADMIN_EMAILS = [
  "mayank@example.com", // Your actual email
  // Add more admin emails as needed
];
```

## Step 2: Enable Google Authentication in Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`portfolio-b6a33`)
3. Go to **Authentication** in the left sidebar
4. Click **Get Started** (if not already enabled)
5. Go to **Sign-in method** tab
6. Click on **Google** provider
7. Click **Enable**
8. Add your project's domain to authorized domains:
   - For development: `localhost`
   - For production: your actual domain (e.g., `yourdomain.com`)
9. Click **Save**

## Step 3: Test Admin Access

1. Run your development server:

```bash
npm run dev
```

2. Visit `http://localhost:3000/admin`

3. You should see a "Sign in with Google" button

4. Click it and sign in with the Gmail account you added to `ADMIN_EMAILS`

5. After signing in, you should see the admin dashboard

## Step 4: Deploy Firestore Rules (If Not Done Already)

Make sure your Firestore rules are deployed:

```bash
firebase deploy --only firestore:rules
```

## Troubleshooting

### "Access Denied" Error

- Make sure your email is correctly added to `ADMIN_EMAILS` array
- Check that you're signed in with the correct Google account
- Verify the email matches exactly (case sensitive)

### "Sign-in Failed" Error

- Make sure Google Authentication is enabled in Firebase Console
- Check that your domain is added to authorized domains
- Verify your Firebase config is correct

### "Permission Denied" on Data Operations

- Ensure Firestore rules are deployed
- Check Firebase Console → Firestore → Rules tab

## Adding More Admins

To add more admin users, simply add their email addresses to the `ADMIN_EMAILS` array:

```typescript
const ADMIN_EMAILS = [
  "mayank@example.com",
  "admin2@example.com",
  "admin3@example.com",
];
```

## Security Notes

- Only users with emails in `ADMIN_EMAILS` can access admin functions
- The Firestore rules provide an additional layer of security
- Authentication is handled by Google's secure OAuth system
- Admin status is checked both in the frontend and database rules

## Production Deployment

When deploying to production:

1. Make sure your production domain is added to Firebase authorized domains
2. Update the `ADMIN_EMAILS` array with production admin emails
3. Deploy the updated code
4. Test admin access on the production site

Your admin setup is now complete! 🎉
