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
    this.renderFilteredResults();
    this.updateResultsInfo();
  }

  setupLanguageFilters() {
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        this.filterByLanguage(e.target.value || null);
      });
    }
  }

  setupCategoryFilters() {
    const catSelect = document.getElementById('categorySelect');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        this.filterByCategory(e.target.value || null);
      });
    }
  }

  setupClearButton() {
    const clearBtn = document.querySelector('.clear-filters');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.resetFilters());
    }
  }

  filterByLanguage(language) {
    this.activeLanguages = language ? [language] : [];
    this.updateFilterUI();
    this.renderFilteredResults();
    this.updateResultsInfo();
  }

  filterByLanguages(languages) {
    this.activeLanguages = languages || [];
    this.updateFilterUI();
    this.renderFilteredResults();
    this.updateResultsInfo();
  }

  filterByCategory(category) {
    this.activeCategory = category;
    this.updateFilterUI();
    this.renderFilteredResults();
    this.updateResultsInfo();
  }

  resetFilters() {
    this.activeLanguages = [];
    this.activeCategory = null;
    this.updateFilterUI();
    this.renderFilteredResults();
    this.updateResultsInfo();
  }

  updateFilterUI() {
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
      langSelect.value = this.activeLanguages[0] || '';
    }

    const catSelect = document.getElementById('categorySelect');
    if (catSelect) {
      catSelect.value = this.activeCategory || '';
    }

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
    this.setupAudioPlayers();
    this.animateCards(grid);
  }

  renderCard(item) {
    const language = LANGUAGES.find(l => l.id === item.language);
    const category = CATEGORIES.find(c => c.id === item.category);

    if (item.category === 'folksongs') {
      return this.renderFolksongCard(item, language, category);
    } else {
      return this.renderNonFolksongCard(item, language, category);
    }
  }

  /**
   * Render a folksong card: audio player + 4 collapsible Q&A
   */
  renderFolksongCard(item, language, category) {
    const questionsHtml = Object.keys(item.questions || {}).map((qId, i) => {
      const answer = item.questions[qId];
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

    // Pictures gallery (optional for folksongs)
    let picturesHtml = '';
    if (item.pictures && item.pictures.length > 0) {
      const thumbs = item.pictures.map((src, i) => `
        <div class="thumb-item" data-index="${i}" data-entry="${item.id}">
          <img src="${src}" alt="Image ${i + 1}" class="thumb-img" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'thumb-placeholder\\'>🖼️</span>';">
        </div>
      `).join('');
      picturesHtml = `
        <div class="image-gallery-v2">
          <div class="thumbs-row-v2">${thumbs}</div>
        </div>
      `;
    }

    const audioSrc = item.audio || '';
    const audioHtml = audioSrc ? `
      <div class="audio-player-v2" data-audio-src="${audioSrc}">
        <audio preload="metadata" src="${audioSrc}"></audio>
        <div class="player-inner">
          <button class="player-btn">▶</button>
          <div class="player-time">0:00 / 0:00</div>
          <div class="player-progress">
            <div class="progress-bar"></div>
            <div class="progress-thumb"></div>
          </div>
        </div>
      </div>
    ` : '';

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
          ${picturesHtml}
          ${audioHtml}
          <div class="qa-list-v2">${questionsHtml}</div>
        </div>
        ${SHOW_CONTRIBUTORS ? `
        <div class="card-footer-v2">
          <div class="contributor-v2">
            <div class="avatar-v2">${item.worker_name.charAt(0)}</div>
            <div class="contributor-info-v2">
              <div class="name-v2">${item.worker_name}</div>
              <div class="role-v2">Contributor</div>
            </div>
          </div>
        </div>
        ` : ''}
      </article>
    `;
  }

  /**
   * Render a non-folksong card: pictures, about_image, hindi_translation, optional audio
   */
  renderNonFolksongCard(item, language, category) {
    // Pictures gallery (1-2 images)
    let picturesHtml = '';
    if (item.pictures && item.pictures.length > 0) {
      const thumbs = item.pictures.map((src, i) => `
        <div class="thumb-item" data-index="${i}" data-entry="${item.id}">
          <img src="${src}" alt="Image ${i + 1}" class="thumb-img" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'thumb-placeholder\\'>🖼️</span>';">
        </div>
      `).join('');
      picturesHtml = `
        <div class="image-gallery-v2">
          <div class="thumbs-row-v2">${thumbs}</div>
        </div>
      `;
    }

    // Audio player (optional)
    let audioHtml = '';
    if (item.audio) {
      audioHtml = `
        <div class="audio-player-v2" data-audio-src="${item.audio}">
          <audio preload="metadata" src="${item.audio}"></audio>
          <div class="player-inner">
            <button class="player-btn">▶</button>
            <div class="player-time">0:00 / 0:00</div>
            <div class="player-progress">
              <div class="progress-bar"></div>
              <div class="progress-thumb"></div>
            </div>
          </div>
        </div>
      `;
    }

    // About image + Hindi translation as collapsible Q&A style
    let contentHtml = '';
    if (item.about_image || item.hindi_translation) {
      contentHtml = `
        <div class="qa-list-v2">
          <div class="qa-item-new collapsible">
            <button class="qa-header-block" aria-expanded="false">
              <div class="q-header-content">
                <span class="q-label">About</span>
              </div>
              <span class="qa-toggle-icon">＋</span>
            </button>
            <div class="qa-content-block">
              <div class="qa-content-inner">
                ${item.about_image ? `<p class="en-text">${item.about_image}</p>` : ''}
                ${item.about_image && item.hindi_translation ? '<div class="qa-divider"></div>' : ''}
                ${item.hindi_translation ? `<p class="native-text-italic">${item.hindi_translation}</p>` : ''}
              </div>
            </div>
          </div>
        </div>
      `;
    }

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
          ${picturesHtml}
          ${audioHtml}
          ${contentHtml}
        </div>
        ${SHOW_CONTRIBUTORS ? `
        <div class="card-footer-v2">
          <div class="contributor-v2">
            <div class="avatar-v2">${item.worker_name.charAt(0)}</div>
            <div class="contributor-info-v2">
              <div class="name-v2">${item.worker_name}</div>
              <div class="role-v2">Contributor</div>
            </div>
          </div>
        </div>
        ` : ''}
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
        if (entry && entry.pictures && entry.pictures[index]) {
          this.showImageModal(entry.pictures[index]);
        }
      });
    });
  }

  /**
   * Wire up all audio players with real play/pause/seek functionality
   */
  setupAudioPlayers() {
    document.querySelectorAll('.audio-player-v2').forEach(player => {
      const audio = player.querySelector('audio');
      if (!audio) return;

      const btn = player.querySelector('.player-btn');
      const timeDisplay = player.querySelector('.player-time');
      const progressBar = player.querySelector('.progress-bar');
      const progressThumb = player.querySelector('.progress-thumb');
      const progressContainer = player.querySelector('.player-progress');

      const formatTime = (s) => {
        if (isNaN(s)) return '0:00';
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60).toString().padStart(2, '0');
        return `${m}:${sec}`;
      };

      audio.addEventListener('loadedmetadata', () => {
        timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
      });

      audio.addEventListener('timeupdate', () => {
        const pct = (audio.currentTime / audio.duration) * 100 || 0;
        progressBar.style.width = pct + '%';
        progressThumb.style.left = pct + '%';
        timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
      });

      audio.addEventListener('ended', () => {
        btn.textContent = '▶';
      });

      btn.addEventListener('click', () => {
        // Pause any other playing audio first
        document.querySelectorAll('.audio-player-v2 audio').forEach(other => {
          if (other !== audio && !other.paused) {
            other.pause();
            other.closest('.audio-player-v2').querySelector('.player-btn').textContent = '▶';
          }
        });

        if (audio.paused) {
          audio.play();
          btn.textContent = '⏸';
        } else {
          audio.pause();
          btn.textContent = '▶';
        }
      });

      // Click-to-seek on the progress bar
      progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (audio.duration) {
          audio.currentTime = pct * audio.duration;
          progressBar.style.width = (pct * 100) + '%';
          progressThumb.style.left = (pct * 100) + '%';
        }
      });
    });
  }

  showImageModal(imageSrc) {
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

    const display = modal.querySelector('.image-modal-display');
    if (imageSrc) {
      display.innerHTML = `<img src="${imageSrc}" alt="Full size image" style="max-width: 100%; max-height: 80vh; border-radius: 8px;" onerror="this.outerHTML='<div class=\\'modal-placeholder\\'>🖼️</div>';">`;
    } else {
      display.innerHTML = '<div class="modal-placeholder">🖼️</div>';
    }
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
    // Support both real query params and hash-based params (e.g. #archive?category=food)
    const hash = window.location.hash || '';
    const qIndex = hash.indexOf('?');
    const searchStr = qIndex !== -1 ? hash.substring(qIndex) : window.location.search;
    const params = new URLSearchParams(searchStr);
    if (params.get('language')) this.activeLanguages = [params.get('language')];
    if (params.get('category')) this.activeCategory = params.get('category');
    this.updateFilterChips();
    this.renderFilteredResults();
    this.updateResultsInfo();
  }
}

const archiveFilter = new ArchiveFilter();
