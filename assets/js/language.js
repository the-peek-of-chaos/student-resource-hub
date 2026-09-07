/* ============================================================
   language.js
   Modular English/Arabic translation system.
   - Provides global translation dictionary
   - Manages language toggle state via localStorage
   - Applies RTL/LTR direction switching
   - Provides helper: Lang.t(key) for programmatic access
   ============================================================ */

const Lang = (function () {
  "use strict";

  const STORAGE_KEY = "student-hub-lang";

  /* ----------------------------------------------------------
     Translation dictionary
     Keys are camelCase without spaces.
     Add new keys here as needed across all pages.
     ---------------------------------------------------------- */
  const translations = {
    en: {
      brand: "StudentHub",
      nav_home: "Home",
      nav_cheatsheets: "Cheat Sheets",
      nav_tools: "Tools",
      nav_contact: "Contact",
      lang_toggle: "العربية",
      lang_toggle_aria: "Switch to Arabic",
      hero_badge: "Free Resources for Students",
      hero_title: "Your Ultimate Student Resource Hub",
      hero_subtitle:
        "Access comprehensive cheat sheets, powerful mini-tools, and study resources — all in one place.",
      hero_cta: "Browse Cheat Sheets",
      hero_cta_secondary: "Explore Tools",
      featured_title: "Featured Resources",
      featured_subtitle: "Hand-picked tools and references to boost your productivity.",
      stat_students: "Students Helped",
      stat_tools: "Mini Tools",
      stat_sheets: "Cheat Sheets",
      stat_languages: "Languages",
      feat_cheats_title: "Programming Cheat Sheets",
      feat_cheats_desc: "Quick references for HTML, CSS, JavaScript, Python, Git and more.",
      feat_tools_title: "Mini Tools",
      feat_tools_desc: "Text counters, case converters, password generators and beyond.",
      feat_resources_title: "Study Resources",
      feat_resources_desc: "Curated links and guides to accelerate your learning journey.",
      learn_more: "Learn More →",
      cta_title: "Ready to start studying smarter?",
      cta_text: "Join thousands of students using StudentHub to learn faster every day.",
      cta_button: "Get Started",
      footer_about: "A hub of free resources and mini-tools for students everywhere.",
      footer_quick_links: "Quick Links",
      footer_resources: "Resources",
      footer_newsletter: "Newsletter",
      footer_newsletter_text: "Get the latest study tips and resource updates.",
      footer_newsletter_placeholder: "Enter your email",
      footer_subscribe: "Subscribe",
      footer_rights: "All rights reserved.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      // Cheat-sheets page
      cs_title: "Programming Cheat Sheets",
      cs_subtitle: "Quick references for the most essential programming concepts.",
      cs_search_placeholder: "Search cheat sheets...",
      cs_category_all: "All",
      cs_category_html: "HTML",
      cs_category_css: "CSS",
      cs_category_javascript: "JavaScript",
      cs_category_python: "Python",
      cs_category_git: "Git",
      cs_copy: "Copy",
      cs_copied: "Copied!",
      cs_expand: "Expand",
      cs_collapse: "Collapse",
      cs_results: "results found",
      sheet_html_title: "HTML Basics",
      sheet_html_desc: "Document structure and common elements.",
      sheet_css_title: "CSS Selectors",
      sheet_css_desc: "Selectors, box model, flexbox and grid.",
      sheet_js_title: "JavaScript Fundamentals",
      sheet_js_desc: "Variables, functions, arrays, objects and async.",
      sheet_python_title: "Python Basics",
      sheet_python_desc: "Data types, lists, functions and loops.",
      sheet_git_title: "Git Commands",
      sheet_git_desc: "Setup, workflow, branching and undoing changes.",
      sheet_forms_title: "HTML Forms",
      sheet_forms_desc: "Input types, validation and form controls.",
      sheet_flex_title: "Flexbox Guide",
      sheet_flex_desc: "Alignment, wrapping and flex child properties.",
      sheet_json_title: "JSON Working",
      sheet_json_desc: "Format, parsing, and serialization in JavaScript.",
      // Learning Tracks / Multi-level courses
      tracks_title: "Multi-Level Learning Tracks",
      tracks_subtitle: "Comprehensive courses for HTML, CSS, Python and JavaScript — from beginner fundamentals to applied projects.",
      tracks_search_placeholder: "Search lessons, tracks or cheat sheets...",
      track_lessons: "lessons",
      track_beginner: "Beginner Fundamentals",
      track_applied: "Applied Practical Examples",
      track_project: "Mini-Project Guide",
      track_expand: "Expand Track",
      track_collapse: "Collapse Track",
      track_feedback: "Was this track helpful?",
      level: "Level",
      lesson: "Lesson",
      project_goal: "Project Goal",
      project_steps: "Steps",
      project_tips: "Pro Tips",
      // Cheat-sheets page
      cs_title: "Programming Cheat Sheets",
      cs_subtitle: "Quick references for the most essential programming concepts.",
      cs_search_placeholder: "Search cheat sheets...",
      cs_category_all: "All",
      cs_category_html: "HTML",
      cs_category_css: "CSS",
      cs_category_javascript: "JavaScript",
      cs_category_python: "Python",
      cs_category_git: "Git",
      cs_copy: "Copy",
      cs_copied: "Copied!",
      cs_expand: "Expand",
      cs_collapse: "Collapse",
      cs_results: "results found",
      // Track / lesson strings
      html_track_title: "HTML Learning Track",
      html_track_desc: "From document structure to semantic markup and forms.",
      css_track_title: "CSS Learning Track",
      css_track_desc: "Selectors, layout systems and modern responsive design.",
      python_track_title: "Python Learning Track",
      python_track_desc: "Foundations, data structures and real-world Python.",
      js_track_title: "JavaScript Learning Track",
      js_track_desc: "Core language to DOM interaction and async programming.",
      b_html: "HTML — Understand document structure, headings, paragraphs, lists, links, images and semantic elements.",
      b_css: "CSS — Learn selectors, the box model, colors, typography and the cascade.",
      b_python: "Python — Variables, data types, operators, conditionals and loops.",
      b_js: "JavaScript — Variables, data types, functions, arrays and objects.",
      a_html: "HTML — Build semantic layouts, accessible forms, media embeds and tables.",
      a_css: "CSS — Master Flexbox, Grid, positioning, transitions and responsive breakpoints.",
      a_python: "Python — List/dict comprehensions, functions, file I/O and error handling.",
      a_js: "JavaScript — DOM manipulation, events, template literals and array methods.",
      p_html: "HTML — Build a complete multi-section landing page with semantic structure and a contact form.",
      p_css: "CSS — Style a dark-themed dashboard with glassmorphism cards and responsive layout.",
      p_python: "Python — Build a command-line grade tracker that reads/writes a CSV file.",
      p_js: "JavaScript — Build an interactive to-do list app with localStorage persistence.",
      project_1_goal: "Landing Page",
      project_2_goal: "Glass Dashboard",
      project_3_goal: "Grade Tracker CLI",
      project_4_goal: "To-Do App",
      sheet_html_title: "HTML Basics",
      sheet_html_desc: "Document structure and common elements.",
      sheet_css_title: "CSS Selectors",
      sheet_css_desc: "Selectors, box model, flexbox and grid.",
      sheet_js_title: "JavaScript Fundamentals",
      sheet_js_desc: "Variables, functions, arrays, objects and async.",
      sheet_python_title: "Python Basics",
      sheet_python_desc: "Data types, lists, functions and loops.",
      sheet_git_title: "Git Commands",
      sheet_git_desc: "Setup, workflow, branching and undoing changes.",
      sheet_forms_title: "HTML Forms",
      sheet_forms_desc: "Input types, validation and form controls.",
      sheet_flex_title: "Flexbox Guide",
      sheet_flex_desc: "Alignment, wrapping and flex child properties.",
      sheet_json_title: "JSON Working",
      sheet_json_desc: "Format, parsing, and serialization in JavaScript.",
      // Tools page
      tools_title: "Interactive Student Tools",
      tools_subtitle: "Focus, calculate, and automate your study workflow.",
      tools_search_placeholder: "Search tools...",
      tool_pomodoro_title: "Pomodoro Focus Timer",
      tool_pomodoro_desc: "25-minute focus sessions with breaks to boost productivity.",
      tool_gpa_title: "GPA Calculator",
      tool_gpa_desc: "Calculate your semester and cumulative GPA with credit hours.",
      tool_textcounter_title: "Text Counter",
      tool_textcounter_desc: "Count words, characters, sentences and paragraphs.",
      tool_caseconv_title: "Case Converter",
      tool_caseconv_desc: "Convert text between uppercase, lowercase, title and sentence case.",
      tool_json_title: "JSON Formatter",
      tool_json_desc: "Format and validate your JSON data.",
      tool_password_title: "Password Generator",
      tool_password_desc: "Generate strong, secure passwords instantly.",
      tool_color_title: "Color Converter",
      tool_color_desc: "Convert between HEX and RGB color formats.",
      tool_lorem_title: "Lorem Ipsum Generator",
      tool_lorem_desc: "Generate placeholder text for your projects.",
      tool_analyze: "Analyze",
      tool_clear: "Clear",
      tool_copy_result: "Copy Result",
      tool_words: "Words",
      tool_chars: "Characters",
      tool_sentences: "Sentences",
      tool_paragraphs: "Paragraphs",
      // Pomodoro
      pomo_focus: "Focus",
      pomo_short_break: "Short Break",
      pomo_long_break: "Long Break",
      pomo_start: "Start",
      pomo_pause: "Pause",
      pomo_reset: "Reset",
      pomo_focus_label: "Focus minutes",
      pomo_add_course: "Add Course",
      pomo_sessions: "sessions completed",
      // GPA Calculator
      gpa_add_course: "Add Course",
      gpa_course_name: "Course Name",
      gpa_grade: "Grade",
      gpa_credits: "Credits",
      gpa_reset: "Reset",
      gpa_semester_gpa: "Semester GPA",
      gpa_cumulative_gpa: "Cumulative GPA",
      gpa_total_credits: "Total Credits",
      gpa_hint: "Select a grade (A=4.0, B+=3.3, etc.) and credit hours for each course.",
      // Fuzzy search
      search_placeholder: "Search lessons, tools, cheat sheets...",
      fuzzy_results: "results",
      fuzzy_no_results: "No matching results found.",
      global_search: "Instant Search",
      // Contact page
      contact_title: "Contact Us",
      contact_subtitle: "Have a question or feedback? We'd love to hear from you.",
      contact_name: "Full Name",
      contact_email: "Email Address",
      contact_subject: "Subject",
      contact_message: "Your Message",
      contact_send: "Send Message",
      contact_name_required: "Please enter your name.",
      contact_email_required: "Please enter a valid email address.",
      contact_subject_required: "Please enter a subject.",
      contact_message_required: "Please enter your message.",
      contact_success: "Message sent successfully! We'll get back to you soon.",
      contact_error: "There was an error sending your message. Please try again.",
      required: "Required",
      nametext: "Enter your full name",
      emailtext: "you@example.com",
      subjecttext: "What is this about?",
      messagetext: "Write your message here...",
    },
    ar: {
      brand: "مركز الطالب",
      nav_home: "الرئيسية",
      nav_cheatsheets: "أوراق المرجع",
      nav_tools: "الأدوات",
      nav_contact: "اتصل بنا",
      lang_toggle: "English",
      lang_toggle_aria: "Switch to English",
      hero_badge: "موارد مجانية للطلاب",
      hero_title: "مركز موارد الطلاب المثالي",
      hero_subtitle: "احصل على أوراق مرجعية شاملة وأدوات مصغرة قوية وموارد دراسية في مكان واحد.",
      hero_cta: "تصفح أوراق المرجع",
      hero_cta_secondary: "استكشف الأدوات",
      featured_title: "مميزات وموارد",
      featured_subtitle: "أدوات مختارة بعناية لتعزيز إنتاجيتك.",
      stat_students: "طالب ساعدناهم",
      stat_tools: "أدوات مصغرة",
      stat_sheets: "أوراق مرجعية",
      stat_languages: "لغات",
      feat_cheats_title: "أوراق برمجة مرجعية",
      feat_cheats_desc: "مراجع سريعة للغة HTML وCSS وجافاسكريبت وبايثون وجيت والمزيد.",
      feat_tools_title: "أدوات مصغرة",
      feat_tools_desc: "عدادات نصوص ومحوّلات حالات ومولّدات كلمات مرور وأكثر.",
      feat_resources_title: "موارد دراسية",
      feat_resources_desc: "روابط وأدلة مختارة لتسريع رحلتك التعليمية.",
      learn_more: "اعرف المزيد ←",
      cta_title: "مستعد للدراسة بذكاء أكبر؟",
      cta_text: "انضم إلى آلاف الطلاب الذين يستخدمون مركز الطالب للتعلم بشكل أسرع كل يوم.",
      cta_button: "ابدأ الآن",
      footer_about: "مركز للموارد والأدوات المصغرة المجانية للطلاب في كل مكان.",
      footer_quick_links: "روابط سريعة",
      footer_resources: "الموارد",
      footer_newsletter: "النشرة البريدية",
      footer_newsletter_text: "احصل على أحدث نصائح الدراسة وتحديثات الموارد.",
      footer_newsletter_placeholder: "أدخل بريدك الإلكتروني",
      footer_subscribe: "اشترك",
      footer_rights: "جميع الحقوق محفوظة.",
      footer_privacy: "سياسة الخصوصية",
      footer_terms: "شروط الخدمة",
      cs_title: "أوراق البرمجة المرجعية",
      cs_subtitle: "مراجع سريعة لأهم مفاهيم البرمجة الأساسية.",
      cs_search_placeholder: "ابحث في أوراق المرجع...",
      cs_category_all: "الكل",
      cs_category_html: "HTML",
      cs_category_css: "CSS",
      cs_category_javascript: "جافاسكريبت",
      cs_category_python: "بايثون",
      cs_category_git: "جيت",
      cs_copy: "نسخ",
      cs_copied: "تم النسخ!",
      cs_expand: "توسيع",
      cs_collapse: "طي",
      cs_results: "نتيجة",
      sheet_html_title: "أساسيات HTML",
      sheet_html_desc: "بنية المستند والعناصر الشائعة.",
      sheet_css_title: "محددات CSS",
      sheet_css_desc: "المحددات ونموذج الصندوق والفلكس والجريد.",
      sheet_js_title: "أساسيات جافاسكريبت",
      sheet_js_desc: "المتغيرات والدوال والمصفوفات والكائنات والغير متزامن.",
      sheet_python_title: "أساسيات بايثون",
      sheet_python_desc: "أنواع البيانات والقوائم والدوال والحلقات.",
      sheet_git_title: "أوامر جيت",
      sheet_git_desc: "الإعداد وسير العمل والفروع والتراجع عن التغييرات.",
      sheet_forms_title: "نماذج HTML",
      sheet_forms_desc: "أنواع الإدخال والتحقق وعناصر التحكم في النماذج.",
      sheet_flex_title: "دليل فلكس",
      sheet_flex_desc: "المحاذاة والالتفاف وخصائص العناصر الفرعية.",
      sheet_json_title: "العمل مع JSON",
      sheet_json_desc: "التنسيق والتحليل والتسلسل في جافاسكريبت.",
      // Learning Tracks / Multi-level courses
      tracks_title: "مسارات تعليمية متعددة المستويات",
      tracks_subtitle: "دورات شاملة للغة HTML وCSS وبايثون وجافاسكريبت — من الأساسيات إلى المشاريع التطبيقية.",
      tracks_search_placeholder: "ابحث في الدروس أو المسارات أو أوراق المرجع...",
      track_lessons: "دروس",
      track_beginner: "أساسيات المبتدئين",
      track_applied: "أمثلة تطبيقية عملية",
      track_project: "دليل المشروع المصغر",
      track_expand: "توسيع المسار",
      track_collapse: "طي المسار",
      track_feedback: "هل كان هذا المسار مفيداً؟",
      level: "المستوى",
      lesson: "درس",
      project_goal: "هدف المشروع",
      project_steps: "الخطوات",
      project_tips: "نصائح احترافية",
      // Cheat-sheets page
      cs_title: "أوراق البرمجة المرجعية",
      cs_subtitle: "مراجع سريعة لأهم مفاهيم البرمجة الأساسية.",
      cs_search_placeholder: "ابحث في أوراق المرجع...",
      cs_category_all: "الكل",
      cs_category_html: "HTML",
      cs_category_css: "CSS",
      cs_category_javascript: "جافاسكريبت",
      cs_category_python: "بايثون",
      cs_category_git: "جيت",
      cs_copy: "نسخ",
      cs_copied: "تم النسخ!",
      cs_expand: "توسيع",
      cs_collapse: "طي",
      cs_results: "نتيجة",
      html_track_title: "مسار تعلم HTML",
      html_track_desc: "من بنية المستند إلى العلامات الدلالية والنماذج.",
      css_track_title: "مسار تعلم CSS",
      css_track_desc: "المحددات وأنظمة التخطيط والتصميم المتجاوب الحديث.",
      python_track_title: "مسار تعلم بايثون",
      python_track_desc: "الأساسيات وهياكل البيانات وبايثون في العالم الحقيقي.",
      js_track_title: "مسار تعلم جافاسكريبت",
      js_track_desc: "من أساسيات اللغة إلى التفاعل مع DOM والبرمجة غير المتزامنة.",
      b_html: "HTML — فهم بنية المستند والعناوين والفقرات والقوائم والروابط والصور والعناصر الدلالية.",
      b_css: "CSS — تعلم المحددات ونموذج الصندوق والألوان والخطوط والتوالي.",
      b_python: "بايثون — المتغيرات وأنواع البيانات والمعاملات والشرطية والحلقات.",
      b_js: "جافاسكريبت — المتغيرات وأنواع البيانات والدوال والمصفوفات والكائنات.",
      a_html: "HTML — بناء تخطيطات دلالية ونماذج سهلة الوصول ووسائط وجداول.",
      a_css: "CSS — إتقان فلكس وجريد وتحديد المواقع والانتقالات ونقاط التوقف المتجاوبة.",
      a_python: "بايثون — فهم القوائم والقواميس والدوال والإدخال/الإخراج ومعالجة الأخطاء.",
      a_js: "جافاسكريبت — التعامل مع DOM والأحداث والقالب النصي وطرق المصفوفات.",
      p_html: "HTML — بناء صفحة هبوط كاملة متعددة الأقسام بهيكل دلالي ونموذج تواصل.",
      p_css: "CSS — تصميم لوحة تحكم داكنة ببطاقات زجاجية وتخطيط متجاوب.",
      p_python: "بايثون — بناء متتبع درجات يعمل من سطر الأوامر يقرأ ويكتب ملف CSV.",
      p_js: "جافاسكريبت — بناء تطبيق قائمة مهام تفاعلية مع حفظ البيانات محليًا.",
      project_1_goal: "صفحة هبوط",
      project_2_goal: "لوحة تحكم زجاجية",
      project_3_goal: "متتبع درجات CLI",
      project_4_goal: "تطبيق مهام",
      sheet_html_title: "أساسيات HTML",
      sheet_html_desc: "بنية المستند والعناصر الشائعة.",
      sheet_css_title: "محددات CSS",
      sheet_css_desc: "المحددات ونموذج الصندوق والفلكس والجريد.",
      sheet_js_title: "أساسيات جافاسكريبت",
      sheet_js_desc: "المتغيرات والدوال والمصفوفات والكائنات والغير متزامن.",
      sheet_python_title: "أساسيات بايثون",
      sheet_python_desc: "أنواع البيانات والقوائم والدوال والحلقات.",
      sheet_git_title: "أوامر جيت",
      sheet_git_desc: "الإعداد وسير العمل والفروع والتراجع عن التغييرات.",
      sheet_forms_title: "نماذج HTML",
      sheet_forms_desc: "أنواع الإدخال والتحقق وعناصر التحكم في النماذج.",
      sheet_flex_title: "دليل فلكس",
      sheet_flex_desc: "المحاذاة والالتفاف وخصائص العناصر الفرعية.",
      sheet_json_title: "العمل مع JSON",
      sheet_json_desc: "التنسيق والتحليل والتسلسل في جافاسكريبت.",
      tools_title: "أدوات الطالب التفاعلية",
      tools_subtitle: "ركّز واحسب وأتمتة سير عملك الدراسي.",
      tools_search_placeholder: "ابحث في الأدوات...",
      tool_pomodoro_title: "مؤقت البومودورو",
      tool_pomodoro_desc: "جلسات تركيز مدتها 25 دقيقة مع فترات راحة لتعزيز الإنتاجية.",
      tool_gpa_title: "حاسبة المعدل التراكمي",
      tool_gpa_desc: "احسب معدلك الفصلي والتراكمي مع الساعات المعتمدة.",
      tool_textcounter_title: "عداد النصوص",
      tool_textcounter_desc: "احسب الكلمات والأحرف والجمل والفقرات.",
      tool_caseconv_title: "محول الحالات",
      tool_caseconv_desc: "حوّل النص بين الحالات الكبيرة والصغيرة والعنوانية والجملية.",
      tool_json_title: "تنسيق JSON",
      tool_json_desc: "قم بتنسيق والتحقق من بيانات JSON الخاصة بك.",
      tool_password_title: "مولّد كلمات المرور",
      tool_password_desc: "قم بتوليد كلمات مرور قوية وآمنة فورًا.",
      tool_color_title: "محول الألوان",
      tool_color_desc: "حوّل بين صيغ HEX وRGB للألوان.",
      tool_lorem_title: "مولد النص التجريبي",
      tool_lorem_desc: "قم بتوليد نص تجريبي لمشاريعك.",
      tool_analyze: "تحليل",
      tool_clear: "مسح",
      tool_copy_result: "نسخ النتيجة",
      tool_words: "كلمات",
      tool_chars: "أحرف",
      tool_sentences: "جمل",
      tool_paragraphs: "فقرات",
      pomo_focus: "تركيز",
      pomo_short_break: "استراحة قصيرة",
      pomo_long_break: "استراحة طويلة",
      pomo_start: "ابدأ",
      pomo_pause: "إيقاف",
      pomo_reset: "إعادة",
      pomo_focus_label: "دقائق التركيز",
      pomo_add_course: "إضافة مادة",
      pomo_sessions: "جلسة مكتملة",
      gpa_add_course: "إضافة مادة",
      gpa_course_name: "اسم المادة",
      gpa_grade: "الدرجة",
      gpa_credits: "الساعات",
      gpa_reset: "إعادة",
      gpa_semester_gpa: "معدل الفصل",
      gpa_cumulative_gpa: "المعدل التراكمي",
      gpa_total_credits: "إجمالي الساعات",
      gpa_hint: "اختر الدرجة (A=4.0, B+=3.3, إلخ) وعدد الساعات المعتمدة لكل مادة.",
      search_placeholder: "ابحث في الدروس والأدوات وأوراق المرجع...",
      fuzzy_results: "نتيجة",
      fuzzy_no_results: "لم يتم العثور على نتائج مطابقة.",
      global_search: "بحث فوري",
      contact_title: "اتصل بنا",
      contact_subtitle: "هل لديك سؤال أو ملاحظات؟ يسعدنا سماعك.",
      contact_name: "الاسم الكامل",
      contact_email: "البريد الإلكتروني",
      contact_subject: "الموضوع",
      contact_message: "رسالتك",
      contact_send: "إرسال الرسالة",
      contact_name_required: "يرجى إدخال اسمك.",
      contact_email_required: "يرجى إدخال بريد إلكتروني صحيح.",
      contact_subject_required: "يرجى إدخال موضوع.",
      contact_message_required: "يرجى إدخال رسالتك.",
      contact_success: "تم إرسال الرسالة بنجاح! سنعود إليك قريبًا.",
      contact_error: "حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.",
      required: "مطلوب",
      nametext: "أدخل اسمك الكامل",
      emailtext: "you@example.com",
      subjecttext: "عن ماذا تتحدث؟",
      messagetext: "اكتب رسالتك هنا...",
    },
  };

  let currentLang = "en";

  /* ----------------------------------------------------------
     Initialize: load saved language or default to English
     ---------------------------------------------------------- */
  function init() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "ar" || saved === "en") {
        currentLang = saved;
      } else {
        currentLang = "en";
      }
    } catch (e) {
      currentLang = "en";
    }
    applyLanguage(currentLang);
  }

  /* ----------------------------------------------------------
     Get the current language code
     @returns {string} 'en' | 'ar'
     ---------------------------------------------------------- */
  function get() {
    return currentLang;
  }

  /* ----------------------------------------------------------
     Get the next language to toggle to
     @returns {string}
     ---------------------------------------------------------- */
  function peekNext() {
    return currentLang === "en" ? "ar" : "en";
  }

  /* ----------------------------------------------------------
     Get a translation for a key in current language
     @param {string} key - Translation key
     @param {string} [lang] - Optional override language
     @returns {string}
     ---------------------------------------------------------- */
  function t(key, lang) {
    const dict = translations[lang || currentLang] || translations.en;
    return dict[key] !== undefined ? dict[key] : key;
  }

  /* ----------------------------------------------------------
     Localize DOM content within a specific container.
     Used after dynamic content is injected (tools, cheat sheets).
     @param {HTMLElement} container
     @param {string} [lang] - Optional language override
     ---------------------------------------------------------- */
  function localize(container, lang) {
    if (!container) return;
    const dict = translations[lang || currentLang] || translations.en;

    container.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    container.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) {
        el.setAttribute("placeholder", dict[key]);
      }
    });

    container.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-aria");
      if (dict[key] !== undefined) {
        el.setAttribute("aria-label", dict[key]);
      }
    });
  }

  /* ----------------------------------------------------------
     Apply a language to the page
     - translates all [data-i18n] elements
     - translates [data-i18n-placeholder] placeholders
     - sets dir attribute (rtl for Arabic, ltr for English)
     - updates document lang & title
     @param {string} lang - 'en' or 'ar'
     ---------------------------------------------------------- */
  function applyLanguage(lang) {
    // Guard: resource pages (cheat-sheets, tools) have dynamic
    // content synced separately in their own modules.
    const dict = translations[lang] || translations.en;

    // Translate text nodes
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    // Translate placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) {
        el.setAttribute("placeholder", dict[key]);
      }
    });

    // Translate title / aria-labels via data-i18n-aria
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      const key = el.getAttribute("data-i18n-aria");
      if (dict[key] !== undefined) {
        el.setAttribute("aria-label", dict[key]);
      }
    });

    // Direction and language attributes
    const isRtl = lang === "ar";
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
    document.title = dict["brand"] || "StudentHub";

    currentLang = lang;
  }

  /* ----------------------------------------------------------
     Toggle between languages and persist the choice
     @returns {string} the new language
     ---------------------------------------------------------- */
  function toggle() {
    const next = peekNext();
    applyLanguage(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      // localStorage unavailable — continue without persistence
    }
    window.dispatchEvent(new CustomEvent("languagechanged", { detail: { lang: next } }));
    return next;
  }

  /* ----------------------------------------------------------
     Programmatically set a language
     @param {string} lang
     ---------------------------------------------------------- */
  function set(lang) {
    if (lang !== "en" && lang !== "ar") return;
    applyLanguage(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    window.dispatchEvent(new CustomEvent("languagechanged", { detail: { lang: lang } }));
  }

  return {
    init: init,
    get: get,
    peekNext: peekNext,
    t: t,
    toggle: toggle,
    set: set,
    apply: applyLanguage,
    localize: localize,
  };
})();

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    Lang.init();
  });
} else {
  Lang.init();
}
