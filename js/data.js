/**
 * LOKVIDYA - Data Module
 * Loads archive data from archive_data.json
 */

// Global variables populated by loadArchiveData()
let LANGUAGES = [];
let CATEGORIES = [];
let FOLKSONG_QUESTIONS = [];
let archiveData = [];

const stateLanguages = {
  'jharkhand': ['ho', 'sadri', 'mundari'],
  'assam': ['bodo', 'assamese', 'deuri'],
  'nagaland': ['nagamese'],
  'arunachal-pradesh': ['wangcho', 'kaman-mishmi'],
  'meghalaya': ['khasi'],
  'manipur': ['meitei'],
  'bihar': ['khortha', 'santhali']
};

/**
 * Load archive data from the JSON file.
 * Must be called (and awaited) before any other module uses the data.
 */
async function loadArchiveData() {
  try {
    const response = await fetch('archive_data.json');
    const data = await response.json();

    LANGUAGES = data.languages || [];
    FOLKSONG_QUESTIONS = data.folksong_questions || [];
    archiveData = data.entries || [];

    // Rebuild CATEGORIES with icon HTML from icon_asset paths
    CATEGORIES = (data.categories || []).map(cat => ({
      ...cat,
      icon: `<img src="${cat.icon_asset}" width="18" height="18" alt="${cat.name}" style="display: inline-block; vertical-align: middle; margin-right: 6px;">`
    }));

    console.log(`📦 Loaded ${archiveData.length} archive entries from JSON`);
  } catch (err) {
    console.error('Failed to load archive_data.json:', err);
  }
}

function getStats() {
  const entriesByCategory = {};
  const entriesByType = {};

  archiveData.forEach(item => {
    entriesByCategory[item.category] = (entriesByCategory[item.category] || 0) + 1;

    // Derive type from the entry shape
    const type = item.category === 'folksongs' ? 'audio' : 'images';
    entriesByType[type] = (entriesByType[type] || 0) + 1;
  });

  return {
    totalEntries: 8067,
    totalLanguages: 13,
    states: 7,
    contributors: 360,
    entriesByCategory,
    entriesByType
  };
}
