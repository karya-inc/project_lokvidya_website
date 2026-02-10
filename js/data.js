/**
 * LOKVIDYA - Sample Data with Bilingual Content
 * Folksongs: questions/answers in English + native language
 * Other categories: native language + Hindi translation
 */

const LANGUAGES = [
  { id: 'mundari', name: 'Mundari', nativeName: 'मुंडारी', region: 'East India', state: 'Jharkhand' },
  { id: 'ho', name: 'Ho', nativeName: 'हो', region: 'East India', state: 'Jharkhand' },
  { id: 'santhali', name: 'Santhali', nativeName: 'সাঁওতালি', region: 'East India', state: 'Bihar' },
  { id: 'assamese', name: 'Assamese', nativeName: 'অসমীয়া', region: 'Northeast', state: 'Assam' },
  { id: 'bodo', name: 'Bodo', nativeName: 'बड़ो', region: 'Northeast', state: 'Assam' },
  { id: 'meitei', name: 'Meitei', nativeName: 'মৈতৈ', region: 'Northeast', state: 'Manipur' },
  { id: 'khasi', name: 'Khasi', nativeName: 'Khasi', region: 'Northeast', state: 'Meghalaya' },
  { id: 'nagamese', name: 'Nagamese', nativeName: 'Nagamese', region: 'Northeast', state: 'Nagaland' },
  { id: 'wangcho', name: 'Wangcho', nativeName: 'Wangcho', region: 'Northeast', state: 'Arunachal Pradesh' },
  { id: 'sadri', name: 'Sadri', nativeName: 'सादरी', region: 'East India', state: 'Jharkhand' },
  { id: 'khortha', name: 'Khortha', nativeName: 'खोरठा', region: 'East India', state: 'Bihar' },
  { id: 'deuri', name: 'Deuri', nativeName: 'Deuri', region: 'Northeast', state: 'Assam' },
  { id: 'kaman-mishmi', name: 'Kaman Mishmi', nativeName: 'Kaman', region: 'Northeast', state: 'Arunachal Pradesh' }
];

const CATEGORIES = [
  {
    id: 'folksongs',
    name: 'Folksongs',
    icon: `<img src="assets/music-note.png" width="18" height="18" alt="Folksongs" style="display: inline-block; vertical-align: middle; margin-right: 6px;">`,
    color: '#166176'
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    icon: `<img src="assets/sprout.png" width="18" height="18" alt="Agriculture" style="display: inline-block; vertical-align: middle; margin-right: 6px;">`,
    color: '#00AFDF'
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: `<img src="assets/trees.png" width="18" height="18" alt="Forest" style="display: inline-block; vertical-align: middle; margin-right: 6px;">`,
    color: '#14B166'
  },
  {
    id: 'food',
    name: 'Food/Nutrition',
    icon: `<img src="assets/noun-food-7999827.png" width="18" height="18" alt="Food" style="display: inline-block; vertical-align: middle; margin-right: 6px;">`,
    color: '#D8FA70'
  },
  {
    id: 'culture',
    name: 'Culture/Traditions',
    icon: `<img src="assets/parthenon.png" width="18" height="18" alt="Culture" style="display: inline-block; vertical-align: middle; margin-right: 6px;">`,
    color: '#8FE7FF'
  },
  {
    id: 'other',
    name: 'Other',
    icon: `<img src="assets/application.png" width="18" height="18" alt="Other" style="display: inline-block; vertical-align: middle; margin-right: 6px;">`,
    color: '#94A3B8'
  }
];

const FOLKSONG_QUESTIONS = [
  { id: 'about_song', en: 'What is this song about, and on what occasions is it traditionally sung?' },
  { id: 'tradition_origin', en: 'Who taught you this song, and how old is this tradition?' },
  { id: 'language_details', en: 'What language/dialect is this in, and are there any special words or phrases?' },
  { id: 'performance_style', en: 'Is this song accompanied by any instruments, dance, or gestures?' }
];

