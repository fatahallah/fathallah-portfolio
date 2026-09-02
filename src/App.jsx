import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Menu,
  X,
  Sun,
  Moon,
  Download,
  Mail,
  Github,
  Linkedin,
  MessageCircle,
  ChevronRight,
  Database,
  BarChart3,
  FileSpreadsheet,
  GraduationCap,
  Briefcase,
  Send,
  ExternalLink,
  MapPin,
  Phone,
  CheckCircle2,
  Table2,
  Loader2,
  ImageOff,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  CONFIG & CONSTANTS                                                */
/* ------------------------------------------------------------------ */

// استبدل هذا الرابط بـ Endpoint الخاص بك من Formspree
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/myeyjyrp'

const PROFILE = {
  name: { en: 'Mr. Fathallah Saied', ar: 'أ. فتح الله سعيد' },
  fullName: { en: 'Fathallah Saied Abou Eid', ar: 'فتح الله سعيد أبو عيد' },
  email: 'fathallahsaed352@gmail.com',
  phone: '+201037368956',
  phoneDisplay: '+20 103 736 8956',
  location: {
    en: 'Menoufia, Egypt (relocatable / remote)',
    ar: 'المنوفية، مصر (قابل للانتقال / عن بعد)',
  },
  linkedin: 'https://www.linkedin.com/in/fathallah-saied/',
  github: 'https://github.com/fatahallah',
  cv: '/Fathallah_Saied_CV.pdf',
}

const NAV_IDS = ['home', 'projects', 'skills', 'experience', 'about', 'contact']

const STATS = [
  {
    value: 5,
    suffix: '',
    label: { en: 'End-to-end analytics projects', ar: 'مشاريع تحليل بيانات متكاملة' },
  },
  {
    value: 99441,
    suffix: '',
    label: { en: 'E-commerce orders analyzed', ar: 'طلب تجارة إلكترونية تم تحليله' },
  },
  {
    value: 1562,
    suffix: '',
    label: { en: 'Employee records analyzed', ar: 'سجل موظف تم تحليله' },
  },
  {
    value: 28.4,
    suffix: '%',
    label: { en: 'Attrition rate identified', ar: 'معدل دوران وظيفي تم رصده' },
  },
]

const SKILL_GROUPS = [
  {
    icon: Database,
    title: { en: 'Data Analysis', ar: 'تحليل البيانات' },
    items: [
      { name: 'SQL — Joins, Window Functions, CTEs', level: 85 },
      { name: 'Power BI — DAX, Data Modeling', level: 85 },
      { name: 'Python — pandas, scipy (applied)', level: 55 },
    ],
  },
  {
    icon: FileSpreadsheet,
    title: { en: 'Data Preparation & Reporting', ar: 'تجهيز البيانات والتقارير' },
    items: [
      { name: 'Excel — Power Query, PivotTables, XLOOKUP', level: 90 },
      { name: 'Power Query — Cleaning & Transformation', level: 90 },
      { name: 'Data Validation & Dynamic Reporting', level: 85 },
    ],
  },
  {
    icon: Table2,
    title: { en: 'BI & Data Modeling', ar: 'ذكاء الأعمال ونمذجة البيانات' },
    items: [
      { name: 'Star Schema Modeling', level: 75 },
      { name: 'DAX Measures & KPI Design', level: 80 },
      { name: 'ODBC Live Connections', level: 75 },
    ],
  },
]

const CATEGORIES = ['all', 'data', 'hr', 'dashboards']

