/**
 * GyaanSetu — Hindi Translations (हिंदी)
 */
const hi = {
  // ─── General ──────────────────────────────────────────────────────
  appName: 'ज्ञानसेतु',
  tagline: 'शिक्षा और उद्योग के बीच की खाई को पाटना — हर भारतीय भाषा में',

  // ─── Navigation ───────────────────────────────────────────────────
  nav: {
    home: 'होम',
    courses: 'कोर्सेज',
    labs: 'लैब्स',
    projects: 'प्रोजेक्ट्स',
    pricing: 'प्राइसिंग',
    login: 'लॉगिन',
    signup: 'साइन अप',
    dashboard: 'डैशबोर्ड',
    myCourses: 'मेरे कोर्सेज',
    leaderboard: 'लीडरबोर्ड',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    help: 'मदद',
    logout: 'लॉगआउट',
  },

  // ─── Auth ─────────────────────────────────────────────────────────
  auth: {
    loginTitle: 'वापसी पर स्वागत है',
    loginSubtitle: 'सीखना जारी रखने के लिए अपनी जानकारी दर्ज करें',
    signupTitle: 'अपना अकाउंट बनाएं',
    signupSubtitle: 'आज ही अपनी सीखने की यात्रा शुरू करें',
    forgotPasswordTitle: 'पासवर्ड भूल गए?',
    forgotPasswordSubtitle: 'हम आपको रीसेट लिंक भेजेंगे',
    emailLabel: 'ईमेल पता',
    passwordLabel: 'पासवर्ड',
    confirmPasswordLabel: 'पासवर्ड की पुष्टि करें',
    fullNameLabel: 'पूरा नाम',
    rememberMe: 'मुझे याद रखें',
    forgotPassword: 'पासवर्ड भूल गए?',
    loginButton: 'लॉगिन करें',
    signupButton: 'अकाउंट बनाएं',
    orContinueWith: 'या इसके साथ जारी रखें',
    noAccount: 'अकाउंट नहीं है?',
    hasAccount: 'पहले से अकाउंट है?',
    agreeToTerms: 'मैं नियम और शर्तों से सहमत हूं',
    passwordStrength: {
      weak: 'कमजोर',
      medium: 'मध्यम',
      strong: 'मजबूत',
    },
  },

  // ─── Onboarding ───────────────────────────────────────────────────
  onboarding: {
    languageTitle: 'अपनी सीखने की भाषा चुनें',
    languageSubtitle: 'वह भाषा चुनें जिसमें आप सीखना चाहते हैं',
    goalTitle: 'आपका मुख्य लक्ष्य क्या है?',
    goalSubtitle: 'हम आपकी सीखने की राह को व्यक्तिगत बनाएंगे',
    confirmContinue: 'पुष्टि करें और आगे बढ़ें',
    skipForNow: 'अभी छोड़ें (अंग्रेज़ी)',
    startLearning: 'सीखना शुरू करें →',
  },

  // ─── Dashboard ────────────────────────────────────────────────────
  dashboard: {
    greeting: 'सुप्रभात',
    learningIn: 'सीख रहे हैं',
    switch: 'बदलें',
    coursesEnrolled: 'नामांकित कोर्सेज',
    labsCompleted: 'पूर्ण किए गए लैब्स',
    projectsSubmitted: 'जमा किए गए प्रोजेक्ट्स',
    xpPoints: 'XP अंक',
    resumeLearning: 'जहां छोड़ा था वहां से जारी रखें',
    viewAll: 'सभी देखें →',
    recommendedLabs: 'आपके लिए अनुशंसित लैब्स',
    activeProjects: 'आपके सक्रिय प्रोजेक्ट्स',
    leaderboardPreview: 'सामुदायिक लीडरबोर्ड',
    announcements: 'नया क्या है 🎉',
    startFirstCourse: 'अपना पहला कोर्स शुरू करें',
  },

  // ─── Courses ──────────────────────────────────────────────────────
  courses: {
    catalog: 'कोर्सेज खोजें',
    filters: 'फ़िल्टर',
    clearAll: 'सब हटाएं',
    showing: 'दिखा रहा है',
    courses: 'कोर्सेज',
    sortBy: 'क्रमबद्ध करें',
    popular: 'लोकप्रिय',
    newest: 'नवीनतम',
    rating: 'रेटिंग',
    priceAsc: 'कीमत ↑',
    priceDesc: 'कीमत ↓',
    enrollNow: 'अभी नामांकन करें',
    tryFree: 'पहला पाठ मुफ़्त आज़माएं',
    whatYouLearn: 'आप क्या सीखेंगे',
    courseContent: 'कोर्स सामग्री',
    requirements: 'आवश्यकताएं',
    aboutInstructor: 'प्रशिक्षक के बारे में',
    studentReviews: 'छात्र समीक्षाएं',
    relatedCourses: 'संबंधित कोर्सेज',
    continueLearning: 'सीखना जारी रखें →',
    completed: 'पूर्ण',
    inProgress: 'चल रहा है',
    bookmarked: 'बुकमार्क किया',
  },

  // ─── Labs ─────────────────────────────────────────────────────────
  labs: {
    catalog: 'लैब्स',
    startLab: 'लैब शुरू करें →',
    submitLab: 'लैब सबमिट करें',
    runCode: 'चलाएं',
    instructions: 'निर्देश',
    objectives: 'उद्देश्य',
    problemStatement: 'समस्या विवरण',
    testCases: 'टेस्ट केसेज',
    hints: 'संकेत',
    output: 'आउटपुट',
    testResults: 'टेस्ट परिणाम',
    console: 'कंसोल',
    noOutputYet: 'अभी कोई आउटपुट नहीं। चलाने के लिए Run दबाएं।',
    submitConfirm: 'लैब सबमिट करें? यह आपका सबमिशन प्रयास इस्तेमाल करेगा।',
  },

  // ─── Common ───────────────────────────────────────────────────────
  common: {
    loading: 'लोड हो रहा है...',
    error: 'कुछ गलत हो गया',
    retry: 'पुनः प्रयास करें',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    search: 'खोजें...',
    noResults: 'कोई परिणाम नहीं मिला',
    comingSoon: 'जल्द आ रहा है',
    live: 'लाइव',
    free: 'मुफ़्त',
    viewMore: 'और देखें',
    goHome: '← होम पर जाएं',
    browseCourses: 'कोर्सेज ब्राउज़ करें',
  },

  // ─── Footer ───────────────────────────────────────────────────────
  footer: {
    platform: 'प्लेटफ़ॉर्म',
    company: 'कंपनी',
    about: 'हमारे बारे में',
    blog: 'ब्लॉग',
    careers: 'करियर',
    press: 'प्रेस',
    contact: 'संपर्क',
    privacy: 'गोपनीयता नीति',
    terms: 'सेवा की शर्तें',
    cookies: 'कुकी नीति',
    newsletter: 'अपडेट रहें',
    newsletterPlaceholder: 'अपना ईमेल दर्ज करें',
    subscribe: 'सदस्यता लें',
    copyright: '© 2026 ज्ञानसेतु। सर्वाधिकार सुरक्षित।',
  },
};

export default hi;
