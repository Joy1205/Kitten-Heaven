/**
 * Kitten Heaven - Application Logic & View Router
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.KITTEN_HEAVEN_CONFIG;

  // Initialize UI components and views
  initNavigation();
  initDynamicContent();
  initModalsAndForms();
  initGalleryFilters();
  initAdoptFosterTabs();
  initScrollAnimations();
});

/* ==========================================================================
   NAVIGATION & VIEW ROUTER
   ========================================================================== */
function initNavigation() {
  const navLinks = document.querySelectorAll('[data-view-link]');
  const viewSections = document.querySelectorAll('.view-section');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');

  function navigateToView(viewId) {
    if (!viewId) viewId = 'home';
    
    // Redirect old separate hashes cleanly to unified adopt-foster view
    if (viewId === 'adoption' || viewId === 'foster') {
      viewId = 'adopt-foster';
    }

    // Hide all view sections
    viewSections.forEach(section => {
      section.classList.remove('active-view');
    });

    // Show target section
    const targetSection = document.getElementById(`view-${viewId}`);
    if (targetSection) {
      targetSection.classList.add('active-view');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Fallback to home
      document.getElementById('view-home')?.classList.add('active-view');
    }

    // Update nav links active state
    navLinks.forEach(link => {
      const linkView = link.getAttribute('data-view-link');
      if (linkView === viewId || (viewId === 'adopt-foster' && (linkView === 'adoption' || linkView === 'foster'))) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile drawer if open
    closeMobileDrawer();
  }

  // Bind click handlers to data-view-link
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const viewId = link.getAttribute('data-view-link');
      window.location.hash = viewId;
      navigateToView(viewId);
    });
  });

  // Listen to browser hash changes
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    navigateToView(hash || 'home');
  });

  // Initial load navigation check
  const initialHash = window.location.hash.replace('#', '');
  navigateToView(initialHash || 'home');

  // Mobile Drawer Controls
  function openMobileDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMobileDrawer);
}

/* ==========================================================================
   DYNAMIC CONTENT RENDERING
   ========================================================================== */
function initDynamicContent() {
  const config = window.KITTEN_HEAVEN_CONFIG;

  // Render Org Information
  const bkashElements = document.querySelectorAll('.bkash-num-text');
  const nagadElements = document.querySelectorAll('.nagad-num-text');
  const phoneElements = document.querySelectorAll('.org-phone-text');
  const emailElements = document.querySelectorAll('.org-email-text');

  bkashElements.forEach(el => el.textContent = config.org.bkashNumber);
  nagadElements.forEach(el => el.textContent = config.org.nagadNumber);
  phoneElements.forEach(el => el.textContent = config.org.phone);
  emailElements.forEach(el => el.textContent = config.org.email);

  // Render Impact Statistics
  renderImpactStats();

  // Render Rescue Stories
  renderRescueStories();

  // Render Street Feeding Cards
  renderStreetFeeding();

  // Render Adoptable Cats
  renderAdoptableCats();

  // Render Job Circular Details
  renderJobCircular();

  // Render Gallery Items
  renderGallery();
}

function renderImpactStats() {
  const config = window.KITTEN_HEAVEN_CONFIG;
  const container = document.getElementById('impactStatsGrid');
  if (!container) return;

  container.innerHTML = config.impactStats.map(stat => `
    <div class="impact-card">
      <div class="impact-number">${stat.value}</div>
      <div class="impact-label">${stat.label}</div>
    </div>
  `).join('');
}