const PROJECTS = [
  {
    id: 'ecommerce-sql-geo',
    categories: ['data', 'dashboards'],
    image: '/projects/ecommerce-sql-geo.png',
    metric: {
      en: 'Only 7.9% of orders actually delayed',
      ar: '7.9% فقط من الطلبات تأخرت فعليًا',
    },
    title: {
      en: 'E-Commerce SQL & Geo-Spatial Analytics',
      ar: 'تحليل جغرافي مكاني للتجارة الإلكترونية بلغة SQL',
    },
    summary: {
      en: 'Rebuilt shipping distance from scratch with a manual Haversine calculation across 99,441 orders and 8 linked tables — found that delay is an estimation problem, not a distance problem.',
      ar: 'أعدت بناء مسافة الشحن من الصفر بمعادلة Haversine يدويًا عبر 99,441 طلب و8 جداول مترابطة — واكتشفت أن التأخير مشكلة تقدير وليست مشكلة مسافة.',
    },
    detail: {
      en: 'A Brazilian e-commerce marketplace’s delivery-time reputation was based on assumption, not evidence. I queried and joined 8 linked tables covering 99,441 orders, then reduced a 1M-row geolocation table by 98% into a usable dataset. With no built-in distance field, I calculated real shipping distance in SQL using the Haversine formula, then connected the model live to Power BI via ODBC. The result: an inflated delivery estimate — not the actual logistics — was driving the delay narrative.',
      ar: 'كانت سمعة أوقات التسليم لمتجر تجارة إلكترونية برازيلي مبنية على افتراض لا دليل. قمت بربط واستعلام 8 جداول تغطي 99,441 طلب، ثم اختصرت جدول مواقع جغرافية مكوّن من مليون صف بنسبة 98% ليصبح بيانات قابلة للاستخدام. ولعدم وجود حقل مسافة جاهز، حسبت مسافة الشحن الحقيقية بلغة SQL باستخدام معادلة Haversine، ثم ربطت النموذج مباشرة بـ Power BI عبر ODBC. والنتيجة: أن تقدير التسليم المبالغ فيه — وليس اللوجستيات فعليًا — هو ما كان يقود قصة التأخير.',
    },
    tools: ['SQL', 'Power BI', 'Window Functions', 'ODBC Live Connection'],
    github: 'https://github.com/fatahallah/Ecommerce-SQL-Analytics',
  },
    {
    id: 'ecommerce-pipeline-python-sql-powerbi',
    categories: ['data', 'dashboards'],
    image: '/projects/ecommerce-pipeline.png',
    metric: {
      en: '14.7x spending gap between top and at-risk customers',
      ar: 'فجوة إنفاق 14.7 ضعف بين أفضل العملاء والمعرضين للتسرب',
    },
    title: {
      en: 'End-to-End E-Commerce Data Pipeline (Python, SQL & Power BI)',
      ar: 'خط بيانات متكامل للتجارة الإلكترونية (Python وSQL وPower BI)',
    },
    summary: {
      en: 'Cleaned 541,909 raw transactions with Python, built an RFM customer segmentation model, and validated it in SQL before surfacing it in a live Power BI dashboard.',
      ar: 'نظفت 541,909 معاملة خام باستخدام Python، وبنيت نموذج تصنيف عملاء RFM، وتحققت منه في SQL قبل عرضه في داشبورد Power BI حي.',
    },
    detail: {
      en: 'A raw UCI retail export of 541,909 transactions carried duplicates, missing customer IDs, and invalid returns. I built a Python pipeline (pandas) to profile and clean it down to 392,692 valid transactions, then engineered an RFM (Recency, Frequency, Monetary) segmentation model to classify all 4,338 customers into behavioral segments. I uploaded the segmented dataset to SQL and cross-validated the Python-side counts against a direct SQL query — an exact match. The result surfaced a 14.7x spending gap between "Champions" ($7,501.84 average) and "At Risk" customers ($508.82 average), a concrete, quantified target for retention efforts. The cleaned model powers a live Power BI dashboard tracking $8.89M in revenue across 18.53K orders.',
      ar: 'كانت بيانات خام من UCI لمتجر تجزئة (541,909 معاملة) تحتوي على تكرارات ومعرّفات عملاء مفقودة ومرتجعات غير صالحة. بنيت خط معالجة بلغة Python (pandas) لفحص البيانات وتنظيفها لتصل إلى 392,692 معاملة صالحة، ثم صممت نموذج تصنيف RFM (الحداثة والتكرار والقيمة المالية) لتصنيف جميع الـ4,338 عميل إلى فئات سلوكية. رفعت البيانات المصنفة إلى SQL وتحققت من تطابق النتائج بين Python واستعلام SQL مباشر — وتطابقت تمامًا. كشفت النتيجة عن فجوة إنفاق تصل إلى 14.7 ضعف بين عملاء "Champions" (بمتوسط 7,501.84 دولار) وعملاء "At Risk" (بمتوسط 508.82 دولار)، وهو هدف محدد وقابل للقياس لجهود الاستبقاء. يغذي هذا النموذج المنظف داشبورد Power BI حي يتتبع 8.89 مليون دولار من الإيرادات عبر 18.53 ألف طلب.',
    },
    tools: ['Python', 'Pandas', 'SQL', 'Power BI', 'RFM Segmentation'],
    github: 'https://github.com/fatahallah/Ecommerce-Data-Pipeline-Python-SQL-PowerBI/tree/main',
  },
  {
    id: 'hr-workforce',
    categories: ['hr', 'dashboards'],
    image: '/projects/hr-workforce.png',
    metric: {
      en: '28.4% attrition rate identified',
      ar: '28.4% معدل دوران وظيفي تم رصده',
    },
    title: {
      en: 'HR Workforce Analytics (SQL & Power BI)',
      ar: 'تحليل القوى العاملة بلغة SQL و Power BI',
    },
    summary: {
      en: 'Decoded undocumented HR action codes across 1,562 employees with CTEs and self-joins to build an attrition signal HR could finally track.',
      ar: 'فك تشفير أكواد إجراءات موارد بشرية غير موثقة لدى 1,562 موظف باستخدام CTEs وself-joins لبناء مؤشر دوران وظيفي يمكن للموارد البشرية تتبعه.',
    },
    detail: {
      en: 'HR held years of employee action history in codes nobody had documented. Using CTEs and self-joins in SQL, I statistically decoded the undocumented codes, reconstructed each employee’s status timeline across 1,562 records, and built a live Power BI dashboard connected via ODBC with DAX-driven KPIs — surfacing a 28.4% attrition rate that the business could finally track.',
      ar: 'كانت الموارد البشرية تحتفظ بسنوات من تاريخ إجراءات الموظفين في أكواد لم يوثقها أحد. باستخدام CTEs وself-joins في SQL، فككت تشفير هذه الأكواد إحصائيًا، وأعدت بناء الجدول الزمني لحالة كل موظف عبر 1,562 سجل، وبنيت داشبورد Power BI حي متصل عبر ODBC بمؤشرات أداء مبنية على DAX — كاشفًا معدل دوران وظيفي بنسبة 28.4% استطاعت الشركة تتبعه أخيرًا.',
    },
    tools: ['SQL', 'Power BI', 'CTEs & Self-Joins', 'ODBC'],
    github: 'https://github.com/fatahallah/HR-Workforce-Analytics-SQL',
  },
  {
    id: 'sales-power-bi',
    categories: ['dashboards'],
    image: '/projects/sales-power-bi.png',
    metric: {
      en: '$829K sales · 32.87% margin',
      ar: '829 ألف دولار مبيعات · هامش 32.87%',
    },
    title: {
      en: 'Sales Performance & Profitability Analytics',
      ar: 'تحليل أداء المبيعات والربحية',
    },
    summary: {
      en: 'Turned raw ERP exports into a two-page executive Power BI dashboard tracking sales, margin, and regional target achievement.',
      ar: 'حولت بيانات خام من نظام ERP إلى داشبورد تنفيذي من صفحتين في Power BI يتتبع المبيعات والهامش وتحقيق الأهداف الإقليمية.',
    },
    detail: {
      en: 'Starting from unstructured ERP exports, I cleaned and modeled the data with Power Query, then built a two-page executive Power BI dashboard covering $829.07K in sales at a 32.87% profit margin across roughly 6,000 orders — with a regional breakdown of target achievement decision-makers could act on directly.',
      ar: 'بدءًا من بيانات ERP غير منظمة، نظفت ونمذجت البيانات باستخدام Power Query، ثم بنيت داشبورد تنفيذي من صفحتين في Power BI يغطي 829.07 ألف دولار مبيعات بهامش ربح 32.87% عبر نحو 6,000 طلب — مع تفصيل إقليمي لتحقيق الأهداف يمكن لصناع القرار التصرف بناءً عليه مباشرة.',
    },
    tools: ['Power BI', 'Power Query', 'ERP Data'],
    github: 'https://github.com/fatahallah/Sales-Performance-Profitability-Analytics',
  },
  {
    id: 'sales-excel',
    categories: ['data'],
    image: '/projects/24.png',
    metric: {
      en: 'Star Schema · Excel-native dashboard',
      ar: 'نموذج نجمي · داشبورد إكسل بالكامل',
    },
    title: {
      en: 'Advanced Sales Performance Dashboard (Excel)',
      ar: 'داشبورد متقدم لأداء المبيعات (إكسل)',
    },
    summary: {
      en: 'Cleaned multi-source raw sales data with Power Query and modeled it into a Star Schema, tracked through a dynamic Excel dashboard.',
      ar: 'نظفت بيانات مبيعات خام من مصادر متعددة باستخدام Power Query ونمذجتها في مخطط نجمي، وتتبعتها عبر داشبورد إكسل ديناميكي.',
    },
    detail: {
      en: 'Built for teams without a BI tool: raw, multi-source sales data cleaned and reshaped with Power Query, modeled into a relational Star Schema inside Excel, then surfaced through PivotTables and formulas like SUMIFS and XLOOKUP in a fully dynamic, Excel-native dashboard for revenue and KPI tracking.',
      ar: 'مبني لفرق بدون أداة BI: بيانات مبيعات خام من مصادر متعددة تم تنظيفها وإعادة تشكيلها باستخدام Power Query، ونمذجتها في مخطط نجمي داخل إكسل، ثم عرضها عبر PivotTables ومعادلات مثل SUMIFS وXLOOKUP في داشبورد ديناميكي بالكامل داخل إكسل لتتبع الإيرادات ومؤشرات الأداء.',
    },
    tools: ['Excel', 'Power Query', 'Star Schema', 'PivotTables'],
    github: null,
  },
  {
    id: 'hr-payroll-excel',
    categories: ['hr'],
    image: '/projects/hr-payroll-excel.png',
    metric: {
      en: '35 employees · $219,558 net salary tracked',
      ar: '35 موظف · 219,558 دولار صافي رواتب',
    },
    title: {
      en: 'HR Operations & Payroll Analytics System (Excel)',
      ar: 'نظام تحليل عمليات الموارد البشرية والرواتب (إكسل)',
    },
    summary: {
      en: 'A multi-sheet automated Excel workbook for employee master data, attendance, leave and payroll — with error logging built in.',
      ar: 'ملف إكسل متعدد الشيتات ومؤتمت للبيانات الرئيسية للموظفين والحضور والإجازات والرواتب — مع تسجيل أخطاء مدمج.',
    },
    detail: {
      en: 'A multi-sheet automated workbook linking employee master data, attendance, leave, and payroll with XLOOKUP and dynamic FILTER formulas, plus data-validation rules that log errors and track overtime automatically. The dashboard tracks 35 employees, $219,558.07 in net salary, and 80.78 overtime hours.',
      ar: 'ملف متعدد الشيتات ومؤتمت يربط البيانات الرئيسية للموظفين والرواتب والحضور والإجازات بمعادلات XLOOKUP وFILTER الديناميكية، بالإضافة إلى قواعد تحقق من صحة البيانات تسجل الأخطاء وتتتبع ساعات العمل الإضافي تلقائيًا. يتتبع الداشبورد 35 موظفًا، و219,558.07 دولار صافي رواتب، و80.78 ساعة عمل إضافي.',
    },
    tools: ['Excel', 'XLOOKUP', 'Dynamic FILTER', 'Data Validation'],
    github: null,
  },
]

