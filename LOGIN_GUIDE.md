# 🔐 Login System Guide

## Overview

WholesaleHub now includes a complete authentication system with user registration, login, logout, and profile management features.

---

## 🚀 Getting Started

### Demo Accounts

You can immediately test the login system with these demo accounts:

| Username | Password | Name |
|----------|----------|------|
| `admin` | `admin123` | Admin User |
| `demo` | `demo123` | Demo User |

### First Time Users

**No account yet?** You can create one right from the login page!

---

## 📝 Registration

### How to Register

1. Click the **🔐 Login** button in the top navigation
2. On the login page, click **"Register here"** link
3. Fill in the registration form:
   - **Full Name** (required)
   - **Username** (required, 3+ characters)
   - **Email** (required, valid format)
   - **Password** (required, 6+ characters)
   - **Confirm Password** (must match)
4. Click **"Create Account"**
5. You'll see a success message and can login immediately

### Username Requirements
- Minimum 3 characters
- Must be unique (no duplicates)
- Case-insensitive

### Password Requirements
- Minimum 6 characters
- Secure hashing (not stored in plain text)
- Remember it! (recovery not implemented in demo)

### Email Requirements
- Valid email format (example@domain.com)
- Must be unique per account
- Used for identification only

---

## 🔑 Login

### How to Login

1. Click the **🔐 Login** button in the navigation bar
2. Enter your username and password
3. Click **"Login"** button
4. You'll be redirected to the marketplace

### Staying Logged In

- Your session is saved in your browser
- You'll remain logged in even after closing and reopening the browser
- Each browser has its own login session

### Demo Login Test

```
Username: admin
Password: admin123
```

---

## 👤 User Profile

### Accessing Your Profile

1. Look for **"👤 [Your Name]"** in the top-right navigation (when logged in)
2. Click on it to open the profile dropdown menu
3. Click **"My Profile"** to view your account details

### Profile Information

Your profile displays:
- **Name**: Your full name
- **Username**: Your unique @username
- **Email**: Your email address
- **Member Since**: Date you joined

### Profile Shopping Info

- **Items in Cart**: Current number of items
- **Cart Total**: Current cart value

---

## 🚪 Logout

### How to Logout

1. Click on **"👤 [Your Name]"** in the top navigation
2. Click **"Logout"** from the dropdown menu
3. You'll be redirected to the login page
4. Your cart is saved for when you log back in!

### What Happens When You Logout

- Your login session is cleared
- You can log back in anytime
- Your cart items are preserved (saved in localStorage)
- You'll return to the marketplace after logout

---

## 🛒 Using Cart While Logged In

### Login Benefits

- Cart persists across browser sessions
- Your shopping history is tied to your account
- Easy checkout process
- Can view cart from profile

### Adding to Cart

1. Browse products
2. Click **"Add to Cart"** on any product
3. See cart count update in navigation (e.g., 🛒 3)
4. Cart items are saved automatically

### Viewing Cart

- Click cart icon (🛒) to open cart modal
- Or access from profile menu
- View items, quantities, and total
- Proceed to checkout

---

## 🔒 Security Features

### How Your Data is Protected

1. **Password Hashing**: Passwords are hashed before storage
2. **Session Tokens**: Login creates secure session tokens
3. **Browser Storage**: Uses secure localStorage (isolated per origin)
4. **No Plain Text**: Passwords never stored or transmitted as plain text

### Important Notes

⚠️ **This is a demo system.** In production:
- Use HTTPS encryption
- Implement backend authentication
- Use bcrypt for password hashing
- Add multi-factor authentication
- Implement refresh tokens
- Add rate limiting

---

## 🎯 Features by Login Status

### When Logged Out
- Browse products ✅
- Search and filter ✅
- View cart ✅
- Add to cart ✅
- Register ✅
- Login ✅

### When Logged In
- All above features ✅
- View user profile ✅
- See personalized cart ✅
- Logout ✅
- Quick checkout ✅

---

## 🐛 Troubleshooting

### I Forgot My Password
**Current Status**: Not implemented in demo
**Solution**: Register a new account with a different username

### I Can't Create an Account
**Possible Issues**:
- Username already taken → Choose a different username
- Invalid email format → Use format: name@domain.com
- Password too short → Use at least 6 characters
- Passwords don't match → Confirm password carefully

### Login Not Working
**Check**:
- Username is case-insensitive (admin = ADMIN = Admin)
- Password is case-sensitive
- No extra spaces in username/password
- Using correct demo credentials