const archiveData = [
  // FOLKSONGS - with bilingual Q&A
  {
    id: 1,
    title: 'Harvest Song of the Mundari',
    language: 'mundari',
    category: 'folksongs',
    type: 'audio',
    contributor: 'रामलाल मुंडा',
    date: '2025-12-15',
    duration: '02:30',
    questions: {
      about_song: {
        native: 'इ गीत बरा दिसुम रे गाइ जाना। सरहुल परब रे, धान काटे टायम रे गाइजाना।',
        en: 'This song celebrates the paddy harvest. It is sung during Sarhul festival when the first grains are collected.'
      },
      tradition_origin: {
        native: 'आइयो आपु सिखाव ले। पांच-छह पुस्ता से आ रहा है।',
        en: 'My grandmother taught me this song. It has been in our family for 5-6 generations.'
      },
      language_details: {
        native: 'मुंडारी भाषा में। "सेंद्रा" मतलब फसल का आशीर्वाद, "सिंगबोंगा" मतलब सूर्य देवता।',
        en: 'This is in Mundari dialect. "Sendra" means harvest blessing, "Singbonga" means sun god.'
      },
      performance_style: {
        native: 'सब मिल के गाइजाना। मांदर बाजा, बांसुरी। गोल घेरा में नाच।',
        en: 'Sung in groups with Mandar drum and bamboo flutes. Circular dance with hand-holding.'
      }
    }
  },
  {
    id: 2,
    title: 'Bihu Dance Song - Husori',
    language: 'assamese',
    category: 'folksongs',
    type: 'audio',
    contributor: 'প্ৰণৱ শৰ্মা',
    date: '2025-11-20',
    duration: '03:15',
    questions: {
      about_song: {
        native: 'এইটো হুঁচৰি গীত। বহাগ বিহুত গোৱা হয়। নতুন বছৰক আদৰণি জনোৱা হয়।',
        en: 'This is a Husori song sung during Bohag Bihu (spring festival). It welcomes the Assamese New Year.'
      },
      tradition_origin: {
        native: 'মোৰ খুড়াই শিকাইছিল। বহু শতিকা পুৰণি পৰম্পৰা।',
        en: 'My uncle taught me. This tradition is many centuries old, connected to agrarian cycles.'
      },
      language_details: {
        native: 'অসমীয়া ভাষা। "বহাগ" মানে বৈশাখ মাহ। "গাভৰু" মানে যুৱতী।',
        en: 'Assamese language. "Bohag" means month of Vaisakh. "Gabhoru" means young woman.'
      },
      performance_style: {
        native: 'দলীয়ভাৱে গোৱা হয়। ঢোল আৰু পেঁপা বজোৱা হয়। নাচো থাকে।',
        en: 'Sung in groups with dhol drum and pepa horn. Vigorous dancing by both men and women.'
      }
    }
  },
  {
    id: 3,
    title: 'Santhali Wedding Chant',
    language: 'santhali',
    category: 'folksongs',
    type: 'audio',
    contributor: 'সুমিত্রা মুর্মু',
    date: '2025-10-08',
    duration: '04:20',
    questions: {
      about_song: {
        native: 'ᱵᱟᱯᱞᱟ ᱜᱤᱛ ᱠᱟᱱᱟ। ᱵᱟᱦᱩ ᱵᱟᱯᱞᱟ ᱛᱟᱭᱟᱸ ᱧᱩᱛᱩᱢ ᱠᱟᱱᱟ।',
        en: 'This is a Bapla (wedding) song. It is sung when the bride leaves her parents\' home.'
      },
      tradition_origin: {
        native: 'ᱟᱭᱳ ᱟᱨ ᱠᱟᱠᱤ ᱥᱤᱠᱷᱟᱣ ᱮᱱᱟ। ᱡᱩᱜ ᱡᱩᱜ ᱥᱮ ᱟᱸᱡᱮ।',
        en: 'My mother and aunts taught me. This oral tradition goes back countless generations.'
      },
      language_details: {
        native: 'ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ। "ᱵᱟᱯᱞᱟ" ᱢᱟᱱᱮ ᱵᱤᱦᱟ। "ᱡᱟᱦᱮᱨ" ᱢᱟᱱᱮ ᱥᱟᱨᱱᱟ ᱛᱷᱟᱱ।',
        en: 'Santhali language. "Bapla" means marriage. "Jaher" is the sacred grove.'
      },
      performance_style: {
        native: 'ᱠᱩᱲᱤ ᱢᱟᱱᱟᱜ ᱧᱩᱛᱩᱢ। ᱵᱟᱡᱟ ᱵᱟᱝ। ᱜᱳᱲᱟ ᱛᱮ ᱵᱟᱦᱩ ᱠᱮ ᱩᱛᱟᱹᱨᱚᱜ।',
        en: 'Sung only by women in slow, melodious style. No instruments. Women circle the bride.'
      }
    }
  },

  // CULTURE - with native language + Hindi translation
  {
    id: 4,
    title: 'बांस का पेड़ - Bamboo Tradition',
    language: 'sadri',
    category: 'culture',
    type: 'images',
    contributor: 'रानी कुमारी',
    date: '2025-12-01',
    images: [
      { id: 1, description: 'बांस का पेड़ हमारे घर के पास', placeholder: '🎋' },
      { id: 2, description: 'बांस से बना सामान', placeholder: '🧺' },
      { id: 3, description: 'बांस की टोकरी बनाते हुए', placeholder: '👐' },
      { id: 4, description: 'बांस का जंगल', placeholder: '🌿' },
      { id: 5, description: 'बांस के उत्पाद बाज़ार में', placeholder: '🏪' }
    ],
    questions: {
      about_item: {
        native: 'ई बास हके ईकी हमरे मन आपन बारी यातो अंगना आस पास लगाइल इकर से बास कर बहुत सामन बनेला जेकी सुफ दौरा ओड़िया इसब बनेला।',
        en: 'This is the bamboo tree we plant in our yards. It is used to make essential items like baskets (suph, doura, odia).'
      },
      benefits: {
        native: 'और इके बाजार में बेचीला जेकर से हमरे कर दू पैसा होवेला',
        en: 'We sell these products in the market, which provides us with a small income to help support the household.'
      }
    }
  },
  {
    id: 5,
    title: 'Ho Mage Dance Festival',
    language: 'ho',
    category: 'culture',
    type: 'images',
    contributor: 'सुनील पुर्ती',
    date: '2025-11-25',
    images: [
      { id: 1, description: 'Mage dancers in traditional dress', placeholder: '💃' },
      { id: 2, description: 'Community gathering', placeholder: '👨‍👩‍👧‍👦' },
      { id: 3, description: 'Traditional ornaments', placeholder: '💎' },
      { id: 4, description: 'Sacred fire ritual', placeholder: '🔥' },
      { id: 5, description: 'Young dancers learning', placeholder: '🧒' }
    ],
    content: {
      native: 'माघे पोरोब हो को सबसे बड़ा त्योहार है। माघ महीना में मनाया जाता। पूरा गांव मिल के नाचता गाता।',
      hindi: 'माघ पोरब हमारा सबसे महत्वपूर्ण त्यौहार है जो माघ महीने में मनाया जाता है। पूरा गांव इस फसल धन्यवाद में भाग लेता है। पुरुष और महिलाएं एक साथ गोल घेरे में नाचते हैं।'
    }
  },
  {
    id: 6,
    title: 'Naga Warrior Traditions',
    language: 'nagamese',
    category: 'culture',
    type: 'images',
    contributor: 'Imkong Ao',
    date: '2025-10-15',
    images: [
      { id: 1, description: 'Warrior headdress with hornbill feathers', placeholder: '🪶' },
      { id: 2, description: 'Ancient dao sword collection', placeholder: '⚔️' },
      { id: 3, description: 'Warrior dance during festival', placeholder: '🕺' },
      { id: 4, description: 'Tattooed elder', placeholder: '👴' },
      { id: 5, description: 'Community longhouse', placeholder: '🏠' }
    ],
    questions: {
      about_tradition: {
        native: 'Hamara warrior tradition bohut purana ase. Headdress mein hornbill feather thake, bravery se earn kore. Tattoo laga mane story ase.',
        en: 'Our warrior traditions go back generations. The headdress features hornbill feathers earned through acts of bravery. Every tattoo tells a story.'
      }
    }
  },

  // AGRICULTURE
  {
    id: 7,
    title: 'Traditional Rice Cultivation',
    language: 'ho',
    category: 'agriculture',
    type: 'images',
    contributor: 'बिरसा हेम्ब्रम',
    date: '2025-12-01',
    images: [
      { id: 1, description: 'Preparing the paddy field', placeholder: '🌾' },
      { id: 2, description: 'Transplanting seedlings', placeholder: '🌱' },
      { id: 3, description: 'Traditional irrigation', placeholder: '💧' },
      { id: 4, description: 'Harvest time', placeholder: '🚜' },
      { id: 5, description: 'Grain storage', placeholder: '🏺' }
    ],
    questions: {
      about_cultivation: {
        native: 'चंद्र तिथि देख के बोवाई करते। बैल से हल चलाते। अलग अलग धान लगाते।',
        en: 'We follow the lunar calendar for planting. Soil is prepared with wooden ploughs pulled by bullocks.'
      },
      varieties: {
        native: 'मिट्टी को बैलों द्वारा खींचे जाने वाले लकड़ी के हलों से तैयार किया जाता है।',
        en: 'We grow several varieties of paddy suited for different terrains.'
      }
    }
  },
  {
    id: 8,
    title: 'Jhum Cultivation in Nagaland',
    language: 'nagamese',
    category: 'agriculture',
    type: 'images',
    contributor: 'Limatemjen Jamir',
    date: '2025-11-15',
    images: [
      { id: 1, description: 'Clearing forest', placeholder: '🪓' },
      { id: 2, description: 'Burning vegetation', placeholder: '🔥' },
      { id: 3, description: 'Mixed cropping', placeholder: '🌽' },
      { id: 4, description: 'Women in jhum field', placeholder: '👩‍🌾' },
      { id: 5, description: 'Fallow land regenerating', placeholder: '🌳' }
    ],
    questions: {
      about_jhum: {
        native: 'Jhum cultivation hamara purana tarika ase. Clear kore, burn kore, lagaye, phir land rest dete.',
        en: 'Jhum is shifting cultivation practiced for generations. We clear, burn, sow, and then let the land rest.'
      },
      cycle: {
        native: 'Pahile 15-20 saal cycle thakise.',
        en: 'Earlier the fallow cycle used to be 15-20 years for fertility recovery.'
      }
    }
  },

  // FOREST
  {
    id: 9,
    title: 'Sacred Groves of Meghalaya',
    language: 'khasi',
    category: 'forest',
    type: 'images',
    contributor: 'Donbok Syiem',
    date: '2025-12-10',
    images: [
      { id: 1, description: 'Entrance to law kyntang', placeholder: '🚪' },
      { id: 2, description: 'Ancient protected trees', placeholder: '🌳' },
      { id: 3, description: 'Ritual at grove entrance', placeholder: '🙏' },
      { id: 4, description: 'Rare orchids', placeholder: '🌸' },
      { id: 5, description: 'Community protection', placeholder: '🛡️' }
    ],
    questions: {
      about_groves: {
        native: 'Law kyntang ka long ki rim ka jingialang. Ym lah buh tap dieng. Ki blei bad ki tymmen ki shong hajan.',
        en: 'Law Kyntang are sacred forests protected for centuries. No tree can be cut as they are homes of gods and ancestors.'
      }
    }
  },
  {
    id: 10,
    title: 'Medicinal Plants Knowledge',
    language: 'sadri',
    category: 'forest',
    type: 'images',
    contributor: 'गुनीया बाबा',
    date: '2025-11-02',
    images: [
      { id: 1, description: 'Healer collecting herbs', placeholder: '🌿' },
      { id: 2, description: 'Drying medicinal leaves', placeholder: '☀️' },
      { id: 3, description: 'Preparing bark medicine', placeholder: '🧪' },
      { id: 4, description: 'Healing ceremony', placeholder: '✨' },
      { id: 5, description: 'Teaching next generation', placeholder: '👨‍🏫' }
    ],
    questions: {
      about_plants: {
        native: 'जंगल हमार दवाखाना हे। हर बीमारी के पेड़-पौधा से इलाज हे। सैकड़ों दवाई जानत हन।',
        en: 'The forest is our pharmacy. There is a plant-based cure for every ailment. We know hundreds of remedies.'
      }
    }
  },

  // FOOD
  {
    id: 11,
    title: 'Traditional Meitei Cuisine',
    language: 'meitei',
    category: 'food',
    type: 'images',
    contributor: 'Chanu Moirangthem',
    date: '2025-12-05',
    images: [
      { id: 1, description: 'Eromba with vegetables', placeholder: '🥘' },
      { id: 2, description: 'Singju spicy salad', placeholder: '🥗' },
      { id: 3, description: 'Chamthong stew', placeholder: '🍲' },
      { id: 4, description: 'Kanghou stir-fry', placeholder: '🥬' },
      { id: 5, description: 'Banana leaf serving', placeholder: '🍌' }
    ],
    questions: {
      about_cuisine: {
        native: 'মৈতৈ চাক অসি ঙারী, অঙাংবা, অরু অমাগী মতৌ। চকমা খৎনবা ৱাৎপা য়াৰোই।',
        en: 'Meitei food is based on fermented fish (ngari), fresh vegetables, and rice. No meal is complete without fermented ingredients.'
      }
    }
  },
  {
    id: 12,
    title: 'Wild Greens of Jharkhand',
    language: 'mundari',
    category: 'food',
    type: 'images',
    contributor: 'सोमारी मुंडा',
    date: '2025-09-08',
    images: [
      { id: 1, description: 'Women collecting saag', placeholder: '👩‍🌾' },
      { id: 2, description: 'Wild green varieties', placeholder: '🥬' },
      { id: 3, description: 'Cooking with mustard oil', placeholder: '🍳' },
      { id: 4, description: 'Dried greens storage', placeholder: '📦' },
      { id: 5, description: 'Selling at weekly haat', placeholder: '🏪' }
    ],
    questions: {
      about_greens: {
        native: 'दा टायम रे बीर होरो रे साग-पात भरल। तीस-चालीस किसिम जानते। कोय खून के, कोय हड्डी के।',
        en: 'During monsoon, forests and fields are full of edible greens. We know 30-40 varieties for blood and bones.'
      }
    }
  },

  // OTHER
  {
    id: 13,
    title: 'Traditional Handloom Patterns',
    language: 'meitei',
    category: 'other',
    type: 'images',
    contributor: 'Ibemhal Thangjam',
    date: '2025-12-02',
    images: [
      { id: 1, description: 'Weaver at traditional loom', placeholder: '🧵' },
      { id: 2, description: 'Moirang Phee with temple motif', placeholder: '🏛️' },
      { id: 3, description: 'Natural plant dyes', placeholder: '🎨' },
      { id: 4, description: 'Finished ceremonial cloth', placeholder: '👗' },
      { id: 5, description: 'Young girl learning', placeholder: '👧' }
    ],
    questions: {
      about_handloom: {
        native: 'মৈতৈ নুপী খুদিংমক ফী শোকপী খংই। ফীগী মওং অমদি অর্থ অমা লৈ।',
        en: 'Every Meitei woman learns to weave. Patterns like temple motifs and dragon designs have deep meanings.'
      }
    }
  },
  {
    id: 14,
    title: 'Deuri Pottery Traditions',
    language: 'deuri',
    category: 'other',
    type: 'images',
    contributor: 'Malati Deuri',
    date: '2025-08-08',
    images: [
      { id: 1, description: 'Clay collection from riverbank', placeholder: '🏺' },
      { id: 2, description: 'Hand-shaping without wheel', placeholder: '👐' },
      { id: 3, description: 'Drying pots in shade', placeholder: '☀️' },
      { id: 4, description: 'Open firing pottery', placeholder: '🔥' },
      { id: 5, description: 'Finished ritual vessels', placeholder: '⚱️' }
    ],
    questions: {
      about_pottery: {
        native: 'Deuri pottery chaka lagaye nai banaye. Coil method use kore. Different shape ritual ke liye.',
        en: 'Deuri pottery is made without a potter\'s wheel using the coil method. Different shapes are for rituals.'
      }
    },
  }
];

function getStats() {
  const entriesByCategory = {};
  const entriesByType = {};

  archiveData.forEach(item => {
    entriesByCategory[item.category] = (entriesByCategory[item.category] || 0) + 1;
    entriesByType[item.type] = (entriesByType[item.type] || 0) + 1;
  });

  return {
    totalEntries: archiveData.length,
    totalLanguages: LANGUAGES.length,
    totalCategories: CATEGORIES.length,
    contributors: new Set(archiveData.map(item => item.contributor)).size,
    entriesByCategory,
    entriesByType
  };
}

const stateLanguages = {
  'jharkhand': ['ho', 'sadri', 'mundari'],
  'assam': ['bodo', 'assamese', 'deuri'],
  'nagaland': ['nagamese'],
  'arunachal-pradesh': ['wangcho', 'kaman-mishmi'],
  'meghalaya': ['khasi'],
  'manipur': ['meitei'],
  'bihar': ['khortha', 'santhali']
};
