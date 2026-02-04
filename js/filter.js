/**
 * LOKVIDYA - Filter Module
 * Handles filtering and rendering of archive entries
 * Supports bilingual Q&A and clickable images
 */

class ArchiveFilter {
  constructor() {
    this.activeLanguage = null;
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
        this.filterByLanguage(language === this.activeLanguage ? null : language);
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
    this.activeLanguage = language;
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
    this.activeLanguage = null;
    this.activeCategory = null;
    this.updateFilterChips();
    this.renderFilteredResults();
    this.updateResultsInfo();
  }

  updateFilterChips() {
    document.querySelectorAll('.filter-chip[data-language]').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.language === this.activeLanguage);
    });
    document.querySelectorAll('.filter-chip[data-category]').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.category === this.activeCategory);
    });
    const clearBtn = document.querySelector('.clear-filters');
    if (clearBtn) {
      clearBtn.style.display = (this.activeLanguage || this.activeCategory) ? 'inline-block' : 'none';
    }
  }

  getFilteredResults() {
    let results = [...archiveData];
    if (this.activeLanguage) results = results.filter(item => item.language === this.activeLanguage);
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

    if (item.category === 'folksongs' && item.questions) {
      return this.renderFolksongCard(item, language, category);
    } else if (item.images) {
      return this.renderImageCard(item, language, category);
    }
    return this.renderTextCard(item, language, category);
  }

  renderFolksongCard(item, language, category) {
    const questionsHtml = FOLKSONG_QUESTIONS.map((q, i) => {
      const answer = item.questions[q.id];
      // Mocking native questions if not in data, but using real ones when possible
      const nativeQ = q.as || '';
      return `
        <div class="qa-item-new">
          <div class="qa-header-block">
            <span class="q-label">Q${i + 1}: ${q.en}</span>
            <div class="q-native-text">${this.getNativeQuestion(q.id, item.language) || ''}</div>
          </div>
          <div class="qa-content-block">
            <p class="en-text">${answer.en}</p>
            <div class="qa-divider"></div>
            <p class="native-text-italic">${answer.native}</p>
          </div>
        </div>
      `;
    }).join('');

    return `
      <article class="card archive-card folksong-card-v2" data-id="${item.id}">
        <div class="card-header-v2">
          <span class="badge badge-cat-v2" style="background: ${category.color}15; color: ${category.color};">
            ${category.icon} ${category.name}
          </span>
          <span class="badge-lang-v2">
            <span class="lang-icon">🌐</span> ${language.name}
          </span>
        </div>
        <div class="card-body-v2">
          <div class="audio-player-v2">
            <div class="player-inner">
              <button class="player-btn">▶</button>
              <div class="player-time">0:00 / 7:05</div>
              <div class="player-progress">
                <div class="progress-bar"></div>
                <div class="progress-thumb"></div>
              </div>
              <div class="player-vol">🔊</div>
              <div class="player-opt">⋮</div>
            </div>
          </div>
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

  renderImageCard(item, language, category) {
    const thumbsHtml = item.images.map((img, i) => {
      return `
        <div class="thumb-item" data-index="${i}" data-entry="${item.id}">
          <span class="thumb-placeholder">${img.placeholder}</span>
        </div>
      `;
    }).slice(0, 5).join('');

    return `
      <article class="card archive-card image-card-v2" data-id="${item.id}">
        <div class="card-header-v2">
          <span class="badge badge-cat-v2" style="background: ${category.color}15; color: ${category.color};">
            ${category.icon} ${category.name}
          </span>
          <span class="badge-lang-v2">
            <span class="lang-icon">🌐</span> ${language.name}
          </span>
        </div>
        <div class="card-body-v2">
          <div class="image-gallery-v2">
            <div class="thumbs-row-v2">${thumbsHtml}</div>
          </div>
          
          <div class="content-block-v2">
            <div class="block-label-v2">ORIGINAL (${language.name.toUpperCase()})</div>
            <p class="block-text-v2">${item.content ? item.content.native : ''}</p>
          </div>

          <div class="content-block-v2">
            <div class="block-label-v2">HINDI TRANSLATION</div>
            <p class="block-text-v2">${item.content ? item.content.hindi : ''}</p>
          </div>
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

  // Helper for native questions (simplified for now)
  getNativeQuestion(id, langId) {
    const questions = {
      'about_song': {
        'assamese': 'এই গীতটো কিহৰ বিষয়ে আৰু পৰম্পৰাগতভাৱে কোন কোন উপলক্ষত গোৱা হয়?',
        'mundari': 'इन गीत बरा दिसुम रे गाइ जाना? सरहुल परब रे?'
      }
    };
    return (questions[id] && questions[id][langId]) ? questions[id][langId] : '';
  }

  renderTextCard(item, language, category) {
    return `
      <article class="card archive-card text-card-v2" data-id="${item.id}">
        <div class="card-header-v2">
          <span class="badge badge-cat-v2" style="background: ${category.color}15; color: ${category.color};">
            ${category.icon} ${category.name}
          </span>
          <span class="badge-lang-v2">
            <span class="lang-icon">🌐</span> ${language.name}
          </span>
        </div>
        <div class="card-body-v2">
          <h3 class="card-title-v2">${item.title}</h3>
          <p class="card-text-v2">${item.description || ''}</p>
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

  setupAccordions() {
    // Legacy support or remove if not needed
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
    resultsInfo.innerHTML = this.activeLanguage || this.activeCategory
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
    if (params.get('language')) this.activeLanguage = params.get('language');
    if (params.get('category')) this.activeCategory = params.get('category');
    this.updateFilterChips();
    this.renderFilteredResults();
    this.updateResultsInfo();
  }
}

const archiveFilter = new ArchiveFilter();