### Cart Cleared After Logout
**Note**: This should NOT happen. Cart is saved separately.
**Solution**: Refresh page and login again to restore cart

### Still Seeing Login Button When Logged In
**Solution**: Refresh the page (Ctrl+R or Cmd+R)

---

## 💾 Data Storage

### Where Your Data is Stored

**Client-Side (Browser)**:
- User accounts list (localStorage)
- Current login session (localStorage)
- Shopping cart items (localStorage)
- Session tokens (localStorage)

### Data Not Stored

- Browsing history (not tracked)
- Search queries (not logged)
- Personal information beyond account details

---

## ✨ Advanced Features

### Session Token

When you login, a session token is created with:
```javascript
{
    userId: 1,
    username: "admin",
    email: "admin@wholesalehub.com",
    name: "Admin User",
    loginTime: "2024-01-15T10:30:00Z"
}
```

### Developer Console

Open browser DevTools (F12) → Console to see:
- Login/logout messages
- User session info
- Cart operations
- Authentication events

### Persistence

- **Cart**: Persists across sessions
- **Login**: Persists across browser closures
- **Logout**: Clears session, keeps cart

---

## 🧪 Testing Scenarios

### Scenario 1: New User Registration
1. Go to login page
2. Click "Register here"
3. Create account with:
   - Name: Test User
   - Username: testuser123
   - Email: test@example.com
   - Password: password123
4. See success message
5. Auto-login works
6. Check profile information

### Scenario 2: Login and Shopping
1. Login with: admin / admin123
2. Add 3 products to cart
3. Check cart count (3)
4. Open profile
5. See cart total
6. Logout
7. Login again
8. Verify cart still has 3 items

### Scenario 3: Multiple Accounts
1. Register Account 1
2. Add items to cart
3. Logout
4. Register Account 2
5. Login with Account 1
6. See original cart (different user has separate cart)

---

## 📱 Mobile Responsiveness

Login system works perfectly on mobile:
- Forms are touch-friendly
- Password visibility toggle (👁️ button)
- Responsive layout
- Easy-to-use buttons

### Test on Mobile

1. Open on phone/tablet
2. Try registration
3. Test login
4. View profile
5. Manage cart

---

## 🎓 Code Examples

### Check if User is Logged In

```javascript
if (isLoggedIn()) {
    const user = getCurrentUser();
    console.log('Logged in as:', user.username);
}
```

### Get Current User Info

```javascript
const user = getCurrentUser();
if (user) {
    console.log(user.name);      // "Admin User"
    console.log(user.email);     // "admin@wholesalehub.com"
    console.log(user.username);  // "admin"
}
```

### Manual Logout

```javascript
logoutUser();
```

### Check Login Status

```javascript
if (isLoggedIn()) {
    // User is logged in
} else {
    // User is logged out
}
```

---

## 📋 Checklist for Full Functionality

- [ ] Can see login button in navigation
- [ ] Can navigate to login page
- [ ] Can see demo accounts info
- [ ] Can register new account
- [ ] Username validation works
- [ ] Password validation works
- [ ] Email validation works
- [ ] Can login with credentials
- [ ] Login redirects to marketplace
- [ ] See user name in navigation
- [ ] Can open profile modal
- [ ] Profile shows correct info
- [ ] Can logout successfully
- [ ] Cart persists across login/logout
- [ ] Multiple accounts have separate carts
- [ ] Session persists after browser close
- [ ] Password visibility toggle works
- [ ] Form errors display clearly

---

## 🚀 Next Steps

### For Production

1. **Move to Backend**: Implement authentication server
2. **Database**: Store users in secure database (MongoDB, PostgreSQL)
3. **Encryption**: Use bcrypt for password hashing
4. **HTTPS**: Enable SSL/TLS encryption
5. **JWT Tokens**: Implement JWT for secure sessions
6. **Email Verification**: Confirm user email addresses
7. **Password Recovery**: Add forgot password functionality
8. **2FA**: Add two-factor authentication
9. **Social Login**: Add Google/GitHub login
10. **Rate Limiting**: Prevent brute force attacks

### Current Limitations

- No backend server (demo only)
- No email verification
- No password recovery
- No password change
- All data in browser storage
- Single device per session

---

## 🎉 You're All Set!

The login system is ready to use. Create an account, add products to your cart, and enjoy shopping at WholesaleHub!

**Questions?** Check the console (F12) for detailed logs of all authentication operations.
