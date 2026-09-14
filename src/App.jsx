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

const NAV_IDS = ['home', 'projects', 'case-studies', 'skills', 'experience', 'about', 'contact']

const STATS = [
  {
    value: 11,
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

const CASE_STUDIES = [
  {
    id: 'cs-olist-ecommerce',
    projectId: 'olist-ecommerce-sql-geospatial-predictive-analytics',
    featured: true,
    category: { en: 'E-Commerce & Logistics', ar: 'التجارة الإلكترونية واللوجستيات' },
    title: {
      en: 'E-Commerce SQL, Geo-Spatial & Predictive Analytics',
      ar: 'تحليلات SQL وجغرافية وتنبؤية للتجارة الإلكترونية',
    },
    tools: ['SQL', 'Python (Prophet)', 'Power BI', 'Haversine Formula'],
    metrics: [
      { label: { en: 'Late Delivery Rate', ar: 'معدل التأخير' }, value: '7.9%' },
      { label: { en: '6-Month Revenue Forecast', ar: 'توقع إيرادات 6 أشهر' }, value: '$7.20M' },
      { label: { en: 'Orders Analyzed', ar: 'طلب تم تحليله' }, value: '99,441' },
    ],
    problem: {
      en: 'Management needed to know whether actual delivery times were consistent with promised dates, and whether shipping distance was the real driver of any delay — before committing to logistics investment or adjusting delivery promises.',
      ar: 'احتاجت الإدارة لمعرفة هل مواعيد التسليم الفعلية متوافقة مع المواعيد الموعودة، وهل المسافة الجغرافية هي السبب الحقيقي وراء أي تأخير — قبل اتخاذ قرار استثمار لوجستي أو تعديل مواعيد التسليم المعلنة.',
    },
    solution: {
      en: 'Cleaned and joined 8 tables via SQL (window functions, correlated subqueries), reduced a 1M-row geolocation table by 98% and calculated real shipping distance with a manual Haversine formula, then added a Facebook Prophet forecasting layer surfaced live in Power BI.',
      ar: 'تنظيف وربط 8 جداول عبر SQL (window functions وsubqueries مترابطة)، وتقليص جدول جغرافي من مليون صف بنسبة 98% وحساب مسافة الشحن الحقيقية بمعادلة Haversine يدويًا، ثم إضافة طبقة تنبؤ بـ Facebook Prophet معروضة حيًا في Power BI.',
    },
    impact: {
      en: 'Found only 7.9% of orders are actually delayed despite an ~11-day early buffer, and that distance does not shorten delay — the company simply over-pads estimates for longer routes. Recommended trimming the delivery-date buffer by 3-4 days on stable routes (e.g. the São Paulo hub) without risking the 92%+ on-time rate, alongside a $7.20M 6-month revenue forecast (MAPE 17.57%) for planning.',
      ar: 'اكتُشف أن 7.9% فقط من الطلبات متأخرة فعليًا رغم هامش أمان ~11 يوم، وأن المسافة لا تُقصّر التأخير — الشركة ببساطة تبالغ في هامش الأمان للمسارات الطويلة. التوصية: تقليل هامش الأمان 3-4 أيام في المسارات المستقرة (محور ساو باولو) دون المساس بمعدل الالتزام (92%+)، مع توقع إيرادات 6 أشهر بقيمة 7.20 مليون دولار (بدقة MAPE 17.57%) لدعم التخطيط.',
    },
  },
  {
    id: 'cs-customer-retention',
    projectId: 'customer-retention-ltv-intelligence',
    featured: true,
    category: { en: 'Customer Analytics', ar: 'تحليلات العملاء' },
    title: {
      en: 'Customer Retention & LTV Intelligence',
      ar: 'ذكاء الاحتفاظ بالعملاء والقيمة الدائمة',
    },
    tools: ['Python', 'SQLite', 'Power BI', 'RFM & Cohort Analysis'],
    metrics: [
      { label: { en: 'At-Risk Revenue', ar: 'إيرادات معرضة للخطر' }, value: '$192K' },
      { label: { en: 'High-Value-at-Risk Customers', ar: 'عملاء عالي القيمة ومعرضين للخطر' }, value: '29' },
      { label: { en: 'Avg. CLV (at-risk segment)', ar: 'متوسط القيمة الدائمة (الشريحة المعرضة)' }, value: '$6,633' },
    ],
    problem: {
      en: 'The business needed to know which customers carry the highest future value and are at risk of churning right now — a far more urgent question than who bought the most last month.',
      ar: 'احتاجت الشركة لمعرفة مين العملاء اللي قيمتهم المستقبلية الأعلى ومعرضين لخطر المغادرة الآن — سؤال أهم بكتير من مين اشترى أكتر الشهر الماضي.',
    },
    solution: {
      en: 'Built an RFM and churn-risk scoring model in Python, a cohort retention matrix and CLV calculation in SQLite via CTEs and window logic, and a live Power BI dashboard connected via ODBC.',
      ar: 'بناء نموذج RFM وتصنيف مخاطر مغادرة في Python، ومصفوفة احتفاظ عبر الأفواج وحساب CLV في SQLite باستخدام CTEs، وداشبورد Power BI حي متصل عبر ODBC.',
    },
    impact: {
      en: 'Isolated a "High Value at Risk" segment of just 29 customers (0.67% of the base) holding $192,374 in revenue at risk, with an average CLV over 3x the overall average. Recommended a concentrated retention campaign for these 29 customers instead of a generic campaign spread across the full base — a far higher expected return per dollar spent.',
      ar: 'تحديد شريحة "عالية القيمة ومعرضة للخطر" من 29 عميل فقط (0.67% من القاعدة) يحملون 192,374 دولار إيرادات مهددة، بمتوسط قيمة دائمة أكثر من 3 أضعاف المتوسط العام. التوصية: حملة استبقاء مركزة على الـ 29 عميل دول بدل حملة عامة موزعة على كل القاعدة — عائد متوقع أعلى بكتير لكل دولار يُنفق.',
    },
  },
  {
    id: 'cs-pos-reconciliation',
    projectId: 'pos-delivery-sales-reconciliation',
    featured: true,
    category: { en: 'Finance & Retail Ops', ar: 'المالية وعمليات التجزئة' },
    title: {
      en: 'Multi-Platform Delivery Sales Reconciliation & Performance Analytics',
      ar: 'نظام مطابقة مبيعات منصات التوصيل وتسوية الفروقات',
    },
    tools: ['Excel', 'Power Query', 'XLOOKUP', 'Financial Audit'],
    metrics: [
      { label: { en: 'Matched Orders Rate', ar: 'نسبة تطابق الطلبات' }, value: '98.6%' },
      { label: { en: 'Platforms Reconciled', ar: 'منصات تمت تسويتها' }, value: '5' },
      { label: { en: 'Effective Platform Cut', ar: 'نسبة اقتطاع المنصات الفعلية' }, value: '20.9%' },
    ],
    problem: {
      en: 'A restaurant selling through POS and 5 delivery platforms — each with a different commission rate — needed to know whether payouts actually matched what was sold, and whether any orders were slipping through unpaid.',
      ar: 'مطعم بيبيع عبر نظام POS و5 منصات توصيل مختلفة العمولات، احتاج يعرف هل المتحصلات فعليًا متطابقة مع المبيعات، وهل فيه طلبات بتضيع من غير تحصيل.',
    },
    solution: {
      en: 'Merged POS and platform reports via a cross-system XLOOKUP join with a rounding-tolerance threshold, modeled a distinct commission and VAT rule per platform, and built an audit-flag system (Matched / Missing in Platform / Amount Mismatch).',
      ar: 'دمج تقارير الـ POS والمنصات عبر XLOOKUP وحد تسامح للتقريب، وبناء منطق عمولة وضريبة مختلف لكل منصة، ونظام أعلام تدقيق (مطابق / مفقود لدى المنصة / فرق في المبلغ).',
    },
    impact: {
      en: 'Found delivery platforms take an effective 20.9% combined cut of sales, and caught one confirmed revenue leak (a 157.24 SAR order paid in POS but never remitted by the platform). Recommended shifting promotional weight toward lower-commission platforms (Ninja 12%, Jahez 18%) over the highest-commission one (Chefz 22%) for an estimated 8-10% net revenue uplift, and running the reconciliation monthly rather than as a one-off.',
      ar: 'اكتُشف إن منصات التوصيل مجتمعة بتاخد اقتطاع فعلي 20.9% من المبيعات، وتم رصد حالة تسريب مؤكدة (طلب بقيمة 157.24 SAR اتباع في الـ POS لكن المنصة ما حولتش مقابله). التوصية: تحويل جزء من الترويج لصالح المنصات الأقل عمولة (Ninja 12%, Jahez 18%) بدل الأعلى عمولة (Chefz 22%) لزيادة صافي إيرادات تقديرية 8-10%، وتفعيل التسوية كإجراء شهري دوري.',
    },
  },
  {
    id: 'cs-hr-workforce',
    projectId: 'hr-workforce',
    category: { en: 'HR & Workforce', ar: 'الموارد البشرية والقوى العاملة' },
    title: {
      en: 'HR Workforce Analytics (SQL & Power BI)',
      ar: 'تحليل القوى العاملة بلغة SQL وPower BI',
    },
    tools: ['SQL', 'Power BI', 'CTEs & Self-Joins', 'ODBC'],
    metrics: [
      { label: { en: 'Employees Analyzed', ar: 'موظف تم تحليله' }, value: '1,562' },
      { label: { en: 'Attrition Rate', ar: 'معدل الدوران الوظيفي' }, value: '28.4%' },
      { label: { en: 'Performance Gap (stayed vs. left)', ar: 'فجوة الأداء (باقي مقابل مغادر)' }, value: '~0.1 pts' },
    ],
    problem: {
      en: 'Management assumed low performers were the ones leaving the company, and wanted to know which departments needed urgent retention attention.',
      ar: 'افترضت الإدارة إن أصحاب الأداء الضعيف هم اللي بيسيبوا الشركة، واحتاجت تعرف أي الأقسام محتاجة تدخل احتفاظ عاجل.',
    },
    solution: {
      en: 'Validated 3 linked tables, decoded undocumented HR action codes via pattern analysis, and built a two-page live Power BI dashboard via ODBC using CTEs and self-joins.',
      ar: 'تحقق من صحة 3 جداول مرتبطة، وفك تشفير أكواد إجراءات موارد بشرية غير موثقة عبر تحليل الأنماط، وبناء داشبورد Power BI حي من صفحتين عبر ODBC باستخدام CTEs وself-joins.',
    },
    impact: {
      en: 'Found performance ratings were nearly identical between employees who stayed and left (2.95 vs 3.05) — disproving the performance assumption entirely. Recommended redirecting retention efforts toward compensation and satisfaction instead, a hypothesis directly confirmed by the follow-up HR Attrition project.',
      ar: 'وُجد إن تقييم الأداء متقارب جدًا بين الباقين والمغادرين (2.95 مقابل 3.05) — نفي كامل لافتراض الأداء. التوصية: توجيه جهود الاحتفاظ نحو التعويض والرضا الوظيفي بدلًا من ذلك، وهي فرضية تأكدت فعليًا في مشروع تحليل ترك الخدمة التالي.',
    },
  },
  {
    id: 'cs-hr-attrition',
    projectId: 'hr-attrition-analysis-excel-python',
    category: { en: 'HR & Predictive Analytics', ar: 'الموارد البشرية والتحليل التنبؤي' },
    title: {
      en: 'HR Employee Attrition Analysis (Excel + Python)',
      ar: 'تحليل ترك خدمة الموظفين (Excel وPython)',
    },
    tools: ['Excel PivotTables', 'Python', 'Scikit-learn', 'Logistic Regression'],
    metrics: [
      { label: { en: 'Model Recall Improvement', ar: 'تحسين معدل اكتشاف الحالات' }, value: '23% → 70%' },
      { label: { en: 'Overtime Attrition Gap', ar: 'فجوة الاستقالة بسبب العمل الإضافي' }, value: '30.5% vs 10.4%' },
      { label: { en: 'Income Gap (left vs. stayed)', ar: 'فجوة الدخل (مغادر مقابل باقي)' }, value: '~26%' },
    ],
    problem: {
      en: 'Following the finding that performance wasn\u2019t driving attrition, the real question became: what actually predicts who leaves, and can departures be flagged before they happen?',
      ar: 'بعد ما ثبت إن الأداء مش السبب في الاستقالة، السؤال الحقيقي بقى: إيه اللي فعلاً بيتنبأ بمين هيسيب، وهل نقدر نكتشف الحالة قبل ما تحصل؟',
    },
    solution: {
      en: 'Ran PivotTable exploratory analysis to isolate the strongest factors, then built a Logistic Regression model in Python — diagnosing and fixing a class-imbalance trap with balanced class weights.',
      ar: 'تحليل استكشافي بـ PivotTables لعزل أقوى العوامل، ثم بناء نموذج Logistic Regression بـ Python — وتشخيص وحل مشكلة عدم توازن الفئات عبر أوزان متوازنة.',
    },
    impact: {
      en: 'Overtime emerged as the strongest driver (30.5% vs 10.4% departure rate), alongside a ~26% income gap and a clear satisfaction gap. The corrected model raised recall on true departures from 23% to 70% — recommended for use as a monthly early-warning risk score instead of a reactive resignation report.',
      ar: 'العمل الإضافي ظهر كأقوى عامل (معدل مغادرة 30.5% مقابل 10.4%)، مع فجوة دخل ~26% وفجوة رضا واضحة. النموذج المُصحح رفع معدل اكتشاف الحالات الحقيقية من 23% إلى 70% — التوصية: استخدامه كإنذار مبكر شهري بدل تقرير استقالات بعد وقوعها.',
    },
  },
  {
    id: 'cs-sales-powerbi',
    projectId: 'sales-power-bi',
    category: { en: 'Sales & Profitability', ar: 'المبيعات والربحية' },
    title: {
      en: 'Sales Performance & Profitability Analytics',
      ar: 'تحليل أداء المبيعات والربحية',
    },
    tools: ['Power BI', 'Power Query', 'ERP Data'],
    metrics: [
      { label: { en: 'Total Sales', ar: 'إجمالي المبيعات' }, value: '$829.07K' },
      { label: { en: 'Profit Margin', ar: 'هامش الربح' }, value: '32.87%' },
      { label: { en: 'Corporate AOV Premium', ar: 'زيادة متوسط طلب Corporate' }, value: '+18%' },
    ],
    problem: {
      en: 'Management needed to know which reps, segments, and categories were actually driving profit, to align incentives and marketing spend accordingly.',
      ar: 'احتاجت الإدارة تعرف مين المندوبين والقطاعات والفئات اللي فعلاً بتحرك الربح، عشان توازن الحوافز والإنفاق التسويقي بناءً عليها.',
    },
    solution: {
      en: 'Cleaned unstructured ERP exports with Power Query and built a two-page executive Power BI dashboard covering sales, margin, and regional target performance.',
      ar: 'تنظيف بيانات ERP غير منظمة عبر Power Query وبناء داشبورد تنفيذي من صفحتين في Power BI يغطي المبيعات والهامش وأداء الأهداف الإقليمية.',
    },
    impact: {
      en: 'Found the Corporate segment, despite being only 14.63% of sales, carries an 18% higher average order value than retail. Recommended reallocating a portion of marketing spend toward Corporate to grow margin faster than pushing an already-saturated Consumer segment.',
      ar: 'وُجد إن قطاع Corporate، رغم إنه 14.63% بس من المبيعات، بيحقق متوسط قيمة طلب أعلى بـ18% عن التجزئة. التوصية: إعادة توزيع جزء من ميزانية التسويق لصالح Corporate لرفع الهامش أسرع من محاولة زيادة حجم قطاع Consumer المُشبع فعلاً.',
    },
  },
  {
    id: 'cs-sales-excel',
    projectId: 'sales-excel',
    category: { en: 'Sales Systems (Excel)', ar: 'أنظمة مبيعات (إكسل)' },
    title: {
      en: 'Advanced Sales Performance Dashboard (Excel)',
      ar: 'داشبورد متقدم لأداء المبيعات (إكسل)',
    },
    tools: ['Excel', 'Power Query', 'Star Schema', 'PivotTables'],
    metrics: [
      { label: { en: 'Data Model', ar: 'نموذج البيانات' }, value: 'Star Schema' },
      { label: { en: 'Core Formulas', ar: 'المعادلات الأساسية' }, value: 'SUMIFS · XLOOKUP' },
      { label: { en: 'Deployment Cost', ar: 'تكلفة النشر' }, value: 'No BI license needed' },
    ],
    problem: {
      en: 'Teams without a BI license or IT support still need the same depth of sales tracking and KPI visibility as a full Power BI dashboard.',
      ar: 'فرق بدون ترخيص BI أو دعم IT محتاجة نفس عمق تتبع المبيعات ورؤية المؤشرات زي داشبورد Power BI كامل.',
    },
    solution: {
      en: 'Cleaned multi-source sales data with Power Query, modeled it into a relational Star Schema inside Excel itself, and surfaced it through PivotTables and dynamic SUMIFS/XLOOKUP formulas.',
      ar: 'تنظيف بيانات مبيعات متعددة المصادر عبر Power Query، ونمذجتها في مخطط نجمي داخل Excel نفسه، وعرضها عبر PivotTables ومعادلات SUMIFS/XLOOKUP ديناميكية.',
    },
    impact: {
      en: 'Delivered the same analytical depth as a BI-tool dashboard using only Excel — a solution any small or mid-size business can deploy immediately with zero additional licensing cost, opening a distinct client segment from BI-tool buyers.',
      ar: 'تحقيق نفس العمق التحليلي لداشبورد BI باستخدام Excel فقط — حل تقدر أي شركة صغيرة أو متوسطة تنشره فورًا بدون أي تكلفة ترخيص إضافية، وده بيفتح شريحة عملاء مختلفة عن مشتري أدوات BI.',
    },
  },
  {
    id: 'cs-hr-payroll-excel',
    projectId: 'hr-payroll-excel',
    category: { en: 'HR Operations (Foundational)', ar: 'عمليات موارد بشرية (تأسيسية)' },
    title: {
      en: 'HR Operations & Payroll Analytics System (Excel)',
      ar: 'نظام تحليل عمليات الموارد البشرية والرواتب (إكسل)',
    },
    tools: ['Excel', 'XLOOKUP', 'Dynamic FILTER', 'Data Validation'],
    metrics: [
      { label: { en: 'Net Salary Tracked', ar: 'صافي رواتب تم تتبعه' }, value: '$219,558.07' },
      { label: { en: 'Overtime Cost', ar: 'تكلفة العمل الإضافي' }, value: '$3,627.64' },
      { label: { en: 'Employees Covered', ar: 'موظف مغطى' }, value: '35' },
    ],
    problem: {
      en: 'A small manufacturer managing 35 employees\u2019 payroll and attendance manually needed visibility into real overtime cost and workforce distribution.',
      ar: 'مصنع صغير بيدير رواتب وحضور 35 موظف يدويًا، احتاج رؤية لتكلفة العمل الإضافي الحقيقية وتوزيع القوى العاملة.',
    },
    solution: {
      en: 'Built a multi-sheet automated workbook linking employee data, attendance, leave, and payroll with XLOOKUP and dynamic FILTER formulas, with built-in data-validation error logging.',
      ar: 'بناء ملف متعدد الشيتات ومؤتمت يربط بيانات الموظفين والحضور والإجازات والرواتب بمعادلات XLOOKUP وFILTER ديناميكية، مع تسجيل أخطاء تحقق مدمج.',
    },
    impact: {
      en: 'Surfaced an overtime cost of $3,627.64 concentrated mostly in the largest department (Warehouse), suggesting a part-time hire could break even within a few months of continued overtime reliance. This was the first project in the portfolio timeline — the starting point that led into the SQL, Power BI, and Python projects that followed.',
      ar: 'كشف تكلفة عمل إضافي $3,627.64 متركزة غالبًا في أكبر الأقسام (Warehouse)، ما يشير إلى إن توظيف بدوام جزئي ممكن يكسر التعادل خلال شهور قليلة لو استمر الاعتماد على الأوفرتايم. ده كان أول مشروع في المسار الزمني للبورتفوليو — نقطة البداية اللي قادت لمشاريع SQL وPower BI وPython اللي جت بعده.',
    },
  },
  {
    id: 'cs-hr-payroll-engine',
    projectId: 'hr-payroll-excel-power-query',
    category: { en: 'HR Operations & Payroll Engine', ar: 'محرك عمليات الرواتب' },
    title: {
      en: 'HR Operations & Executive Payroll Intelligence System',
      ar: 'نظام ذكاء الرواتب التنفيذي وعمليات الموارد البشرية',
    },
    tools: ['Excel', 'Power Query', 'XLOOKUP', 'Data Quality Audit'],
    metrics: [
      { label: { en: 'Employees Covered', ar: 'موظف مغطى' }, value: '1,470' },
      { label: { en: 'Gross Payroll Modeled', ar: 'إجمالي رواتب تمت نمذجته' }, value: '$10.90M' },
      { label: { en: 'Reconciliation Accuracy', ar: 'دقة التسوية' }, value: 'Zero errors' },
    ],
    problem: {
      en: 'The source HR dataset (1,470 employees) had no payroll fields at all — but the underlying question of gross/net cost and departmental cost breakdown still needed an answer.',
      ar: 'داتاسيت الموارد البشرية المصدر (1,470 موظف) معندهوش أي حقول رواتب أصلًا — لكن سؤال التكلفة الإجمالية والصافية وتوزيعها على الأقسام لسه محتاج إجابة.',
    },
    solution: {
      en: 'Designed a transparent, formula-based payroll simulation engine in Excel and Power Query on top of real employee attributes (hourly rate, overtime status), with a dedicated Data Quality tab verifying full Gross \u2212 Deductions = Net reconciliation.',
      ar: 'تصميم محرك محاكاة رواتب شفاف بالمعادلات في Excel وPower Query فوق خصائص موظفين حقيقية (معدل الأجر، حالة العمل الإضافي)، مع شيت جودة بيانات مخصص يتحقق من مطابقة كاملة (الإجمالي − الخصومات = الصافي).',
    },
    impact: {
      en: 'Modeled $10.90M gross / $8.76M net payroll across all 1,470 employees with zero calculation errors and instant per-employee payslip lookup. Documented clearly as a simulation model (the source data had no real payroll figures) rather than presenting it as audited real payroll — an honesty choice that protects credibility with any client reviewing the methodology.',
      ar: 'تمت نمذجة رواتب إجمالية $10.90M وصافية $8.76M عبر كل الـ1,470 موظف بصفر أخطاء حسابية مع استخراج قسيمة راتب فوري لكل موظف. تم توثيقه بوضوح كنموذج محاكاة (البيانات الأصلية معندهاش أرقام رواتب حقيقية) بدل تقديمه كرواتب فعلية مدققة — اختيار بالشفافية بيحمي مصداقية المشروع أمام أي عميل بيراجع المنهجية.',
    },
  },
  {
    id: 'cs-global-ecommerce',
    projectId: 'global-ecommerce-retail-analytics-dashboard',
    category: { en: 'Retail & Finance (Excel Power Pivot)', ar: 'تجزئة ومالية (Excel Power Pivot)' },
    title: {
      en: 'Global E-Commerce & Retail Analytics Dashboard',
      ar: 'داشبورد تحليلات التجارة الإلكترونية والتجزئة العالمية',
    },
    tools: ['Excel Power Pivot', 'DAX', 'Star Schema', 'Data Quality Audit'],
    metrics: [
      { label: { en: 'Revenue Analyzed', ar: 'إيرادات تم تحليلها' }, value: '$5.28M' },
      { label: { en: 'Profit Margin', ar: 'هامش الربح' }, value: '27.21%' },
      { label: { en: '2024 YoY Change', ar: 'التغير السنوي 2024' }, value: '-50.28%' },
    ],
    problem: {
      en: 'A global retailer needed to track multi-year revenue growth and category profitability across a 10,000-order dataset without relying on slow flat spreadsheets.',
      ar: 'شركة تجزئة عالمية احتاجت تتبع نمو الإيرادات متعدد السنوات وربحية الفئات عبر بيانات 10,000 طلب بدون الاعتماد على شيتات مسطحة بطيئة.',
    },
    solution: {
      en: 'Modeled the transactions into a Star Schema inside Excel Power Pivot (Fact_Sales + 4 dimension tables) with 9 DAX measures, including Time Intelligence YoY Growth %, plus an automated Data Quality Audit sheet.',
      ar: 'نمذجة المعاملات في Star Schema داخل Excel Power Pivot (جدول حقائق + 4 جداول أبعاد) مع 9 مقاييس DAX، منها Time Intelligence لنسبة النمو السنوي، بالإضافة لشيت تدقيق جودة بيانات آلي.',
    },
    impact: {
      en: 'Revealed a 2023 revenue peak ($2.31M) followed by a sharp 2024 decline to $1.15M (-50.28% YoY) — with Electronics alone responsible for ~64% of total revenue ($3.38M), making the category the most likely source of the drop. Recommended (estimated) reallocating 10-15% of the 2025 marketing budget toward category diversification once the decline is confirmed at the category-year level.',
      ar: 'كشف طفرة إيرادات في 2023 ($2.31M) تبعها تراجع حاد في 2024 لـ$1.15M (-50.28% سنويًا) — مع كون Electronics مسؤولة وحدها عن ~64% من الإيرادات ($3.38M)، ما يجعلها المصدر الأرجح للتراجع. التوصية (تقديرية): إعادة تخصيص 10-15% من ميزانية تسويق 2025 لتنويع الفئات بعد تأكيد مصدر التراجع على مستوى الفئة والسنة.',
    },
  },
  {
    id: 'cs-maintenance-ops',
    projectId: 'maintenance-operations-reliability-dashboard',
    category: { en: 'Operations & Reliability', ar: 'العمليات والموثوقية' },
    title: {
      en: 'Maintenance Operations & Equipment Reliability Dashboard',
      ar: 'داشبورد عمليات الصيانة وموثوقية المعدات',
    },
    tools: ['Power BI', 'DAX', 'Power Query', 'Star Schema'],
    metrics: [
      { label: { en: 'Total Maintenance Cost', ar: 'إجمالي تكلفة الصيانة' }, value: '$86.53K' },
      { label: { en: 'True MTTR', ar: 'متوسط وقت الإصلاح الحقيقي' }, value: '13.29 Hours' },
      { label: { en: 'Preventive Maintenance Ratio', ar: 'نسبة الصيانة الوقائية' }, value: '60%' },
    ],
    problem: {
      en: 'A manufacturing facility faced high maintenance costs and repeated equipment downtime with no clear root-cause visibility or accurate repair-time tracking.',
      ar: 'منشأة صناعية تعاني من ارتفاع تكاليف الصيانة وتكرار توقف المعدات دون معرفة الأسباب الجذرية أو قياس دقيق لوقت الإصلاح.',
    },
    solution: {
      en: 'Built a Star Schema model linking 180 work orders across 12 assets and 5 departments to a custom Calendar table, with DAX measures computing true MTTR via DATEDIFF between report and resolution timestamps.',
      ar: 'بناء نموذج Star Schema يربط 180 تذكرة أعطال عبر 12 معدة و5 أقسام بجدول تقويم مخصص، مع مقاييس DAX تحسب MTTR الحقيقي عبر DATEDIFF بين وقت البلاغ والحل.',
    },
    impact: {
      en: 'Identified $86.5K in maintenance cost concentrated in a handful of assets, alongside a preventive-maintenance ratio of only 60%. Recommended (estimated) raising that ratio to 75-80%, which could reduce total downtime (currently 2.53K hours) by 10-15% — an estimated $8.6K-$13K in annual savings, pending a cost breakdown by maintenance type to confirm.',
      ar: 'تحديد تركز $86.5K من تكلفة الصيانة في عدد محدود من المعدات، مع نسبة صيانة وقائية 60% فقط. التوصية (تقديرية): رفع النسبة إلى 75-80%، ما قد يقلل التوقف الكلي (حاليًا 2.53K ساعة) بنسبة 10-15% — بتوفير تقديري $8.6K-$13K سنويًا، محتاج تأكيد بمقارنة التكلفة حسب نوع الصيانة.',
    },
  },
];

const PROJECTS = [

{
    id: 'maintenance-operations-reliability-dashboard',
    categories: ['dashboards', 'data'],
    image: '/projects/Maintenance_Dashboard_Executive_Overview.png',
    metric: {
      en: '$86.5K maintenance cost · 13.29h MTTR',
      ar: '86.5 ألف دولار تكلفة صيانة · 13.29 ساعة متوسط وقت الإصلاح',
    },
    title: {
      en: 'Maintenance Operations & Equipment Reliability Dashboard',
      ar: 'داشبورد عمليات الصيانة وموثوقية المعدات',
    },
    summary: {
      en: 'Consolidated scattered maintenance logs into a two-page Power BI dashboard tracking repair costs, downtime trends, and true response-time performance across 180 tickets.',
      ar: 'وحّدت سجلات صيانة متفرقة في داشبورد Power BI من صفحتين لتتبع تكاليف الإصلاح واتجاهات التوقف وأداء زمن الاستجابة الفعلي عبر 180 بلاغ صيانة.',
    },
    detail: {
      en: 'Built a maintenance analytics model from 180 tickets across 12 assets and 5 departments, connected through a star-schema data model with a dedicated Calendar table (custom-sorted so months order correctly across year boundaries). Six DAX measures power the report, including a Mean Time To Repair calculated from the actual DATEDIFF between reported and resolved timestamps rather than a static duration field — surfacing a true MTTR of 13.29 hours, a 75.56% completion rate, and $86.5K in total maintenance spend concentrated on a handful of high-cost assets.',
      ar: 'بنيت نموذج تحليل صيانة من 180 بلاغ عبر 12 معدة و5 أقسام، مرتبط بنموذج بيانات نجمي مع جدول تقويم مخصص (مرتب زمنيًا بشكل مخصص عشان الشهور تترتب صح عبر السنوات). ستة مقاييس DAX تشغّل التقرير، من ضمنها متوسط وقت الإصلاح المحسوب من الفرق الفعلي بين وقت البلاغ ووقت الحل بدل عمود مدة ثابت — كاشفًا متوسط وقت إصلاح حقيقي 13.29 ساعة، ومعدل إنجاز 75.56%، و86.5 ألف دولار إجمالي تكلفة صيانة متركزة على عدد قليل من المعدات عالية التكلفة.',
    },
    tools: ['Power BI', 'DAX', 'Power Query', 'Data Modeling'],
    github: 'https://github.com/fatahallah/Maintenance-Operations-Dashboard-PowerBI',
},
  
{
    id: 'hr-payroll-excel-power-query',
    categories: ['dashboards', 'data'],
    image: '/projects/الرئيسية - Main Cover.png',
    metric: {
      en: 'Automated payroll engine across 1,470 employees',
      ar: 'محرك رواتب آلي لـ 1,470 موظف',
    },
    title: {
      en: 'HR Operations & Executive Payroll Intelligence System',
      ar: 'نظام ذكاء الرواتب التنفيذي وعمليات الموارد البشرية',
    },
    summary: {
      en: 'Built a documented payroll calculation engine in Excel and Power Query on top of real HR data, generating automated payslips and an executive dashboard with full data quality governance.',
      ar: 'بنيت محرك حساب رواتب موثق باستخدام Excel وPower Query فوق بيانات موارد بشرية حقيقية، لإنشاء قسائم رواتب آلية وداشبورد تنفيذي مع حوكمة كاملة لجودة البيانات.',
    },
    detail: {
      en: 'Using real employee attributes (hourly rate, overtime status) from the IBM HR Analytics dataset, I designed a transparent, formula-based payroll simulation model — since the source data does not include payroll details — to calculate overtime pay, allowances, gross salary, statutory deductions, and net salary for all 1,470 employees. Power Query handled the ETL pipeline, while Excel delivered an interactive employee payslip lookup and an executive dashboard tracking gross/net payroll and departmental cost breakdowns. A dedicated Data Quality tab verifies zero missing values and full payroll reconciliation (Gross − Deductions = Net) across every record.',
      ar: 'باستخدام خصائص حقيقية للموظفين (معدل الأجر بالساعة، حالة العمل الإضافي) من داتاسيت IBM لتحليلات الموارد البشرية، صممت موديل محاكاة رواتب شفاف وموثق بالمعادلات — بما أن البيانات الأصلية لا تحتوي على تفاصيل رواتب — لحساب أجر العمل الإضافي، البدلات، الراتب الإجمالي، الخصومات القانونية، والراتب الصافي لجميع الـ1,470 موظف. تولى Power Query خط معالجة البيانات، بينما قدم Excel نظام بحث تفاعلي لقسيمة راتب الموظف وداشبورد تنفيذي يتتبع الرواتب الإجمالية والصافية وتوزيع التكلفة على الأقسام. شيت مخصص لجودة البيانات يتحقق من عدم وجود قيم مفقودة ومطابقة كاملة لحسابات الرواتب عبر كل سجل.',
    },
    tools: ['Excel', 'Power Query', 'XLOOKUP', 'PivotTables', 'Data Quality Audit'],
    github: 'https://github.com/fatahallah/HR-Operations-Executive-Payroll-System',
},
  
{
    id: 'hr-attrition-analysis-excel-python',
    categories: ['dashboards', 'data'],
    image: '/projects/HR_Employee_Attrition_Excel_Analysis.png',
    metric: {
      en: '70% recall vs. 23% — fixing a hidden model failure',
      ar: 'رفع معدل اكتشاف الحالات من 23% إلى 70% بحل مشكلة خفية في الموديل',
    },
    title: {
      en: 'HR Employee Attrition Analysis (Advanced Excel + Python Prediction)',
      ar: 'تحليل ترك خدمة الموظفين (Excel متقدم وتنبؤ بـ Python)',
    },
    summary: {
      en: 'Identified the key drivers of employee attrition using advanced Excel (PivotTables, DAX-free interactive dashboard), then built a Python classification model — uncovering and fixing a class-imbalance trap that was hiding 77% of at-risk employees.',
      ar: 'حددت العوامل الرئيسية لترك الموظفين للخدمة باستخدام Excel المتقدم (PivotTables وداشبورد تفاعلي)، ثم بنيت موديل تصنيف بلغة Python — واكتشفت وحليت مشكلة عدم توازن الفئات اللي كانت مخفية عن 77% من الموظفين المعرضين للخطر.',
    },
    detail: {
      en: 'Using the real IBM HR Analytics dataset (1,470 employees), I identified overtime as the strongest attrition driver (3x higher departure rate) through advanced Excel PivotTables and an interactive dashboard. I then built a Logistic Regression model in Python — but the initial 86.73% accuracy model was misleading: it caught only 11 of 47 actual departures. After diagnosing this as a class-imbalance problem and retraining with balanced class weights, recall on departing employees rose to 70% (33 of 47 caught), a deliberate trade-off explained by the asymmetric cost of missing a real flight risk versus a false alarm.',
      ar: 'باستخدام داتاسيت IBM الحقيقي لتحليلات الموارد البشرية (1,470 موظف)، حددت العمل الإضافي كأقوى عامل لترك الخدمة (معدل مغادرة أعلى 3 مرات) من خلال PivotTables متقدمة وداشبورد تفاعلي في Excel. بعدها بنيت موديل Logistic Regression بلغة Python — لكن دقة الموديل الأولى (86.73%) كانت مضللة: اكتشف 11 بس من أصل 47 حالة مغادرة حقيقية. بعد تشخيص المشكلة كخلل في توازن الفئات وإعادة التدريب بأوزان متوازنة، ارتفع معدل الاكتشاف لـ 70% (33 من 47)، وهي مقايضة مقصودة بسبب التكلفة غير المتماثلة بين تفويت موظف معرض للخطر فعليًا وإنذار كاذب.',
    },
    tools: ['Excel PivotTables', 'Python', 'Scikit-learn', 'Logistic Regression', 'Class Imbalance'],
    github: 'https://github.com/fatahallah/HR-Attrition-Analysis-Excel-Python',
},
  
  {
    id: 'global-ecommerce-retail-analytics-dashboard',
    categories: ['dashboards', 'data'],
    image: '/projects/ECommerce_Analytics_v1.png',
    metric: {
      en: '$5.28M Revenue analyzed across 10K orders',
      ar: 'تحليل إيرادات بقيمة 5.28 مليون دولار عبر 10 آلاف طلب',
    },
    title: {
      en: 'Global E-Commerce & Retail Analytics Dashboard',
      ar: 'داشبورد تحليلات التجارة الإلكترونية والتجزئة العالمية',
    },
    summary: {
      en: 'Engineered an institutional dark-mode Excel analytics dashboard powered by a Power Pivot Star Schema and custom DAX measures, tracking key financial KPIs and multi-year growth trends.',
      ar: 'صممت داشبورد تفاعلية محترفة بلغة Excel بالنمط المظلم معتمدة على نموذج بيانات Star Schema في Power Pivot ومعادلات DAX متقدمة لمتابعة مؤشرات الأداء المالية ونسب النمو السنوي.',
    },
    detail: {
      en: 'Built an enterprise-grade analytics solution uniting multi-table transactional data into a Star Schema Data Model (Fact_Sales linked to 4 Dimension tables). Developed dynamic DAX measures for Revenue, Profit Margin (27.21%), AOV ($528.44), and Time Intelligence YoY Growth %. The solution features automated Data Quality Audit sheets and an executive Dark-Mode UI optimized for print and portfolio presentation.',
      ar: 'بنيت حل تحليلي مؤسسي يربط المعاملات المالية بنموذج بيانات Star Schema داخل Excel Power Pivot (جدول المبيعات مرتبط بـ 4 جداول أبعاد). قمت بصياغة معادلات DAX ديناميكية لحساب الإيرادات، هامش الربح (27.21%)، ومتوسط قيمة الطلب (528.44$)، ونسب النمو السنوي YoY. يتضمن المشروع شيتات توثيق وجودة البيانات Data Quality Audit مع واجهة Dark-Mode متكاملة ومجهزة للتصدير المباشر.',
    },
    tools: ['Excel Power Pivot', 'DAX', 'Star Schema', 'Data Modeling', 'Data Quality Audit', 'Dark-Mode UI'],
    github: 'https://github.com/fatahallah/Global-Ecommerce-Performance-Dashboard',
},
 
  {
    id: 'customer-retention-ltv-intelligence',
    categories: ['data', 'dashboards'],
    image: '/projects/retention-ltv.png',
    metric: {
      en: '29 customers hold $192K in at-risk revenue',
      ar: '29 عميل يمثلون 192 ألف دولار من الإيرادات المعرضة للخطر',
    },
    title: {
      en: 'Customer Retention & LTV Intelligence',
      ar: 'ذكاء الاحتفاظ بالعملاء والقيمة الدائمة',
    },
    summary: {
      en: 'Built a Monetary-aware churn risk model and monthly cohort retention matrix, isolating a small high-value customer segment responsible for a disproportionate share of at-risk revenue.',
      ar: 'بنيت نموذج تصنيف مخاطر فقدان عملاء يراعي القيمة المالية، وجدول احتفاظ شهري (Cohort)، وحددت شريحة صغيرة من العملاء عالي القيمة مسؤولة عن نسبة كبيرة من الإيرادات المعرضة للخطر.',
    },
    detail: {
      en: 'Using the two-year UCI Online Retail II dataset, I built a churn risk model in Python that checks lifetime spend before recency alone — isolating a "High Value at Risk" segment of just 29 customers (0.67% of the customer base) who nonetheless represent $192,374 in historical revenue and an average lifetime value of $6,633, over 3x the overall average. I validated the SQL cohort retention matrix and CLV calculations directly inside the notebook before exporting to a live Power BI dashboard.',
      ar: 'باستخدام داتاسيت UCI Online Retail II الممتد لسنتين، بنيت نموذج تصنيف مخاطر فقدان عملاء بلغة Python بيراعي إجمالي الإنفاق مش الحداثة بس — وحددت شريحة "عالية القيمة ومعرضة للخطر" من 29 عميل بس (0.67% من قاعدة العملاء) لكنهم يمثلون 192,374 دولار من الإيرادات التاريخية، بمتوسط قيمة دائمة 6,633 دولار، أكتر من 3 أضعاف المتوسط العام. تحققت من جدول الاحتفاظ الشهري وحسابات القيمة الدائمة مباشرة داخل النوتبوك قبل عرضها في داشبورد Power BI حي.',
    },
    tools: ['Python', 'Pandas', 'SQL', 'Power BI', 'Cohort Analysis', 'RFM'],
    github: 'https://github.com/fatahallah/Customer-Retention-LTV-Intelligence',
},
    {
    id: 'olist-ecommerce-sql-geospatial-predictive-analytics',
    categories: ['data', 'dashboards'],
    image: '/projects/olist_forecasting_dashboard.png',
    metric: {
      en: '$7.20M projected 6-month revenue expansion',
      ar: 'نمو متوقع في الإيرادات بقيمة 7.20 مليون دولار خلال 6 أشهر',
    },
    title: {
      en: 'E-Commerce SQL, Geo-Spatial & Predictive Analytics (Prophet + Power BI)',
      ar: 'تحليلات SQL وجغرافية وتنبؤية للتجارة الإلكترونية (Prophet وPower BI)',
    },
    summary: {
      en: 'Analyzed 99,441 orders via complex SQL joins & Haversine distance, then built a Python Facebook Prophet pipeline to project a $7.20M 6-month forecast with 95% confidence bands in Power BI.',
      ar: 'حللت 99,441 طلب عبر ربط معقد بـ SQL ومعادلة Haversine للمسافات، ثم بنيت نموذج تنبؤ بـ Python وProphet لتقدير إيرادات 7.20M$ لـ 6 أشهر مع فترات ثقة 95% في Power BI.',
    },
    detail: {
      en: 'Analyzed Olist e-commerce dataset (99,441 orders) using multi-table SQL joins, window functions, and a manual Haversine distance calculation to resolve shipping delay factors. Extended the project into predictive analytics using Python (Facebook Prophet) to model historical revenues (Jan 2017 – Aug 2018) and project a 6-month forecast (Sep 2018 – Feb 2019) at $7.20M with 95% confidence bounds. Pipeline exported structured forecast outputs to a dedicated SQLite DB (olist_forecast.db) and surfaced them in an executive Power BI dashboard using explicit DAX measures for Next Month ($1.10M) and 6M Total forecasts.',
      ar: 'تحليل شامل لبيانات متجر Olist (99,441 طلب) باستخدام استعلامات SQL معقدة، دوان النافذة (Window Functions)، وحساب مسافات الشحن المباشرة بمعادلة Haversine. تم توسيع المشروع ليشمل التحليل التنبؤي باستخدام Python ومكتبة Facebook Prophet لنمذجة الإيرادات التاريخية وتوقع إيرادات 6 أشهر قادمة بقيمة 7.20M$ عند هامش ثقة 95%. تم تصدير مخرجات التوقع إلى قاعدة بيانات SQLite متخصصة (olist_forecast.db) وربطها بداشبورد Power BI قيادي يبرز مؤشرات DAX المخصصة للشهر القادم ($1.10M) وإجمالي الـ 6 أشهر.',
    },
    tools: ['SQL', 'Python (Prophet)', 'Power BI', 'DAX', 'SQLite', 'Geo-Spatial Analysis'],
   github: 'https://github.com/fatahallah/Ecommerce-SQL-Analytics',
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
  {
    id: 'pos-delivery-sales-reconciliation',
    categories: ['data'],
    image: '/projects/pos-reconciliation-dashboard.png',
    metric: {
      en: '98.6% matched orders across 5 delivery platforms',
      ar: '98.6% نسبة تطابق عبر 5 منصات توصيل',
    },
    title: {
      en: 'Multi-Platform Delivery Sales Reconciliation & Performance Analytics',
      ar: 'نظام مطابقة مبيعات منصات التوصيل وتسوية الفروقات',
    },
    summary: {
      en: 'Reconciled POS sales against 5 delivery platforms with different commission structures, catching a confirmed revenue leak and quantifying the real cost of each platform.',
      ar: 'تسوية مبيعات الـ POS مقابل 5 منصات توصيل بعمولات مختلفة، مع رصد تسريب إيرادات مؤكد وتحديد التكلفة الفعلية لكل منصة.',
    },
    detail: {
      en: 'Merged Foodics POS sales data with a combined delivery-platform report via a cross-system XLOOKUP join (Platform_Reference_ID ↔ Platform_Order_ID) and a <0.01 SAR rounding-tolerance threshold. Modeled a distinct commission rate per platform (Jahez 18%, Hungerstation 20%, ToYou 15%, Ninja 12%, Chefz 22%) with 15% VAT applied to the commission only, and built an audit-flag system distinguishing Matched, Missing in Platform (confirmed revenue leak), and Amount Mismatch orders. Found the platforms take an effective 20.9% combined cut of gross sales, and caught one confirmed leak worth 157.24 SAR.',
      ar: 'دمج بيانات مبيعات Foodics POS مع تقرير منصات التوصيل المجمّع عبر ربط XLOOKUP عابر للأنظمة (Platform_Reference_ID ↔ Platform_Order_ID) وحد تسامح للتقريب أقل من 0.01 SAR. تصميم نسبة عمولة مختلفة لكل منصة (Jahez 18%، Hungerstation 20%، ToYou 15%، Ninja 12%، Chefz 22%) مع ضريبة قيمة مضافة 15% على العمولة فقط، وبناء نظام أعلام تدقيق يميز الطلبات المطابقة والمفقودة لدى المنصة (تسريب مؤكد) وفروق المبلغ. تبين أن المنصات تأخذ اقتطاعًا فعليًا 20.9% من إجمالي المبيعات، ورُصدت حالة تسريب مؤكدة بقيمة 157.24 ريال سعودي.',
    },
    tools: ['Excel', 'Power Query', 'XLOOKUP', 'Financial Audit'],
    github: 'https://github.com/fatahallah/Multi-Platform-POS-Reconciliation-Hub',
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
      'case-studies': 'Case Studies',
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
    caseStudiesEyebrow: 'Case Studies',
    caseStudiesTitle: 'Problem → Solution → Business Impact, for every project',
    caseStudiesLede:
      'Each project below follows the same framework: the business decision it was meant to inform, how it was built, and the quantified outcome or recommendation it produced.',
    featuredLabel: 'Featured',
    readCaseStudy: 'Read case study',
    csProblem: 'Business Problem',
    csSolution: 'Technical Solution',
    csImpact: 'Business Impact',
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
      'case-studies': 'دراسات الحالة',
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
    caseStudiesEyebrow: 'دراسات الحالة',
    caseStudiesTitle: 'المشكلة ← الحل ← الأثر التجاري، لكل مشروع',
    caseStudiesLede:
      'كل مشروع تحت بيتبع نفس المنهجية: القرار التجاري اللي كان المشروع بيخدمه، إزاي اتبنى، والنتيجة أو التوصية القابلة للقياس اللي طلعها.',
    featuredLabel: 'مميز',
    readCaseStudy: 'اقرأ دراسة الحالة',
    csProblem: 'المشكلة التجارية',
    csSolution: 'الحل التقني',
    csImpact: 'الأثر التجاري',
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
  const [activeCaseStudy, setActiveCaseStudy] = useState(null)
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

      <CaseStudies t={t} lang={lang} setActiveCaseStudy={setActiveCaseStudy} />

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

      {activeCaseStudy && (
        <CaseStudyModal
          caseStudy={activeCaseStudy}
          lang={lang}
          t={t}
          onClose={() => setActiveCaseStudy(null)}
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

function CaseStudyModal({ caseStudy, lang, t, onClose }) {
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
        className="bg-paper dark:bg-ink-dark border border-line dark:border-line-dark rounded-sm max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={caseStudy.title[lang]}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="font-mono text-xs text-gold dark:text-gold-soft">
              {caseStudy.category[lang]}
            </span>
            <h3 className="font-display text-xl sm:text-2xl mt-1 text-ink dark:text-paper-dark">
              {caseStudy.title[lang]}
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

        <div className="grid grid-cols-3 gap-2 my-5">
          {caseStudy.metrics.map((m) => (
            <div
              key={m.label[lang]}
              className="border border-line dark:border-line-dark rounded-sm p-3 text-center bg-surface/50 dark:bg-surface-dark/50"
            >
              <div className="font-display text-base sm:text-lg text-gold dark:text-gold-soft">
                {m.value}
              </div>
              <div className="text-[0.65rem] mt-1 text-ink/60 dark:text-paper-dark/60 leading-tight">
                {m.label[lang]}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 text-sm text-ink/80 dark:text-paper-dark/80 leading-relaxed">
          <div>
            <h4 className="font-bold text-ink dark:text-paper-dark mb-1">{t.csProblem}</h4>
            <p>{caseStudy.problem[lang]}</p>
          </div>
          <div>
            <h4 className="font-bold text-ink dark:text-paper-dark mb-1">{t.csSolution}</h4>
            <p>{caseStudy.solution[lang]}</p>
          </div>
          <div>
            <h4 className="font-bold text-ink dark:text-paper-dark mb-1">{t.csImpact}</h4>
            <p>{caseStudy.impact[lang]}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-6">
          {caseStudy.tools.map((tool) => (
            <span
              key={tool}
              className="font-mono text-[0.7rem] px-2.5 py-1 rounded-sm bg-steel/10 text-steel dark:text-steel-dark"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  CASE STUDIES SECTION                                                */
/* ------------------------------------------------------------------ */

function CaseStudies({ t, lang, setActiveCaseStudy }) {
  const featured = CASE_STUDIES.filter((cs) => cs.featured)
  const rest = CASE_STUDIES.filter((cs) => !cs.featured)

  return (
    <section id="case-studies" className="border-t border-line dark:border-line-dark">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="mb-10">
          <span className="font-mono text-xs text-steel dark:text-steel-dark">
            {t.caseStudiesEyebrow}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl mt-2 text-ink dark:text-paper-dark max-w-2xl">
            {t.caseStudiesTitle}
          </h2>
          <p className="mt-3 text-sm text-ink/65 dark:text-paper-dark/65 max-w-2xl leading-relaxed">
            {t.caseStudiesLede}
          </p>
        </div>

        {/* Featured — top 3, full Problem/Solution/Impact visible */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {featured.map((cs) => (
            <div
              key={cs.id}
              className="border border-gold/40 dark:border-gold-soft/30 rounded-sm p-6 bg-surface/50 dark:bg-surface-dark/50 flex flex-col"
            >
              <span className="inline-block w-fit font-mono text-[0.65rem] tracking-wide text-gold dark:text-gold-soft border border-gold/40 dark:border-gold-soft/30 rounded-sm px-2 py-0.5 mb-3">
                {t.featuredLabel}
              </span>

              <span className="font-mono text-[0.7rem] text-steel dark:text-steel-dark">
                {cs.category[lang]}
              </span>

              <h3 className="font-display text-lg mt-1.5 mb-3 text-ink dark:text-paper-dark leading-snug">
                {cs.title[lang]}
              </h3>

              <div className="grid grid-cols-3 gap-1.5 mb-4">
                {cs.metrics.map((m) => (
                  <div
                    key={m.label[lang]}
                    className="border border-line dark:border-line-dark rounded-sm p-2 text-center"
                  >
                    <div className="font-display text-sm text-gold dark:text-gold-soft">
                      {m.value}
                    </div>
                    <div className="text-[0.6rem] mt-0.5 text-ink/55 dark:text-paper-dark/55 leading-tight">
                      {m.label[lang]}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm text-ink/70 dark:text-paper-dark/70 leading-relaxed flex-1">
                <p className="line-clamp-3">
                  <span className="font-bold text-ink dark:text-paper-dark">{t.csProblem} </span>
                  {cs.problem[lang]}
                </p>
              </div>

              <button
                onClick={() => setActiveCaseStudy(cs)}
                className="inline-flex items-center gap-1.5 text-sm mt-4 text-ink dark:text-paper-dark hover:text-gold dark:hover:text-gold-soft transition-colors"
              >
                {t.readCaseStudy}
                <ChevronRight size={14} className={lang === 'ar' ? 'rotate-180' : ''} />
              </button>
            </div>
          ))}
        </div>

        {/* Remaining case studies — compact cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((cs) => (
            <button
              key={cs.id}
              onClick={() => setActiveCaseStudy(cs)}
              className="group text-start border border-line dark:border-line-dark rounded-sm p-4 bg-surface/50 dark:bg-surface-dark/50 hover:border-gold dark:hover:border-gold-soft transition-colors"
            >
              <span className="font-mono text-[0.65rem] text-steel dark:text-steel-dark">
                {cs.category[lang]}
              </span>
              <h3 className="font-display text-sm mt-1.5 mb-2 text-ink dark:text-paper-dark leading-snug line-clamp-2">
                {cs.title[lang]}
              </h3>
              <span className="font-mono text-[0.68rem] text-gold dark:text-gold-soft">
                {cs.metrics[0].value}
              </span>
              <span className="flex items-center gap-1 text-xs mt-3 text-ink/70 dark:text-paper-dark/70 group-hover:text-gold dark:group-hover:text-gold-soft transition-colors">
                {t.readCaseStudy}
                <ChevronRight size={12} className={lang === 'ar' ? 'rotate-180' : ''} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
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