const TIMELINE = [
  {
    icon: Briefcase,
    date: { en: 'Before 2025', ar: 'قبل 2025' },
    title: { en: 'HR Data & Operations Context', ar: 'سياق بيانات وعمليات الموارد البشرية' },
    text: {
      en: 'Built practical familiarity with employee, payroll, attendance, and leave data through HR-focused portfolio work — the starting point that led me deeper into data analysis.',
      ar: 'بنيت خبرة عملية في التعامل مع بيانات الموظفين والرواتب والحضور والإجازات من خلال مشاريع موجهة للموارد البشرية — وهي نقطة الانطلاق التي قادتني للتعمق في تحليل البيانات.',
    },
  },
  {
    icon: GraduationCap,
    date: { en: 'May 2025', ar: 'مايو 2025' },
    title: { en: "Bachelor's Degree, Educational Technology", ar: 'بكالوريوس تكنولوجيا التعليم' },
    text: {
      en: 'Faculty of Specific Education, Technology Department — Menoufia University. Graduated with a "Very Good" grade; coursework included computer systems, databases, and IT.',
      ar: 'كلية التربية النوعية، قسم التكنولوجيا — جامعة المنوفية. تخرجت بتقدير "جيد جدًا"؛ وشملت الدراسة نظم الحاسب وقواعد البيانات وتقنية المعلومات.',
    },
  },
  {
    icon: BarChart3,
    date: { en: '2025', ar: '2025' },
    title: { en: 'Excel → Power Query → Power BI → SQL', ar: 'Excel ← Power Query ← Power BI ← SQL' },
    text: {
      en: 'Moved deliberately from advanced Excel and PivotTables to Power Query, Power BI, and SQL — building end-to-end case studies around sales, e-commerce, and HR data.',
      ar: 'تدرجت بشكل مقصود من Excel المتقدم وPivotTables إلى Power Query ثم Power BI وSQL — مع بناء دراسات حالة متكاملة حول بيانات المبيعات والتجارة الإلكترونية والموارد البشرية.',
    },
  },
  {
    icon: Database,
    date: { en: 'In progress', ar: 'قيد التنفيذ' },
    title: { en: 'A/B Testing Analysis with Python', ar: 'تحليل اختبار A/B بلغة Python' },
    text: {
      en: 'Applying Python (pandas, scipy) hands-on to a project analyzing two advertising campaigns (test vs. control), adding statistical testing to the current analytics toolkit.',
      ar: 'تطبيق Python (pandas, scipy) بشكل عملي في مشروع لتحليل حملتين إعلانيتين (تجريبية مقابل ضابطة)، لإضافة الاختبار الإحصائي إلى مجموعة أدوات تحليل البيانات.',
    },
  },
]

