/**
 * FlavorVault — Home Page Logic
 * Runs after data.js, auth.js, and utils.js are loaded.
 */
(function () {
  'use strict';

  // ── State ──────────────────────────────────────────────────────────
  let currentFilter = 'All';
  let searchQuery = '';
  let scrollObserver;

  // ── Initialization ─────────────────────────────────────────────────
  function init() {
    Utils.initThemeToggle();
    Utils.initNavbar();
    Utils.initPageAnimations();
    renderFilterButtons();
    renderRestaurants();
    renderFeatured();
    updateStats();
    setupSearch();
    // Scroll effects are set up after cards are rendered
    setupScrollEffects();
  }

  // ── Filter Buttons ─────────────────────────────────────────────────
  function renderFilterButtons() {
    var filterBar = document.getElementById('filterBar');
    if (!filterBar) return;

    var cuisines = RestaurantData.getAllCuisines();

    var emojiMap = {
      'Indian': '🍛',
      'Japanese': '🍣',
      'Italian': '🍕',
      'American': '🍔',
      'Mexican': '🌮',
      'Chinese': '🥡',
      'French': '🥐',
      'South Indian': '🫓',
      'BBQ & Grill': '🥩',
      'Desserts & Café': '🍰',
      'Mediterranean': '🥙',
      'Thai': '🍜'
    };

    var html = '<button class="filter-btn active" data-cuisine="All">🍴 All</button>';
    cuisines.forEach(function (cuisine) {
      var emoji = emojiMap[cuisine] || '🍽️';
      html += '<button class="filter-btn" data-cuisine="' + cuisine + '">' + emoji + ' ' + cuisine + '</button>';
    });

    filterBar.innerHTML = html;

    // Delegated click handler
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;

      filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      currentFilter = btn.dataset.cuisine;
      renderRestaurants();
      setupScrollEffects(); // re-observe new cards
    });
  }

  // ── Restaurant Cards ───────────────────────────────────────────────
  function renderRestaurants() {
    var grid = document.getElementById('restaurantsGrid');
    var emptyState = document.getElementById('emptyState');
    if (!grid) return;

    var restaurants =
      currentFilter === 'All'
        ? RestaurantData.restaurants
        : RestaurantData.filterByCuisine(currentFilter);

    if (searchQuery) {
      var q = searchQuery;
      restaurants = restaurants.filter(function (r) {
        return (
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some(function (t) {
            return t.toLowerCase().includes(q);
          })
        );
      });
    }

    if (restaurants.length === 0) {
      grid.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    grid.style.display = '';
    if (emptyState) emptyState.style.display = 'none';

    grid.innerHTML = restaurants
      .map(function (r, index) {
        var avgRating = Utils.getAverageRating(r.id);
        var reviewCount = Utils.getReviewCount(r.id);

        return (
          '<div class="restaurant-card animate-on-scroll" style="animation-delay: ' +
          index * 0.05 +
          's" onclick="window.location.href=\'restaurant.html?id=' +
          r.id +
          '\'">' +
          '  <div class="card-image" style="background: ' +
          r.image +
          '">' +
          '    <div class="card-image-emoji">' +
          r.emoji +
          '</div>' +
          (r.featured ? '    <span class="card-badge">⭐ Featured</span>' : '') +
          '  </div>' +
          '  <div class="card-content">' +
          '    <div class="card-header">' +
          '      <h3 class="card-name">' +
          r.name +
          '</h3>' +
          '      <span class="card-cuisine">' +
          r.cuisine +
          '</span>' +
          '    </div>' +
          '    <p class="card-desc">' +
          r.description +
          '</p>' +
          '    <div class="card-contact" style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; gap: 6px; border-bottom: 1px dashed var(--border-glass); padding-bottom: 8px;">' +
          '      <span>📞 ' + r.phone + '</span>' +
          '      <span>📍 ' + r.address.split(',')[1].trim() + '</span>' +
          '    </div>' +
          '    <div class="card-footer">' +
          '      <div class="card-rating">' +
          '        <span class="card-rating-star">★</span>' +
          '        <span class="card-rating-value">' +
          (avgRating > 0 ? avgRating.toFixed(1) : 'New') +
          '</span>' +
          '        <span class="card-rating-count">' +
          (reviewCount > 0 ? '(' + reviewCount + ')' : '') +
          '</span>' +
          '      </div>' +
          '      <span class="card-price" style="font-size: 0.85rem; color: var(--text-primary); font-weight: 600;">' +
          '₹' + r.costForTwo + ' for two' +
          '</span>' +
          '    </div>' +
          '  </div>' +
          '</div>'
        );
      })
      .join('');

    // Re-observe new cards for scroll animation
    setupScrollEffects();
  }

  // ── Featured Restaurants ───────────────────────────────────────────
  function renderFeatured() {
    var grid = document.getElementById('featuredGrid');
    if (!grid) return;

    var featured = RestaurantData.getFeatured();

    if (!featured || featured.length === 0) {
      var section = document.getElementById('featuredSection');
      if (section) section.style.display = 'none';
      return;
    }

    grid.innerHTML = featured
      .map(function (r) {
        var avgRating = Utils.getAverageRating(r.id);
        return (
          '<div class="featured-card" onclick="window.location.href=\'restaurant.html?id=' +
          r.id +
          '\'">' +
          '  <div class="featured-image" style="background: ' +
          r.image +
          '">' +
          '    <div class="featured-emoji">' +
          r.emoji +
          '</div>' +
          '  </div>' +
          '  <div class="featured-info">' +
          '    <h3 class="featured-name">' +
          r.name +
          '</h3>' +
          '    <span class="featured-cuisine">' +
          r.cuisine +
          '</span>' +
          '    <div class="featured-rating">' +
          '      <span>★</span> ' +
          (avgRating > 0 ? avgRating.toFixed(1) : 'New') +
          '    </div>' +
          '  </div>' +
          '</div>'
        );
      })
      .join('');
  }

  // ── Hero Stats ─────────────────────────────────────────────────────
  function updateStats() {
    var totalRestEl = document.getElementById('totalRestaurants');
    var totalRevEl = document.getElementById('totalReviews');
    var totalCuiEl = document.getElementById('totalCuisines');

    if (totalRestEl) {
      totalRestEl.textContent = RestaurantData.restaurants.length;
    }

    if (totalRevEl) {
      // Count all reviews across all restaurants from localStorage
      var totalReviews = 0;
      try {
        var reviews = JSON.parse(localStorage.getItem('flavorvault_reviews') || '[]');
        totalReviews = reviews.length;
      } catch (e) {
        totalReviews = 0;
      }
      totalRevEl.textContent = totalReviews;
    }

    if (totalCuiEl) {
      totalCuiEl.textContent = RestaurantData.getAllCuisines().length;
    }
  }

  // ── Search ─────────────────────────────────────────────────────────
  function setupSearch() {
    var searchInput = document.getElementById('heroSearch');
    if (!searchInput) return;

    searchInput.addEventListener(
      'input',
      Utils.debounce(function (e) {
        searchQuery = e.target.value.toLowerCase().trim();
        renderRestaurants();
      }, 300)
    );
  }

  // ── Scroll Animations ─────────────────────────────────────────────
  function setupScrollEffects() {
    if (!scrollObserver) {
      scrollObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-slideUp');
              scrollObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
    } else {
      scrollObserver.disconnect();
    }

    document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
      scrollObserver.observe(el);
    });
  }

  // ── Boot ───────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