function renderRescueStories() {
  const config = window.KITTEN_HEAVEN_CONFIG;
  const homeGrid = document.getElementById('homeRescueStoriesGrid');
  const storiesPageGrid = document.getElementById('allRescueStoriesGrid');

  const storyCardsHtml = config.rescueStories.map(story => `
    <article class="story-card">
      <div class="story-image-box">
        <img src="${story.image}" alt="${story.name}" class="story-image" loading="lazy" />
        <span class="badge-chip img-badge ${story.status.includes('Recovered') ? 'badge-recovered' : 'badge-treatment'}">${story.status}</span>
      </div>
      <div class="story-card-body">
        <div class="story-meta">Rescued in ${story.date}</div>
        <h3 class="story-card-title">${story.name}'s Journey</h3>
        <p class="story-card-text">${story.summary}</p>
        <div class="story-card-footer">
          <button class="btn-text-link" onclick="openRescueStoryModal('${story.id}')">
            READ STORY →
          </button>
        </div>
      </div>
    </article>
  `).join('');

  if (homeGrid) homeGrid.innerHTML = storyCardsHtml;
  if (storiesPageGrid) storiesPageGrid.innerHTML = storyCardsHtml;
}

function renderStreetFeeding() {
  const config = window.KITTEN_HEAVEN_CONFIG;
  const grid = document.getElementById('streetFeedingGrid');
  if (!grid) return;

  grid.innerHTML = config.streetFeeding.items.map(item => `
    <div class="feeding-card">
      <div class="feeding-img-box">
        <img src="${item.image}" alt="${item.title}" class="story-image" loading="lazy" />
      </div>
      <div class="feeding-card-body">
        <h3 class="feeding-card-title">${item.title}</h3>
        <p class="feeding-card-desc">${item.caption}</p>
      </div>
    </div>
  `).join('');
}

function renderAdoptableCats() {
  const config = window.KITTEN_HEAVEN_CONFIG;
  const grid = document.getElementById('adoptionGrid');
  if (!grid) return;

  grid.innerHTML = config.adoptionCats.map(cat => `
    <div class="cat-card">
      <div class="cat-image-box">
        <img src="${cat.image}" alt="${cat.name}" class="story-image" loading="lazy" />
      </div>
      <div class="cat-card-body">
        <div class="cat-status-chip">${cat.adoptionStatus}</div>
        <h3 class="cat-name">${cat.name}</h3>
        <div class="cat-meta">${cat.gender} · ${cat.age} · ${cat.medicalStatus}</div>
        <button class="btn btn-secondary btn-sm btn-full" onclick="openAdoptionModal('${cat.id}')">
          VIEW PROFILE
        </button>
      </div>
    </div>
  `).join('');
}

function renderJobCircular() {
  const config = window.KITTEN_HEAVEN_CONFIG;
  const job = config.jobCircular;
  const container = document.getElementById('jobCircularContent');
  if (!container) return;

  container.innerHTML = `
    <div class="circular-card">
      <h2 style="margin-bottom: 0.35rem;">${job.title}</h2>
      <p style="color: var(--accent-primary); font-weight: 600;">Paid Employment Circular</p>

      <div class="job-meta-grid">
        <div>
          <div class="meta-item-label">Job Type</div>
          <div class="meta-item-val">${job.type}</div>
        </div>
        <div>
          <div class="meta-item-label">Location</div>
          <div class="meta-item-val">${job.location}</div>
        </div>
        <div>
          <div class="meta-item-label">Salary</div>
          <div class="meta-item-val">${job.salary}</div>
        </div>
        <div>
          <div class="meta-item-label">Working Hours</div>
          <div class="meta-item-val">${job.hours}</div>
        </div>
        <div>
          <div class="meta-item-label">Weekly Holiday</div>
          <div class="meta-item-val">${job.holiday}</div>
        </div>
        <div>
          <div class="meta-item-label">Application Deadline</div>
          <div class="meta-item-val">${job.deadline}</div>
        </div>
      </div>

      <h3 style="margin-top: 1.75rem; margin-bottom: 0.5rem;">Responsibilities</h3>
      <ul class="bullet-list">
        ${job.responsibilities.map(r => `<li>${r}</li>`).join('')}
      </ul>

      <h3 style="margin-top: 1.5rem; margin-bottom: 0.5rem;">Requirements</h3>
      <ul class="bullet-list">
        ${job.requirements.map(req => `<li>${req}</li>`).join('')}
      </ul>

      <div style="margin-top: 2rem;">
        <button class="btn btn-primary" onclick="openJobApplicationModal()">
          APPLY FOR THIS POSITION
        </button>
      </div>
    </div>
  `;
}