const SERVICES = [
  { value: 'powerbi', en: 'Power BI Dashboard', ar: 'داشبورد Power BI' },
  { value: 'sql', en: 'SQL Analysis', ar: 'تحليل SQL' },
  { value: 'excel', en: 'Excel System', ar: 'نظام Excel' },
  { value: 'other', en: 'Something else', ar: 'شيء آخر' },
]

/* ------------------------------------------------------------------ */
/*  TRANSLATIONS — UI strings                                          */
/* ------------------------------------------------------------------ */

const T = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
    },
    hireMe: 'Start a project',
    heroEyebrow: 'Data Analyst — Power BI · SQL · Excel',
    heroTitle: 'I turn raw, messy business data into decisions people can act on.',
    heroLede:
      'I build end-to-end analytics — from cleaning inconsistent source data to interactive dashboards — for sales, e-commerce, and HR operations. Every project starts with a business question, not a chart.',
    viewProjects: 'View case studies',
    downloadCV: 'Download CV',
    proofEyebrow: 'Selected work',
    proofTitle: 'Built to answer business questions, not just display charts.',
    proofLede:
      'A few examples of how I clean, model, analyze, and communicate data across Power BI, SQL, and Excel.',
    proofCta: 'Explore all projects',
    aboutEyebrow: 'About',
    aboutTitle: 'From HR data operations into data analysis',
    aboutP1:
      'I’m a 2025 graduate who chose to build a career around working with data — a direction that grew naturally out of my comfort with Microsoft’s tools. I started hands-on with Excel: employee databases, payroll, attendance, and leave data in HR-focused work.',
    aboutP2:
      'Cleaning that data, validating it, and reporting from it showed me that data analysis was the part I wanted to go deeper into. I don’t add a tool to my profile until I’ve used it in a finished project.',
    aboutEducationLabel: 'Education',
    aboutEducationDegree: "Bachelor's Degree in Educational Technology",
    aboutEducationSchool: 'Faculty of Specific Education, Technology Department — Menoufia University',
    aboutEducationGrade: 'Graduated May 2025, with a "Very Good" grade',
    skillsEyebrow: 'Skills & Tools',
    skillsTitle: 'What I’ve actually built with',
    projectsEyebrow: 'Portfolio',
    projectsTitle: 'Case studies you can open and check',
    filterAll: 'All',
    filterData: 'Data Analysis',
    filterHr: 'HR Systems',
    filterDashboards: 'Dashboards',
    viewDetails: 'View details',
    viewCode: 'View on GitHub',
    close: 'Close',
    noRepo: 'Excel workbook — file available on request',
    experienceEyebrow: 'Timeline',
    experienceTitle: 'Experience & milestones',
    contactEyebrow: 'Contact',
    contactTitle: 'Have a dataset that needs a real answer?',
    contactLede:
      'Whether it’s a one-off analysis or a dashboard your team checks every week, I’d like to hear about it.',
    formName: 'Full name',
    formEmail: 'Email address',
    formCompany: 'Company (optional)',
    formService: 'Type of service needed',
    formServicePlaceholder: 'Select a service',
    formMessage: 'Message',
    formMessagePlaceholder:
      'Tell me a little about your data and what decision you’re trying to make.',
    formSubmit: 'Send message',
    formSending: 'Sending message...',
    formSuccess:
      'Thank you! Your message has been sent successfully. I will get back to you shortly.',
    directContact: 'Or reach me directly',
    footerTagline:
      'Data Analyst — Power BI, SQL & Excel case studies for sales, e-commerce, and HR operations.',
    footerRights: 'Portfolio projects are based on real datasets and documented analysis.',
    statCount: 'Quick numbers',
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'نبذة عني',
      skills: 'المهارات',
      projects: 'المشاريع',
      experience: 'المسيرة',
      contact: 'تواصل معي',
    },
    hireMe: 'ابدأ مشروعًا',
    heroEyebrow: 'محلل بيانات — Power BI · SQL · Excel',
    heroTitle: 'أحوّل بيانات الأعمال الفوضوية إلى قرارات يمكن للناس التصرف بناءً عليها.',
    heroLede:
      'أبني حلول تحليل بيانات متكاملة — من تنظيف البيانات المصدرية غير المتسقة إلى داشبوردات تفاعلية — للمبيعات والتجارة الإلكترونية وعمليات الموارد البشرية. كل مشروع يبدأ بسؤال عمل حقيقي، وليس برسم بياني.',
    viewProjects: 'استعرض دراسات الحالة',
    downloadCV: 'تحميل السيرة الذاتية',
    proofEyebrow: 'نماذج من أعمالي',
    proofTitle: 'أبني التحليل للإجابة عن أسئلة العمل، وليس لعرض الرسوم فقط.',
    proofLede:
      'نماذج توضح كيف أنظف البيانات وأنمذجها وأحللها وأعرض نتائجها باستخدام Power BI وSQL وExcel.',
    proofCta: 'استعرض كل المشاريع',
    aboutEyebrow: 'نبذة عني',
    aboutTitle: 'من التعامل مع بيانات الموارد البشرية إلى تحليل البيانات',
    aboutP1:
      'أنا خريج دفعة 2025 اخترت بناء مسيرتي المهنية حول العمل مع البيانات — اتجاه نما بشكل طبيعي من إتقاني لأدوات Microsoft. بدأت عمليًا مع Excel: قواعد بيانات الموظفين والرواتب والحضور والإجازات ضمن أعمال موجهة للموارد البشرية.',
    aboutP2:
      'تنظيف تلك البيانات والتحقق منها وإعداد التقارير منها أظهر لي أن تحليل البيانات هو المجال الذي أردت التعمق فيه. لا أضيف أداة إلى ملفي الشخصي حتى أكون قد استخدمتها في مشروع مكتمل.',
    aboutEducationLabel: 'المؤهل الدراسي',
    aboutEducationDegree: 'بكالوريوس تكنولوجيا التعليم',
    aboutEducationSchool: 'كلية التربية النوعية، قسم التكنولوجيا — جامعة المنوفية',
    aboutEducationGrade: 'تخرجت في مايو 2025 بتقدير "جيد جدًا"',
    skillsEyebrow: 'المهارات والأدوات',
    skillsTitle: 'الأدوات التي استخدمتها فعليًا',
    projectsEyebrow: 'أعمالي',
    projectsTitle: 'دراسات حالة يمكنك فتحها والتحقق منها',
    filterAll: 'الكل',
    filterData: 'تحليل بيانات',
    filterHr: 'أنظمة موارد بشرية',
    filterDashboards: 'داشبوردات',
    viewDetails: 'عرض التفاصيل',
    viewCode: 'عرض على GitHub',
    close: 'إغلاق',
    noRepo: 'ملف Excel — متاح عند الطلب',
    experienceEyebrow: 'المسيرة الزمنية',
    experienceTitle: 'الخبرات والمحطات المهنية',
    contactEyebrow: 'تواصل معي',
    contactTitle: 'عندك بيانات تحتاج إجابة حقيقية؟',
    contactLede:
      'سواء كان تحليلًا لمرة واحدة أو داشبورد يراجعه فريقك أسبوعيًا، يسعدني أن أسمع عنه.',
    formName: 'الاسم الكامل',
    formEmail: 'البريد الإلكتروني',
    formCompany: 'اسم الشركة (اختياري)',
    formService: 'نوع الخدمة المطلوبة',
    formServicePlaceholder: 'اختر نوع الخدمة',
    formMessage: 'الرسالة',
    formMessagePlaceholder: 'حدثني قليلًا عن بياناتك والقرار الذي تحاول اتخاذه.',
    formSubmit: 'إرسال الرسالة',
    formSending: 'جاري الإرسال...',
    formSuccess:
      'شكراً لك! تم إرسال رسالتك بنجاح. سأتواصل معك في أقرب وقت ممكن.',
    directContact: 'أو تواصل معي مباشرة',
    footerTagline:
      'محلل بيانات — دراسات حالة بـ Power BI وSQL وExcel للمبيعات والتجارة الإلكترونية وعمليات الموارد البشرية.',
    footerRights: 'مشاريع Portfolio مبنية على بيانات حقيقية وتحليل موثق.',
    statCount: 'أرقام سريعة',
  },
}

