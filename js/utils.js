/**
 * FlavorVault — Shared Utilities Module
 * Provides: toasts, modals, review CRUD, rating helpers,
 *           theme toggle, navbar, page animations.
 * Exposes: window.Utils
 */

window.Utils = {

  // ─── ID Generation ────────────────────────────────────────────────
  generateId: function () {
    return 'id_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
  },

  // ─── Date Formatting ──────────────────────────────────────────────
  formatDate: function (dateString) {
    if (!dateString) return '';
    try {
      var date = new Date(dateString);
      var now = new Date();

      // Today?
      if (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate()
      ) {
        return 'Today';
      }

      // Yesterday?
      var yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      if (
        date.getFullYear() === yesterday.getFullYear() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getDate() === yesterday.getDate()
      ) {
        return 'Yesterday';
      }

      // Otherwise: Jun 7, 2026
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    } catch (e) {
      return dateString;
    }
  },

  // ─── Debounce ─────────────────────────────────────────────────────
  debounce: function (fn, delay) {
    var timer;
    delay = delay || 300;
    return function () {
      var context = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  },

  // ─── Toast Notifications ──────────────────────────────────────────
  showToast: function (message, type, duration) {
    type = type || 'info';
    duration = duration || 3000;

    var container = document.getElementById('toastContainer');
    if (!container) return;

    var iconMap = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.innerHTML =
      '<span class="toast-icon">' + (iconMap[type] || 'ℹ') + '</span>' +
      '<span class="toast-message">' + message + '</span>' +
      '<button class="toast-close" aria-label="Close">&times;</button>';

    container.appendChild(toast);

    // Trigger entrance animation
    requestAnimationFrame(function () {
      toast.classList.add('toast-enter');
    });

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', function () {
      removeToast(toast);
    });

    // Auto-remove
    var timeout = setTimeout(function () {
      removeToast(toast);
    }, duration);

    function removeToast(el) {
      clearTimeout(timeout);
      el.classList.add('toast-exit');
      el.addEventListener('animationend', function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      });
    }
  },

  // ─── Modal ────────────────────────────────────────────────────────
  showModal: function (options) {
    var overlay = document.getElementById('modalOverlay');
    var content = document.getElementById('modalContent');
    if (!overlay || !content) return;

    var title = options.title || '';
    var body = options.content || '';
    var actions = options.actions || [];

    var html =
      '<div class="modal-header">' +
      '  <h3 class="modal-title">' + title + '</h3>' +
      '  <button class="modal-close-btn" id="modalCloseBtn" aria-label="Close">&times;</button>' +
      '</div>' +
      '<div class="modal-body">' + body + '</div>' +
      '<div class="modal-actions" id="modalActions"></div>';

    content.innerHTML = html;

    // Render action buttons
    var actionsContainer = document.getElementById('modalActions');
    actions.forEach(function (action) {
      var btn = document.createElement('button');
      btn.className = action.className || 'btn btn-secondary';
      btn.textContent = action.text || 'OK';
      if (typeof action.onClick === 'function') {
        btn.addEventListener('click', action.onClick);
      }
      actionsContainer.appendChild(btn);
    });

    // Show overlay
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Close handlers
    document.getElementById('modalCloseBtn').addEventListener('click', function () {
      Utils.hideModal();
      if (typeof options.onClose === 'function') options.onClose();
    });

    overlay.addEventListener('click', function handler(e) {
      if (e.target === overlay) {
        Utils.hideModal();
        if (typeof options.onClose === 'function') options.onClose();
        overlay.removeEventListener('click', handler);
      }
    });
  },

  hideModal: function () {
    var overlay = document.getElementById('modalOverlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  // ─── Star Rating HTML ─────────────────────────────────────────────
  renderStars: function (rating, options) {
    options = options || {};
    var interactive = options.interactive || false;
    var size = options.size || 'md';
    var containerId = options.containerId || '';

    var cls = 'star-rating star-' + size;
    if (interactive) cls += ' interactive';

    var html = '<div class="' + cls + '"' + (containerId ? ' id="' + containerId + '"' : '') + '>';
    for (var i = 1; i <= 5; i++) {
      var filled = i <= Math.round(rating) ? ' filled' : '';
      if (interactive) {
        html += '<button class="star' + filled + '" data-value="' + i + '">★</button>';
      } else {
        html += '<span class="star' + filled + '">★</span>';
      }
    }
    html += '</div>';
    return html;
  },

  // ─── Reviews CRUD (localStorage) ─────────────────────────────────
  _REVIEWS_KEY: 'flavorvault_reviews',

  getReviews: function (restaurantId) {
    try {
      var reviews = JSON.parse(localStorage.getItem(this._REVIEWS_KEY) || '[]');
      if (restaurantId !== undefined && restaurantId !== null) {
        var rid = parseInt(restaurantId);
        return reviews.filter(function (r) { return r.restaurantId === rid; });
      }
      return reviews;
    } catch (e) {
      console.error('Utils.getReviews error:', e);
      return [];
    }
  },

  saveReview: function (review) {
    try {
      var reviews = this.getReviews();
      var newReview = {
        id: this.generateId(),
        restaurantId: review.restaurantId,
        userId: review.userId,
        username: review.username,
        rating: review.rating,
        text: review.text,
        date: new Date().toISOString(),
        edited: false
      };
      reviews.push(newReview);
      localStorage.setItem(this._REVIEWS_KEY, JSON.stringify(reviews));
      return newReview;
    } catch (e) {
      console.error('Utils.saveReview error:', e);
      return null;
    }
  },

  updateReview: function (reviewId, updates) {
    try {
      var reviews = this.getReviews();
      var index = reviews.findIndex(function (r) { return r.id === reviewId; });
      if (index === -1) return null;

      reviews[index] = Object.assign({}, reviews[index], updates, { edited: true });
      localStorage.setItem(this._REVIEWS_KEY, JSON.stringify(reviews));
      return reviews[index];
    } catch (e) {
      console.error('Utils.updateReview error:', e);
      return null;
    }
  },

  deleteReview: function (reviewId) {
    try {
      var reviews = this.getReviews();
      reviews = reviews.filter(function (r) { return r.id !== reviewId; });
      localStorage.setItem(this._REVIEWS_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.error('Utils.deleteReview error:', e);
    }
  },

  // ─── Rating Calculations ──────────────────────────────────────────
  getAverageRating: function (restaurantId) {
    var reviews = this.getReviews(restaurantId);
    if (reviews.length === 0) return 0;
    var sum = reviews.reduce(function (acc, r) { return acc + r.rating; }, 0);
    return parseFloat((sum / reviews.length).toFixed(1));
  },

  getReviewCount: function (restaurantId) {
    return this.getReviews(restaurantId).length;
  },

  getRatingDistribution: function (restaurantId) {
    var dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    var reviews = this.getReviews(restaurantId);
    reviews.forEach(function (r) {
      if (dist.hasOwnProperty(r.rating)) {
        dist[r.rating]++;
      }
    });
    return dist;
  },

  // ─── Theme Toggle ─────────────────────────────────────────────────
  initThemeToggle: function () {
    // Apply stored theme
    var storedTheme = localStorage.getItem('flavorvault_theme') || 'dark';
    if (storedTheme === 'light') {
      document.body.classList.add('light-mode');
    }

    var toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    // Set initial icon
    var icon = toggleBtn.querySelector('.theme-icon');
    if (icon) {
      icon.textContent = storedTheme === 'light' ? '☀️' : '🌙';
    }

    toggleBtn.addEventListener('click', function () {
      var isLight = document.body.classList.toggle('light-mode');
      localStorage.setItem('flavorvault_theme', isLight ? 'light' : 'dark');
      var ic = toggleBtn.querySelector('.theme-icon');
      if (ic) ic.textContent = isLight ? '☀️' : '🌙';
    });
  },

  // ─── Navbar ───────────────────────────────────────────────────────
  initNavbar: function () {
    var navbar = document.getElementById('navbar');
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');
    var navUser = document.getElementById('navUser');

    // Scroll effect: add .scrolled class
    if (navbar) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
      // Trigger on load in case already scrolled
      if (window.scrollY > 50) navbar.classList.add('scrolled');
    }

    // Mobile hamburger toggle
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
      });
    }

    // User dropdown in nav
    if (navUser) {
      if (Auth.isAuthenticated()) {
        var user = Auth.getCurrentUser();
        var initial = (user.username || user.name || 'U').charAt(0).toUpperCase();
        navUser.innerHTML =
          '<div class="user-avatar" id="userAvatarBtn" title="' + (user.username || user.name || 'User') + '">' + initial + '</div>' +
          '<div class="user-dropdown" id="userDropdown">' +
          '  <a href="dashboard.html">📊 Dashboard</a>' +
          '  <a href="#" id="navLogoutBtn">🚪 Logout</a>' +
          '</div>';

        // Toggle dropdown
        var avatarBtn = document.getElementById('userAvatarBtn');
        var dropdown = document.getElementById('userDropdown');
        if (avatarBtn && dropdown) {
          avatarBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            dropdown.classList.toggle('active');
          });

          // Close on outside click
          document.addEventListener('click', function (e) {
            if (!navUser.contains(e.target)) {
              dropdown.classList.remove('active');
            }
          });
        }

        // Logout
        var logoutBtn = document.getElementById('navLogoutBtn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            Auth.logout();
          });
        }
      } else {
        navUser.innerHTML =
          '<a href="login.html" class="btn btn-secondary btn-sm">Log In</a>' +
          '<a href="signup.html" class="btn btn-primary btn-sm">Sign Up</a>';
      }
    }
  },

  // ─── Page Animations ──────────────────────────────────────────────
  initPageAnimations: function () {
    // Add loaded class to body after brief delay for entrance animation
    setTimeout(function () {
      document.body.classList.add('loaded');
    }, 50);

    // Intersection Observer for scroll-triggered animations
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
        observer.observe(el);
      });
    }
  }
};
