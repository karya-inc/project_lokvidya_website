/**
 * LOKVIDYA - Sample Data with Bilingual Content
 * Folksongs: questions/answers in English + native language
 * Other categories: native language + Hindi translation
 */

const LANGUAGES = [
  { id: 'english', name: 'English', region: 'Pan-India', state: 'Multiple' },
  { id: 'hindi', name: 'Hindi', nativeName: 'हिंदी', region: 'North India', state: 'Multiple' },
  { id: 'mundari', name: 'Mundari', nativeName: 'मुंडारी', region: 'East India', state: 'Jharkhand' },
  { id: 'ho', name: 'Ho', nativeName: 'हो', region: 'East India', state: 'Jharkhand' },
  { id: 'santhali', name: 'Santhali', nativeName: 'সাঁওতালি', region: 'East India', state: 'Jharkhand' },
  { id: 'assamese', name: 'Assamese', nativeName: 'অসমীয়া', region: 'Northeast', state: 'Assam' },
  { id: 'bodo', name: 'Bodo', nativeName: 'बड़ो', region: 'Northeast', state: 'Assam' },
  { id: 'meitei', name: 'Meitei', nativeName: 'মৈতৈ', region: 'Northeast', state: 'Manipur' },
  { id: 'khasi', name: 'Khasi', nativeName: 'Khasi', region: 'Northeast', state: 'Meghalaya' },
  { id: 'nagamese', name: 'Nagamese', nativeName: 'Nagamese', region: 'Northeast', state: 'Nagaland' },
  { id: 'wangcho', name: 'Wangcho', nativeName: 'Wangcho', region: 'Northeast', state: 'Arunachal Pradesh' },
  { id: 'sadri', name: 'Sadri', nativeName: 'सादरी', region: 'East India', state: 'Jharkhand' },
  { id: 'khortha', name: 'Khortha', nativeName: 'खोरठा', region: 'East India', state: 'Jharkhand' },
  { id: 'deuri', name: 'Deuri', nativeName: 'Deuri', region: 'Northeast', state: 'Assam' },
  { id: 'kaman-mishmi', name: 'Kaman Mishmi', nativeName: 'Kaman', region: 'Northeast', state: 'Arunachal Pradesh' }
];