const CAT_LABEL_KEY = {
  all: 'filterAll',
  data: 'filterData',
  hr: 'filterHr',
  dashboards: 'filterDashboards',
}

/* ------------------------------------------------------------------ */
/*  HELPER COMPONENTS                                                 */
/* ------------------------------------------------------------------ */

function SafeImage({ src, alt, className }) {
  const [error, setError] = useState(false)

  if (error || !src) {
    return (
      <div className="w-full h-full grid place-items-center bg-line/20 dark:bg-line-dark/20 text-ink/30 dark:text-paper-dark/30">
        <ImageOff size={28} />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setError(true)}
    />
  )
}

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!active || startedRef.current) return
    startedRef.current = true

    const start = performance.now()
    const isFloat = target % 1 !== 0

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = target * eased

      setValue(isFloat ? Math.round(current * 10) / 10 : Math.round(current))

      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [active, target, duration])

  return value
}

function useInView(ref) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])

  return inView
}

function StatCard({ stat, lang, active }) {
  const value = useCountUp(stat.value, active)
  const formatted =
    stat.value % 1 !== 0 ? value.toFixed(1) : value.toLocaleString('en-US')

  return (
    <div className="border border-line dark:border-line-dark bg-surface/70 dark:bg-surface-dark/70 rounded-sm px-5 py-4">
      <span className="block font-mono text-2xl sm:text-3xl text-ink dark:text-paper-dark tabular-nums">
        {formatted}
        {stat.suffix}
      </span>
      <span className="block mt-1.5 text-sm text-ink/60 dark:text-paper-dark/60 leading-snug">
        {stat.label[lang]}
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN APP                                                           */
/* ------------------------------------------------------------------ */

export default function App() {
  const [lang, setLang] = useState('en')
  const [theme, setTheme] = useState('light')
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [activeProject, setActiveProject] = useState(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const dir = lang === 'ar' ? 'rtl' : 'ltr'
  const t = T[lang]

  const heroRef = useRef(null)
  const statsInView = useInView(heroRef)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', lang)
  }, [dir, lang])

  const filteredProjects = useMemo(
    () =>
      filter === 'all'
        ? PROJECTS
        : PROJECTS.filter((project) => project.categories.includes(filter)),
    [filter],
  )

  function handleNavClick(id) {
    setMenuOpen(false)

    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault()
    setSubmitted(false)
    setLoading(true)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          company: formState.company,
          service: formState.service,
          message: formState.message,
        }),
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setSubmitted(true)
      setFormState({
        name: '',
        email: '',
        company: '',
        service: '',
        message: '',
      })
    } catch (error) {
      console.error(error)
      alert(
        lang === 'ar'
          ? 'تعذر إرسال الرسالة. يرجى المحاولة مرة أخرى.'
          : 'Unable to send your message. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      dir={dir}
      className="min-h-screen bg-paper dark:bg-ink-dark text-ink dark:text-paper-dark font-body transition-colors duration-300"
    >
      <TopNav
        t={t}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onNavClick={handleNavClick}
      />

      <Hero
        t={t}
        lang={lang}
        heroRef={heroRef}
        statsInView={statsInView}
        onNavClick={handleNavClick}
      />

      <SelectedWork t={t} lang={lang} onNavClick={handleNavClick} />

      <Projects
        t={t}
        lang={lang}
        filter={filter}
        setFilter={setFilter}
        filteredProjects={filteredProjects}
        setActiveProject={setActiveProject}
      />

      <Skills t={t} lang={lang} />

      <Experience t={t} lang={lang} />

      <About t={t} lang={lang} />

      <Contact
        t={t}
        lang={lang}
        formState={formState}
        setFormState={setFormState}
        onSubmit={handleFormSubmit}
        submitted={submitted}
        loading={loading}
      />

      <Footer t={t} lang={lang} />

      {activeProject && (
        <ProjectModal
          project={activeProject}
          lang={lang}
          t={t}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  NAV                                                                 */
/* ------------------------------------------------------------------ */

function TopNav({
  t,
  lang,
  setLang,
  theme,
  setTheme,
  menuOpen,
  setMenuOpen,
  onNavClick,
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line dark:border-line-dark bg-paper/90 dark:bg-ink-dark/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavClick('home')}
          className="font-display text-lg tracking-tight text-ink dark:text-paper-dark"
        >
          {PROFILE.name[lang]}
          <span className="text-gold">.</span>
        </button>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_IDS.map((id) => (
            <button
              key={id}
              onClick={() => onNavClick(id)}
              className="text-sm text-ink/70 dark:text-paper-dark/70 hover:text-gold dark:hover:text-gold-soft transition-colors"
            >
              {t.nav[id]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            aria-label="Toggle language"
            className="w-9 h-9 grid place-items-center rounded-full border border-line dark:border-line-dark hover:border-gold transition-colors text-xs font-mono"
          >
            {lang === 'en' ? 'AR' : 'EN'}
          </button>

          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle theme"
            className="w-9 h-9 grid place-items-center rounded-full border border-line dark:border-line-dark hover:border-gold transition-colors"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button
            onClick={() => onNavClick('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 bg-ink dark:bg-gold text-paper dark:text-ink-dark text-sm px-4 py-2 rounded-sm hover:opacity-90 transition-opacity"
          >
            {t.hireMe}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-9 h-9 grid place-items-center rounded-full border border-line dark:border-line-dark"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-line dark:border-line-dark px-5 py-4 flex flex-col gap-3 bg-paper dark:bg-ink-dark">
          {NAV_IDS.map((id) => (
            <button
              key={id}
              onClick={() => onNavClick(id)}
              className="text-start text-sm py-1.5 text-ink/80 dark:text-paper-dark/80"
            >
              {t.nav[id]}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

/* ------------------------------------------------------------------ */
/*  HERO                                                                */
/* ------------------------------------------------------------------ */

function Hero({ t, lang, heroRef, statsInView, onNavClick }) {
  return (
    <section
      id="home"
      ref={heroRef}
      className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16"
    >
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-start">
        <div>
          <span className="inline-block font-mono text-xs tracking-wide text-steel dark:text-steel-dark border border-steel/30 dark:border-steel-dark/30 rounded-sm px-2.5 py-1 mb-6">
            {t.heroEyebrow}
          </span>

          <h1 className="font-display text-[2.1rem] sm:text-5xl leading-[1.12] text-ink dark:text-paper-dark max-w-xl">
            {t.heroTitle}
          </h1>

          <p className="mt-6 text-[1.05rem] leading-relaxed text-ink/70 dark:text-paper-dark/70 max-w-lg">
            {t.heroLede}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavClick('projects')}
              className="inline-flex items-center gap-2 bg-ink dark:bg-gold text-paper dark:text-ink-dark px-5 py-3 rounded-sm text-sm hover:opacity-90 transition-opacity"
            >
              {t.viewProjects}
              <ChevronRight
                size={15}
                className={lang === 'ar' ? 'rotate-180' : ''}
              />
            </button>

            <a
              href={PROFILE.cv}
              download
              className="inline-flex items-center gap-2 border border-line dark:border-line-dark px-5 py-3 rounded-sm text-sm hover:border-gold dark:hover:border-gold-soft transition-colors"
            >
              <Download size={15} />
              {t.downloadCV}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} lang={lang} active={statsInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  SELECTED WORK                                                     */
/* ------------------------------------------------------------------ */

function SelectedWork({ t, lang, onNavClick }) {
  const featured = PROJECTS.slice(0, 3)

  return (
    <section className="border-t border-line dark:border-line-dark">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
          <div>
            <span className="font-mono text-xs text-steel dark:text-steel-dark">
              {t.proofEyebrow}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl mt-2 text-ink dark:text-paper-dark max-w-2xl">
              {t.proofTitle}
            </h2>
            <p className="mt-3 text-sm text-ink/65 dark:text-paper-dark/65 max-w-2xl leading-relaxed">
              {t.proofLede}
            </p>
          </div>

          <button
            onClick={() => onNavClick('projects')}
            className="inline-flex items-center gap-1.5 text-sm text-ink dark:text-paper-dark hover:text-gold dark:hover:text-gold-soft transition-colors"
          >
            {t.proofCta}
            <ChevronRight
              size={14}
              className={lang === 'ar' ? 'rotate-180' : ''}
            />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((project) => (
            <div
              key={project.id}
              className="border border-line dark:border-line-dark rounded-sm overflow-hidden bg-surface/50 dark:bg-surface-dark/50"
            >
              <div className="h-32 bg-line/40 dark:bg-line-dark/40 overflow-hidden border-b border-line dark:border-line-dark">
                <SafeImage
                  src={project.image}
                  alt={project.title[lang]}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="p-4">
                <span className="font-mono text-[0.68rem] text-gold dark:text-gold-soft">
                  {project.metric[lang]}
                </span>
                <h3 className="font-display text-base mt-1.5 text-ink dark:text-paper-dark leading-snug">
                  {project.title[lang]}
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.tools.slice(0, 2).map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-[0.65rem] px-2 py-1 rounded-sm bg-steel/10 text-steel dark:text-steel-dark"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  PROJECTS                                                            */
/* ------------------------------------------------------------------ */

function Projects({
  t,
  lang,
  filter,
  setFilter,
  filteredProjects,
  setActiveProject,
}) {
  return (
    <section id="projects" className="border-t border-line dark:border-line-dark">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-mono text-xs text-steel dark:text-steel-dark">
              {t.projectsEyebrow}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl mt-2 text-ink dark:text-paper-dark">
              {t.projectsTitle}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`font-mono text-xs px-3.5 py-2 rounded-sm border transition-colors ${
                  filter === cat
                    ? 'bg-ink dark:bg-gold text-paper dark:text-ink-dark border-ink dark:border-gold'
                    : 'border-line dark:border-line-dark text-ink/60 dark:text-paper-dark/60 hover:border-gold dark:hover:border-gold-soft'
                }`}
              >
                {t[CAT_LABEL_KEY[cat]]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="group text-start border border-line dark:border-line-dark rounded-sm overflow-hidden bg-surface/50 dark:bg-surface-dark/50 hover:border-gold dark:hover:border-gold-soft transition-colors"
            >
              <div className="h-44 bg-line/40 dark:bg-line-dark/40 overflow-hidden border-b border-line dark:border-line-dark">
                <SafeImage
                  src={project.image}
                  alt={project.title[lang]}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                <span className="font-mono text-[0.7rem] text-gold dark:text-gold-soft">
                  {project.metric[lang]}
                </span>

                <h3 className="font-display text-lg mt-2 mb-2 text-ink dark:text-paper-dark leading-snug">
                  {project.title[lang]}
                </h3>

                <p className="text-sm text-ink/65 dark:text-paper-dark/65 leading-relaxed line-clamp-3">
                  {project.summary[lang]}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tools.slice(0, 3).map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-[0.68rem] px-2 py-1 rounded-sm bg-steel/10 text-steel dark:text-steel-dark"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1 text-sm mt-4 text-ink dark:text-paper-dark group-hover:text-gold dark:group-hover:text-gold-soft transition-colors">
                  {t.viewDetails}
                  <ChevronRight
                    size={14}
                    className={lang === 'ar' ? 'rotate-180' : ''}
                  />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  PROJECT MODAL                                                       */
/* ------------------------------------------------------------------ */

function ProjectModal({ project, lang, t, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-paper dark:bg-ink-dark border border-line dark:border-line-dark rounded-sm max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.title[lang]}
      >
        {project.image && (
          <div className="h-52 w-full overflow-hidden">
            <SafeImage
              src={project.image}
              alt={project.title[lang]}
              className="w-full h-full object-cover object-top"
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="font-mono text-xs text-gold dark:text-gold-soft">
                {project.metric[lang]}
              </span>
              <h3 className="font-display text-xl sm:text-2xl mt-1.5 text-ink dark:text-paper-dark">
                {project.title[lang]}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 shrink-0 grid place-items-center rounded-full border border-line dark:border-line-dark hover:border-gold transition-colors"
              aria-label={t.close}
            >
              <X size={14} />
            </button>
          </div>

          <p className="text-ink/75 dark:text-paper-dark/75 leading-relaxed">
            {project.detail[lang]}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-5">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="font-mono text-[0.7rem] px-2.5 py-1 rounded-sm bg-steel/10 text-steel dark:text-steel-dark"
              >
                {tool}
              </span>
            ))}
          </div>

          <div className="mt-7">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink dark:bg-gold text-paper dark:text-ink-dark px-4 py-2.5 rounded-sm text-sm hover:opacity-90 transition-opacity"
              >
                <Github size={15} />
                {t.viewCode}
                <ExternalLink size={13} />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm text-ink/50 dark:text-paper-dark/50 font-mono">
                {t.noRepo}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  SKILLS                                                              */
/* ------------------------------------------------------------------ */

function Skills({ t, lang }) {
  return (
    <section id="skills" className="border-t border-line dark:border-line-dark">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <span className="font-mono text-xs text-steel dark:text-steel-dark">
          {t.skillsEyebrow}
        </span>

        <h2 className="font-display text-2xl sm:text-3xl mt-2 mb-10 text-ink dark:text-paper-dark">
          {t.skillsTitle}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, i) => {
            const Icon = group.icon

            return (
              <div
                key={i}
                className="border border-line dark:border-line-dark rounded-sm p-6 bg-surface/50 dark:bg-surface-dark/50"
              >
                <div className="w-9 h-9 grid place-items-center rounded-sm bg-gold/10 text-gold dark:text-gold-soft mb-4">
                  <Icon size={18} />
                </div>

                <h3 className="font-display text-lg mb-4 text-ink dark:text-paper-dark">
                  {group.title[lang]}
                </h3>

                <ul className="space-y-3.5">
                  {group.items.map((item, j) => (
                    <li key={j}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-ink/75 dark:text-paper-dark/75">
                          {item.name}
                        </span>
                      </div>

                      <div className="h-1 rounded-full bg-line dark:bg-line-dark overflow-hidden">
                        <div
                          className="h-full bg-steel dark:bg-steel-dark rounded-full"
                          style={{ width: `${item.level}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        <p className="mt-6 text-xs text-ink/45 dark:text-paper-dark/45 font-mono">
          {lang === 'en'
            ? 'Skill levels are indicative of hands-on project depth, not formal certifications.'
            : 'مستويات المهارات تعكس عمق الاستخدام العملي في المشاريع، وليست شهادات رسمية.'}
        </p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  EXPERIENCE TIMELINE                                                 */
/* ------------------------------------------------------------------ */

function Experience({ t, lang }) {
  return (
    <section
      id="experience"
      className="border-t border-line dark:border-line-dark"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <span className="font-mono text-xs text-steel dark:text-steel-dark">
          {t.experienceEyebrow}
        </span>

        <h2 className="font-display text-2xl sm:text-3xl mt-2 mb-12 text-ink dark:text-paper-dark">
          {t.experienceTitle}
        </h2>

        <div className="relative ps-8 border-s border-line dark:border-line-dark space-y-10">
          {TIMELINE.map((item, i) => {
            const Icon = item.icon

            return (
              <div key={i} className="relative">
                <span className="absolute -start-[2.55rem] top-0 w-8 h-8 grid place-items-center rounded-full bg-paper dark:bg-ink-dark border border-gold text-gold dark:text-gold-soft">
                  <Icon size={14} />
                </span>

                <span className="font-mono text-xs text-ink/50 dark:text-paper-dark/50">
                  {item.date[lang]}
                </span>

                <h3 className="font-display text-lg mt-1 mb-1.5 text-ink dark:text-paper-dark">
                  {item.title[lang]}
                </h3>

                <p className="text-sm text-ink/70 dark:text-paper-dark/70 leading-relaxed max-w-2xl">
                  {item.text[lang]}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  ABOUT                                                               */
/* ------------------------------------------------------------------ */

function About({ t, lang }) {
  return (
    <section id="about" className="border-t border-line dark:border-line-dark">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 grid lg:grid-cols-[1.3fr_1fr] gap-12">
        <div>
          <span className="font-mono text-xs text-steel dark:text-steel-dark">
            {t.aboutEyebrow}
          </span>

          <h2 className="font-display text-2xl sm:text-3xl mt-2 mb-5 text-ink dark:text-paper-dark">
            {t.aboutTitle}
          </h2>

          <p className="text-ink/75 dark:text-paper-dark/75 leading-relaxed mb-4">
            {t.aboutP1}
          </p>

          <p className="text-ink/75 dark:text-paper-dark/75 leading-relaxed">
            {t.aboutP2}
          </p>
        </div>

        <div className="border-s-2 border-gold/50 ps-6">
          <span className="font-mono text-xs text-steel dark:text-steel-dark flex items-center gap-1.5">
            <GraduationCap size={14} />
            {t.aboutEducationLabel}
          </span>

          <h3 className="font-display text-lg mt-2 text-ink dark:text-paper-dark">
            {t.aboutEducationDegree}
          </h3>

          <p className="text-sm mt-2 text-ink/65 dark:text-paper-dark/65 leading-relaxed">
            {t.aboutEducationSchool}
          </p>

          <p className="text-sm mt-1 text-ink/65 dark:text-paper-dark/65">
            {t.aboutEducationGrade}
          </p>

          <div className="flex items-center gap-2 mt-5 text-sm text-ink/60 dark:text-paper-dark/60">
            <MapPin size={14} />
            {PROFILE.location[lang]}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  CONTACT                                                             */
/* ------------------------------------------------------------------ */

function Contact({
  t,
  lang,
  formState,
  setFormState,
  onSubmit,
  submitted,
  loading,
}) {
  function update(field) {
    return (e) =>
      setFormState((state) => ({
        ...state,
        [field]: e.target.value,
      }))
  }

  const directLinks = [
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${PROFILE.email}`,
    },
    {
      icon: Github,
      label: 'GitHub',
      href: PROFILE.github,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: PROFILE.linkedin,
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: `https://wa.me/${PROFILE.phone.replace('+', '')}`,
    },
  ]

  return (
    <section
      id="contact"
      className="border-t border-line dark:border-line-dark"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 grid lg:grid-cols-[1fr_1.2fr] gap-12">
        <div>
          <span className="font-mono text-xs text-steel dark:text-steel-dark">
            {t.contactEyebrow}
          </span>

          <h2 className="font-display text-2xl sm:text-3xl mt-2 mb-4 text-ink dark:text-paper-dark leading-snug">
            {t.contactTitle}
          </h2>

          <p className="text-ink/70 dark:text-paper-dark/70 leading-relaxed mb-8">
            {t.contactLede}
          </p>

          <div className="space-y-3 text-sm text-ink/70 dark:text-paper-dark/70 mb-8">
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <a
                href={`mailto:${PROFILE.email}`}
                className="hover:text-gold transition-colors"
              >
                {PROFILE.email}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={14} />
              <a
                href={`tel:${PROFILE.phone}`}
                className="hover:text-gold transition-colors"
              >
                {PROFILE.phoneDisplay}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={14} />
              {PROFILE.location[lang]}
            </div>
          </div>

          <span className="font-mono text-xs text-ink/50 dark:text-paper-dark/50 block mb-3">
            {t.directContact}
          </span>

          <div className="flex flex-wrap gap-2">
            {directLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 grid place-items-center rounded-full border border-line dark:border-line-dark hover:border-gold dark:hover:border-gold-soft hover:text-gold dark:hover:text-gold-soft transition-colors"
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="border border-line dark:border-line-dark rounded-sm p-6 sm:p-8 bg-surface/50 dark:bg-surface-dark/50 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label={t.formName}>
              <input
                required
                type="text"
                value={formState.name}
                onChange={update('name')}
                className="form-input"
                autoComplete="name"
              />
            </Field>

            <Field label={t.formEmail}>
              <input
                required
                type="email"
                value={formState.email}
                onChange={update('email')}
                className="form-input"
                autoComplete="email"
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label={t.formCompany}>
              <input
                type="text"
                value={formState.company}
                onChange={update('company')}
                className="form-input"
                autoComplete="organization"
              />
            </Field>

            <Field label={t.formService}>
              <select
                value={formState.service}
                onChange={update('service')}
                className="form-input"
                required
              >
                <option value="" disabled>
                  {t.formServicePlaceholder}
                </option>

                {SERVICES.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service[lang]}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label={t.formMessage}>
            <textarea
              required
              rows={4}
              placeholder={t.formMessagePlaceholder}
              value={formState.message}
              onChange={update('message')}
              className="form-input resize-none"
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-ink dark:bg-gold text-paper dark:text-ink-dark px-5 py-3 rounded-sm text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                {t.formSending}
              </>
            ) : (
              <>
                <Send size={15} />
                {t.formSubmit}
              </>
            )}
          </button>

          {submitted && (
            <div className="flex items-start gap-2 text-sm text-steel dark:text-steel-dark bg-steel/10 rounded-sm px-4 py-3">
              <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-gold" />
              {t.formSuccess}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-mono text-ink/55 dark:text-paper-dark/55 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  )
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                              */
/* ------------------------------------------------------------------ */

function Footer({ t, lang }) {
  return (
    <footer className="border-t border-line dark:border-line-dark bg-ink dark:bg-surface-dark text-paper">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="font-display text-lg">
              {PROFILE.name[lang]}
              <span className="text-gold">.</span>
            </span>

            <p className="text-sm text-paper/55 mt-1.5 max-w-xs leading-relaxed">
              {t.footerTagline}
            </p>
          </div>

          <div className="flex items-center gap-4 text-paper/70">
            <a href={`mailto:${PROFILE.email}`} aria-label="Email">
              <Mail size={16} />
            </a>

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>

            <a
              href={`https://wa.me/${PROFILE.phone.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-paper/10 flex flex-wrap justify-between gap-2 text-xs text-paper/45">
          <span>
            © {new Date().getFullYear()} {PROFILE.fullName[lang]}
          </span>
          <span>{t.footerRights}</span>
        </div>
      </div>
    </footer>
  )
}
