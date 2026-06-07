(function() {
  'use strict';

  // Get restaurant ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const restaurantId = parseInt(urlParams.get('id'));

  let currentSort = 'newest';
  let currentFilterRating = 0; // 0 means all
  let selectedRating = 0;

  function init() {
    Utils.initThemeToggle();
    Utils.initNavbar();

    const restaurant = RestaurantData.getById(restaurantId);
    if (!restaurant) {
      // Show not found state beautifully
      const heroEl = document.getElementById('detailHero');
      if (heroEl) {
        heroEl.style.minHeight = '60vh';
        heroEl.style.display = 'flex';
        heroEl.style.alignItems = 'center';
        heroEl.style.justifyContent = 'center';
        heroEl.innerHTML = `
          <div class="container" style="text-align:center;padding:60px 20px;">
            <div class="empty-icon" style="font-size: 4rem; margin-bottom: 20px;">🍽️</div>
            <h2 class="empty-title" style="font-size: 2rem; margin-bottom: 10px; font-family: var(--font-heading);">Restaurant Not Found</h2>
            <p class="empty-text" style="color: var(--text-secondary); margin-bottom: 24px;">The restaurant you're looking for doesn't exist or has been removed.</p>
            <a href="index.html" class="btn btn-primary">Back to Home</a>
          </div>`;
      }
      const contentEl = document.querySelector('.detail-content');
      if (contentEl) contentEl.style.display = 'none';
      return;
    }

    document.title = `${restaurant.name} | FlavorVault`;
    renderHero(restaurant);
    renderSidebar(restaurant);
    renderMainContent(restaurant);
    renderReviews(restaurant);
  }

  function renderHero(restaurant) {
    const avgRating = Utils.getAverageRating(restaurant.id);
    const reviewCount = Utils.getReviewCount(restaurant.id);

    document.getElementById('detailHero').innerHTML = `
      <div class="detail-hero-bg" style="background: ${restaurant.image}"></div>
      <div class="detail-hero-overlay"></div>
      <div class="detail-hero-content container">
        <a href="index.html" class="back-link">← Back to restaurants</a>
        <div class="detail-hero-emoji">${restaurant.emoji}</div>
        <h1 class="detail-hero-title">${restaurant.name}</h1>
        <div class="detail-hero-meta">
          <span class="detail-hero-cuisine">${restaurant.cuisine}</span>
          <span class="detail-hero-separator">•</span>
          <span class="detail-hero-price">Average Cost: ₹${restaurant.costForTwo} for two</span>
          <span class="detail-hero-separator">•</span>
          <span class="detail-hero-rating">★ ${avgRating > 0 ? avgRating.toFixed(1) : 'No ratings yet'}</span>
          <span class="detail-hero-separator">•</span>
          <span class="detail-hero-reviews">${reviewCount} review${reviewCount !== 1 ? 's' : ''}</span>
        </div>
      </div>`;
  }

  function renderSidebar(restaurant) {
    const avgRating = Utils.getAverageRating(restaurant.id);
    const reviewCount = Utils.getReviewCount(restaurant.id);
    const dist = Utils.getRatingDistribution(restaurant.id);

    // Map facilities to icons
    const facilityIcons = {
      'AC': '❄️',
      'Parking': '🚗',
      'Family Dining': '👨‍👩‍👧‍👦',
      'Outdoor Seating': '🌳',
      'Home Delivery': '🛵',
      'Wifi': '📶',
      'Bar': '🍺',
      'Live Music': '🎵',
      'Valet Parking': '🔑'
    };

    document.getElementById('detailSidebar').innerHTML = `
      <!-- Restaurant Info Card -->
      <div class="detail-info-card">
        <h3 style="margin-bottom:16px;font-family:var(--font-heading);">Restaurant Info</h3>
        <div class="info-row">
          <span class="info-icon">📍</span>
          <div><div class="info-label">Address</div><div class="info-value">${restaurant.address}</div></div>
        </div>
        <div class="info-row">
          <span class="info-icon">📞</span>
          <div><div class="info-label">Phone</div><div class="info-value">${restaurant.phone}</div></div>
        </div>
        <div class="info-row">
          <span class="info-icon">🕒</span>
          <div><div class="info-label">Hours</div><div class="info-value">${restaurant.hours}</div></div>
        </div>
        <div class="info-row">
          <span class="info-icon">💵</span>
          <div><div class="info-label">Average Cost</div><div class="info-value">₹${restaurant.costForTwo} for two</div></div>
        </div>
        <div class="info-row">
          <span class="info-icon">🛵</span>
          <div><div class="info-label">Delivery Estimate</div><div class="info-value">${restaurant.deliveryTime} mins</div></div>
        </div>
        <div class="info-row" style="border:none;">
          <span class="info-icon">🏷️</span>
          <div>
            <div class="info-label">Tags</div>
            <div class="info-value" style="display:flex; flex-wrap:wrap; gap:4px; margin-top:4px;">
              ${restaurant.tags.map(t => `<span class="badge badge-cuisine" style="margin:0;">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Facilities Card -->
      <div class="detail-info-card" style="margin-top:20px;">
        <h3 style="margin-bottom:16px;font-family:var(--font-heading);">Facilities</h3>
        <div class="facilities-list" style="display:flex; flex-wrap:wrap; gap:8px;">
          ${restaurant.facilities.map(f => `
            <span class="badge badge-cuisine" style="display:flex; align-items:center; gap:6px; font-size:0.8rem; padding:6px 12px; background:var(--bg-glass); border:1px solid var(--border-glass); margin:0;">
              <span>${facilityIcons[f] || '✅'}</span>
              <span>${f}</span>
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Location Map Placeholder Card -->
      <div class="detail-info-card" style="margin-top:20px;">
        <h3 style="margin-bottom:12px;font-family:var(--font-heading);">Location Map</h3>
        <div class="map-placeholder" style="height:180px; width:100%; background:var(--bg-tertiary); border:1px solid var(--border-glass); border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; overflow:hidden; position:relative;">
          <div style="position:absolute; inset:0; opacity:0.15; background-image: radial-gradient(circle, var(--text-secondary) 1px, transparent 1px); background-size: 20px 20px;"></div>
          <div style="font-size:2rem; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3)); z-index:1; animation: float 3s ease-in-out infinite;">📍</div>
          <span style="font-size:0.8rem; color:var(--text-secondary); z-index:1; font-weight:500;">Map location for ${restaurant.name}</span>
          <span style="font-size:0.7rem; color:var(--text-muted); z-index:1;">${restaurant.address.split(',')[1].trim()}, Chennai</span>
        </div>
      </div>

      <!-- Rating Breakdown -->
      <div class="detail-info-card" style="margin-top:20px;">
        <h3 style="margin-bottom:16px;font-family:var(--font-heading);">Rating Breakdown</h3>
        <div class="rating-overview">
          <div class="rating-big-number">${avgRating > 0 ? avgRating.toFixed(1) : '—'}</div>
          <div class="rating-overview-right">
            <div class="rating-stars-display">${generateStarsHTML(avgRating)}</div>
            <div class="rating-total-text">${reviewCount} total review${reviewCount !== 1 ? 's' : ''}</div>
          </div>
        </div>
        <div class="rating-bars">
          ${[5,4,3,2,1].map(star => {
            const count = dist[star] || 0;
            const pct = reviewCount > 0 ? (count / reviewCount * 100) : 0;
            return `
              <div class="rating-bar-row" data-filter-rating="${star}" style="cursor:pointer;" title="Filter by ${star} star${star > 1 ? 's' : ''}">
                <span class="rating-bar-label">${star}★</span>
                <div class="rating-bar"><div class="rating-bar-fill" style="width:${pct}%"></div></div>
                <span class="rating-bar-count">${count}</span>
              </div>`;
          }).join('')}
        </div>
      </div>`;

    // Click on rating bars to filter reviews
    document.querySelectorAll('.rating-bar-row').forEach(row => {
      row.addEventListener('click', function() {
        const rating = parseInt(this.dataset.filterRating);
        currentFilterRating = currentFilterRating === rating ? 0 : rating;
        document.querySelectorAll('.rating-bar-row').forEach(r => r.classList.remove('active'));
        if (currentFilterRating > 0) this.classList.add('active');
        renderReviews(restaurant);
      });
    });
  }

  function generateStarsHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += `<span class="star ${i <= Math.round(rating) ? 'filled' : ''}">★</span>`;
    }
    return html;
  }

  function renderMainContent(restaurant) {
    const mainEl = document.getElementById('detailMain');
    if (!mainEl) return;

    // ─── 1. Menu Section Card ───
    const menuHTML = `
      <div class="detail-info-card menu-section" style="margin-bottom: 24px;">
        <h3 style="margin-bottom:16px; font-family:var(--font-heading); display:flex; align-items:center; gap:8px;">
          📖 Menu Card
        </h3>
        <div class="menu-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap:16px;">
          ${restaurant.menu.map(dish => `
            <div class="menu-item-card" style="background:var(--bg-card); border:1px solid var(--border-glass); border-radius:12px; padding:16px; display:flex; flex-direction:column; justify-content:space-between; transition:var(--transition-fast);">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:6px;">
                  <span style="font-weight:600; color:var(--text-primary); font-size:0.95rem;">${dish.name}</span>
                  <span style="font-weight:700; color:var(--primary); font-size:0.95rem; white-space:nowrap;">₹${dish.price}</span>
                </div>
                <p style="font-size:0.8rem; color:var(--text-secondary); line-height:1.4; margin-bottom:10px;">${dish.description}</p>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <span class="badge" style="font-size:0.7rem; padding:2px 8px; ${dish.type === 'Non-Veg' ? 'background:rgba(239, 68, 68, 0.15); color:#ef4444; border:1px solid rgba(239, 68, 68, 0.3);' : 'background:rgba(16, 185, 129, 0.15); color:#10b981; border:1px solid rgba(16, 185, 129, 0.3);'}">
                  ${dish.type === 'Non-Veg' ? '🔴 Non-Veg' : '🟢 Veg'}
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>`;

    // ─── 2. Write Review Card ───
    const user = Auth.getCurrentUser();
    let formHTML = '';

    if (!user) {
      formHTML = `
        <div class="write-review-card" style="margin-bottom: 24px;">
          <h3>Write a Review</h3>
          <p style="color:var(--text-secondary);margin:12px 0;">You need to be logged in to write a review.</p>
          <a href="login.html" class="btn btn-primary">Login to Review</a>
        </div>`;
    } else {
      const existingReview = Utils.getReviews(restaurant.id).find(r => r.userId === user.id);

      if (existingReview) {
        formHTML = `
          <div class="write-review-card" style="margin-bottom: 24px;">
            <h3>Your Review</h3>
            <p style="color:var(--text-secondary);margin:8px 0;">You've already reviewed this restaurant. You can edit or delete your review below.</p>
          </div>`;
      } else {
        formHTML = `
          <div class="write-review-card" style="margin-bottom: 24px;">
            <h3>Write a Review</h3>
            <div class="star-select-area" id="starSelect">
              ${[1,2,3,4,5].map(i => `<span class="star-select" data-value="${i}" title="${i} star${i > 1 ? 's' : ''}">★</span>`).join('')}
            </div>
            <textarea class="review-textarea" id="reviewText" placeholder="Share your experience at ${restaurant.name}..."></textarea>
            <button class="btn btn-primary" id="submitReview" style="margin-top:12px;">Submit Review</button>
          </div>`;
      }
    }

    // Assemble them in mainEl
    mainEl.innerHTML = menuHTML + formHTML + `<div class="reviews-section" id="reviewsList"></div>`;

    // Initialize logic if user can review
    if (user && !Utils.getReviews(restaurant.id).find(r => r.userId === user.id)) {
      setupStarSelect();
      setupSubmit(restaurant);
    }
  }

  function setupStarSelect() {
    const stars = document.querySelectorAll('#starSelect .star-select');
    if (!stars.length) return;

    stars.forEach(star => {
      star.addEventListener('mouseenter', function() {
        const val = parseInt(this.dataset.value);
        stars.forEach(s => {
          s.classList.toggle('active', parseInt(s.dataset.value) <= val);
        });
      });
      star.addEventListener('click', function() {
        selectedRating = parseInt(this.dataset.value);
        stars.forEach(s => {
          s.classList.toggle('selected', parseInt(s.dataset.value) <= selectedRating);
          s.classList.toggle('active', parseInt(s.dataset.value) <= selectedRating);
        });
      });
    });

    const starSelectArea = document.getElementById('starSelect');
    if (starSelectArea) {
      starSelectArea.addEventListener('mouseleave', function() {
        stars.forEach(s => {
          s.classList.toggle('active', parseInt(s.dataset.value) <= selectedRating);
        });
      });
    }
  }

  function setupSubmit(restaurant) {
    const submitBtn = document.getElementById('submitReview');
    if (!submitBtn) return;

    submitBtn.addEventListener('click', function() {
      const user = Auth.getCurrentUser();
      if (!user) { Utils.showToast('Please login first', 'error'); return; }
      if (selectedRating === 0) { Utils.showToast('Please select a rating', 'warning'); return; }

      const text = document.getElementById('reviewText').value.trim();
      if (!text) { Utils.showToast('Please write a review', 'warning'); return; }
      if (text.length < 10) { Utils.showToast('Review must be at least 10 characters', 'warning'); return; }

      Utils.saveReview({
        restaurantId: restaurant.id,
        userId: user.id,
        username: user.username,
        rating: selectedRating,
        text: text
      });

      Utils.showToast('Review submitted successfully!', 'success');
      selectedRating = 0;

      // Refresh all sections
      renderHero(restaurant);
      renderSidebar(restaurant);
      renderMainContent(restaurant);
      renderReviews(restaurant);
    });
  }

  function renderReviews(restaurant) {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;

    let reviews = Utils.getReviews(restaurant.id);
    const user = Auth.getCurrentUser();

    // Filter by rating
    if (currentFilterRating > 0) {
      reviews = reviews.filter(r => r.rating === currentFilterRating);
    }

    // Sort
    switch (currentSort) {
      case 'newest': reviews.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
      case 'oldest': reviews.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
      case 'highest': reviews.sort((a, b) => b.rating - a.rating); break;
      case 'lowest': reviews.sort((a, b) => a.rating - b.rating); break;
    }

    if (reviews.length === 0) {
      reviewsList.innerHTML = `
        <div class="reviews-header">
          <h3 class="section-title">Reviews</h3>
        </div>
        <div class="empty-state">
          <div class="empty-icon">💬</div>
          <h3 class="empty-title">${currentFilterRating > 0 ? 'No ' + currentFilterRating + '-star reviews' : 'No reviews yet'}</h3>
          <p class="empty-text">${currentFilterRating > 0 ? 'Try a different filter' : 'Be the first to review this restaurant!'}</p>
        </div>`;
      return;
    }

    reviewsList.innerHTML = `
      <div class="reviews-header">
        <h3 class="section-title">Reviews (${reviews.length})</h3>
        <div class="reviews-controls">
          <select class="sort-select" id="sortSelect">
            <option value="newest" ${currentSort === 'newest' ? 'selected' : ''}>Newest First</option>
            <option value="oldest" ${currentSort === 'oldest' ? 'selected' : ''}>Oldest First</option>
            <option value="highest" ${currentSort === 'highest' ? 'selected' : ''}>Highest Rating</option>
            <option value="lowest" ${currentSort === 'lowest' ? 'selected' : ''}>Lowest Rating</option>
          </select>
        </div>
      </div>
      ${reviews.map(review => {
        const username = review.username || 'Anonymous';
        return `
          <div class="review-card animate-fadeIn">
            <div class="review-header">
              <div class="review-user">
                <div class="review-avatar">${username[0].toUpperCase()}</div>
                <div class="review-user-info">
                  <span class="review-username">${username}</span>
                  <span class="review-date">${Utils.formatDate(review.date)}${review.edited ? ' (edited)' : ''}</span>
                </div>
              </div>
              <div class="review-stars">${generateStarsHTML(review.rating)}</div>
            </div>
            <div class="review-body">${review.text}</div>
            ${user && user.id === review.userId ? `
              <div class="review-actions">
                <button class="btn btn-secondary btn-sm" onclick="editReview('${review.id}')">✏️ Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteReview('${review.id}')">🗑️ Delete</button>
              </div>` : ''}
          </div>
        `;
      }).join('')}`;

    // Sort change handler
    document.getElementById('sortSelect').addEventListener('change', function() {
      currentSort = this.value;
      renderReviews(restaurant);
    });
  }

  // ── Global edit / delete (need to be on window for inline onclick) ──

  window.editReview = function(reviewId) {
    const review = Utils.getReviews().find(r => r.id === reviewId);
    if (!review) return;

    let editRating = review.rating;

    Utils.showModal({
      title: 'Edit Review',
      content: `
        <div class="star-select-area" id="editStarSelect">
          ${[1,2,3,4,5].map(i => `<span class="star-select ${i <= review.rating ? 'active selected' : ''}" data-value="${i}">★</span>`).join('')}
        </div>
        <textarea class="review-textarea" id="editReviewText" style="width:100%;min-height:120px;margin-top:12px;padding:12px;border-radius:8px;border:1px solid var(--border-glass);background:var(--bg-card);color:var(--text-primary);font-family:inherit;">${review.text}</textarea>`,
      actions: [
        { text: 'Cancel', className: 'btn btn-secondary', onClick: function() { Utils.hideModal(); } },
        { text: 'Save Changes', className: 'btn btn-primary', onClick: function() {
          const newText = document.getElementById('editReviewText').value.trim();
          if (!newText || newText.length < 10) {
            Utils.showToast('Review must be at least 10 characters', 'warning');
            return;
          }
          Utils.updateReview(reviewId, { text: newText, rating: editRating });
          Utils.hideModal();
          Utils.showToast('Review updated!', 'success');
          const restaurant = RestaurantData.getById(restaurantId);
          renderHero(restaurant);
          renderSidebar(restaurant);
          renderMainContent(restaurant);
          renderReviews(restaurant);
        }}
      ]
    });

    // Setup edit star selection after modal renders
    setTimeout(function() {
      const editStars = document.querySelectorAll('#editStarSelect .star-select');
      editStars.forEach(function(star) {
        star.addEventListener('mouseenter', function() {
          const val = parseInt(this.dataset.value);
          editStars.forEach(function(s) {
            s.classList.toggle('active', parseInt(s.dataset.value) <= val);
          });
        });
        star.addEventListener('click', function() {
          editRating = parseInt(this.dataset.value);
          editStars.forEach(function(s) {
            s.classList.toggle('selected', parseInt(s.dataset.value) <= editRating);
            s.classList.toggle('active', parseInt(s.dataset.value) <= editRating);
          });
        });
      });
      var selectArea = document.getElementById('editStarSelect');
      if (selectArea) {
        selectArea.addEventListener('mouseleave', function() {
          editStars.forEach(function(s) {
            s.classList.toggle('active', parseInt(s.dataset.value) <= editRating);
          });
        });
      }
    }, 100);
  };

  window.deleteReview = function(reviewId) {
    Utils.showModal({
      title: 'Delete Review',
      content: '<p>Are you sure you want to delete this review? This action cannot be undone.</p>',
      actions: [
        { text: 'Cancel', className: 'btn btn-secondary', onClick: function() { Utils.hideModal(); } },
        { text: 'Delete', className: 'btn btn-danger', onClick: function() {
          Utils.deleteReview(reviewId);
          Utils.hideModal();
          Utils.showToast('Review deleted', 'success');
          var restaurant = RestaurantData.getById(restaurantId);
          renderHero(restaurant);
          renderSidebar(restaurant);
          renderMainContent(restaurant);
          renderReviews(restaurant);
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