function renderGallery() {
  const config = window.KITTEN_HEAVEN_CONFIG;
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  grid.innerHTML = config.galleryItems.map(item => `
    <div class="gallery-item" data-category="${item.category}" onclick="openGalleryLightbox('${item.image}', '${item.title}')">
      <img src="${item.image}" alt="${item.title}" class="gallery-img" loading="lazy" />
      <div class="gallery-overlay-caption">
        <span class="badge-chip" style="position:static; margin-bottom:0.5rem; display:inline-block;">${item.category}</span>
        <h4 style="color:var(--white); font-size:1rem;">${item.title}</h4>
      </div>
    </div>
  `).join('');
}

function initGalleryFilters() {
  const filterChips = document.querySelectorAll('.gallery-filter-bar .filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');
      const items = document.querySelectorAll('.gallery-item');

      items.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

function initAdoptFosterTabs() {
  const pills = document.querySelectorAll('.toggle-btn-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const tab = pill.getAttribute('data-tab');
      const adoptSection = document.getElementById('adopt-section-part');
      const fosterSection = document.getElementById('foster-section-part');

      if (tab === 'all') {
        if (adoptSection) adoptSection.style.display = 'block';
        if (fosterSection) fosterSection.style.display = 'block';
      } else if (tab === 'adopt') {
        if (adoptSection) adoptSection.style.display = 'block';
        if (fosterSection) fosterSection.style.display = 'none';
      } else if (tab === 'foster') {
        if (adoptSection) adoptSection.style.display = 'none';
        if (fosterSection) fosterSection.style.display = 'block';
      }
    });
  });
}

/* ==========================================================================
   CLIPBOARD & TOAST NOTIFICATIONS
   ========================================================================== */
