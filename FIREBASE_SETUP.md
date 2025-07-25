# Firebase Leaderboard Integration

This document explains how the Firebase integration works for the leaderboard functionality in your portfolio.

## Overview

The leaderboard system uses Firebase Firestore with two main collections:

1. **`pendingScores`** - Stores scores submitted by users that are awaiting review
2. **`reviewedScores`** - Stores approved scores that appear on the public leaderboard

## Firebase Setup

### 1. Firestore Collections

The system automatically creates these collections when first used:

#### pendingScores Collection

- `username` (string): User's display name
- `email` (string): User's email address
- `score` (number): The game score achieved
- `submittedAt` (timestamp): When the score was submitted
- `status` (string): 'pending', 'reviewed', or 'rejected'

#### reviewedScores Collection

- `username` (string): User's display name
- `score` (number): The approved score
- `submittedAt` (timestamp): Original submission time
- `reviewedAt` (timestamp): When the score was approved
- `rank` (number): Position in leaderboard (calculated dynamically)

### 2. Security Rules

Deploy the `firestore.rules` file to your Firebase project:

```bash
firebase deploy --only firestore:rules
```

The current rules allow:

- Anyone to submit scores for review
- Only authenticated admins to read pending scores and approve/reject them
- Anyone to read approved scores for the leaderboard display

### 3. Admin Setup

To set up admin access:

1. In Firebase Console, go to Authentication > Users
2. Find your admin user and set custom claims:

```javascript
// In Firebase Admin SDK or Cloud Functions
admin.auth().setCustomUserClaims(uid, { admin: true });
```

## How It Works

### Score Submission Flow

1. User completes game and achieves a score
2. User fills out the leaderboard form with username and email
3. Score is submitted to `pendingScores` collection with status 'pending'
4. User sees confirmation that score is under review

### Admin Review Process

1. Admin logs in and accesses pending scores
2. Admin can approve scores (moves to `reviewedScores`) or reject them
3. Approved scores appear on the public leaderboard
4. Rejected scores remain in `pendingScores` with status 'rejected'

### Leaderboard Display

1. Leaderboard component automatically fetches top 10 scores from `reviewedScores`
2. Scores are sorted by score value (highest first)
3. Real-time updates when new scores are approved

## API Functions

### Available Functions

```typescript
// Submit a score for review
await submitScoreForReview({
  username: "PlayerName",
  email: "player@example.com",
  score: 1250,
});

// Get pending scores (admin only)
const pending = await getPendingScores();

// Approve a score (admin only)
await approveScore(pendingScoreId, pendingScoreData);

// Reject a score (admin only)
await rejectScore(pendingScoreId);

// Get top leaderboard scores (public)
const topScores = await getTopReviewedScores(10);

// Get user's best score
const userBest = await getUserBestScore("player@example.com");
```

## Security Considerations

1. **Anonymous Submissions**: Currently allows anonymous score submissions. Consider adding rate limiting or reCAPTCHA for production.

2. **Admin Authentication**: Replace the admin check in security rules with your actual authentication logic.

3. **Score Validation**: Consider adding server-side validation to prevent impossible scores.

4. **Email Verification**: Consider requiring email verification before scores can be submitted.

## Development vs Production

### Development

- Use Firebase Emulator Suite for local testing
- Test with relaxed security rules

### Production

- Deploy proper security rules
- Set up proper admin authentication
- Consider adding analytics and monitoring
- Implement proper error handling and logging

## Troubleshooting

### Common Issues

1. **Permission Denied**: Check that security rules are properly deployed
2. **Admin Access**: Ensure custom claims are set correctly for admin users
3. **Missing Data**: Check that Firebase config is correct and project ID matches

### Debug Tools

- Firebase Console for viewing data
- Browser dev tools for network requests
- Firebase Emulator for local testing

## Admin Interface

### Accessing the Admin Dashboard

Visit `/admin` to access the score review interface:

```
https://yourdomain.com/admin
```

### Admin Features

1. **View Pending Scores**: See all submissions awaiting review
2. **Approve Scores**: Move approved scores to the public leaderboard
3. **Reject Scores**: Remove invalid or suspicious submissions
4. **Real-time Updates**: Refresh to see new submissions
5. **Score Management**: Batch operations for efficiency

### Admin Dashboard Features

- **Stats Overview**: Quick view of pending reviews count
- **Sortable Table**: View username, email, score, and submission date
- **Action Buttons**: One-click approve/reject with loading states
- **Error Handling**: Clear feedback for failed operations
- **Responsive Design**: Works on desktop and mobile

## Future Enhancements

Potential improvements to consider:

1. **Real-time Updates**: Use Firestore listeners for live leaderboard updates
2. **User Profiles**: Link scores to user accounts
3. **Categories**: Multiple leaderboards for different game modes
4. **Achievements**: Badge system for milestones
5. **Advanced Admin Tools**: Bulk operations, search, and filtering
6. **Authentication**: Proper admin login system
7. **Notifications**: Email alerts for new score submissions