const CATEGORIES = [
  { id: 'folksongs', name: 'Folksongs', icon: '🎵', color: '#EC4899' },
  { id: 'agriculture', name: 'Agriculture', icon: '🌾', color: '#22C55E' },
  { id: 'forest', name: 'Forest', icon: '🌲', color: '#10B981' },
  { id: 'food', name: 'Food/Nutrition', icon: '🍲', color: '#F97316' },
  { id: 'culture', name: 'Culture/Traditions', icon: '🏛️', color: '#8B5CF6' },
  { id: 'other', name: 'Other', icon: '📁', color: '#64748B' }
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
    language: 'hindi',
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
    content: {
      native: 'ई बास हके ईकी हमरे मन आपन बारी यातो अंगना आस पास लगाइल इकर से बास कर बहुत सामन बनेला जेकी सुफ दौरा ओड़िया इसब बनेला और इके बाजार में बेचीला जेकर से हमरे कर दू पैसा होवेला',
      hindi: 'ये बांस का पेड़ है इसको हमलोग अपना आंगन या बारी में लगाते हैं। इससे बहुत ही समान बनता है जैसे की सूप, दौरा, ओड़िया। इस सब को बनाकर बाजार में भेजते हैं जिससे कि हम लोगों को दो पैसा मिलता है। घर का थोड़ा बहुत मदद हो जाता है।'
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
    content: {
      native: 'Hamara warrior tradition bohut purana ase. Headdress mein hornbill feather thake, bravery se earn kore. Tattoo laga mane story ase.',
      hindi: 'हमारी योद्धा परंपराएं कई पीढ़ियों पुरानी हैं। योद्धाओं द्वारा पहना जाने वाला मुकुट में हॉर्नबिल पंख होते हैं, जो बहादुरी के कार्यों से अर्जित होते हैं। हर टैटू एक कहानी बताता है।'
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
    content: {
      native: 'चंद्र तिथि देख के बोवाई करते। बैल से हल चलाते। अलग अलग धान लगाते।',
      hindi: 'हम रोपाई के लिए चंद्र कैलेंडर का पालन करते हैं। मिट्टी को बैलों द्वारा खींचे जाने वाले लकड़ी के हलों से तैयार किया जाता है। हम अलग-अलग भूभाग के लिए कई धान की किस्में उगाते हैं।'
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
    content: {
      native: 'Jhum cultivation hamara purana tarika ase. Clear kore, burn kore, lagaye, phir land rest dete. Pahile 15-20 saal cycle thakise.',
      hindi: 'झूम पीढ़ियों से प्रचलित स्थानांतरित खेती है। हम साफ करते हैं, जलाते हैं, बोते हैं, और फिर जमीन को आराम देते हैं। पहले चक्र 15-20 साल का था।'
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
    content: {
      native: 'Law kyntang ka long ki rim ka jingialang. Ym lah buh tap dieng. Ki blei bad ki tymmen ki shong hajan.',
      hindi: 'लॉ क्यंटांग सदियों से संरक्षित पवित्र वन हैं। कोई पेड़ नहीं काटा जा सकता। ये हमारे देवताओं और पूर्वजों के घर हैं। कई दुर्लभ प्रजातियां केवल यहीं बची हैं।'
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
    content: {
      native: 'जंगल हमार दवाखाना हे। हर बीमारी के पेड़-पौधा से इलाज हे। सैकड़ों दवाई जानत हन।',
      hindi: 'जंगल हमारी फार्मेसी है। हर बीमारी के लिए एक पौधे का इलाज है। हम सैकड़ों उपचार जानते हैं - बुखार, घाव, पेट दर्द, यहां तक कि सांप के काटने के लिए भी।'
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
    content: {
      native: 'মৈতৈ চাক অসি ঙারী, অঙাংবা, অরু অমাগী মতৌ। চকমা খৎনবা ৱাৎপা য়াৰোই।',
      hindi: 'मैतेई भोजन किण्वित मछली (नगरी), ताजी सब्जियों और चावल पर आधारित है। कोई भी भोजन किण्वित सामग्री के बिना पूर्ण नहीं है। बहुत स्वस्थ और स्वादिष्ट।'
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
    content: {
      native: 'दा टायम रे बीर होरो रे साग-पात भरल। तीस-चालीस किसिम जानते। कोय खून के, कोय हड्डी के।',
      hindi: 'मानसून के दौरान जंगल और खेत खाने योग्य साग से भरे होते हैं। हम 30-40 किस्में जानते हैं - कुछ खून के लिए, कुछ हड्डियों के लिए, कुछ गर्मी में शरीर ठंडा करने के लिए।'
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
    content: {
      native: 'মৈতৈ নুপী খুদিংমক ফী শোকপী খংই। ফীগী মওং অমদি অর্থ অমা লৈ।',
      hindi: 'हर मैतेई महिला बुनाई सीखती है। पैटर्न के अर्थ हैं - मंदिर मोटिफ, ड्रैगन पैटर्न, फूल डिजाइन। पारंपरिक कपड़े केवल हथकरघे के होते हैं।'
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
    content: {
      native: 'Deuri pottery chaka lagaye nai banaye. Coil method use kore. Different shape ritual ke liye - pani, chawal, offering.',
      hindi: 'देउरी मिट्टी के बर्तन कुम्हार के चाक के बिना बनाये जाते हैं। कुंडल विधि का उपयोग किया जाता है। अलग-अलग आकार अनुष्ठानों के लिए - पानी, चावल, चढ़ावे के बर्तन। महिलाएं ही कुम्हार होती हैं।'
    }
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
  'jharkhand': ['sadri', 'mundari', 'ho', 'santhali', 'khortha'],
  'assam': ['assamese', 'bodo', 'deuri'],
  'nagaland': ['nagamese'],
  'arunachal-pradesh': ['wangcho', 'kaman-mishmi'],
  'meghalaya': ['khasi'],
  'manipur': ['meitei']
};
