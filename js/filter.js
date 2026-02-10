/**
 * LOKVIDYA - Filter Module
 * Handles filtering and rendering of archive entries
 * Supports bilingual Q&A and clickable images
 */

class ArchiveFilter {
  constructor() {
    this.activeLanguages = [];
    this.activeCategory = null;
  }

  init() {
    this.setupLanguageFilters();
    this.setupCategoryFilters();
    this.setupClearButton();
    this.updateResultsInfo();
  }

  setupLanguageFilters() {
    document.querySelectorAll('.filter-chip[data-language]').forEach(chip => {
      chip.addEventListener('click', () => {
        const language = chip.dataset.language;
        const isSelected = this.activeLanguages.includes(language) && this.activeLanguages.length === 1;
        this.filterByLanguage(isSelected ? null : language);
      });
    });
  }

  setupCategoryFilters() {
    document.querySelectorAll('.filter-chip[data-category]').forEach(chip => {
      chip.addEventListener('click', () => {
        const category = chip.dataset.category;
        this.filterByCategory(category === this.activeCategory ? null : category);
      });
    });
  }

  setupClearButton() {
    const clearBtn = document.querySelector('.clear-filters');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.resetFilters());
    }
  }

  filterByLanguage(language) {
    this.activeLanguages = language ? [language] : [];
    this.updateFilterChips();
    this.renderFilteredResults();
    this.updateResultsInfo();
  }

  filterByLanguages(languages) {
    this.activeLanguages = languages || [];
    this.updateFilterChips();
    this.renderFilteredResults();
    this.updateResultsInfo();
  }

  filterByCategory(category) {
    this.activeCategory = category;
    this.updateFilterChips();
    this.renderFilteredResults();
    this.updateResultsInfo();
  }

  resetFilters() {
    this.activeLanguages = [];
    this.activeCategory = null;
    this.updateFilterChips();
    this.renderFilteredResults();
    this.updateResultsInfo();
  }

  updateFilterChips() {
    document.querySelectorAll('.filter-chip[data-language]').forEach(chip => {
      chip.classList.toggle('active', this.activeLanguages.includes(chip.dataset.language));
    });
    document.querySelectorAll('.filter-chip[data-category]').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.category === this.activeCategory);
    });
    const clearBtn = document.querySelector('.clear-filters');
    if (clearBtn) {
      clearBtn.style.display = (this.activeLanguages.length > 0 || this.activeCategory) ? 'inline-block' : 'none';
    }
  }

  getFilteredResults() {
    let results = [...archiveData];
    if (this.activeLanguages.length > 0) results = results.filter(item => this.activeLanguages.includes(item.language));
    if (this.activeCategory) results = results.filter(item => item.category === this.activeCategory);
    return results;
  }

  renderFilteredResults() {
    const grid = document.querySelector('.archive-grid');
    if (!grid) return;
    const results = this.getFilteredResults();
    if (results.length === 0) {
      grid.innerHTML = this.renderEmptyState();
      return;
    }
    grid.innerHTML = results.map(item => this.renderCard(item)).join('');
    this.setupAccordions();
    this.setupImageClicks();
    this.animateCards(grid);
  }

  renderCard(item) {
    const language = LANGUAGES.find(l => l.id === item.language);
    const category = CATEGORIES.find(c => c.id === item.category);

    return this.renderUnifiedCard(item, language, category);
  }

  renderUnifiedCard(item, language, category) {
    const questionsHtml = Object.keys(item.questions || {}).map((qId, i) => {
      const answer = item.questions[qId];
      // Get predefined question text if available, otherwise use key formatted
      const qText = this.getQuestionText(qId);

      return `
        <div class="qa-item-new collapsible">
          <button class="qa-header-block" aria-expanded="false">
            <div class="q-header-content">
              <span class="q-label">Q${i + 1}: ${qText}</span>
            </div>
            <span class="qa-toggle-icon">＋</span>
          </button>
          <div class="qa-content-block">
            <div class="qa-content-inner">
              <p class="en-text">${answer.en}</p>
              <div class="qa-divider"></div>
              <p class="native-text-italic">${answer.native}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const mediaHtml = item.type === 'audio'
      ? `
        <div class="audio-player-v2">
          <div class="player-inner">
            <button class="player-btn">▶</button>
            <div class="player-time">0:00 / ${item.duration || '0:00'}</div>
            <div class="player-progress">
              <div class="progress-bar"></div>
              <div class="progress-thumb"></div>
            </div>
          </div>
        </div>
      `
      : (item.images ? `
        <div class="image-gallery-v2">
          <div class="thumbs-row-v2">
            ${item.images.map((img, i) => `
              <div class="thumb-item" data-index="${i}" data-entry="${item.id}">
                <span class="thumb-placeholder">${img.placeholder}</span>
              </div>
            `).slice(0, 5).join('')}
          </div>
        </div>
      ` : '');

    return `
      <article class="card archive-card unified-card-v2" data-id="${item.id}">
        <div class="card-header-v2">
          <span class="badge badge-cat-v2" style="background: ${category.color}4D; color: black;">
            ${category.icon} ${category.name}
          </span>
          <span class="badge-lang-v2">
            <span class="lang-icon"><img src="assets/global.png" width="18" height="18" alt="Language" style="vertical-align: middle; margin-right: 2px;"></span> ${language.name}
          </span>
        </div>
        <div class="card-body-v2">
          <h3 class="card-title-v2">${item.title}</h3>
          ${mediaHtml}
          <div class="qa-list-v2">${questionsHtml}</div>
        </div>
        <div class="card-footer-v2">
          <div class="contributor-v2">
            <div class="avatar-v2">${item.contributor.charAt(0)}</div>
            <div class="contributor-info-v2">
              <div class="name-v2">${item.contributor}</div>
              <div class="role-v2">Contributor</div>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  getQuestionText(id) {
    const folksongQuestions = {
      'about_song': 'What is this song about?',
      'tradition_origin': 'Who taught you this song?',
      'language_details': 'What language/dialect is this in?',
      'performance_style': 'Is this song accompanied by instruments?'
    };

    if (folksongQuestions[id]) return folksongQuestions[id];

    // Fallback for other categories
    return id.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }


  setupAccordions() {
    document.querySelectorAll('.qa-header-block').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.qa-item-new');
        const isExpanded = item.classList.contains('active');

        // Close other items in the same list
        const parentList = item.closest('.qa-list-v2');
        if (parentList) {
          parentList.querySelectorAll('.qa-item-new').forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              const otherHeader = otherItem.querySelector('.qa-header-block');
              if (otherHeader) {
                otherHeader.setAttribute('aria-expanded', 'false');
                otherHeader.querySelector('.qa-toggle-icon').textContent = '＋';
              }
            }
          });
        }

        // Toggle current item
        item.classList.toggle('active');
        header.setAttribute('aria-expanded', !isExpanded);
        header.querySelector('.qa-toggle-icon').textContent = isExpanded ? '＋' : '－';
      });
    });
  }

  setupImageClicks() {
    document.querySelectorAll('.thumb-item').forEach(thumb => {
      thumb.addEventListener('click', () => {
        const entryId = parseInt(thumb.dataset.entry);
        const index = parseInt(thumb.dataset.index);
        const entry = archiveData.find(e => e.id === entryId);
        if (entry && entry.images) {
          this.showImageModal(entry.images[index], entry.title);
        }
      });
    });
  }

  showImageModal(image, title) {
    let modal = document.getElementById('imageModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'imageModal';
      modal.className = 'image-modal';
      modal.innerHTML = `
        <div class="image-modal-content">
          <button class="image-modal-close">×</button>
          <div class="image-modal-display">
            <div class="modal-placeholder"></div>
          </div>
          <div class="image-modal-caption"></div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('image-modal-close')) {
          modal.classList.remove('open');
        }
      });
    }

    modal.querySelector('.modal-placeholder').textContent = image.placeholder;
    modal.querySelector('.image-modal-caption').innerHTML = '';
    modal.classList.add('open');
  }

  renderEmptyState() {
    return `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3>No entries found</h3>
        <p>Try adjusting your filters or <button class="link-btn" onclick="archiveFilter.resetFilters()">clear all filters</button></p>
      </div>
    `;
  }

  updateResultsInfo() {
    const resultsInfo = document.querySelector('.results-count');
    if (!resultsInfo) return;
    const results = this.getFilteredResults();
    const total = archiveData.length;
    resultsInfo.innerHTML = this.activeLanguages.length > 0 || this.activeCategory
      ? `Showing <strong>${results.length}</strong> of ${total} entries`
      : `Showing all <strong>${total}</strong> entries`;
  }

  formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  animateCards(grid) {
    grid.querySelectorAll('.archive-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.4s, transform 0.4s';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 50);
    });
  }

  loadFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('language')) this.activeLanguages = [params.get('language')];
    if (params.get('category')) this.activeCategory = params.get('category');
    this.updateFilterChips();
    this.renderFilteredResults();
    this.updateResultsInfo();
  }
}

const archiveFilter = new ArchiveFilter();
