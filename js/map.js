/**
 * LOKVIDYA - Map Module
 * Interactive India map with state highlighting and language tooltips
 */

class IndiaMap {
    constructor(container) {
        this.container = container;
        this.tooltip = null;
        this.activeState = null;
        this.onStateClick = null;
    }

    /**
     * Initialize the map
     */
    async init() {
        this.createTooltip();
        this.setupStateInteractions();
        this.highlightStatesWithData();
    }

    /**
     * Create tooltip element
     */
    createTooltip() {
        this.tooltip = document.createElement('div');
        this.tooltip.className = 'map-tooltip';
        this.tooltip.style.cssText = `
      position: fixed;
      padding: 12px 16px;
      background: var(--charcoal);
      color: white;
      font-size: 14px;
      border-radius: 8px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.2s ease;
      z-index: 1000;
      max-width: 250px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;
        document.body.appendChild(this.tooltip);
    }

    /**
     * Set up hover and click interactions for states
     */
    setupStateInteractions() {
        const states = this.container.querySelectorAll('path[data-state]');

        states.forEach(state => {
            const stateName = state.dataset.state;
            const languages = stateLanguages[stateName] || [];

            // Mark states with data
            if (languages.length > 0) {
                state.classList.add('has-data');
            }

            // Hover events
            state.addEventListener('mouseenter', (e) => this.showTooltip(e, stateName, languages));
            state.addEventListener('mousemove', (e) => this.moveTooltip(e));
            state.addEventListener('mouseleave', () => this.hideTooltip());

            // Click events
            state.addEventListener('click', () => this.handleStateClick(stateName, languages));
        });
    }

    /**
     * Highlight states that have data
     */
    highlightStatesWithData() {
        Object.keys(stateLanguages).forEach(stateId => {
            const statePath = this.container.querySelector(`path[data-state="${stateId}"]`);
            if (statePath) {
                statePath.classList.add('has-data');

                // Add data count indicator
                const count = stateLanguages[stateId].length;
                statePath.dataset.languageCount = count;
            }
        });
    }

    /**
     * Show tooltip with state info
     * @param {MouseEvent} e - Mouse event
     * @param {string} stateName - State ID
     * @param {Array} languages - Languages in state
     */
    showTooltip(e, stateName, languages) {
        const displayName = this.formatStateName(stateName);

        if (languages.length > 0) {
            const langNames = languages.map(langId => {
                const lang = LANGUAGES.find(l => l.id === langId);
                return lang ? lang.name : langId;
            });

            this.tooltip.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 6px;">${displayName}</div>
        <div style="color: rgba(255,255,255,0.7); font-size: 12px; margin-bottom: 8px;">
          ${languages.length} language${languages.length > 1 ? 's' : ''} documented
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 4px;">
          ${langNames.map(name => `
            <span style="
              padding: 2px 8px;
              background: rgba(255, 107, 53, 0.3);
              border-radius: 12px;
              font-size: 11px;
            ">${name}</span>
          `).join('')}
        </div>
        <div style="margin-top: 8px; font-size: 11px; color: rgba(255,255,255,0.5);">
          Click to filter archive
        </div>
      `;
        } else {
            this.tooltip.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 4px;">${displayName}</div>
        <div style="color: rgba(255,255,255,0.5); font-size: 12px;">
          No data yet
        </div>
      `;
        }

        this.moveTooltip(e);
        this.tooltip.style.opacity = '1';
    }

    /**
     * Move tooltip to follow cursor
     * @param {MouseEvent} e - Mouse event
     */
    moveTooltip(e) {
        const x = e.clientX + 15;
        const y = e.clientY + 15;

        // Keep tooltip on screen
        const rect = this.tooltip.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width - 20;
        const maxY = window.innerHeight - rect.height - 20;

        this.tooltip.style.left = `${Math.min(x, maxX)}px`;
        this.tooltip.style.top = `${Math.min(y, maxY)}px`;
    }

    /**
     * Hide tooltip
     */
    hideTooltip() {
        this.tooltip.style.opacity = '0';
    }

    /**
     * Handle state click
     * @param {string} stateName - State ID
     * @param {Array} languages - Languages in state
     */
    handleStateClick(stateName, languages) {
        if (languages.length === 0) return;

        // Update active state visual
        this.container.querySelectorAll('path').forEach(p => p.classList.remove('active'));
        const statePath = this.container.querySelector(`path[data-state="${stateName}"]`);
        if (statePath) {
            statePath.classList.add('active');
        }

        this.activeState = stateName;

        // Trigger callback
        if (this.onStateClick) {
            this.onStateClick(stateName, languages);
        }

        // Scroll to archive section
        const archiveSection = document.getElementById('archive');
        if (archiveSection) {
            archiveSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    /**
     * Format state name for display
     * @param {string} stateId - State ID (kebab-case)
     * @returns {string} Formatted name
     */
    formatStateName(stateId) {
        return stateId
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    /**
     * Clear active state
     */
    clearActiveState() {
        this.container.querySelectorAll('path').forEach(p => p.classList.remove('active'));
        this.activeState = null;
    }

    /**
     * Set active state programmatically
     * @param {string} stateId - State ID
     */
    setActiveState(stateId) {
        this.clearActiveState();
        const statePath = this.container.querySelector(`path[data-state="${stateId}"]`);
        if (statePath) {
            statePath.classList.add('active');
            this.activeState = stateId;
        }
    }
}

// Will be instantiated in main.js
