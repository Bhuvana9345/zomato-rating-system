/**
 * FlavorVault - Authentication Module
 * Handles user signup, login, logout, session management, and profile updates.
 * All data is persisted in localStorage.
 * Exposes: window.Auth
 */

window.Auth = {

  /**
   * Generate a unique ID using timestamp + random suffix.
   * @returns {string} Unique identifier
   */
  _generateId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
  },

  /**
   * Retrieve the users array from localStorage.
   * @returns {Array} Array of user objects
   */
  _getUsers() {
    try {
      const users = localStorage.getItem('users');
      return users ? JSON.parse(users) : [];
    } catch (err) {
      console.error('Auth: Failed to read users from localStorage', err);
      return [];
    }
  },

  /**
   * Save the users array to localStorage.
   * @param {Array} users - Array of user objects
   */
  _saveUsers(users) {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (err) {
      console.error('Auth: Failed to save users to localStorage', err);
    }
  },

  /**
   * Validate an email address format.
   * @param {string} email
   * @returns {boolean}
   */
  _isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  /**
   * Register a new user.
   * Validates inputs, checks for duplicate email, and stores the user.
   *
   * @param {string} username - Min 3 characters
   * @param {string} email    - Must be valid email format
   * @param {string} password - Min 6 characters
   * @returns {{ success: boolean, message: string, user?: object }}
   */
  signup(username, email, password) {
    try {
      // --- Input validation ---
      if (!username || username.trim().length < 3) {
        return { success: false, message: 'Username must be at least 3 characters long.' };
      }
      if (!email || !this._isValidEmail(email.trim())) {
        return { success: false, message: 'Please enter a valid email address.' };
      }
      if (!password || password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters long.' };
      }

      const normalizedEmail = email.trim().toLowerCase();
      const users = this._getUsers();

      // --- Duplicate check ---
      if (users.some(u => u.email === normalizedEmail)) {
        return { success: false, message: 'An account with this email already exists.' };
      }

      // --- Build user object ---
      const newUser = {
        id: this._generateId(),
        username: username.trim(),
        email: normalizedEmail,
        password: btoa(password),              // Base64 obfuscation (NOT real encryption)
        avatar: username.trim()[0].toUpperCase(),
        joinDate: new Date().toISOString()
      };

      users.push(newUser);
      this._saveUsers(users);

      // Return user without password
      const { password: _, ...safeUser } = newUser;
      return { success: true, message: 'Account created successfully!', user: safeUser };

    } catch (err) {
      console.error('Auth.signup error:', err);
      return { success: false, message: 'Something went wrong. Please try again.' };
    }
  },

  /**
   * Log in an existing user.
   * Finds user by email and compares base64-encoded passwords.
   * On success, stores the user (without password) as 'currentUser' in localStorage.
   *
   * @param {string} email
   * @param {string} password
   * @returns {{ success: boolean, message: string, user?: object }}
   */
  login(email, password) {
    try {
      if (!email || !password) {
        return { success: false, message: 'Email and password are required.' };
      }

      const normalizedEmail = email.trim().toLowerCase();
      const users = this._getUsers();
      const user = users.find(u => u.email === normalizedEmail);

      if (!user) {
        return { success: false, message: 'No account found with this email.' };
      }

      // Compare base64-encoded passwords
      if (user.password !== btoa(password)) {
        return { success: false, message: 'Incorrect password. Please try again.' };
      }

      // Store session (exclude password)
      const { password: _, ...safeUser } = user;
      localStorage.setItem('currentUser', JSON.stringify(safeUser));

      return { success: true, message: 'Login successful!', user: safeUser };

    } catch (err) {
      console.error('Auth.login error:', err);
      return { success: false, message: 'Something went wrong. Please try again.' };
    }
  },

  /**
   * Log out the current user and redirect to the login page.
   */
  logout() {
    try {
      localStorage.removeItem('currentUser');
    } catch (err) {
      console.error('Auth.logout error:', err);
    }
    window.location.href = 'login.html';
  },

  /**
   * Get the currently logged-in user from localStorage.
   * @returns {object|null} User object (without password) or null
   */
  getCurrentUser() {
    try {
      const data = localStorage.getItem('currentUser');
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error('Auth.getCurrentUser error:', err);
      return null;
    }
  },

  /**
   * Check whether a user is currently authenticated.
   * @returns {boolean}
   */
  isAuthenticated() {
    return this.getCurrentUser() !== null;
  },

  /**
   * Guard for protected pages.
   * If the user is not authenticated, redirects to login.html.
   * @returns {object|undefined} The current user if authenticated
   */
  requireAuth() {
    const user = this.getCurrentUser();
    if (!user) {
      window.location.href = 'login.html';
      return;
    }
    return user;
  },

  /**
   * Merge updates into the current user's profile and persist changes
   * in both 'currentUser' and the 'users' array.
   *
   * @param {object} updates - Key/value pairs to merge
   * @returns {{ success: boolean, message: string, user?: object }}
   */
  updateUser(updates) {
    try {
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        return { success: false, message: 'No user is currently logged in.' };
      }

      // Merge updates into the current user
      const updatedUser = { ...currentUser, ...updates };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // Also update the user in the users array
      const users = this._getUsers();
      const idx = users.findIndex(u => u.id === currentUser.id);
      if (idx !== -1) {
        // Preserve the stored password; only merge non-password fields
        users[idx] = { ...users[idx], ...updates };
        this._saveUsers(users);
      }

      return { success: true, message: 'Profile updated successfully!', user: updatedUser };

    } catch (err) {
      console.error('Auth.updateUser error:', err);
      return { success: false, message: 'Failed to update profile.' };
    }
  }
};
