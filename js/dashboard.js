(function() {
  'use strict';

  let currentTab = 'reviews';

  function init() {
    // Require authentication — redirects to login if not logged in
    var user = Auth.requireAuth();
    if (!user) return;

    Utils.initThemeToggle();
    Utils.initNavbar();

    renderDashboardHeader(user);
    setupTabs();
    renderContent();
  }

  function renderDashboardHeader(user) {
    var reviews = Utils.getReviews().filter(function(r) { return r.userId === user.id; });
    var totalReviews = reviews.length;
    var avgRating = totalReviews > 0
      ? (reviews.reduce(function(sum, r) { return sum + r.rating; }, 0) / totalReviews).toFixed(1)
      : '0.0';
    var mostReviewedCuisine = getMostReviewedCuisine(reviews);
    var mostReviewedRestaurant = getMostReviewedRestaurant(reviews);

    document.getElementById('dashboardHeader').innerHTML = `
      <div class="dashboard-avatar">${user.avatar || user.username[0].toUpperCase()}</div>
      <div class="dashboard-info">
        <h1>${user.username}</h1>
        <p>${user.email} • Joined ${Utils.formatDate(user.joinDate)}</p>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">${totalReviews}</div>
            <div class="stat-label">Total Reviews</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${avgRating}</div>
            <div class="stat-label">Avg Rating Given</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${mostReviewedCuisine || '—'}</div>
            <div class="stat-label">Favorite Cuisine</div>
          </div>
          <div class="stat-card">
            <div class="stat-number" style="font-size: 1.2rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 6px 0;" title="${mostReviewedRestaurant || '—'}">${mostReviewedRestaurant || '—'}</div>
            <div class="stat-label">Most Reviewed Restaurant</div>
          </div>
        </div>
      </div>`;
  }

  function getMostReviewedCuisine(reviews) {
    if (reviews.length === 0) return null;
    var counts = {};
    reviews.forEach(function(r) {
      var restaurant = RestaurantData.getById(r.restaurantId);
      if (restaurant) {
        counts[restaurant.cuisine] = (counts[restaurant.cuisine] || 0) + 1;
      }
    });
    var entries = Object.entries(counts).sort(function(a, b) { return b[1] - a[1]; });
    return entries.length > 0 ? entries[0][0] : null;
  }

  function getMostReviewedRestaurant(reviews) {
    if (reviews.length === 0) return null;
    var counts = {};
    reviews.forEach(function(r) {
      counts[r.restaurantId] = (counts[r.restaurantId] || 0) + 1;
    });
    var entries = Object.entries(counts).sort(function(a, b) { return b[1] - a[1]; });
    if (entries.length > 0) {
      var restaurant = RestaurantData.getById(entries[0][0]);
      return restaurant ? restaurant.name : null;
    }
    return null;
  }

  function setupTabs() {
    document.querySelectorAll('.tab-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        currentTab = this.dataset.tab;
        renderContent();
      });
    });
  }

  function renderContent() {
    if (currentTab === 'reviews') {
      renderMyReviews();
    } else if (currentTab === 'activity') {
      renderActivity();
    } else if (currentTab === 'settings') {
      renderSettings();
    }
  }

  function renderMyReviews() {
    var user = Auth.getCurrentUser();
    var reviews = Utils.getReviews().filter(function(r) { return r.userId === user.id; })
      .sort(function(a, b) { return new Date(b.date) - new Date(a.date); });
    var content = document.getElementById('dashboardContent');

    if (reviews.length === 0) {
      content.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📝</div>
          <h3 class="empty-title">No reviews yet</h3>
          <p class="empty-text">Start exploring restaurants and share your experiences!</p>
          <a href="index.html" class="btn btn-primary" style="margin-top:16px;">Browse Restaurants</a>
        </div>`;
      return;
    }

    content.innerHTML = reviews.map(function(review) {
      var restaurant = RestaurantData.getById(review.restaurantId);
      if (!restaurant) return '';

      return `
        <div class="user-review-card animate-fadeIn">
          <div class="user-review-restaurant">
            <div class="user-review-restaurant-image" style="background:${restaurant.image}"></div>
            <div class="user-review-restaurant-info">
              <a href="restaurant.html?id=${restaurant.id}" class="user-review-restaurant-name">${restaurant.name}</a>
              <span class="user-review-restaurant-cuisine">${restaurant.cuisine}</span>
            </div>
            <div class="review-stars" style="margin-left:auto;">${generateStarsHTML(review.rating)}</div>
          </div>
          <div class="review-body">${review.text}</div>
          <div class="user-review-footer">
            <span class="review-date">${Utils.formatDate(review.date)}${review.edited ? ' (edited)' : ''}</span>
            <div class="review-actions">
              <button class="btn btn-secondary btn-sm" onclick="editReview('${review.id}')">✏️ Edit</button>
              <button class="btn btn-danger btn-sm" onclick="deleteReview('${review.id}')">🗑️ Delete</button>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  function renderActivity() {
    var user = Auth.getCurrentUser();
    var reviews = Utils.getReviews().filter(function(r) { return r.userId === user.id; })
      .sort(function(a, b) { return new Date(b.date) - new Date(a.date); })
      .slice(0, 10);
    var content = document.getElementById('dashboardContent');

    if (reviews.length === 0) {
      content.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📋</div>
          <h3 class="empty-title">No activity yet</h3>
          <p class="empty-text">Your recent activity will appear here.</p>
        </div>`;
      return;
    }

    content.innerHTML = `
      <div class="activity-timeline">
        ${reviews.map(function(review) {
          var restaurant = RestaurantData.getById(review.restaurantId);
          var name = restaurant ? restaurant.name : 'Unknown';
          var filledStars = '★'.repeat(review.rating);
          var emptyStars = '☆'.repeat(5 - review.rating);
          return `
            <div class="activity-item animate-fadeIn">
              <div class="activity-dot"></div>
              <div class="activity-content">
                <p class="activity-text">
                  You rated <a href="restaurant.html?id=${review.restaurantId}">${name}</a>
                  <span style="color:var(--star-filled); margin-left:6px;">${filledStars}</span><span style="color:var(--text-muted);">${emptyStars}</span>
                </p>
                <span class="activity-date">${Utils.formatDate(review.date)}</span>
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }

  function renderSettings() {
    var user = Auth.getCurrentUser();
    var content = document.getElementById('dashboardContent');

    content.innerHTML = `
      <div class="settings-card animate-fadeIn">
        <h3 style="margin-bottom:20px; font-family:var(--font-heading); color: var(--text-primary);">Profile Settings</h3>
        <form id="settingsForm" novalidate style="max-width:480px; display:flex; flex-direction:column; gap:16px;">
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label" for="settingsUsername">Username</label>
            <input type="text" id="settingsUsername" class="form-input" value="${user.username}" required minlength="3">
            <span class="form-error" id="settingsUsernameError" style="min-height:auto; margin-top:4px;"></span>
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label" for="settingsEmail">Email Address</label>
            <input type="email" id="settingsEmail" class="form-input" value="${user.email}" required>
            <span class="form-error" id="settingsEmailError" style="min-height:auto; margin-top:4px;"></span>
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label" for="settingsPassword">New Password (optional)</label>
            <input type="password" id="settingsPassword" class="form-input" placeholder="Leave blank to keep unchanged" minlength="6">
            <span class="form-error" id="settingsPasswordError" style="min-height:auto; margin-top:4px;"></span>
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label" for="settingsConfirmPassword">Confirm New Password</label>
            <input type="password" id="settingsConfirmPassword" class="form-input" placeholder="Leave blank to keep unchanged">
            <span class="form-error" id="settingsConfirmPasswordError" style="min-height:auto; margin-top:4px;"></span>
          </div>
          <button type="submit" class="btn btn-primary" style="align-self:flex-start; margin-top:10px;">Save Changes</button>
        </form>
      </div>`;

    document.getElementById('settingsForm').addEventListener('submit', function (e) {
      e.preventDefault();
      handleSettingsSave();
    });
  }

  function handleSettingsSave() {
    var user = Auth.getCurrentUser();
    var username = document.getElementById('settingsUsername').value.trim();
    var email = document.getElementById('settingsEmail').value.trim();
    var password = document.getElementById('settingsPassword').value;
    var confirmPassword = document.getElementById('settingsConfirmPassword').value;

    // Reset errors
    document.getElementById('settingsUsernameError').textContent = '';
    document.getElementById('settingsEmailError').textContent = '';
    document.getElementById('settingsPasswordError').textContent = '';
    document.getElementById('settingsConfirmPasswordError').textContent = '';

    var valid = true;

    if (!username || username.length < 3) {
      document.getElementById('settingsUsernameError').textContent = 'Username must be at least 3 characters';
      valid = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById('settingsEmailError').textContent = 'Please enter a valid email address';
      valid = false;
    }

    if (password) {
      if (password.length < 6) {
        document.getElementById('settingsPasswordError').textContent = 'Password must be at least 6 characters';
        valid = false;
      }
      if (password !== confirmPassword) {
        document.getElementById('settingsConfirmPasswordError').textContent = 'Passwords do not match';
        valid = false;
      }
    }

    if (!valid) return;

    // Check if email is already taken by another user
    var allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    var emailExists = allUsers.some(function(u) { return u.email === email.toLowerCase() && u.id !== user.id; });
    if (emailExists) {
      document.getElementById('settingsEmailError').textContent = 'Email address is already in use';
      return;
    }

    // Build updates
    var updates = {
      username: username,
      email: email.toLowerCase(),
      avatar: username[0].toUpperCase()
    };

    if (password) {
      updates.password = btoa(password); // Obfuscate as in auth.js
    }

    // Call Auth.updateUser
    var res = Auth.updateUser(updates);
    if (res.success) {
      // Sync reviews username
      var reviews = JSON.parse(localStorage.getItem('flavorvault_reviews') || '[]');
      var updatedCount = 0;
      reviews.forEach(function(r) {
        if (r.userId === user.id) {
          r.username = username;
          updatedCount++;
        }
      });
      if (updatedCount > 0) {
        localStorage.setItem('flavorvault_reviews', JSON.stringify(reviews));
      }

      Utils.showToast('Profile updated successfully!', 'success');
      
      // Refresh dashboard header & settings page
      var updatedUser = Auth.getCurrentUser();
      renderDashboardHeader(updatedUser);
      renderSettings();
    } else {
      Utils.showToast(res.message, 'error');
    }
  }

  function generateStarsHTML(rating) {
    var html = '';
    for (var i = 1; i <= 5; i++) {
      html += '<span class="star ' + (i <= Math.round(rating) ? 'filled' : '') + '">★</span>';
    }
    return html;
  }

  // ── Global edit / delete functions (on window for inline onclick) ──

  window.editReview = function(reviewId) {
    var review = Utils.getReviews().find(function(r) { return r.id === reviewId; });
    if (!review) return;
    var editRating = review.rating;

    Utils.showModal({
      title: 'Edit Review',
      content: `
        <div class="star-select-area" id="editStarSelect">
          ${[1,2,3,4,5].map(function(i) {
            return '<span class="star-select ' + (i <= review.rating ? 'active selected' : '') + '" data-value="' + i + '">★</span>';
          }).join('')}
        </div>
        <textarea class="review-textarea" id="editReviewText">${review.text}</textarea>`,
      actions: [
        { text: 'Cancel', className: 'btn btn-secondary', onClick: function() { Utils.hideModal(); } },
        { text: 'Save Changes', className: 'btn btn-primary', onClick: function() {
          var newText = document.getElementById('editReviewText').value.trim();
          if (!newText || newText.length < 10) {
            Utils.showToast('Review must be at least 10 characters', 'warning');
            return;
          }
          Utils.updateReview(reviewId, { text: newText, rating: editRating });
          Utils.hideModal();
          Utils.showToast('Review updated!', 'success');
          var user = Auth.getCurrentUser();
          renderDashboardHeader(user);
          renderContent();
        }}
      ]
    });

    // Setup edit star selection after modal renders
    setTimeout(function() {
      var editStars = document.querySelectorAll('#editStarSelect .star-select');
      editStars.forEach(function(star) {
        star.addEventListener('mouseenter', function() {
          var val = parseInt(this.dataset.value);
          editStars.forEach(function(s) {
            var sv = parseInt(s.dataset.value);
            s.classList.toggle('active', sv <= val);
            s.style.color = sv <= val ? 'var(--star-filled)' : 'var(--star-empty)';
          });
        });
        star.addEventListener('click', function() {
          editRating = parseInt(this.dataset.value);
          editStars.forEach(function(s) {
            var sv = parseInt(s.dataset.value);
            s.classList.toggle('selected', sv <= editRating);
            s.classList.toggle('active', sv <= editRating);
            s.style.color = sv <= editRating ? 'var(--star-filled)' : 'var(--star-empty)';
          });
        });
      });
      var selectArea = document.getElementById('editStarSelect');
      if (selectArea) {
        selectArea.addEventListener('mouseleave', function() {
          editStars.forEach(function(s) {
            var sv = parseInt(s.dataset.value);
            s.style.color = sv <= editRating ? 'var(--star-filled)' : 'var(--star-empty)';
          });
        });
      }
    }, 100);
  };

  window.deleteReview = function(reviewId) {
    Utils.showModal({
      title: 'Delete Review',
      content: '<p style="color:var(--text-secondary);">Are you sure you want to delete this review? This action cannot be undone.</p>',
      actions: [
        { text: 'Cancel', className: 'btn btn-secondary', onClick: function() { Utils.hideModal(); } },
        { text: 'Delete', className: 'btn btn-danger', onClick: function() {
          Utils.deleteReview(reviewId);
          Utils.hideModal();
          Utils.showToast('Review deleted', 'success');
          var user = Auth.getCurrentUser();
          renderDashboardHeader(user);
          renderContent();
        }}
      ]
    });
  };

  // ── Bootstrap ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