function copyToClipboard(text, providerLabel) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied ${providerLabel} number: ${text}`);
    }).catch(() => {
      fallbackCopy(text, providerLabel);
    });
  } else {
    fallbackCopy(text, providerLabel);
  }
}

function fallbackCopy(text, providerLabel) {
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  showToast(`Copied ${providerLabel} number: ${text}`);
}

function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E96545" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================================================
   MODALS AND DIALOGS
   ========================================================================== */
function initModalsAndForms() {
  const backdrop = document.getElementById('globalModalBackdrop');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });
  }
}

function closeModal() {
  const backdrop = document.getElementById('globalModalBackdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function openModal(htmlContent) {
  const backdrop = document.getElementById('globalModalBackdrop');
  const modalBody = document.getElementById('modalDynamicContent');
  if (!backdrop || !modalBody) return;

  modalBody.innerHTML = htmlContent;
  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* Modal Openers */
function openRescueStoryModal(storyId) {
  const config = window.KITTEN_HEAVEN_CONFIG;
  const story = config.rescueStories.find(s => s.id === storyId);
  if (!story) return;

  const content = `
    <div style="margin-bottom: 1.25rem;">
      <span class="badge-chip badge-recovered" style="position:static; display:inline-block; margin-bottom:0.65rem;">${story.status}</span>
      <h2 style="font-size: 2rem; margin-bottom: 0.25rem;">${story.name}'s Story</h2>
      <p style="font-size: 0.85rem; color: var(--text-muted);">Rescue Date: ${story.date}</p>
    </div>

    <div style="border-radius: var(--radius-md); overflow: hidden; height: 280px; margin-bottom: 1.5rem;">
      <img src="${story.image}" alt="${story.name}" style="width:100%; height:100%; object-fit:cover;" />
    </div>

    <div style="display:flex; flex-direction:column; gap:1.25rem; color: var(--text-main); font-size:1rem; line-height:1.65;">
      <div>
        <h3 style="font-size: 1.3rem; margin-bottom: 0.4rem; color: var(--accent-primary);">The Rescue</h3>
        <p>${story.theRescue}</p>
      </div>

      <div>
        <h3 style="font-size: 1.3rem; margin-bottom: 0.4rem; color: var(--accent-primary);">What Happened</h3>
        <p>${story.whatHappened}</p>
      </div>

      <div>
        <h3 style="font-size: 1.3rem; margin-bottom: 0.4rem; color: var(--accent-primary);">Treatment & Recovery</h3>
        <p>${story.treatment}</p>
      </div>

      <div style="background: var(--bg-secondary); padding: 1.25rem; border-radius: var(--radius-md); margin-top: 0.5rem;">
        <h3 style="font-size: 1.2rem; margin-bottom: 0.4rem;">Before & After Care</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.85rem; margin-top:0.75rem;">
          <div>
            <div style="font-size:0.75rem; font-weight:600; text-transform:uppercase; margin-bottom:0.25rem;">Upon Rescue</div>
            <img src="${story.beforeImage}" style="border-radius:var(--radius-sm); height:140px; width:100%; object-fit:cover;" />
          </div>
          <div>
            <div style="font-size:0.75rem; font-weight:600; text-transform:uppercase; margin-bottom:0.25rem;">Fully Recovered</div>
            <img src="${story.afterImage}" style="border-radius:var(--radius-sm); height:140px; width:100%; object-fit:cover;" />
          </div>
        </div>
      </div>

      <div>
        <h3 style="font-size: 1.3rem; margin-bottom: 0.4rem; color: var(--accent-primary);">Current Status</h3>
        <p>${story.currentStatus}</p>
      </div>
    </div>

    <div style="margin-top: 2rem; border-top: 1px solid var(--border-light); background: var(--tint-warm); border-radius: var(--radius-md); padding: 1.5rem; text-align: center;">
      <h3 style="margin-bottom: 0.4rem;">Help More Cats Like ${story.name}</h3>
      <p style="margin-bottom: 1rem; font-size: 0.9rem;">Your small contribution enables emergency treatment for critical rescue cases.</p>
      <button class="btn btn-primary" onclick="closeModal(); window.location.hash='donate';">
        DONATE NOW
      </button>
    </div>
  `;

  openModal(content);
}

function openAdoptionModal(catId) {
  const config = window.KITTEN_HEAVEN_CONFIG;
  const cat = config.adoptionCats.find(c => c.id === catId);
  if (!cat) return;

  const content = `
    <div style="display:grid; grid-template-columns: 220px 1fr; gap: 1.5rem; align-items: start; margin-bottom: 1.5rem;">
      <div style="border-radius: var(--radius-md); overflow: hidden; height: 240px;">
        <img src="${cat.image}" alt="${cat.name}" style="width:100%; height:100%; object-fit:cover;" />
      </div>
      <div>
        <span class="cat-status-chip">${cat.adoptionStatus}</span>
        <h2 style="font-size: 2rem; margin-bottom: 0.35rem;">${cat.name}</h2>
        <div style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">${cat.gender} · ${cat.age} · ${cat.medicalStatus}</div>
        
        <h4 style="margin-bottom: 0.25rem;">Personality</h4>
        <p style="margin-bottom: 0.85rem; font-size:0.9rem;">${cat.personality}</p>

        <h4 style="margin-bottom: 0.25rem;">Story</h4>
        <p style="font-size:0.9rem;">${cat.story}</p>
      </div>
    </div>

    <div style="background: var(--bg-primary); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
      <h4 style="margin-bottom: 0.35rem;">Adoption Requirements</h4>
      <p style="font-size:0.9rem; color:var(--text-muted);">${cat.requirements}</p>
    </div>

    <div style="text-align: right;">
      <button class="btn btn-primary btn-full" onclick="openAdoptionForm('${cat.name}')">
        APPLY TO ADOPT ${cat.name.toUpperCase()}
      </button>
    </div>
  `;

  openModal(content);
}

function openAdoptionForm(catName) {
  const content = `
    <h2 style="margin-bottom: 0.35rem;">Adoption Application</h2>
    <p style="margin-bottom: 1.25rem; color: var(--text-muted);">Applying to adopt <strong>${catName}</strong>. Please provide your details below.</p>

    <form onsubmit="handleFormSubmit(event, 'Adoption application submitted! Kitten Heaven team will contact you soon.')">
      <div class="form-group">
        <label class="form-label">Full Name *</label>
        <input type="text" class="form-input" required placeholder="Your Name" />
      </div>
      <div class="form-group">
        <label class="form-label">Phone Number *</label>
        <input type="tel" class="form-input" required placeholder="01XXXXXXXXX" />
      </div>
      <div class="form-group">
        <label class="form-label">Email Address *</label>
        <input type="email" class="form-input" required placeholder="your.name@example.com" />
      </div>
      <div class="form-group">
        <label class="form-label">Your Location / Address *</label>
        <input type="text" class="form-input" required placeholder="Area, City" />
      </div>
      <div class="form-group">
        <label class="form-label">Tell us about your home environment & pet experience</label>
        <textarea class="form-textarea" rows="3" required placeholder="Do you have other pets? Is your home cat-safe?"></textarea>
      </div>
      <button type="submit" class="btn btn-primary btn-full">SUBMIT ADOPTION APPLICATION</button>
    </form>
  `;

  openModal(content);
}

function openJobApplicationModal() {
  const content = `
    <h2 style="margin-bottom: 0.35rem;">Job Application</h2>
    <p style="margin-bottom: 1.25rem; color: var(--text-muted);">Position: <strong>Shelter Helping Hand / Shelter Assistant</strong></p>

    <form onsubmit="handleFormSubmit(event, 'Job application submitted successfully! We will review your application.')">
      <div class="form-group">
        <label class="form-label">Full Name *</label>
        <input type="text" class="form-input" required placeholder="Your full legal name" />
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 0.85rem;">
        <div class="form-group">
          <label class="form-label">Phone Number *</label>
          <input type="tel" class="form-input" required placeholder="01XXXXXXXXX" />
        </div>
        <div class="form-group">
          <label class="form-label">Age *</label>
          <input type="number" class="form-input" min="18" max="70" required placeholder="e.g. 24" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Current Location *</label>
        <input type="text" class="form-input" required placeholder="Address or neighborhood" />
      </div>

      <div class="form-group">
        <label class="form-label">Previous Animal Care Experience</label>
        <textarea class="form-textarea" rows="2" placeholder="Briefly describe any past experience with pets or animal care"></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Why do you want to work with Kitten Heaven? *</label>
        <textarea class="form-textarea" rows="3" required placeholder="Tell us why you are interested in this position"></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Available Working Hours *</label>
        <input type="text" class="form-input" required placeholder="e.g. Full-time / Morning Shift" />
      </div>

      <div class="form-group">
        <label class="form-label">Additional Information</label>
        <textarea class="form-textarea" rows="2" placeholder="Any additional notes or questions"></textarea>
      </div>

      <button type="submit" class="btn btn-primary btn-full">APPLY FOR THIS POSITION</button>
    </form>
  `;

  openModal(content);
}

function openVolunteerForm() {
  const content = `
    <h2 style="margin-bottom: 0.35rem;">Become a Volunteer</h2>
    <p style="margin-bottom: 1.25rem; color: var(--text-muted);">Give your time and compassion to help animals in need.</p>

    <form onsubmit="handleFormSubmit(event, 'Volunteer application submitted! Thank you for joining our mission.')">
      <div class="form-group">
        <label class="form-label">Full Name *</label>
        <input type="text" class="form-input" required placeholder="Your Name" />
      </div>
      <div class="form-group">
        <label class="form-label">Phone Number *</label>
        <input type="tel" class="form-input" required placeholder="01XXXXXXXXX" />
      </div>
      <div class="form-group">
        <label class="form-label">Email Address</label>
        <input type="email" class="form-input" placeholder="your.name@example.com" />
      </div>
      <div class="form-group">
        <label class="form-label">How would you like to help?</label>
        <select class="form-select" required>
          <option value="">Select activity</option>
          <option value="shelter">Shelter Assistance</option>
          <option value="street">Street Feeding</option>
          <option value="rescue">Rescue Assistance</option>
          <option value="photo">Photography & Media</option>
          <option value="social">Social Media Support</option>
          <option value="transport">Transportation Help</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Availability / Notes</label>
        <textarea class="form-textarea" rows="3" placeholder="Days of week or hours you are free to volunteer"></textarea>
      </div>
      <button type="submit" class="btn btn-primary btn-full">SUBMIT VOLUNTEER APPLICATION</button>
    </form>
  `;

  openModal(content);
}

function openFosterForm() {
  const content = `
    <h2 style="margin-bottom: 0.35rem;">Cat Foster Application</h2>
    <div style="background: var(--tint-rose); padding: 0.85rem 1.15rem; border-radius: var(--radius-sm); margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: center;">
      <span style="font-weight: 600; color: var(--text-main); font-size: 0.925rem;">Cat Foster Rate:</span>
      <span style="font-weight: 800; color: var(--accent-primary); font-size: 1.25rem;">৳500 / Day</span>
    </div>

    <form onsubmit="handleFormSubmit(event, 'Foster request submitted! Kitten Heaven team will contact you shortly.')">
      <div class="form-group">
        <label class="form-label">Full Name *</label>
        <input type="text" class="form-input" required placeholder="Your Name" />
      </div>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 0.85rem;">
        <div class="form-group">
          <label class="form-label">Phone Number *</label>
          <input type="tel" class="form-input" required placeholder="01XXXXXXXXX" />
        </div>
        <div class="form-group">
          <label class="form-label">Estimated Days *</label>
          <input type="number" class="form-input" min="1" required placeholder="e.g. 7" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Email Address</label>
        <input type="email" class="form-input" placeholder="your.name@example.com" />
      </div>
      <div class="form-group">
        <label class="form-label">Address / Location *</label>
        <input type="text" class="form-input" required placeholder="Your area or neighborhood" />
      </div>
      <div class="form-group">
        <label class="form-label">Cat Details / Special Notes</label>
        <textarea class="form-textarea" rows="3" placeholder="Tell us about the cat or any special medical/dietary requirements"></textarea>
      </div>
      <button type="submit" class="btn btn-primary btn-full">SUBMIT FOSTER REQUEST (৳500/DAY)</button>
    </form>
  `;

  openModal(content);
}

function openGalleryLightbox(imageUrl, title) {
  const content = `
    <div style="text-align: center;">
      <h3 style="margin-bottom: 0.85rem; color: var(--text-main);">${title}</h3>
      <div style="border-radius: var(--radius-md); overflow: hidden; max-height: 65vh;">
        <img src="${imageUrl}" alt="${title}" style="width:100%; max-height: 65vh; object-fit: contain;" />
      </div>
    </div>
  `;
  openModal(content);
}

function handleFormSubmit(e, successMsg) {
  e.preventDefault();
  closeModal();
  showToast(successMsg);
}

/* Scroll Animation Trigger */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.story-card, .work-card, .feeding-card, .cat-card').forEach(el => {
    observer.observe(el);
  });
}

// Make openers globally accessible
window.copyToClipboard = copyToClipboard;
window.openRescueStoryModal = openRescueStoryModal;
window.openAdoptionModal = openAdoptionModal;
window.openAdoptionForm = openAdoptionForm;
window.openFosterForm = openFosterForm;
window.openJobApplicationModal = openJobApplicationModal;
window.openVolunteerForm = openVolunteerForm;
window.openGalleryLightbox = openGalleryLightbox;
window.closeModal = closeModal;
window.handleFormSubmit = handleFormSubmit;
