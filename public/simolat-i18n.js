/* Simolat Football Academy — 8-Language Real-Time Translation Engine
 * Supports: EN (English), FR (Français), ES (Español), PT (Português),
 * AR (العربية RTL), YO (Yorùbá), IG (Igbo/Ibo), HA (Hausa)
 */
(function () {
  'use strict';

  const SUPPORTED_LANGS = ['en', 'fr', 'es', 'pt', 'ar', 'yo', 'ig', 'ha'];
  const LANG_META = {
    en: { name: 'English', dir: 'ltr', toast: '🌐 Language set to English (EN)' },
    fr: { name: 'Français', dir: 'ltr', toast: '🌐 Langue définie sur Français (FR)' },
    es: { name: 'Español', dir: 'ltr', toast: '🌐 Idioma cambiado a Español (ES)' },
    pt: { name: 'Português', dir: 'ltr', toast: '🌐 Idioma definido para Português (PT)' },
    ar: { name: 'العربية', dir: 'rtl', toast: '🌐 تم تغيير اللغة إلى العربية (AR)' },
    yo: { name: 'Yorùbá', dir: 'ltr', toast: '🌐 Èdè tí yí padà sí Yorùbá (YO)' },
    ig: { name: 'Igbo (Ibo)', dir: 'ltr', toast: '🌐 E tinyela asụsụ gaa na Igbo (IG)' },
    ha: { name: 'Hausa', dir: 'ltr', toast: '🌐 An canza harshe zuwa Hausa (HA)' }
  };

  /* Composite HTML elements keyed by data-i18n-html */
  const HTML_DICT = {
    heroHeadline: {
      en: '<span id="heroHeadlineLead" class="hero-lightning-lead"><span style="color: #fde047; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">DEVELOPING ELITE</span> <span style="color: #ffffff; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">FOOTBALL PROSPECTS &amp;</span></span> <span id="heroHeadlineHighlight" class="hero-lightning-highlight" style="color: #d1fae5; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">NEXT GENERATION CHAMPIONS</span>',
      fr: '<span id="heroHeadlineLead" class="hero-lightning-lead"><span style="color: #fde047; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">FORMER L\'ÉLITE</span> <span style="color: #ffffff; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">DES ESPOIRS DU FOOTBALL &amp;</span></span> <span id="heroHeadlineHighlight" class="hero-lightning-highlight" style="color: #d1fae5; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">CHAMPIONS DE DEMAIN</span>',
      es: '<span id="heroHeadlineLead" class="hero-lightning-lead"><span style="color: #fde047; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">FORMANDO ÉLITE</span> <span style="color: #ffffff; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">PROMESAS DEL FÚTBOL Y</span></span> <span id="heroHeadlineHighlight" class="hero-lightning-highlight" style="color: #d1fae5; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">CAMPEONES DEL FUTURO</span>',
      pt: '<span id="heroHeadlineLead" class="hero-lightning-lead"><span style="color: #fde047; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">FORMANDO ELITE</span> <span style="color: #ffffff; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">CRAQUES DO FUTEBOL E</span></span> <span id="heroHeadlineHighlight" class="hero-lightning-highlight" style="color: #d1fae5; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">CAMPEÕES DA NOVA GERAÇÃO</span>',
      ar: '<span id="heroHeadlineLead" class="hero-lightning-lead"><span style="color: #fde047; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">تطوير نخبة</span> <span style="color: #ffffff; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">مواهب كرة القدم و</span></span> <span id="heroHeadlineHighlight" class="hero-lightning-highlight" style="color: #d1fae5; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">أبطال الجيل القادم</span>',
      yo: '<span id="heroHeadlineLead" class="hero-lightning-lead"><span style="color: #fde047; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">KÍKỌ́ ÀWỌN ỌMỌ BỌ́Ọ̀LÙ</span> <span style="color: #ffffff; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">ÀGBÀYÉ &amp;</span></span> <span id="heroHeadlineHighlight" class="hero-lightning-highlight" style="color: #d1fae5; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">ÀWỌN AṢẸ́GUN Ọ̀LA</span>',
      ig: '<span id="heroHeadlineLead" class="hero-lightning-lead"><span style="color: #fde047; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">ỊZỤLITE NDỊ ỌKÀ</span> <span style="color: #ffffff; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">BỌ́Ọ̀LỤ ỌHỤRỤ &amp;</span></span> <span id="heroHeadlineHighlight" class="hero-lightning-highlight" style="color: #d1fae5; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">NDỊ MMERI ỌGBỌ NA-ABỊA</span>',
      ha: '<span id="heroHeadlineLead" class="hero-lightning-lead"><span style="color: #fde047; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">GINA ƘWARARRUN</span> <span style="color: #ffffff; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">MATASAN ƘWALLON ƘAFA DA</span></span> <span id="heroHeadlineHighlight" class="hero-lightning-highlight" style="color: #d1fae5; text-shadow: 0 2px 10px rgba(2, 20, 14, 0.88), 0 1px 0 rgba(0, 0, 0, 0.95);">ZAKARUN GOBE</span>'
    },
    heroSubtitle: {
      en: 'Developing Africa&apos;s next generation of <strong style="color: #fef08a; font-weight: 600;">world-class footballers</strong> through <strong style="color: #ffffff; font-weight: 600;">FIFA-standard tactical periodization</strong>, high-performance physical conditioning, and <strong style="color: #fef08a; font-weight: 600;">verified direct scouting pipelines</strong> to European professional clubs.',
      fr: 'Former la prochaine génération africaine de <strong style="color: #fef08a; font-weight: 600;">footballeurs de classe mondiale</strong> grâce à la <strong style="color: #ffffff; font-weight: 600;">périodisation tactique aux normes FIFA</strong>, une préparation physique d\'élite et des <strong style="color: #fef08a; font-weight: 600;">passerelles directes de détection</strong> vers les clubs professionnels européens.',
      es: 'Formando la próxima generación africana de <strong style="color: #fef08a; font-weight: 600;">futbolistas de clase mundial</strong> mediante <strong style="color: #ffffff; font-weight: 600;">periodización táctica estándar FIFA</strong>, acondicionamiento físico de alto rendimiento y <strong style="color: #fef08a; font-weight: 600;">enlaces directos de visoría</strong> hacia clubes profesionales europeos.',
      pt: 'Desenvolvendo a próxima geração africana de <strong style="color: #fef08a; font-weight: 600;">jogadores de classe mundial</strong> com <strong style="color: #ffffff; font-weight: 600;">periodização tática padrão FIFA</strong>, condicionamento físico de alta performance e <strong style="color: #fef08a; font-weight: 600;">conexões diretas de olheiros</strong> com clubes profissionais europeus.',
      ar: 'إعداد الجيل الأفريقي القادم من <strong style="color: #fef08a; font-weight: 600;">لاعبي كرة القدم العالميين</strong> عبر <strong style="color: #ffffff; font-weight: 600;">التخطيط التكتيكي وفق معايير الفيفا</strong>، والإعداد البدني عالي الأداء، و<strong style="color: #fef08a; font-weight: 600;">مسارات كشافة مباشرة وموثقة</strong> إلى الأندية الأوروبية المحترفة.',
      yo: 'A ń kọ́ ìran tuntun ti ilẹ̀ Áfíríkà fún <strong style="color: #fef08a; font-weight: 600;">àwọn agbábọ́ọ̀lù tó tayọ lágbàáyé</strong> nípasẹ̀ <strong style="color: #ffffff; font-weight: 600;">ìmọ̀ ọgbọ́n ìṣeré ìpele FIFA</strong>, ìdánilẹ́kọ̀ọ́ agbára ara gíga, àti <strong style="color: #fef08a; font-weight: 600;">ọ̀nà ìwádìí tààrà</strong> sí àwọn ẹgbẹ́ agbábọ́ọ̀lù ilẹ̀ Yúróòpù.',
      ig: 'Na-azụlite ọgbọ ọhụrụ Africa nke <strong style="color: #fef08a; font-weight: 600;">ndị egwuregwu bọọlụ ọkwa ụwa</strong> site na <strong style="color: #ffffff; font-weight: 600;">usoro nkuzi atụmatụ FIFA</strong>, nkwadebe ahụike dị elu, na <strong style="color: #fef08a; font-weight: 600;">ụzọ nchọpụta ozugbo</strong> gaa klọb ọkachamara Europe.',
      ha: 'Gina sabon ƙarni na Afirka na <strong style="color: #fef08a; font-weight: 600;">ƙwararrun ’yan wasan ƙwallon ƙafa na duniya</strong> ta hanyar <strong style="color: #ffffff; font-weight: 600;">tsarin dabaru na ma\'aunin FIFA</strong>, ƙarfafa jiki mai ƙarfi, da <strong style="color: #fef08a; font-weight: 600;">hanyoyin binciken ƙwararru kai tsaye</strong> zuwa ƙungiyoyin Turai.'
    },
    galleryTitle: {
      en: 'OFFICIAL <span style="color: #059669;">PHOTO GALLERY</span> &amp; MEDIA ARCHIVE',
      fr: '<span style="color: #059669;">GALERIE PHOTO</span> OFFICIELLE &amp; ARCHIVES MÉDIAS',
      es: '<span style="color: #059669;">GALERÍA FOTOGRÁFICA</span> OFICIAL Y ARCHIVO DE MEDIOS',
      pt: '<span style="color: #059669;">GALERIA DE FOTOS</span> OFICIAL E ARQUIVO DE MÍDIA',
      ar: '<span style="color: #059669;">معرض الصور</span> الرسمي وأرشيف الوسائط',
      yo: '<span style="color: #059669;">ÀWÒRÁN ÀṢẸ</span> &amp; ÀKỌ́JỌPỌ̀ ÌRÒYÌN',
      ig: '<span style="color: #059669;">EBE FOTO</span> GỌỌMENTỊ &amp; EBE NCHEKWA',
      ha: '<span style="color: #059669;">RUMBUN HOTUNA</span> NA HUKUMA &amp; LABARAI'
    },
    fixturesTitle: {
      en: 'UPCOMING <span style="color: #047857;">FIXTURES</span> &amp; MATCHDAY PROGRAM',
      fr: 'PROCHAINS <span style="color: #047857;">MATCHS</span> &amp; PROGRAMME',
      es: 'PRÓXIMOS <span style="color: #047857;">PARTIDOS</span> Y PROGRAMA',
      pt: 'PRÓXIMOS <span style="color: #047857;">JOGOS</span> E PROGRAMA OFICIAL',
      ar: '<span style="color: #047857;">المباريات</span> القادمة وبرنامج يوم المباراة',
      yo: 'ÀWỌN <span style="color: #047857;">ÌDÍJE</span> TÓ Ń BỌ̀ &amp; ÈTÒ ỌJỌ́ ERÉ',
      ig: '<span style="color: #047857;">EGWUREGWU</span> NA-ABỊA &amp; MMEMME ỤBỌCHỊ EGWU',
      ha: '<span style="color: #047857;">WASANNI</span> MASU ZUWA &amp; SHIRIN RANA'
    },
    storeTitle: {
      en: 'WEAR SIMOLAT <span style="color: #facc15;">OFFICIAL MATCH JERSEYS</span>',
      fr: 'PORTEZ LES <span style="color: #facc15;">MAILLOTS OFFICIELS SIMOLAT</span>',
      es: 'VISTE LAS <span style="color: #facc15;">CAMISETAS OFICIALES SIMOLAT</span>',
      pt: 'VISTA AS <span style="color: #facc15;">CAMISAS OFICIAIS SIMOLAT</span>',
      ar: 'ارتدِ <span style="color: #facc15;">قمصان المباريات الرسمية لسيمولات</span>',
      yo: 'WỌ AṢỌ <span style="color: #facc15;">ÌDÍJE ÀṢẸ SIMOLAT</span>',
      ig: 'YIRI UWE <span style="color: #facc15;">EGWUREGWU SIMOLAT NKE EZI</span>',
      ha: 'SA RIGUNAN <span style="color: #facc15;">WASA NA HUKUMA NA SIMOLAT</span>'
    },
    contactTitle: {
      en: 'CONTACT <span style="color: #047857;">SIMOLAT FOOTBALL ACADEMY</span>',
      fr: 'CONTACTER <span style="color: #047857;">SIMOLAT FOOTBALL ACADEMY</span>',
      es: 'CONTACTAR A <span style="color: #047857;">SIMOLAT FOOTBALL ACADEMY</span>',
      pt: 'CONTATAR <span style="color: #047857;">SIMOLAT FOOTBALL ACADEMY</span>',
      ar: 'تواصل مع <span style="color: #047857;">أكاديمية سيمولات لكرة القدم</span>',
      yo: 'KÁNSÍ <span style="color: #047857;">AKÁDẸ́MÌ BỌ́Ọ̀LÙ SIMOLAT</span>',
      ig: 'KPỌTỤRỤ <span style="color: #047857;">SIMOLAT FOOTBALL ACADEMY</span>',
      ha: 'TUNTUƁI <span style="color: #047857;">KWALEJIN ƘWALLON ƘAFA TA SIMOLAT</span>'
    }
  };

  /* Complete phrase translations by language. Stored compactly as [en, fr, es, pt, ar, yo, ig, ha] rows and expanded into per-lang lookup maps */
  const ROWS = [
    /* Nav & Hero */
    ['Skip to main content', 'Aller au contenu principal', 'Saltar al contenido principal', 'Ir para o conteúdo principal', 'انتقل إلى المحتوى الرئيسي', 'Fò sínú àkóónú pàtàkì', 'Gaa na ọdịnaya bụ isi', 'Tsallaka zuwa ainihin abun ciki'],
    ['Menu', 'Menu', 'Menú', 'Menu', 'القائمة', 'Àkójọ Ètò', 'Nchịkọta', 'Shafin Zabi'],
    ['Academy Sections', 'Sections de l\'Académie', 'Secciones de la Academia', 'Seções da Academia', 'أقسام الأكاديمية', 'Àwọn Abala Akádẹ́mì', 'Akụkụ nke Academy', 'Sassan Kwalejin'],
    ['Home', 'Accueil', 'Inicio', 'Início', 'الرئيسية', 'Ilé', 'Ụlọ', 'Shafin Gida'],
    ['Official Photo Gallery', 'Galerie Photo Officielle', 'Galería Fotográfica Oficial', 'Galeria de Fotos Oficial', 'معرض الصور الرسمي', 'Àwòrán Àṣẹ Akádẹ́mì', 'Ebe Foto Gọọmentị', 'Rumbun Hotuna na Hukuma'],
    ['Academy Regulations', 'Règlement de l\'Académie', 'Reglamento de la Academia', 'Regulamento da Academia', 'لوائح الأكاديمية', 'Àwọn Òfin Akádẹ́mì', 'Iwu nke Academy', 'Dokokin Kwalejin'],
    ['Official Store & Kit Studio', 'Boutique Officielle & Studio Maillot', 'Tienda Oficial y Estudio de Camisetas', 'Loja Oficial & Estúdio de Camisas', 'المتجر الرسمي واستوديو القمصان', 'Ilé-Ìtajà Àṣẹ & Aṣọ Ìdíje', 'Ụlọ Ahịa & Studio Uwe', 'Shagon Hukuma & Kayan Wasa'],
    ['Contact Secretariat', 'Contacter le Secrétariat', 'Contactar Secretaría', 'Contatar Secretaria', 'التواصل مع السكرتارية', 'Kánsí Akọ̀wé Àṣẹ', 'Kpọtụrụ Odeakwụkwọ', 'Tuntuɓi Sakatariya'],
    ['Admissions & Order Services', 'Admissions & Suivi des Commandes', 'Admisiones y Estado de Pedidos', 'Admissões & Rastreio de Pedidos', 'القبول وتتبع الطلبات', 'Ìforúkọsílẹ̀ & Ìtọ́pinpin Ọjà', 'Nnabata & Nchọpụta Ahịa', 'Shigarwa & Bin Diddigin Oda'],
    ['Open Tryouts Registration Form (2027)', 'Formulaire de Détection Ouverte (2027)', 'Formulario de Pruebas Abiertas (2027)', 'Formulário de Peneira Aberta (2027)', 'استمارة تجارب الأداء المفتوحة (2027)', 'Fọ́ọ̀mù Ìdánwò Gbangba (2027)', 'Fọm Ndebanye Aha Nnwale (2027)', 'Fom ɗin Gwajin Buɗe (2027)'],
    ['Regular Academy Registration Form', 'Formulaire d\'Inscription Régulière', 'Formulario de Inscripción Regular', 'Formulário de Matrícula Regular', 'استمارة التسجيل النظامي بالأكاديمية', 'Fọ́ọ̀mù Ìforúkọsílẹ̀ Déédéé', 'Fọm Ndebanye Aha Oge Niile', 'Fom ɗin Rijista na Kullum'],
    ['Order Status & Live Shipping Tracker', 'Statut de Commande & Suivi en Direct', 'Estado del Pedido y Rastreo en Vivo', 'Status do Pedido & Rastreio ao Vivo', 'حالة الطلب والتتبع المباشر للشحن', 'Ipò Ọjà & Ìtọ́pinpin Lọ́wọ́lọ́wọ́', 'Ọnọdụ Ahịa & Nsochi Mbupu', 'Matsayin Oda & Binciken Kaya'],
    ['Tryouts Registration Form', 'Formulaire de Détection', 'Formulario de Pruebas', 'Formulário de Seletiva', 'استمارة تجارب الأداء', 'Fọ́ọ̀mù Ìdánwò 2027', 'Fọm Ndebanye Nnwale', 'Fom ɗin Gwajin 2027'],
    ['Regular Registration Form', 'Formulaire d\'Inscription Régulière', 'Formulario de Inscripción Regular', 'Formulário de Inscrição Regular', 'استمارة التسجيل النظامي', 'Fọ́ọ̀mù Ìforúkọsílẹ̀ Déédéé', 'Fọm Ndebanye Aha Oge Niile', 'Fom ɗin Rijista na Kullum'],
    ['Select Language / Traduction', 'Choisir la Langue / Translation', 'Seleccionar Idioma', 'Selecionar Idioma', 'اختر اللغة', 'Yan Èdè / Ìtumọ̀', 'Họrọ Asụsụ', 'Zaɓi Harshe'],
    ['Select Website Language', 'Choisir la langue du site', 'Seleccionar idioma del sitio', 'Selecionar idioma do site', 'اختر لغة الموقع', 'Yan Èdè Ojú-òpó', 'Họrọ Asụsụ Webụsaịtị', 'Zaɓi Harshen Shafi'],
    ['Toggle Three-Line Navigation Menu', 'Ouvrir/Fermer le menu de navigation', 'Alternar menú de navegación', 'Alternar menu de navegação', 'فتح أو إغلاق قائمة التنقل', 'Ṣí tàbí Ti Àkójọ Ètò', 'Mepee ma ọ bụ mechie menu', 'Buɗe ko rufe shafin zaɓi'],
    ['Main Club Navigation', 'Navigation principale du club', 'Navegación principal del club', 'Navegação principal do clube', 'التنقل الرئيسي للنادي', 'Ìtọ́sọ́nà Akádẹ́mì', 'Nchịkọta Klọb', 'Hanyar Shiga Kwaleji'],
    ['Simolat Football Academy — Back to homepage top', 'Simolat Football Academy — Retour en haut de page', 'Simolat Football Academy — Volver arriba', 'Simolat Football Academy — Voltar ao topo', 'أكاديمية سيمولات — العودة للأعلى', 'Simolat Football Academy — Padà sókè', 'Simolat Football Academy — Laghachi n\'elu', 'Simolat Football Academy — Koma sama'],

    /* Squad Showcase */
    ['· First Team · 23 Players', '· Équipe Première · 23 Joueurs', '· Primer Equipo · 23 Jugadores', '· Time Principal · 23 Jogadores', '· الفريق الأول · 23 لاعباً', '· Ẹgbẹ́ Àkọ́kọ́ · Agbábọ́ọ̀lù 23', '· Ndị Otu Mbụ · Ndị Egwuregwu 23', '· Ƙungiyar Farko · ’Yan Wasa 23'],
    ['Standalone Page ↗', 'Page Dédiée ↗', 'Página Independiente ↗', 'Página Dedicada ↗', 'صفحة مستقلة ↗', 'Ojú-ìwé Ọ̀tọ̀ ↗', 'Ibe Dị Iche ↗', 'Shafi na Daban ↗'],
    ['⏸ Pause Auto', '⏸ Pause Auto', '⏸ Pausar Auto', '⏸ Pausar Auto', '⏸ إيقاف تلقائي', '⏸ Dúró Dìẹ̀', '⏸ Kwụsị Ntakịrị', '⏸ Dakatar Kai Tsaye'],
    ['▶ Play Auto', '▶ Lecture Auto', '▶ Reproducir Auto', '▶ Reproduzir Auto', '▶ تشغيل تلقائي', '▶ Máa Lọ', '▶ Gaa N\'ihu', '▶ Ci Gaba Kai Tsaye'],
    ['Full screen', 'Plein écran', 'Pantalla completa', 'Tela cheia', 'ملء الشاشة', 'Ìbòjú Kíkún', 'Ihuenyo Zuru Ezu', 'Cikakken Allo'],
    ['Exit full screen', 'Quitter plein écran', 'Salir de pantalla completa', 'Sair da tela cheia', 'إنهاء ملء الشاشة', 'Kúrò ní Ìbòjú Kíkún', 'Pụọ na Ihuenyo Zuru Ezu', 'Fita Cikakken Allo'],
    ['Export Squad PDF', 'Exporter Effectif PDF', 'Exportar Plantilla PDF', 'Exportar Elenco PDF', 'تصدير قائمة الفريق PDF', 'Gba Àkójọ Agbábọ́ọ̀lù PDF', 'Budata Ndepụta PDF', 'Sauke Jerin ’Yan Wasa PDF'],
    ['Simolat Football Academy · Ikoyi Lagos', 'Simolat Football Academy · Ikoyi Lagos', 'Simolat Football Academy · Ikoyi Lagos', 'Simolat Football Academy · Ikoyi Lagos', 'أكاديمية سيمولات · إيكوي لاغوس', 'Simolat Football Academy · Ikoyi Èkó', 'Simolat Football Academy · Ikoyi Lagos', 'Simolat Football Academy · Ikoyi Legas'],
    ['Age', 'Âge', 'Edad', 'Idade', 'العمر', 'Ọjọ́-orí', 'Afọ', 'Shekaru'],
    ['Preferred Foot', 'Pied fort', 'Pie hábil', 'Pé preferido', 'القدم المفضلة', 'Ẹsẹ̀ Àfẹ́', 'Ụkwụ kacha mma', 'Ƙafar Wasa'],
    ['Nationality', 'Nationalité', 'Nacionalidad', 'Nacionalidade', 'الجنسية', 'Orílẹ̀-èdè', 'Mba', 'Ƙasa'],
    ['Pace', 'Vitesse', 'Ritmo', 'Ritmo', 'السرعة', 'Ìyára', 'Ọsọ', 'Gudu'],
    ['Dribbling', 'Dribble', 'Regate', 'Drible', 'المراوغة', 'Ìdánilójú Bọ́ọ̀lù', 'Ịgba Bọọlụ', 'Juyi'],
    ['Shooting', 'Tir', 'Tiro', 'Finalização', 'التسديد', 'Ìta Bọ́ọ̀lù', 'Ịgba Goolu', 'Harbi'],
    ['· Hover to pause', '· Survoler pour pauser', '· Pasar cursor para pausar', '· Passe o mouse para pausar', '· مرر المؤشر للإيقاف', '· Fi kọ́sọ̀ lé láti dúró', '· Tinye aka iji kwụsị', '· Tsaya da linzamin kwamfuta'],
    ['Right', 'Droit', 'Derecho', 'Direito', 'اليمنى', 'Ọ̀tún', 'Nri', 'Dama'],
    ['Left', 'Gauche', 'Izquierdo', 'Esquerdo', 'اليسرى', 'Òsì', 'Ekpe', 'Hagu'],
    ['Both', 'Les deux', 'Ambos', 'Ambos', 'كلاهما', 'Méjèèjì', 'Ha Abụọ', 'Duka Biyu'],
    ['Nigeria', 'Nigéria', 'Nigeria', 'Nigéria', 'نيجيريا', 'Nàìjíríà', 'Naịjirịa', 'Nijeriya'],
    ['Ghana', 'Ghana', 'Ghana', 'Gana', 'غانا', 'Gánà', 'Gana', 'Gana'],
    ['Cameroon', 'Cameroun', 'Camerún', 'Camarões', 'الكاميرون', 'Kamẹrúùnù', 'Kameruun', 'Kamaru'],
    ['Côte d\'Ivoire', 'Côte d\'Ivoire', 'Costa de Marfil', 'Costa do Marfim', 'ساحل العاج', 'Kóòtù Dífọ́à', 'Kọt d\'Ivọị', 'Kwast d\'Ivoire'],
    ['Senegal', 'Sénégal', 'Senegal', 'Senegal', 'السنغال', 'Sẹ́nẹ̀gàlì', 'Senegal', 'Sanigal'],
    ['Mali', 'Mali', 'Malí', 'Mali', 'مالي', 'Málì', 'Mali', 'Mali'],
    ['Togo', 'Togo', 'Togo', 'Togo', 'توغو', 'Tógò', 'Togo', 'Togo'],
    ['Benin', 'Bénin', 'Benín', 'Benim', 'بنين', 'Bẹ̀nẹ̀', 'Benin', 'Binin'],
    ['Burkina Faso', 'Burkina Faso', 'Burkina Faso', 'Burquina Faso', 'بوركينا فاسو', 'Bùrkínà Fásò', 'Burkina Faso', 'Burkina Faso'],
    ['Goalkeeper (GK)', 'Gardien de but (GK)', 'Portero (GK)', 'Goleiro (GK)', 'حارس مرمى (GK)', 'Aṣọ́lé (GK)', 'Onye Nche Goolu (GK)', 'Mai Tsaron Raga (GK)'],
    ['Center Back (CB)', 'Défenseur central (CB)', 'Defensa Central (CB)', 'Zagueiro Central (CB)', 'قلب دفاع (CB)', 'Olùgbèjà Àárín (CB)', 'Onye Nche Etiti (CB)', 'Mai Tsaron Baya na Tsakiya (CB)'],
    ['Left Back (LB)', 'Arrière gauche (LB)', 'Lateral Izquierdo (LB)', 'Lateral Esquerdo (LB)', 'ظهير أيسر (LB)', 'Olùgbèjà Òsì (LB)', 'Onye Nche Ekpe (LB)', 'Mai Tsaron Baya na Hagu (LB)'],
    ['Right Back (RB)', 'Arrière droit (RB)', 'Lateral Derecho (RB)', 'Lateral Direito (RB)', 'ظهير أيمن (RB)', 'Olùgbèjà Ọ̀tún (RB)', 'Onye Nche Nri (RB)', 'Mai Tsaron Baya na Dama (RB)'],
    ['Defensive Midfielder (CDM)', 'Milieu défensif (CDM)', 'Pivote Defensivo (CDM)', 'Volante (CDM)', 'وسط دفاعي (CDM)', 'Agbábọ́ọ̀lù Àárín Ààbò (CDM)', 'Etiti Nchedo (CDM)', 'Ɗan Tsakiya Mai Tsaro (CDM)'],
    ['Central Midfielder (CM)', 'Milieu central (CM)', 'Mediocentro (CM)', 'Meio-campista (CM)', 'وسط ميدان (CM)', 'Agbábọ́ọ̀lù Àárín (CM)', 'Etiti Egwuregwu (CM)', 'Ɗan Tsakiya (CM)'],
    ['Attacking Midfielder (CAM)', 'Milieu offensif (CAM)', 'Mediapunta (CAM)', 'Meia Atacante (CAM)', 'وسط هجومي (CAM)', 'Agbábọ́ọ̀lù Àárín Ìkọlù (CAM)', 'Etiti Mwakpo (CAM)', 'Ɗan Tsakiya Mai Hari (CAM)'],
    ['Right Winger (RW)', 'Ailier droit (RW)', 'Extremo Derecho (RW)', 'Ponta Direita (RW)', 'جناح أيمن (RW)', 'Apá Ọ̀tún (RW)', 'Nku Nri (RW)', 'Ɗan Fiffiken Dama (RW)'],
    ['Left Winger (LW)', 'Ailier gauche (LW)', 'Extremo Izquierdo (LW)', 'Ponta Esquerda (LW)', 'جناح أيسر (LW)', 'Apá Òsì (LW)', 'Nku Ekpe (LW)', 'Ɗan Fiffiken Hagu (LW)'],
    ['Center Forward (ST)', 'Avant-centre (ST)', 'Delantero Centro (ST)', 'Centroavante (ST)', 'مهاجم صريح (ST)', 'Akọlù Àárín (ST)', 'Onye Mwakpo Etiti (ST)', 'Ɗan Gaba (ST)'],
    ['Previous player', 'Joueur précédent', 'Jugador anterior', 'Jogador anterior', 'اللاعب السابق', 'Agbábọ́ọ̀lù Tẹ́lẹ̀', 'Onye Egwuregwu Bu Ụzọ', 'Ɗan Wasa na Baya'],
    ['Next player', 'Joueur suivant', 'Siguiente jugador', 'Próximo jogador', 'اللاعب التالي', 'Agbábọ́ọ̀lù Tókàn', 'Onye Egwuregwu Na-abịa', 'Ɗan Wasa na Gaba'],

    /* About Us */
    ['About Us • Lagos & Osun State, Nigeria', 'À propos • États de Lagos & Osun, Nigéria', 'Sobre Nosotros • Lagos y Estado de Osun, Nigeria', 'Sobre Nós • Lagos e Estado de Osun, Nigéria', 'من نحن • ولايتا لاغوس وأوسون، نيجيريا', 'Nípa Wa • Ìpínlẹ̀ Èkó & Ọ̀ṣun, Nàìjíríà', 'Banyere Anyị • Steeti Lagos & Osun, Naịjirịa', 'Game da Mu • Jihar Legas da Osun, Nijeriya'],
    ['Elite Youth Football Institution', 'Institution d\'Élite pour Jeunes Footballeurs', 'Institución Juvenil de Fútbol de Élite', 'Instituição de Elite do Futebol de Base', 'مؤسسة النخبة لكرة القدم للشباب', 'Ilé-Ẹ̀kọ́ Bọ́ọ̀lù Àwọn Ọ̀dọ́ Gíga', 'Ụlọ Ọrụ Bọọlụ Ndị Ntorobịa Pụrụ Iche', 'Babbar Makarantar Ƙwallon Ƙafa ta Matasa'],
    ['About Us: Simolat Football Academy', 'À Propos : Simolat Football Academy', 'Sobre Nosotros: Simolat Football Academy', 'Sobre Nós: Simolat Football Academy', 'من نحن: أكاديمية سيمولات لكرة القدم', 'Nípa Wa: Simolat Football Academy', 'Banyere Anyị: Simolat Football Academy', 'Game da Mu: Simolat Football Academy'],
    ['Simolat Football Academy is an elite, player-centered football institution based in Lagos and Osun State, Nigeria. We are dedicated to identifying, nurturing, and developing the next generation of football champions by combining world-class coaching with a holistic approach to personal growth.', 'Simolat Football Academy est une institution d\'élite basée dans les États de Lagos et d\'Osun, au Nigéria. Nous nous consacrons à l\'identification, à la formation et à l\'épanouissement des futurs champions grâce à un encadrement de classe mondiale.', 'Simolat Football Academy es una institución futbolística de élite en los estados de Lagos y Osun, Nigeria. Nos dedicamos a identificar, formar y desarrollar a la próxima generación de campeones combinando entrenamiento de primer nivel con crecimiento integral.', 'A Simolat Football Academy é uma instituição de futebol de elite localizada em Lagos e Osun, Nigéria. Dedicamo-nos a identificar, formar e desenvolver a próxima geração de campeões com treinamento de padrão mundial e crescimento pessoal.', 'أكاديمية سيمولات لكرة القدم هي مؤسسة نخبة تركز على اللاعب في ولايتي لاغوس وأوسون بنيجيريا. نكرس جهودنا لاكتشاف ورعاية وتطوير الجيل القادم من أبطال كرة القدم عبر التدريب العالمي والتطور الشخصي الشامل.', 'Akádẹ́mì Bọ́ọ̀lù Simolat jẹ́ ilé-ẹ̀kọ́ bọ́ọ̀lù gíga tí ó wà ní Ìpínlẹ̀ Èkó àti Ọ̀ṣun, Nàìjíríà. A ya ara wa sí mímọ, títọ́, àti gbígbé ìran àwọn aṣẹ́gun tuntun ró pẹ̀lú ìdánilẹ́kọ̀ọ́ àgbáyé.', 'Simolat Football Academy bụ ụlọ ọrụ bọọlụ dị elu na Steeti Lagos na Osun, Naịjirịa. Anyị na-achọpụta ma na-azụlite ndị mmeri bọọlụ na-abịa site na nkuzi ọkwa ụwa na ntozu okè nke onwe.', 'Kwalejin Ƙwallon Ƙafa ta Simolat babbar cibiya ce ta ƙwallon ƙafa da ke Jihar Legas da Osun, Nijeriya, wadda ta sadaukar da kai wajen gano da gina zakarun gobe da horo na duniya.'],
    ['Our Philosophy', 'Notre Philosophie', 'Nuestra Filosofía', 'Nossa Filosofia', 'فلسفتنا', 'Ìmọ̀-ìjìnlẹ̀ Wa', 'Nkà Ihe Ọmụma Anyị', 'Akidar Mu'],
    ['At Simolat, the player comes first. We believe that true athletic excellence happens when young athletes are given the right environment to thrive both on and off the pitch. Our training programs are tailored to each individual\'s strengths, helping players build technical mastery, tactical intelligence, physical resilience, and mental toughness.', 'Chez Simolat, le joueur passe avant tout. La véritable excellence sportive naît lorsque les jeunes athlètes disposent du cadre idéal sur le terrain comme en dehors. Nos programmes sont adaptés aux atouts de chacun.', 'En Simolat, el jugador es lo primero. Creemos que la excelencia deportiva nace cuando los jóvenes tienen el entorno adecuado dentro y fuera del campo, fortaleciendo técnica, táctica y mentalidad.', 'Na Simolat, o jogador vem em primeiro lugar. Acreditamos que a excelência atlética surge quando jovens talentos têm o ambiente ideal dentro e fora de campo, desenvolvendo técnica, tática e força mental.', 'في سيمولات، اللاعب يأتي أولاً. نؤمن بأن التميز الرياضي الحقيقي يتحقق عندما يُمنح الرياضيون الشباب البيئة المناسبة داخل الملعب وخارجه لبناء المهارة الفنية والذكاء التكتيكي والصلابة الذهنية.', 'Ní Simolat, agbábọ́ọ̀lù ni ó wà ní ipò àkọ́kọ́. A gbàgbọ́ pé ìtayọ̀ nínú eré ìdárayá ń ṣẹlẹ̀ nígbà tí a bá fún àwọn ọ̀dọ́ ní àyíká tó tọ́ lórí pápá àti lóde.', 'Na Simolat, onye egwuregwu bụ nke mbụ. Anyị kwenyere na ezigbo ọganihu na-abịa mgbe enyere ndị ntorobịa gburugburu kwesịrị ekwesị n\'ọgbọ egwuregwu na n\'èzí.', 'A Simolat, ɗan wasa ne a gaba. Mun yi imani ƙwarewar wasa tana samuwa ne idan an ba matasa kyakkyawan yanayi a fili da waje.'],
    ['What Sets Us Apart', 'Ce Qui Nous Distingue', 'Qué Nos Diferencia', 'O Que Nos Diferencia', 'ما يميزنا', 'Ohun Tó Yà Wá Sọ́tọ̀', 'Ihe Mere Anyị Ji Pụọ Iche', 'Abin da Ya Bambanta Mu'],
    ['Player-Centered Development', 'Développement Centré sur le Joueur', 'Desarrollo Centrado en el Jugador', 'Desenvolvimento Focado no Atleta', 'التطوير المتمحور حول اللاعب', 'Ìdàgbàsókè Tó Dójúkọ Agbábọ́ọ̀lù', 'Mmepe Maka Onye Egwuregwu', 'Haɓaka Ɗan Wasa'],
    ['Every training session, mentorship program, and performance review is designed around the unique needs and career goals of our athletes.', 'Chaque séance d\'entraînement, programme de mentorat et bilan de performance est conçu selon les objectifs uniques de nos athlètes.', 'Cada sesión de entrenamiento, mentoría y evaluación está diseñada según las necesidades y metas de nuestros atletas.', 'Cada treino, mentoria e avaliação de desempenho é planejada para os objetivos de carreira de cada atleta.', 'تم تصميم كل حصة تدريبية وبرنامج إرشاد وتقييم أداء وفق الاحتياجات الفردية وأهداف المسيرة لكل لاعب.', 'Gbogbo ìdánilẹ́kọ̀ọ́ àti ìtọ́sọ́nà ni a ṣe fún ìlọsíwájú àti àfojúsùn ọjọ́-ọ̀la agbábọ́ọ̀lù kọ̀ọ̀kan.', 'A haziri ọzụzụ ọ bụla, ndụmọdụ, na nyocha arụmọrụ gburugburu mkpa na ebumnuche onye egwuregwu ọ bụla.', 'Kowane horo da jagora da kimantawa an tsara su ne musamman don burin kowane ɗan wasa.'],
    ['Elite Coaching Standards', 'Normes d\'Entraînement d\'Élite', 'Estándares de Entrenamiento de Élite', 'Padrões de Treino de Elite', 'معايير التدريب العالمية', 'Ìlànà Ìdánilẹ́kọ̀ọ́ Gíga', 'Ọkwa Nkuzi Dị Elu', 'Ƙa\'idojin Horarwa Masu Kyau'],
    ['Our certified coaching staff brings modern football methodologies to Lagos and Osun, bridging the gap between grassroots talent and professional standards.', 'Notre staff certifié applique les méthodologies modernes à Lagos et Osun, reliant le talent brut aux standards professionnels.', 'Nuestro cuerpo técnico certificado aplica metodologías modernas en Lagos y Osun para llevar el talento base al nivel profesional.', 'Nossa comissão técnica certificada leva metodologias modernas a Lagos e Osun, conectando a base ao nível profissional.', 'يطبق طاقمنا التدريبي المعتمد أحدث منهجيات كرة القدم في لاغوس وأوسون لربط المواهب المحلية بالمعايير الاحترافية.', 'Àwọn akọ́nimọ̀ọ́gbá wa tó kàwé ń lo ìlànà ìgbàlódé ní Èkó àti Ọ̀ṣun láti so ẹ̀bùn abínibí pọ̀ mọ́ ìpele ọ̀jọ̀gbọ́n.', 'Ndị nkuzi anyị nwere asambodo na-eweta usoro bọọlụ ọgbara ọhụrụ na Lagos na Osun iji jikọọ nkà na ọkwa ọkachamara.', 'Masu horarwarmu masu lasisi suna kawo sabbin dabarun ƙwallo zuwa Legas da Osun don haɗa matasa da matsayin ƙwararru.'],
    ['Character & Education', 'Caractère & Éducation', 'Carácter y Educación', 'Caráter & Educação', 'الشخصية والتعليم', 'Ìwà Rere & Ẹ̀kọ́', 'Àgwà & Agụmakwụkwọ', 'Halaye Masu Kyau da Ilimi'],
    ['We develop more than just footballers. Discipline, leadership, teamwork, and academic accountability are core pillars of life at Simolat.', 'Nous formons bien plus que des footballeurs : discipline, leadership, esprit d\'équipe et rigueur scolaire sont nos piliers.', 'Formamos más que futbolistas. Disciplina, liderazgo, trabajo en equipo y excelencia académica son pilares en Simolat.', 'Formamos mais do que jogadores. Disciplina, liderança, trabalho em equipe e responsabilidade acadêmica são nossos pilares.', 'نحن نعد أكثر من مجرد لاعبين؛ فالانضباط والقيادة والعمل الجماعي والالتزام الدراسي ركائز أساسية في سيمولات.', 'A ń kọ́ ju agbábọ́ọ̀lù lásán lọ; ìbáwí, aṣáájú, ìṣọ̀kan àti ẹ̀kọ́ ìwé jẹ́ òpó ayé ní Simolat.', 'Anyị na-azụlite ihe karịrị naanị ndị bọọlụ. Ọzụzụ, nduzi, imekọ ihe ọnụ, na agụmakwụkwọ bụ isi ntọala na Simolat.', 'Muna gina fiye da ’yan wasa kawai. Ladabi, jagoranci, haɗin kai da karatu su ne ginshiƙan rayuwa a Simolat.'],
    ['Pathways to Success', 'Voies vers la Réussite', 'Rutas hacia el Éxito', 'Caminhos para o Sucesso', 'مسارات النجاح', 'Ọ̀nà sí Àṣeyọrí', 'Ụzọ Gaa na Mmeri', 'Hanyoyin Nasara'],
    ['Through competitive showcase matches, scouting networks, and structured career guidance, we prepare our players for local and international opportunities.', 'Grâce à nos matchs vitrines, nos réseaux de recruteurs et notre suivi de carrière, nous ouvrons les portes locales et internationales.', 'Mediante partidos de exhibición, redes de visoría y orientación profesional, preparamos a nuestros jugadores para oportunidades globales.', 'Com jogos vitrine, redes de observadores e gestão de carreira, preparamos atletas para oportunidades nacionais e internacionais.', 'من خلال مباريات العرض التنافسية وشبكات الكشافة والتوجيه المهني، نجهز لاعبينا للفرص المحلية والدولية.', 'Nípasẹ̀ ìdíje ìfihàn àti ìtọ́sọ́nà iṣẹ́, a ń múra àwọn agbábọ́ọ̀lù wa sílẹ̀ fún àǹfààní àgbáyé.', 'Site n\'egwuregwu ngosi, netwọkụ nchọpụta, na nduzi ọrụ, anyị na-akwado ndị anyị maka ohere ụwa niile.', 'Ta hanyar wasannin nuna bajinta da masu bincike, muna shirya ’yan wasanmu don damarmaki a ciki da wajen ƙasa.'],
    ['Our Vision', 'Notre Vision', 'Nuestra Visión', 'Nossa Visão', 'رؤيتنا', 'Ìran Wa', 'Ọhụụ Anyị', 'Hangen Nesan Mu'],
    ['To stand as West Africa\'s premier hub for youth football excellence, empowering young talents in Lagos and Osun State to reach the highest levels of the global game while becoming role models in their communities.', 'Devenir le pôle de référence en Afrique de l\'Ouest pour l\'excellence du football des jeunes et former des modèles pour leurs communautés.', 'Posicionarnos como el centro líder de África Occidental para el fútbol juvenil, impulsando talentos hacia la cima mundial y siendo referentes sociales.', 'Ser o principal polo da África Ocidental em futebol de base, levando jovens talentos de Lagos e Osun ao topo do futebol mundial.', 'أن نكون المركز الأول في غرب أفريقيا للتميز في كرة القدم للشباب وتمكين المواهب في لاغوس وأوسون للوصول لأعلى المستويات العالمية.', 'Láti dúró gẹ́gẹ́ bí ibùdó àkọ́kọ́ ní Ìwọ̀-Oòrùn Áfíríkà fún ìdàgbàsókè bọ́ọ̀lù àwọn ọ̀dọ́.', 'Ịkwụsi ike dị ka ebe kacha mma n\'Ebe Ọdịda Anyanwụ Africa maka bọọlụ ndị ntorobịa na ihe nlereanya ọma.', 'Zama cibiyar farko a Yammacin Afirka ta ƙwarewar ƙwallon ƙafa ga matasa tare da zama abin koyi.'],
    ['Join the Journey', 'Rejoignez l\'Aventure', 'Únete al Camino', 'Junte-se à Jornada', 'انضم إلى الرحلة', 'Darapọ̀ mọ́ Ìrìn-Àjò Wa', 'Soro Njem A', 'Shiga Tafiyar'],
    ['Whether you are a young athlete dreaming of a professional career or a parent looking for a supportive, high-standard environment for your child, Simolat Football Academy is where potential meets opportunity.', 'Que vous soyez un jeune athlète rêvant du haut niveau ou un parent exigeant, Simolat Football Academy est l\'endroit où le potentiel rencontre l\'opportunité.', 'Ya seas un joven atleta que sueña con ser profesional o un padre buscando un entorno exigente y seguro, en Simolat el potencial encuentra oportunidad.', 'Seja você um jovem atleta ou um pai em busca de um ambiente seguro e de alto padrão, na Simolat o potencial encontra a oportunidade.', 'سواء كنت لاعباً شاباً تحلم بالاحتراف أو ولي أمر يبحث عن بيئة داعمة عالية المستوى، ففي أكاديمية سيمولات يلتقي الطموح بالفرصة.', 'Yálà o jẹ́ ọ̀dọ́ tó ń lá àlá ọ̀jọ̀gbọ́n tàbí òbí tó ń wá àyíká tó dára, Simolat ni ibi tí ẹ̀bùn ti ń pàdé àǹfààní.', 'Ma ị bụ nwa okorobịa na-achọ ọrụ ọkachamara ma ọ bụ nne na nna na-achọ ebe kwesịrị ekwesị, Simolat bụ ebe ikike na-ezute ohere.', 'Ko kai matashi ne mai burin zama ƙwararre ko iyaye masu neman makaranta mai nagarta, Simolat ita ce gida.'],
    ['BUILDING CONFIDENCE, CHARACTER & COMMUNITY', 'BÂTIR CONFIANCE, CARACTÈRE & COMMUNAUTÉ', 'CONSTRUYENDO CONFIANZA, CARÁCTER Y COMUNIDAD', 'CONSTRUINDO CONFIANÇA, CARÁTER & COMUNIDADE', 'بناء الثقة والشخصية والمجتمع', 'KÍKỌ́ ÌGBẸ́KẸ̀LÉ, ÌWÀ RERE & ÀWÙJỌ', 'ỊWULITE NTỤKWASỊ OBI, ÀGWÀ & OBODO', 'GINA KWARIN GWIWA, HALAYE DA AL\'UMMA'],
    ['At Simolat Football Academy, football is a vehicle for lifelong personal growth. Through structured mentorship, peer accountability, community outreach, and disciplined daily habits across our Lagos and Osun State campuses, every player learns to lead with humility, communicate effectively under pressure, and represent their family and community with pride both on the pitch and in the classroom.', 'À Simolat Football Academy, le football est un vecteur d\'épanouissement durable. Par le mentorat structuré, l\'esprit collectif et la discipline quotidienne à Lagos et Osun, chaque joueur apprend à diriger avec humilité.', 'En Simolat Football Academy, el fútbol impulsa el crecimiento personal para toda la vida mediante mentoría, responsabilidad comunitaria y hábitos disciplinados en Lagos y Osun.', 'Na Simolat Football Academy, o futebol impulsiona o crescimento pessoal com mentoria estruturada, responsabilidade e disciplina diária em Lagos e Osun.', 'في أكاديمية سيمولات، كرة القدم أداة للنمو الشخصي مدى الحياة عبر الإرشاد المنظم والمسؤولية المجتمعية والانضباط اليومي في فروعنا بلاغوس وأوسون.', 'Ní Akádẹ́mì Simolat, bọ́ọ̀lù jẹ́ ọ̀nà ìdàgbàsókè ayérayé nípa ìtọ́sọ́nà rere àti ìṣe déédéé ní Èkó àti Ọ̀ṣun.', 'Na Simolat Football Academy, bọọlụ bụ ụzọ uto ogologo ndụ site na nduzi, ịdọ aka ná ntị kwa ụbọchị na Lagos na Osun.', 'A Simolat Football Academy, ƙwallo hanya ce ta gina rayuwa ta hanyar jagoranci, tarbiyya da al\'umma a Legas da Osun.'],
    ['Read More ↓', 'Lire plus ↓', 'Leer más ↓', 'Ler mais ↓', 'اقرأ المزيد ↓', 'Ka Síwájú Si ↓', 'Gụọ Karịa ↓', 'Kara Karatu ↓'],
    ['Read Less ↑', 'Lire moins ↑', 'Leer menos ↑', 'Ler menos ↑', 'عرض أقل ↑', 'Dín Kù ↑', 'Belata ↑', 'Ragewa ↑'],

    /* Photo Gallery */
    ['Official Simolat Football Academy Photography • 4 Authentic Photos', 'Photographie Officielle Simolat Football Academy • 4 Photos Authentiques', 'Fotografía Oficial de Simolat Football Academy • 4 Fotos Auténticas', 'Fotografia Oficial da Simolat Football Academy • 4 Fotos Autênticas', 'التصوير الرسمي لأكاديمية سيمولات • 4 صور أصلية', 'Àwọn Àwòrán Àṣẹ Simolat Football Academy • Àwòrán 4', 'Foto Gọọmentị Simolat Football Academy • Foto 4', 'Hotunan Hukuma na Simolat Football Academy • Hotuna 4'],
    ['Authentic Simolat Football Academy photography featuring our full squad portrait, heritage squad archive, stadium conditioning drills, and official matchday squad lineup.', 'Photographie authentique de Simolat Football Academy : portrait d\'équipe, archives historiques, préparation physique au stade et onze de départ.', 'Fotografía auténtica de Simolat Football Academy con nuestro plantel completo, archivo histórico, preparación física en el estadio y alineación oficial.', 'Fotografia autêntica da Simolat Football Academy com retrato do elenco, arquivo histórico, preparação física e escalação oficial.', 'تصوير رسمي أصلي لأكاديمية سيمولات يضم صورة الفريق الكاملة وأرشيف النادي وتدريبات اللياقة وتشكيلة يوم المباراة.', 'Àwòrán òtítọ́ ti Simolat Football Academy tó fi ẹgbẹ́ kíkún, àkọsílẹ̀ àtijọ́, ìdánilẹ́kọ̀ọ́ pápá àti àwọn akọ́ṣẹ́ hàn.', 'Foto ziri ezi nke Simolat Football Academy na-egosi ndị otu zuru ezu, ebe nchekwa, ọzụzụ ámá egwuregwu, na ahịrị egwuregwu.', 'Hotuna na gaske na Simolat Football Academy da ke nuna ƙungiyar, tarihin kulob, atisaye a fili da jerin ’yan wasa.'],
    ['Auto-Play Active (3.5s)', 'Lecture Auto Active (3,5s)', 'Reproducción Automática (3.5s)', 'Reprodução Automática (3.5s)', 'التشغيل التلقائي نشط (3.5ث)', 'Ìṣànwò Aládàáni Ń Lọ (3.5s)', 'Ngosipụta Onwe Ya Na-arụ (3.5s)', 'Kunna Kai Tsaye (3.5s)'],
    ['🦁 Official Squad • Simolat Football Academy', '🦁 Équipe Officielle • Simolat Football Academy', '🦁 Plantel Oficial • Simolat Football Academy', '🦁 Elenco Oficial • Simolat Football Academy', '🦁 الفريق الرسمي • أكاديمية سيمولات', '🦁 Ẹgbẹ́ Àṣẹ • Simolat Football Academy', '🦁 Ndị Otu Gọọmentị • Simolat Football Academy', '🦁 Ƙungiyar Hukuma • Simolat Football Academy'],
    ['Full Academy Squad & Technical Staff Portrait', 'Portrait Complet de l\'Effectif & du Staff Technique', 'Retrato Completo del Plantel y Cuerpo Técnico', 'Retrato Completo do Elenco e Comissão Técnica', 'صورة جماعية كاملة للفريق والجهاز الفني', 'Àwòrán Kíkún ti Ẹgbẹ́ & Àwọn Olùkọ́', 'Foto Ndị Otu Zuru Ezu & Ndị Nkuzi', 'Babban Hoton ’Yan Wasa da Masu Horarwa'],
    ['Simolat Football Academy players, goalkeepers, and coaching staff gathered on the pitch for an official academy group photograph.', 'Joueurs, gardiens et entraîneurs réunis sur la pelouse pour la photo officielle de l\'académie.', 'Jugadores, porteros y entrenadores reunidos sobre el césped para la fotografía oficial del grupo.', 'Jogadores, goleiros e comissão técnica reunidos no gramado para a foto oficial da academia.', 'اللاعبون وحراس المرمى والجهاز التدريبي مجتمعون على أرضية الملعب لالتقاط الصورة الرسمية.', 'Àwọn agbábọ́ọ̀lù, aṣọ́lé, àti àwọn olùkọ́ péjọ lórí pápá fún àwòrán àṣẹ.', 'Ndị egwuregwu, ndị nche goolu, na ndị nkuzi zukọtara n\'ọgbọ maka foto otu.', '’Yan wasa, masu tsaron raga da masu horarwa a fili don hoton hukuma.'],
    ['View Full Res Lightbox', 'Voir Haute Résolution', 'Ver en Alta Resolución', 'Ver Alta Resolução', 'عرض بدقة كاملة', 'Wo Àwòrán Kíkún', 'Lelee Foto Zuru Ezu', 'Duba Cikakken Hoto'],
    ['⚡ Training Ground • Physical Conditioning', '⚡ Terrain d\'Entraînement • Préparation Physique', '⚡ Campo de Entrenamiento • Preparación Física', '⚡ Centro de Treinamento • Preparação Física', '⚡ ملعب التدريب • الإعداد البدني', '⚡ Pápá Ìdánilẹ́kọ̀ọ́ • Ìmúra Ara', '⚡ Ebe Ọzụzụ • Nkwadebe Ahụ', '⚡ Filin Atisaye • Ƙarfafa Jiki'],
    ['High-Intensity Stadium Pitch Conditioning', 'Préparation Physique Haute Intensité au Stade', 'Acondicionamiento de Alta Intensidad en el Estadio', 'Condicionamento de Alta Intensidade no Estádio', 'إعداد بدني عالي الشدة في الملعب', 'Ìdánilẹ́kọ̀ọ́ Agbára Gíga lórí Pápá', 'Ọzụzụ Ike Dị Elu n\'Ámá Egwuregwu', 'Ƙarfafa Jiki Mai Ƙarfi a Filin Wasa'],
    ['View Slide 1 →', 'Voir Diapo 1 →', 'Ver Diapositiva 1 →', 'Ver Slide 1 →', 'عرض الشريحة 1 →', 'Wo Àwòrán 1 →', 'Lelee Slide 1 →', 'Duba Hoto na 1 →'],
    ['View Slide 2 →', 'Voir Diapo 2 →', 'Ver Diapositiva 2 →', 'Ver Slide 2 →', 'عرض الشريحة 2 →', 'Wo Àwòrán 2 →', 'Lelee Slide 2 →', 'Duba Hoto na 2 →'],
    ['View Slide 3 →', 'Voir Diapo 3 →', 'Ver Diapositiva 3 →', 'Ver Slide 3 →', 'عرض الشريحة 3 →', 'Wo Àwòrán 3 →', 'Lelee Slide 3 →', 'Duba Hoto na 3 →'],
    ['View Slide 4 →', 'Voir Diapo 4 →', 'Ver Diapositiva 4 →', 'Ver Slide 4 →', 'عرض الشريحة 4 →', 'Wo Àwòrán 4 →', 'Lelee Slide 4 →', 'Duba Hoto na 4 →'],
    ['View Slide 5 →', 'Voir Diapo 5 →', 'Ver Diapositiva 5 →', 'Ver Slide 5 →', 'عرض الشريحة 5 →', 'Wo Àwòrán 5 →', 'Lelee Slide 5 →', 'Duba Hoto na 5 →'],
    ['View Slide 6 →', 'Voir Diapo 6 →', 'Ver Diapositiva 6 →', 'Ver Slide 6 →', 'عرض الشريحة 6 →', 'Wo Àwòrán 6 →', 'Lelee Slide 6 →', 'Duba Hoto na 6 →'],
    ['View Slide 7 →', 'Voir Diapo 7 →', 'Ver Diapositiva 7 →', 'Ver Slide 7 →', 'عرض الشريحة 7 →', 'Wo Àwòrán 7 →', 'Lelee Slide 7 →', 'Duba Hoto na 7 →'],
    ['View Slide 8 →', 'Voir Diapo 8 →', 'Ver Diapositiva 8 →', 'Ver Slide 8 →', 'عرض الشريحة 8 →', 'Wo Àwòrán 8 →', 'Lelee Slide 8 →', 'Duba Hoto na 8 →'],
    ['View Slide 9 →', 'Voir Diapo 9 →', 'Ver Diapositiva 9 →', 'Ver Slide 9 →', 'عرض الشريحة 9 →', 'Wo Àwòrán 9 →', 'Lelee Slide 9 →', 'Duba Hoto na 9 →'],
    ['View Slide 10 →', 'Voir Diapo 10 →', 'Ver Diapositiva 10 →', 'Ver Slide 10 →', 'عرض الشريحة 10 →', 'Wo Àwòrán 10 →', 'Lelee Slide 10 →', 'Duba Hoto na 10 →'],
    ['View Slide 11 →', 'Voir Diapo 11 →', 'Ver Diapositiva 11 →', 'Ver Slide 11 →', 'عرض الشريحة 11 →', 'Wo Àwòrán 11 →', 'Lelee Slide 11 →', 'Duba Hoto na 11 →'],
    ['Official Media Archive — 11 Academy Photos', 'Archives Médias Officielles — 11 Photos', 'Archivo Oficial de Medios — 11 Fotos', 'Arquivo Oficial de Mídia — 11 Fotos', 'أرشيف الوسائط الرسمي — 11 صور', 'Àkọsílẹ̀ Àwòrán Àṣẹ — Àwòrán 11', 'Ebe Nchekwa Foto — Foto 11', 'Rumbun Hotuna — Hotuna 11'],
    ['Click any stored image below to jump directly to its carousel slide or view full-screen resolution.', 'Cliquez sur une image ci-dessous pour accéder directement à sa diapositive ou à la haute résolution.', 'Haz clic en cualquier imagen para ir a su diapositiva o ver en pantalla completa.', 'Clique em qualquer imagem abaixo para ir ao slide ou ver em tela cheia.', 'انقر على أي صورة محفوظة أدناه للانتقال إلى الشريحة أو العرض بملء الشاشة.', 'Tẹ àwòrán èyíkéyìí ní ìsàlẹ̀ láti wò ó ní kíkún.', 'Pịa foto ọ bụla n\'okpuru iji gaa na slide ma ọ bụ lee ihuenyo zuru ezu.', 'Danna kowane hoto a ƙasa don dubawa a girman fuska.'],
    ['11 / 11 ACADEMY PHOTOS ACTIVE', '11 / 11 PHOTOS ACTIVES', '11 / 11 FOTOS ACTIVAS', '11 / 11 FOTOS ATIVAS', '11 / 11 صور نشطة', '11 / 11 ÀWÒRÁN Ń ṢIṢẸ́', '11 / 11 FOTO NA-ARỤ ỌRỤ', '11 / 11 HOTUNA SUNA AIKI'],

    /* Fixtures & Smart LSDFL Table */
    ['Matchday Schedule • Lagos & Osun State', 'Calendrier des Matchs • États de Lagos & Osun', 'Calendario de Partidos • Lagos y Osun', 'Calendário de Jogos • Lagos e Osun', 'جدول المباريات • لاغوس وأوسون', 'Ètò Ìdíje • Ìpínlẹ̀ Èkó & Ọ̀ṣun', 'Usoro Egwuregwu • Steeti Lagos & Osun', 'Jadawalin Wasanni • Jihar Legas da Osun'],
    ['Official Simolat Football Academy matchday calendar across First Team, U-19, and U-17 squads. Download the A4-formatted Matchday Program PDF for scouts, parents, and supporters.', 'Calendrier officiel des matchs de Simolat Football Academy (Équipe Première, U-19 et U-17). Téléchargez le programme A4 PDF pour recruteurs, parents et supporters.', 'Calendario oficial de partidos de Simolat Football Academy para Primer Equipo, Sub-19 y Sub-17. Descarga el Programa A4 en PDF.', 'Calendário oficial de jogos da Simolat Football Academy para Elenco Principal, Sub-19 e Sub-17. Baixe o Programa A4 em PDF.', 'الجدول الرسمي لمباريات أكاديمية سيمولات للفريق الأول وتحت 19 وتحت 17. حمل برنامج المباراة PDF.', 'Ètò ìdíje àṣẹ ti Simolat Football Academy fún Ẹgbẹ́ Àkọ́kọ́, U-19 àti U-17. Gba ìwé ètò A4 PDF.', 'Kalenda egwuregwu gọọmentị Simolat maka Ndị Otu Mbụ, U-19, na U-17. Budata Mmemme A4 PDF.', 'Jadawalin wasannin Simolat na Ƙungiyar Farko, U-19 da U-17. Sauke shirin wasa na PDF.'],
    ['Download Matchday Program', 'Télécharger le Programme PDF', 'Descargar Programa PDF', 'Baixar Programa em PDF', 'تحميل برنامج المباريات PDF', 'Gba Ètò Ìdíje PDF', 'Budata Mmemme Egwuregwu PDF', 'Sauke Shirin Wasa PDF'],
    ['Date & Kickoff:', 'Date & Coup d\'envoi :', 'Fecha y Hora:', 'Data e Horário:', 'التاريخ والانطلاق:', 'Ọjọ́ & Àkókò:', 'Ụbọchị & Oge:', 'Rana & Lokaci:'],
    ['Venue:', 'Stade :', 'Estadio:', 'Estádio:', 'الملعب:', 'Pápá Ìdíje:', 'Ámá Egwuregwu:', 'Filin Wasa:'],
    ['Squad:', 'Équipe :', 'Equipo:', 'Elenco:', 'الفريق:', 'Ẹgbẹ́:', 'Otu:', 'Ƙungiya:'],
    ['Lagos State Divisional Football Association League (LSDFL) • Smart League Portal', 'Ligue Divisionnaire de Football de l\'État de Lagos (LSDFL) • Portail Intelligent', 'Liga Divisional de Fútbol del Estado de Lagos (LSDFL) • Portal Inteligente', 'Liga Divisional de Futebol do Estado de Lagos (LSDFL) • Portal Inteligente', 'دوري اتحاد ولاية لاغوس لكرة القدم (LSDFL) • البوابة الذكية للدوري', 'Líìgì Ìpínlẹ̀ Èkó (LSDFL) • Ojú-òpó Líìgì Olóye', 'Njikọ Bọọlụ Steeti Lagos (LSDFL) • Ebe Nchịkwa Smart', 'Gasar Ƙungiyar Ƙwallon Ƙafa ta Jihar Legas (LSDFL) • Shafin Gasar'],
    ['LAGOS STATE DIVISIONAL FOOTBALL ASSOCIATION LEAGUE TABLE (MD 9)', 'CLASSEMENT DE LA LIGUE DIVISIONNAIRE DE FOOTBALL DE L\'ÉTAT DE LAGOS (J9)', 'TABLA DE LA LIGA DIVISIONAL DE FÚTBOL DEL ESTADO DE LAGOS (J9)', 'TABELA DA LIGA DIVISIONAL DE FUTEBOL DO ESTADO DE LAGOS (ROD. 9)', 'جدول ترتيب دوري ولاية لاغوس لكرة القدم (الجولة 9)', 'TÁBÌLÌ LÍÌGÌ ẸKÙN ÌPÍNLẸ̀ ÈKÓ (ÌJÀ 9)', 'TEBỤL NJIKỌ BỌỌLỤ STEETI LAGOS (ỤBỌCHỊ 9)', 'TEBURIN GASAR ƘWALLON ƘAFA TA JIHAR LEGAS (RANA TA 9)'],
    ['Double Round-Robin • 18 Matchdays (90 Matches) • Top 2 qualify for Lagos Super Four Playoff • Bottom 2 relegated to Divisional Qualifying Serie', 'Aller-Retour • 18 Journées (90 Matchs) • Top 2 qualifiés pour les Play-offs Super Four • 2 derniers relégués', 'Ida y Vuelta • 18 Jornadas (90 Partidos) • Los 2 primeros clasifican al Playoff Super Four • Los 2 últimos descienden', 'Turno e Returno • 18 Rodadas (90 Jogos) • 2 primeiros vão ao Playoff Super Four • 2 últimos rebaixados', 'دوري من دورين • 18 جولة (90 مباراة) • يتأهل الأول والثاني لتصفيات سوبر فور ويهبط الأخيران', 'Ìdíje Aláìlẹ́gbẹ́ • Ọjọ́ Ìdíje 18 (Ìdíje 90) • Àwọn Méjì Àkọ́kọ́ yóò kopa nínú Super Four', 'Okirikiri Ugboro Abụọ • Ụbọchị 18 (Egwuregwu 90) • Ndị 2 Mbụ ga-aga Super Four', 'Zagaye Biyu • Ranaku 18 (Wasanni 90) • Na Farko 2 za su shiga Super Four Playoff'],
    ['Mid-Season Table (MD 9)', 'Classement Mi-Saison (J9)', 'Tabla Mitad Temporada (J9)', 'Tabela Meio de Temporada (R9)', 'ترتيب منتصف الموسم (ج9)', 'Tábìlì Àárín Àkókò (Ìjà 9)', 'Tebụl Etiti Oge (MD 9)', 'Teburin Tsakiyar Kaka (Rana 9)'],
    ['Matchdays 1–3', 'Journées 1–3', 'Jornadas 1–3', 'Rodadas 1–3', 'الجولات 1–3', 'Ọjọ́ Ìdíje 1–3', 'Ụbọchị Egwuregwu 1–3', 'Ranaku 1–3'],
    ['10-Team Directory', 'Annuaire des 10 Équipes', 'Directorio de 10 Equipos', 'Diretório dos 10 Clubes', 'دليل الفرق الـ 10', 'Àtòjọ Ẹgbẹ́ 10', 'Ndepụta Ndị Otu 10', 'Jerin Ƙungiyoyi 10'],
    ['Share', 'Partager', 'Compartir', 'Compartilhar', 'مشاركة', 'Pín', 'Kekọrịta', 'Raba'],
    ['Copied!', 'Copié !', '¡Copiado!', 'Copiado!', 'تم النسخ!', 'Ti Dà á!', 'Edepụtaghachila!', 'An Kwafi!'],
    ['🏆 League Leader', '🏆 Leader du Championnat', '🏆 Líder de Liga', '🏆 Líder da Liga', '🏆 متصدر الدوري', '🏆 Aṣáájú Líìgì', '🏆 Onye Isi Njikọ', '🏆 Jagoran Gasa'],
    ['21 Pts • +8 GD (Unbeaten)', '21 Pts • +8 Diff. (Invaincu)', '21 Pts • +8 DG (Invicto)', '21 Pts • +8 SG (Invicto)', '21 نقطة • +8 أهداف (بدون هزيمة)', 'Àmì 21 • +8 Àmì-Àfojú (Kò tíì pàdánù)', 'Akara 21 • +8 Goolu (Enweghị Mmeri)', 'Maki 21 • +8 Kwallaye (Ba a Ci Su Ba)'],
    ['⚡ Top Attack', '⚡ Meilleure Attaque', '⚡ Mejor Ataque', '⚡ Melhor Ataque', '⚡ أقوى هجوم', '⚡ Ìkọlù Tó Lágbára', '⚡ Mwakpo Kacha Ike', '⚡ Hari Mafi Ƙarfi'],
    ['13 & 12 Goals Scored', '13 & 12 Buts Marqués', '13 y 12 Goles Anotados', '13 e 12 Gols Marcados', '13 و 12 هدفاً مسجلاً', 'Góòlù 13 & 12 Ti Wọlé', 'Goolu 13 & 12 Enyere', 'An Ci Kwallaye 13 da 12'],
    ['🛡️ Tightest Defense', '🛡️ Meilleure Défense', '🛡️ Mejor Defensa', '🛡️ Melhor Defesa', '🛡️ أقوى دفاع', '🛡️ Ààbò Tó Lágbára Jùlọ', '🛡️ Nchedo Kacha Sie Ike', '🛡️ Tsaro Mafi Ƙarfi'],
    ['Only 4 Goals Conceded', 'Seulement 4 Buts Encaissés', 'Solo 4 Goles Recibidos', 'Apenas 4 Gols Sofridos', 'استقبل 4 أهداف فقط', 'Góòlù 4 Péré Ni Wọ́n Gbà', 'Naanị Goolu 4 Banye', 'Kwallaye 4 Kawai Aka Ci'],
    ['📊 Season Milestone', '📊 Bilan de Saison', '📊 Hito de Temporada', '📊 Marco da Temporada', '📊 محطة الموسم', '📊 Ipò Àkókò', '📊 Nzọụkwụ Oge Egwuregwu', '📊 Matsayin Kakar'],
    ['Matchday 9 / 18', 'Journée 9 / 18', 'Jornada 9 / 18', 'Rodada 9 / 18', 'الجولة 9 / 18', 'Ọjọ́ Ìdíje 9 / 18', 'Ụbọchị 9 / 18', 'Rana ta 9 / 18'],
    ['45 / 90 Matches Played', '45 / 90 Matchs Joués', '45 / 90 Partidos Jugados', '45 / 90 Jogos Realizados', 'لُعبت 45 من 90 مباراة', 'Ìdíje 45 Nínú 90 Ti Lọ', 'Egwuregwu 45 / 90 Emere', 'An Buga Wasanni 45 / 90'],
    ['All Zones (10)', 'Toutes les Zones (10)', 'Todas las Zonas (10)', 'Todas as Zonas (10)', 'كل المراكز (10)', 'Gbogbo Àgbègbè (10)', 'Mpaghara Niile (10)', 'Duka Yankuna (10)'],
    ['🏆 Super 4 (1–2)', '🏆 Super 4 (1–2)', '🏆 Super 4 (1–2)', '🏆 Super 4 (1–2)', '🏆 سوبر 4 (1–2)', '🏆 Super 4 (1–2)', '🏆 Super 4 (1–2)', '🏆 Super 4 (1–2)'],
    ['🔵 Contenders (3–4)', '🔵 Prétendants (3–4)', '🔵 Contendientes (3–4)', '🔵 Candidatos (3–4)', '🔵 المنافسون (3–4)', '🔵 Olùdíje (3–4)', '🔵 Ndị Na-asọmpi (3–4)', '🔵 Masu Takara (3–4)'],
    ['⚪ Mid-Table (5–8)', '⚪ Milieu de Tableau (5–8)', '⚪ Media Tabla (5–8)', '⚪ Meio de Tabela (5–8)', '⚪ وسط الجدول (5–8)', '⚪ Àárín Tábìlì (5–8)', '⚪ Etiti Tebụl (5–8)', '⚪ Tsakiyar Tebur (5–8)'],
    ['⚠️ Relegation (9–10)', '⚠️ Relégation (9–10)', '⚠️ Descenso (9–10)', '⚠️ Rebaixamento (9–10)', '⚠️ الهبوط (9–10)', '⚠️ Ipò Ìsàlẹ̀ (9–10)', '⚠️ Mbelata (9–10)', '⚠️ Faɗuwa (9–10)'],
    ['Search club or LGA...', 'Rechercher un club ou LGA...', 'Buscar club o LGA...', 'Pesquisar clube ou LGA...', 'ابحث عن النادي أو المنطقة...', 'Wá ẹgbẹ́ tàbí LGA...', 'Chọọ klọb ma ọ bụ LGA...', 'Nemo ƙungiya ko LGA...'],
    ['Reset Standings', 'Réinitialiser', 'Restablecer', 'Redefinir', 'إعادة ضبط الجدول', 'Tún Tábìlì Tò', 'Tọgharịa Tebụl', 'Sake Saita Tebur'],
    ['Pos ↕', 'Pos ↕', 'Pos ↕', 'Pos ↕', 'المركز ↕', 'Ipò ↕', 'Ọnọdụ ↕', 'Matsayi ↕'],
    ['Club & Zone ↕', 'Club & Zone ↕', 'Club y Zona ↕', 'Clube & Zona ↕', 'النادي والمنطقة ↕', 'Ẹgbẹ́ & Àgbègbè ↕', 'Klọb & Mpaghara ↕', 'Ƙungiya & Yanki ↕'],
    ['Last 5 Form', '5 Derniers', 'Últimos 5', 'Últimos 5', 'آخر 5 مباريات', 'Ìṣẹ̀ṣẹ̀ 5', 'Egwuregwu 5', 'Wasanni 5'],
    ['Pts ↕', 'Pts ↕', 'Pts ↕', 'Pts ↕', 'النقاط ↕', 'Àmì ↕', 'Akara ↕', 'Maki ↕'],
    ['★ LEADER · SUPER 4', '★ LEADER · SUPER 4', '★ LÍDER · SUPER 4', '★ LÍDER · SUPER 4', '★ المتصدر · سوبر 4', '★ AṢÁÁJÚ · SUPER 4', '★ ONYE ISI · SUPER 4', '★ JAGORA · SUPER 4'],
    ['🏆 SUPER 4', '🏆 SUPER 4', '🏆 SUPER 4', '🏆 SUPER 4', '🏆 سوبر 4', '🏆 SUPER 4', '🏆 SUPER 4', '🏆 SUPER 4'],
    ['🔵 CONTENDER', '🔵 PRÉTENDANT', '🔵 ASPIRANTE', '🔵 G-4', '🔵 منافس', '🔵 OLÙDÍJE', '🔵 ONYE ASỌMPI', '🔵 MAI TAKARA'],
    ['SAFE', 'MAINTIEN', 'SALVADO', 'SEGURO', 'آمن', 'WÀ LÁÀBÒ', 'CHEKWABARA', 'LAFIYA'],
    ['MID-TABLE', 'MILIEU', 'MEDIA TABLA', 'MEIO DE TABELA', 'وسط الجدول', 'ÀÁRÍN', 'ETITI TEBỤL', 'TSAKIYA'],
    ['⚠️ REL', '⚠️ REL', '⚠️ DESC', '⚠️ REB', '⚠️ هبوط', '⚠️ ÌSÀLẸ̀', '⚠️ MBELATA', '⚠️ FAƊUWA'],
    ['Win', 'Victoire', 'Victoria', 'Vitória', 'فوز', 'Ìṣẹ́gun', 'Mmeri', 'Nasara'],
    ['Draw', 'Nul', 'Empate', 'Empate', 'تعادل', 'Ìbámu', 'Nhata', 'Canjaras'],
    ['Loss', 'Défaite', 'Derrota', 'Derrota', 'خسارة', 'Ìpàdánù', 'Mfu', 'Rashin Nasara'],
    ['🏆 Super 4 Playoff (1–2)', '🏆 Play-off Super 4 (1–2)', '🏆 Playoff Super 4 (1–2)', '🏆 Playoff Super 4 (1–2)', '🏆 تصفيات سوبر 4 (1–2)', '🏆 Super 4 Playoff (1–2)', '🏆 Super 4 Playoff (1–2)', '🏆 Super 4 Playoff (1–2)'],
    ['🔵 Upper Contenders (3–4)', '🔵 Haut de Tableau (3–4)', '🔵 Zona Alta (3–4)', '🔵 Zona Superior (3–4)', '🔵 مراكز المقدمة (3–4)', '🔵 Àwọn Olùdíje Òkè (3–4)', '🔵 Ndị Elu (3–4)', '🔵 Masu Takara na Sama (3–4)'],
    ['⚪ Safe Mid-Table (5–8)', '⚪ Milieu de Tableau (5–8)', '⚪ Media Tabla Segura (5–8)', '⚪ Meio de Tabela (5–8)', '⚪ المنطقة الدافئة (5–8)', '⚪ Àárín Tó Dáa (5–8)', '⚪ Etiti Tebụl (5–8)', '⚪ Tsakiyar Tebur (5–8)'],
    ['⚠️ Relegation Zone (9–10)', '⚠️ Zone de Relégation (9–10)', '⚠️ Zona de Descenso (9–10)', '⚠️ Zona de Rebaixamento (9–10)', '⚠️ منطقة الهبوط (9–10)', '⚠️ Àgbègbè Ìsàlẹ̀ (9–10)', '⚠️ Ebe Mbelata (9–10)', '⚠️ Yankin Faɗuwa (9–10)'],
    ['Click any column header to sort standings dynamically', 'Cliquez sur un en-tête pour trier le classement dynamiquement', 'Haz clic en cualquier columna para ordenar la tabla', 'Clique em qualquer coluna para ordenar dinamicamente', 'انقر على أي عمود لفرز الترتيب تلقائياً', 'Tẹ orí òpó èyíkéyìí láti tò ó', 'Pịa isi kọlụm ọ bụla iji hazie tebụl', 'Danna kan kowane ginshiƙi don tsara teburin'],
    ['Matchday 1', 'Journée 1', 'Jornada 1', 'Rodada 1', 'الجولة 1', 'Ọjọ́ Ìdíje 1', 'Ụbọchị Egwuregwu 1', 'Ranar Wasa ta 1'],
    ['Matchday 2', 'Journée 2', 'Jornada 2', 'Rodada 2', 'الجولة 2', 'Ọjọ́ Ìdíje 2', 'Ụbọchị Egwuregwu 2', 'Ranar Wasa ta 2'],
    ['Matchday 3', 'Journée 3', 'Jornada 3', 'Rodada 3', 'الجولة 3', 'Ọjọ́ Ìdíje 3', 'Ụbọchị Egwuregwu 3', 'Ranar Wasa ta 3'],
    ['Completed', 'Terminé', 'Finalizado', 'Concluído', 'انتهت', 'Ti Parí', 'Emechara', 'An Gama'],
    ['Away Win', 'Victoire Ext.', 'Victoria Visitante', 'Vitória Fora', 'فوز الضيف', 'Ìṣẹ́gun Ìta', 'Mmeri Pụrụ Iche', 'Nasarar Baƙo'],
    ['Home Win', 'Victoire Dom.', 'Victoria Local', 'Vitória Casa', 'فوز المضيف', 'Ìṣẹ́gun Ilé', 'Mmeri Ụlọ', 'Nasarar Gida'],
    ['Club Name', 'Nom du Club', 'Nombre del Club', 'Nome do Clube', 'اسم النادي', 'Orúkọ Ẹgbẹ́', 'Aha Klọb', 'Sunan Ƙungiya'],
    ['Home Ground', 'Stade à Domicile', 'Estadio Local', 'Estádio', 'الملعب الرئيسي', 'Pápá Ìdíje', 'Ámá Egwuregwu', 'Filin Gida'],
    ['Local Government Area (LGA)', 'Zone de Gouvernement Local (LGA)', 'Área de Gobierno Local (LGA)', 'Área de Governo Local (LGA)', 'منطقة الحكومة المحلية', 'Ìjọba Ìbílẹ̀ (LGA)', 'Mpaghara Gọọmentị Obodo (LGA)', 'Ƙaramar Hukuma (LGA)'],

    /* Technical Staff */
    ['Simolat Football Academy • Technical Staff Directory', 'Simolat Football Academy • Annuaire du Staff Technique', 'Simolat Football Academy • Directorio del Cuerpo Técnico', 'Simolat Football Academy • Diretório da Comissão Técnica', 'أكاديمية سيمولات • دليل الجهاز الفني', 'Simolat Football Academy • Àtòjọ Àwọn Olùkọ́', 'Simolat Football Academy • Ndepụta Ndị Ọrụ Nka', 'Simolat Football Academy • Jerin Ma\'aikatan Fasaha'],
    ['Find Technical Staff by Name or Department', 'Rechercher le Staff Technique par Nom ou Département', 'Buscar Cuerpo Técnico por Nombre o Departamento', 'Buscar Comissão Técnica por Nome ou Departamento', 'البحث عن الجهاز الفني بالاسم أو القسم', 'Wá Òṣìṣẹ́ Ìmọ̀ nípa Orúkọ tàbí Ẹ̀ka', 'Chọta Ndị Ọrụ Nka site n\'Aha ma ọ bụ Ngalaba', 'Nemo Ma\'aikatan Fasaha ta Suna ko Sashe'],
    ['Showing 5 Staff Profiles', 'Affichage de 5 profils du staff', 'Mostrando 5 perfiles técnicos', 'Mostrando 5 perfis técnicos', 'عرض 5 ملفات للجهاز الفني', 'Ìfihàn Ìwé 5 ti Àwọn Olùkọ́', 'Na-egosi Profaịlụ 5 nke Ndị Ọrụ', 'Ana Nuna Bayanan Ma\'aikata 5'],
    ['All Primary Departments', 'Tous les Départements Principaux', 'Todos los Departamentos Principales', 'Todos os Departamentos Principais', 'جميع الأقسام الرئيسية', 'Gbogbo Àwọn Ẹ̀ka Pàtàkì', 'Ngalaba Isi Niile', 'Duk Manyan Sassan'],
    ['First Team Coaching', 'Entraînement Équipe Première', 'Entrenamiento Primer Equipo', 'Treinamento Equipe Principal', 'تدريب الفريق الأول', 'Ìdánilẹ́kọ̀ọ́ Ẹgbẹ́ Àkọ́kọ́', 'Nkuzi Ndị Otu Mbụ', 'Horar da Ƙungiyar Farko'],
    ['Medical & Sports Science', 'Médecine & Sciences du Sport', 'Medicina y Ciencias del Deporte', 'Medicina e Ciência do Esporte', 'الطب وعلوم الرياضة', 'Ìṣègùn & Ìmọ̀ Eré Ìdárayá', 'Ahụike & Sayensị Egwuregwu', 'Lafiya da Kimiyyar Wasa'],
    ['Scouting & Analytics', 'Détection & Analyse Vidéo', 'Visoría y Análisis', 'Olheiros e Análise', 'الكشافة والتحليل', 'Ìwádìí & Ìtúpalẹ̀', 'Nchọpụta & Nyocha', 'Bincike da Nazari'],
    ['Academy Development', 'Développement de l\'Académie', 'Desarrollo de Academia', 'Desenvolvimento da Academia', 'تطوير الأكاديمية', 'Ìdàgbàsókè Akádẹ́mì', 'Mmepe Academy', 'Haɓaka Kwalejin'],
    ['Reset', 'Réinitialiser', 'Restablecer', 'Redefinir', 'إعادة ضبط', 'Tún Bẹ̀rẹ̀', 'Tọgharịa', 'Sake Saita'],
    ['All Departments', 'Tous les Départements', 'Todos los Departamentos', 'Todos os Departamentos', 'جميع الأقسام', 'Gbogbo Ẹ̀ka', 'Ngalaba Niile', 'Duk Sassan'],
    ['Take Staff Photo', 'Prendre Photo Staff', 'Tomar Foto Staff', 'Tirar Foto Equipe', 'التقاط صورة', 'Ya Àwòrán Òṣìṣẹ́', 'See Foto Onye Ọrụ', 'Ɗauki Hoton Ma\'aikaci'],
    ['Print Profile', 'Imprimer Profil', 'Imprimir Perfil', 'Imprimir Perfil', 'طباعة الملف', 'Tẹ Àkọsílẹ̀ Jáde', 'Bipụta Profaịlụ', 'Buga Bayani'],
    ['Quick Informations (Key Metadata)', 'Informations Clés (Métadonnées)', 'Información Rápida (Datos Clave)', 'Informações Rápidas', 'معلومات سريعة (البيانات الأساسية)', 'Àlàyé Kíákíá', 'Ozi Ngwa Ngwa', 'Bayanai Masu Sauri'],
    ['Full Name', 'Nom Complet', 'Nombre Completo', 'Nome Completo', 'الاسم الكامل', 'Orúkọ Kíkún', 'Aha Zuru Ezu', 'Cikakken Suna'],
    ['Current Role', 'Poste Actuel', 'Cargo Actual', 'Cargo Atual', 'المنصب الحالي', 'Ipò Lọ́wọ́lọ́wọ́', 'Ọrụ Ugbu A', 'Matsayi na Yanzu'],
    ['Head Coach', 'Entraîneur Principal', 'Entrenador Principal', 'Treinador Principal', 'المدير الفني', 'Olùkọ́ Àgbà', 'Onye Isi Nkuzi', 'Babban Koci'],
    ['Date of Birth / Age', 'Date de Naissance / Âge', 'Fecha de Nacimiento / Edad', 'Data de Nascimento / Idade', 'تاريخ الميلاد / العمر', 'Ọjọ́ Ìbí / Ọjọ́-orí', 'Ụbọchị Ọmụmụ / Afọ', 'Ranar Haihuwa / Shekaru'],
    ['Joined Club', 'Rejoint le Club', 'Ingresó al Club', 'Entrou no Clube', 'تاريخ الانضمام', 'Darapọ̀ mọ́ Ẹgbẹ́', 'Banyere Klọb', 'Ya Shiga Ƙungiya'],
    ['Schedule Changes & Administrative Updates Newsletter', 'Newsletter : Changements d\'Horaires & Notes Administratives', 'Boletín de Cambios de Horario y Avisos Administrativos', 'Boletim de Mudanças de Horário e Avisos Administrativos', 'نشرة تغييرات الجدول والتحديثات الإدارية', 'Ìwé Ìròyìn Àtúnṣe Àkókò & Àṣẹ', 'Akwụkwọ Ozi Mgbanwe Oge na Nchịkwa', 'Jaridar Canje-canjen Jadawali da Sanarwa'],
    ['Club Group', 'Groupe du Club', 'Grupo del Club', 'Grupo do Clube', 'المجموعة', 'Ẹgbẹ́ Akádẹ́mì', 'Otu Klọb', 'Rukunin Kwaleji'],
    ['Technical Staff', 'Staff Technique', 'Cuerpo Técnico', 'Comissão Técnica', 'الجهاز الفني', 'Òṣìṣẹ́ Ìmọ̀', 'Ndị Ọrụ Nka', 'Ma\'aikatan Fasaha'],
    ['Academy Member', 'Membre de l\'Académie', 'Miembro de la Academia', 'Membro da Academia', 'عضو الأكاديمية', 'Ọmọ Ẹgbẹ́ Akádẹ́mì', 'Onye Otu Academy', 'Memban Kwaleji'],
    ['Parent / Guardian', 'Parent / Tuteur', 'Padre / Tutor', 'Pai / Responsável', 'ولي الأمر / الوصي', 'Òbí / Alágbàwí', 'Nne na Nna / Onye Nlekọta', 'Uba / Mai Kula'],
    ['Academy Administration', 'Administration de l\'Académie', 'Administración de la Academia', 'Administração da Academia', 'إدارة الأكاديمية', 'Àkóso Akádẹ́mì', 'Nchịkwa Academy', 'Hukumar Kwaleji'],
    ['Email Address', 'Adresse E-mail', 'Correo Electrónico', 'Endereço de E-mail', 'البريد الإلكتروني', 'Àdírẹ́sì Ìméèlì', 'Adreesị Email', 'Adireshin Imel'],
    ['Subscribe Now', 'S\'abonner Maintenant', 'Suscribirse Ahora', 'Inscrever-se Agora', 'اشترك الآن', 'Forúkọsílẹ̀ Báyìí', 'Debanye Aha Ugbu A', 'Yi Rajista Yanzu'],

    /* Store & 3D Kit Studio */
    ['Official Simolat Megastore', 'Boutique Officielle Simolat', 'Tienda Oficial Simolat', 'Loja Oficial Simolat', 'متجر سيمولات الرسمي', 'Ilé-Ìtajà Àṣẹ Simolat', 'Ụlọ Ahịa Gọọmentị Simolat', 'Babban Shagon Simolat na Hukuma'],
    ['Official match jerseys, pro training kit, and accessories delivered worldwide from St. Simolat Arena.', 'Maillots officiels, tenues d\'entraînement pro et accessoires livrés dans le monde entier depuis St. Simolat Arena.', 'Camisetas oficiales, equipación profesional y accesorios con envío mundial desde St. Simolat Arena.', 'Camisas oficiais, uniformes de treino e acessórios entregues no mundo todo direto da St. Simolat Arena.', 'قمصان المباريات الرسمية وأطقم التدريب والإكسسوارات تُشحن لجميع أنحاء العالم من ملعب سانت سيمولات.', 'Àwọn aṣọ ìdíje àṣẹ àti ohun èlò ìdánilẹ́kọ̀ọ́ tí a ń fi ránṣẹ́ káàkiri àgbáyé láti St. Simolat Arena.', 'Uwe egwuregwu gọọmentị, akụrụngwa ọzụzụ, na ngwa ezigara n\'ụwa niile site na St. Simolat Arena.', 'Rigunan wasa na hukuma da kayan atisaye da ake aikawa ko\'ina a duniya daga St. Simolat Arena.'],
    ['Order Status & Live Tracking', 'Statut & Suivi en Direct', 'Estado y Seguimiento en Vivo', 'Status & Rastreio ao Vivo', 'حالة الطلب والتتبع المباشر', 'Ipò Ọjà & Ìtọ́pinpin', 'Ọnọdụ Ahịa & Nsochi', 'Matsayin Oda & Bincike'],
    ['View Size Guide', 'Guide des Tailles', 'Guía de Tallas', 'Ver Guia de Tamanhos', 'دليل المقاسات', 'Wo Ìtọ́ni Ìwọ̀n', 'Lelee Ntụziaka Nha', 'Duba Girman Kaya'],
    ['Order Jersey', 'Commander Maillot', 'Pedir Camiseta', 'Pedir Camisa', 'اطلب القميص', 'Bèrè Aṣọ Ìdíje', 'Tụọ Uwe Egwuregwu', 'Oda Riga'],
    ['Email Me When Back in Stock', 'M\'alerter du Retour en Stock', 'Avisarme al Volver Stock', 'Avise-me Quando Voltar ao Estoque', 'أبلغني عند التوفر', 'Ránṣẹ́ sí Mi Tí Ó Bá Wà Lọ́jà', 'Zitere M Ozi Mgbe Ọ Dị', 'Sanar da Ni Idan Ya Dawo'],
    ['Interactive 3D Kit Studio • 360° View', 'Studio Maillot 3D Interactif • Vue 360°', 'Estudio Interactivo 3D • Vista 360°', 'Estúdio Interativo 3D • Visão 360°', 'استوديو القميص ثلاثي الأبعاد • عرض 360°', 'Yàrá Aṣọ 3D • Ìwò 360°', 'Studio Uwe 3D • Nlele 360°', 'Ɗakin Zane na 3D • Kallo 360°'],
    ['Personalize Your Official 2026/2027 Jersey', 'Personnalisez Votre Maillot Officiel 2026/2027', 'Personaliza tu Camiseta Oficial 2026/2027', 'Personalize Sua Camisa Oficial 2026/2027', 'صمم قميصك الرسمي لموسم 2026/2027', 'Ṣe Àtúnṣe Aṣọ Àṣẹ 2026/2027 Rẹ', 'Hazie Uwe Gọọmentị 2026/2027 Gị', 'Keɓance Rigar Wasa ta 2026/2027'],
    ['1. Choose Edition', '1. Choisir l\'Édition', '1. Elegir Edición', '1. Escolher Edição', '1. اختر النسخة', '1. Yan Ẹ̀dà Aṣọ', '1. Họrọ Ụdị Uwe', '1. Zaɓi Nau\'i'],
    ['Home (Yellow & White)', 'Domicile (Jaune & Blanc)', 'Local (Amarillo y Blanco)', 'Principal (Amarelo e Branco)', 'الأساسي (الأصفر والأبيض)', 'Ilé (Yẹ́lò & Funfun)', 'Ụlọ (Odo & Ọcha)', 'Gida (Rawaya da Fari)'],
    ['Away (White)', 'Extérieur (Blanc)', 'Visitante (Blanco)', 'Visitante (Branco)', 'الاحتياطي (الأبيض)', 'Ìta (Funfun)', 'Pụrụ Iche (Ọcha)', 'Waje (Fari)'],
    ['Third (Black)', 'Troisième (Noir)', 'Tercera (Negro)', 'Terceiro (Preto)', 'الثالث (الأسود)', 'Kẹta (Dúdú)', 'Nke Atọ (Ojii)', 'Na Uku (Baƙi)'],
    ['Surname / Name', 'Nom / Prénom', 'Apellido / Nombre', 'Sobrenome / Nome', 'الاسم على القميص', 'Orúkọ lórí Aṣọ', 'Aha Nna / Aha', 'Suna a Baya'],
    ['Squad Number (1-99)', 'Numéro (1-99)', 'Dorsal (1-99)', 'Número (1-99)', 'الرقم (1-99)', 'Nọ́ńbà (1-99)', 'Nọmba (1-99)', 'Lamba (1-99)'],
    ['Size', 'Taille', 'Talla', 'Tamanho', 'المقاس', 'Ìwọ̀n', 'Nha', 'Girma'],
    ['Add Personalized Jersey To Basket (€85)', 'Ajouter Maillot Personnalisé au Panier (85€)', 'Añadir Camiseta Personalizada (85€)', 'Adicionar Camisa Personalizada (€85)', 'أضف القميص المخصص للسلة (85€)', 'Fi Aṣọ Tí A Kọ Orúkọ sí Sínú Apẹ̀rẹ̀ (€85)', 'Tinye Uwe Nke Gị na Nkata (€85)', 'Saka Riga Mai Suna a Kwando (€85)'],

    /* Regulations, Tryouts, Curriculum, Regular Registration */
    ['Official Academy Regulations', 'Règlement Officiel de l\'Académie', 'Reglamento Oficial de la Academia', 'Regulamento Oficial da Academia', 'اللوائح الرسمية للأكاديمية', 'Òfin Àṣẹ Akádẹ́mì', 'Iwu Gọọmentị Academy', 'Dokokin Kwalejin na Hukuma'],
    ['Print Regulations (A4)', 'Imprimer Règlement (A4)', 'Imprimir Reglamento (A4)', 'Imprimir Regulamento (A4)', 'طباعة اللوائح (A4)', 'Tẹ Òfin Jáde (A4)', 'Bipụta Iwu (A4)', 'Buga Dokoki (A4)'],
    ['REGISTRATION AND ADMISSION TERMS AND CONDITIONS', 'CONDITIONS D\'INSCRIPTION ET D\'ADMISSION', 'TÉRMINOS Y CONDICIONES DE REGISTRO Y ADMISIÓN', 'TERMOS E CONDIÇÕES DE REGISTRO E ADMISSÃO', 'شروط وأحكام التسجيل والقبول', 'ÀWỌN ÒFIN ÌFORÚKỌSÍLẸ̀ ÀTI ÌGBÀWỌLÉ', 'USORO NA ỌNỌDỤ NDEBANYE AHA NA NNABATA', 'SHARUƊAN RIJISTA DA SHIGA KWALEJI'],
    ['Administrative Compliance, Required Documents & Legal Framework', 'Conformité Administrative, Documents Requis & Cadre Légal', 'Cumplimiento Administrativo, Documentos y Marco Legal', 'Conformidade Administrativa, Documentos e Marco Legal', 'الامتثال الإداري والمستندات المطلوبة والإطار القانوني', 'Ìbámu Ìṣàkóso, Àwọn Ìwé Pàtàkì & Òfin', 'Nrubeisi Nchịkwa, Akwụkwọ Achọrọ & Iwu', 'Bin Dokoki, Takardu da Tsarin Shari\'a'],
    ['Fee Non-Refundability Policy', 'Politique de Non-Remboursement des Frais', 'Política de No Reembolso de Cuotas', 'Política de Não Reembolso de Taxas', 'سياسة عدم استرداد الرسوم', 'Òfin Àìdá Owó Padà', 'Iwu Enweghị Nkwụghachi Ụgwọ', 'Dokar Rashin Mayar da Kuɗi'],
    ['Registration Checklist', 'Liste de Contrôle d\'Inscription', 'Lista de Requisitos de Inscripción', 'Lista de Verificação de Matrícula', 'قائمة مستندات التسجيل', 'Àtòjọ Ohun Ìforúkọsílẹ̀', 'Ndepụta Ihe Ndebanye Aha', 'Jerin Takardun Rijista'],
    ['5 Mandatory Items', '5 Pièces Obligatoires', '5 Requisitos Obligatorios', '5 Itens Obrigatórios', '5 متطلبات إلزامية', 'Ohun Pàtàkì 5', 'Ihe 5 Dị Mkpa', 'Abubuwa 5 na Tilas'],
    ['Certified Medical History and Physical Clearance', 'Dossier Médical Certifié et Aptitude Physique', 'Historial Médico Certificado y Apto Físico', 'Histórico Médico Certificado e Liberação Física', 'تقرير طبي معتمد وشهادة لياقة بدنية', 'Ìwé Ìtàn Ìlera & Àyẹ̀wò Ara', 'Akwụkwọ Ahụike Enyere Asambodo', 'Takardar Lafiya Mai Inganci'],
    ['Birth Certificate', 'Acte de Naissance', 'Certificado de Nacimiento', 'Certidão de Nascimento', 'شهادة الميلاد', 'Ìwé Ìbí', 'Asambodo Ọmụmụ', 'Takardar Haihuwa'],
    ['National Identification Numbers (NIN)', 'Numéro d\'Identification Nationale (NIN)', 'Número de Identificación Nacional (NIN)', 'Número de Identificação Nacional (NIN)', 'رقم الهوية الوطنية (NIN)', 'Nọ́ńbà Ìdánimọ̀ Orílẹ̀-èdè (NIN)', 'Nọmba Njirimara Mba (NIN)', 'Lambar Shaidar Ƙasa (NIN)'],
    ['Two Passport Photographs', 'Deux Photos d\'Identité', 'Dos Fotografías Tamaño Pasaporte', 'Duas Fotos de Passaporte', 'صورتان شخصيتان', 'Fọ́tò Ìwé Ìrìnà Méjì', 'Foto Paspọtụ Abụọ', 'Hotunan Fasfo Biyu'],
    ['School Results', 'Bulletins Scolaires', 'Resultados Escolares', 'Histórico Escolar', 'النتائج الدراسية', 'Èsì Ìdánwò Ilé-Ìwé', 'Nsonaazụ Ụlọ Akwụkwọ', 'Sakamakon Makaranta'],
    ['Academy Classification', 'Classification de l\'Académie', 'Clasificación de la Academia', 'Classificação da Academia', 'تصنيف الأكاديمية', 'Ìpínsísọ̀rí Akádẹ́mì', 'Nhazi nke Academy', 'Rabe-raben Kwalejin'],
    ['High Performance Curriculum', 'Programme Haute Performance', 'Currículum de Alto Rendimiento', 'Currículo de Alto Desempenho', 'منهج الأداء العالي', 'Ètò Ẹ̀kọ́ Agbára Gíga', 'Usoro Nkuzi Arụmọrụ Dị Elu', 'Manhajar Horarwa Mai Ƙarfi'],
    ['Age-Categorized Pathways', 'Parcours par Catégorie d\'Âge', 'Rutas por Categoría de Edad', 'Categorias por Faixa Etária', 'مسارات مصنفة حسب الفئة العمرية', 'Ọ̀nà Nípa Ọjọ́-Orí', 'Ụzọ Dị Ka Afọ Siri Dị', 'Hanyoyin Horarwa ta Shekaru'],
    ['Under -13', 'Moins de 13 ans', 'Sub-13', 'Sub-13', 'تحت 13 سنة', 'Labẹ́ Ọdún 13', 'N\'okpuru Afọ 13', 'Ƙasa da 13'],
    ['Grassroots Foundation', 'Formation de Base', 'Formación Base', 'Base Fundamental', 'التأسيس الكروي للناشئين', 'Ìpìlẹ̀ Bọ́ọ̀lù Àwọn Ọ̀dọ́', 'Ntọala Bọọlụ Ntorobịa', 'Tushen Ƙwallon Matasa'],
    ['U-15 Category', 'Catégorie U-15', 'Categoría Sub-15', 'Categoria Sub-15', 'فئة تحت 15 سنة', 'Ìpele U-15', 'Ngalaba U-15', 'Rukunin U-15'],
    ['Junior Tactical Academy', 'Académie Tactique Junior', 'Academia Táctica Juvenil', 'Academia Tática Júnior', 'الأكاديمية التكتيكية للناشئين', 'Akádẹ́mì Ọgbọ́n Àwọn Ọ̀dọ́', 'Academy Atụmatụ Ntorobịa', 'Kwalejin Dabaru ta Matasa'],
    ['U-17 Category', 'Catégorie U-17', 'Categoría Sub-17', 'Categoria Sub-17', 'فئة تحت 17 سنة', 'Ìpele U-17', 'Ngalaba U-17', 'Rukunin U-17'],
    ['Elite Developmental Squad', 'Équipe de Développement Élite', 'Equipo de Desarrollo Élite', 'Elenco de Desenvolvimento Elite', 'فريق التطوير النخبوي', 'Ẹgbẹ́ Ìdàgbàsókè Gíga', 'Otu Mmepe Pụrụ Iche', 'Ƙungiyar Haɓaka Ƙwarewa'],
    ['U-19 Professional', 'Professionnel U-19', 'Profesional Sub-19', 'Profissional Sub-19', 'الاحتراف تحت 19 سنة', 'Ọ̀jọ̀gbọ́n U-19', 'Ọkachamara U-19', 'Ƙwararrun U-19'],
    ['Pro Scouting Showcase', 'Vitrine Recrutement Pro', 'Vitrina de Visoría Pro', 'Vitrine de Olheiros Pro', 'عرض كشافة الاحتراف', 'Ìfihàn Ìwádìí Ọ̀jọ̀gbọ́n', 'Ngosipụta Nchọpụta Pro', 'Nunin Binciken Ƙwararru'],
    ['Enroll U-13', 'Inscrire U-13', 'Inscribir Sub-13', 'Inscrever Sub-13', 'تسجيل تحت 13', 'Forúkọsílẹ̀ U-13', 'Debanye U-13', 'Shigar da U-13'],
    ['Enroll U-15', 'Inscrire U-15', 'Inscribir Sub-15', 'Inscrever Sub-15', 'تسجيل تحت 15', 'Forúkọsílẹ̀ U-15', 'Debanye U-15', 'Shigar da U-15'],
    ['Enroll U-17', 'Inscrire U-17', 'Inscribir Sub-17', 'Inscrever Sub-17', 'تسجيل تحت 17', 'Forúkọsílẹ̀ U-17', 'Debanye U-17', 'Shigar da U-17'],
    ['Apply U-19 Pathway', 'Postuler Parcours U-19', 'Aplicar Ruta Sub-19', 'Candidatar-se Sub-19', 'التقديم لمسار تحت 19', 'Bèrè Ọ̀nà U-19', 'Tinye Akwụkwọ U-19', 'Nemi Shiga U-19'],
    ['SIMOLAT FOOTBALL ACADEMY REGULAR REGISTRATION FORM', 'FORMULAIRE D\'INSCRIPTION RÉGULIÈRE SIMOLAT FOOTBALL ACADEMY', 'FORMULARIO DE INSCRIPCIÓN REGULAR SIMOLAT FOOTBALL ACADEMY', 'FORMULÁRIO DE MATRÍCULA REGULAR SIMOLAT FOOTBALL ACADEMY', 'استمارة التسجيل النظامي بأكاديمية سيمولات', 'FỌ́Ọ̀MÙ ÌFORÚKỌSÍLẸ̀ DÉÉDÉÉ SIMOLAT FOOTBALL ACADEMY', 'FỌM NDEBANYE AHA OGE NIILE SIMOLAT FOOTBALL ACADEMY', 'FOM ƊIN RIJISTA NA KULLUM NA SIMOLAT FOOTBALL ACADEMY'],
    ['TYPE & FILL ONLINE (MODAL)', 'REMPLIR EN LIGNE (MODALE)', 'LLENAR EN LÍNEA (MODAL)', 'PREENCHER ON-LINE (MODAL)', 'التعبئة عبر الإنترنت', 'KỌ SÍNÚ RẸ̀ LÓRÍ ÍŃTÁNẸ́Ẹ̀TÌ', 'DEJỤỌ N\'ỊNTANẸTỊ', 'CIKA A YANAR GIZO'],
    ['EMAIL ADMISSIONS DESK', 'ENVOYER AU BUREAU DES ADMISSIONS', 'ENVIAR A ADMISIONES', 'ENVIAR ÀS ADMISSÕES', 'مراسلة مكتب القبول', 'FÍ ÌMÉÈLÌ RÁNṢẸ́ SÍ ÀBỌ̀', 'ZIGARA NDI NNABATA', 'AIKA IMEL ZUWA OFISHIN SHIGARWA'],
    ['EMAIL TRYOUTS DESK', 'ENVOYER AU BUREAU DES DÉTECTIONS', 'ENVIAR A PRUEBAS', 'ENVIAR ÀS SELETIVAS', 'مراسلة مكتب التجارب', 'FÍ ÌMÉÈLÌ RÁNṢẸ́ SÍ ÌDÁNWÒ', 'ZIGARA NDI NNWALE', 'AIKA IMEL ZUWA OFISHIN GWAJI'],
    ['PRINT / SAVE AS PDF', 'IMPRIMER / ENREGISTRER PDF', 'IMPRIMIR / GUARDAR PDF', 'IMPRIMIR / SALVAR PDF', 'طباعة / حفظ كـ PDF', 'TẸ JÁDE / PAMỌ́ GẸ́GẸ́ BÍ PDF', 'BIPỤTA / CHEKWA DỊ KA PDF', 'BUGA / ADANA A PDF'],
    ['Open Safeguarding Policy (Modal)', 'Ouvrir la Politique de Protection (Modale)', 'Abrir Política de Protección (Modal)', 'Abrir Política de Proteção (Modal)', 'فتح سياسة حماية الطفل والناشئين', 'Ṣí Òfin Ààbò Àwọn Ọ̀dọ́', 'Mepee Iwu Nchedo Ụmụaka', 'Buɗe Dokar Kare Yara'],

    /* Contact & Footer */
    ['Official Communications Desk • Ikoyi Lagos', 'Bureau Officiel de Communication • Ikoyi Lagos', 'Mesa Oficial de Comunicaciones • Ikoyi Lagos', 'Mesa Oficial de Comunicações • Ikoyi Lagos', 'مكتب الاتصالات الرسمي • إيكوي لاغوس', 'Ọ́fíìsì Ìbánisọ̀rọ̀ Àṣẹ • Ikoyi Èkó', 'Ọfịs Nkwukọrịta Gọọmentị • Ikoyi Lagos', 'Ofishin Sadarwa na Hukuma • Ikoyi Legas'],
    ['Direct dispatch to club secretariat, matchday ticketing, media accreditation, and Simolat Football Academy trials at 77 Awolowo Road in Ikoyi Lagos.', 'Envoi direct au secrétariat du club, billetterie, accréditation presse et détections au 77 Awolowo Road, Ikoyi Lagos.', 'Contacto directo con secretaría, boletos, prensa y pruebas de Simolat Football Academy en 77 Awolowo Road, Ikoyi Lagos.', 'Contato direto com a secretaria, ingressos, imprensa e seletivas da Simolat Football Academy em 77 Awolowo Road, Ikoyi Lagos.', 'تواصل مباشر مع سكرتارية النادي والتذاكر والاعتماد الإعلامي وتجارب الأداء في 77 طريق أوولوو، إيكوي لاغوس.', 'Ìfiranṣẹ́ tààrà sí akọ̀wé ẹgbẹ́, tíkẹ́ẹ̀tì ìdíje, àti ìdánwò ní 77 Awolowo Road, Ikoyi Èkó.', 'Ozi ozugbo gaa n\'aka odeakwụkwọ, tiketi egwuregwu, na nnwale na 77 Awolowo Road, Ikoyi Lagos.', 'Sakon kai tsaye zuwa sakatariya, tikitin wasa da gwaje-gwaje a 77 Awolowo Road, Ikoyi Legas.'],
    ['Transmit Official Message', 'Transmettre un Message Officiel', 'Enviar Mensaje Oficial', 'Transmitir Mensagem Oficial', 'إرسال رسالة رسمية', 'Fí Ìfiranṣẹ́ Àṣẹ Ránṣẹ́', 'Zipụ Ozi Gọọmentị', 'Aika Saƙon Hukuma'],
    ['Full Name *', 'Nom Complet *', 'Nombre Completo *', 'Nome Completo *', 'الاسم الكامل *', 'Orúkọ Kíkún *', 'Aha Zuru Ezu *', 'Cikakken Suna *'],
    ['Official Email Address *', 'Adresse E-mail Officielle *', 'Correo Electrónico Oficial *', 'E-mail Oficial *', 'البريد الإلكتروني الرسمي *', 'Àdírẹ́sì Ìméèlì Àṣẹ *', 'Adreesị Email Gọọmentị *', 'Adireshin Imel na Hukuma *'],
    ['Direct Telephone Number *', 'Numéro de Téléphone Direct *', 'Teléfono Directo *', 'Telefone Direto *', 'رقم الهاتف المباشر *', 'Nọ́ńbà Fóònù Tààrà *', 'Nọmba Ekwentị Ozugbo *', 'Lambar Waya Kai Tsaye *'],
    ['Department Routing *', 'Service Destinataire *', 'Departamento Destino *', 'Departamento de Destino *', 'القسم المختص *', 'Ẹ̀ka Tó Kàn *', 'Ngalaba Nkwukọrịta *', 'Sashen da Ya Dace *'],
    ['Subject / Inquiry Title *', 'Objet / Titre de la Demande *', 'Asunto / Título de Consulta *', 'Assunto / Título *', 'الموضوع / عنوان الاستفسار *', 'Kókó Ìbéèrè *', 'Isiokwu Ajụjụ *', 'Taken Tambaya *'],
    ['Detailed Communication *', 'Message Détaillé *', 'Mensaje Detallado *', 'Mensagem Detalhada *', 'تفاصيل الرسالة *', 'Ìfiranṣẹ́ Kíkún *', 'Ozi Zuru Ezu *', 'Cikakken Saƙo *'],
    ['Dictate Inquiry', 'Dicter la Demande', 'Dictar Consulta', 'Ditar Mensagem', 'إملاء صوتي', 'Sọ Ìbéèrè Rẹ Lẹ́nu', 'Kwuo Ozi Gị', 'Faɗi Tambayar da Baki'],
    ['Stop Dictation', 'Arrêter la Dictation', 'Detener Dictado', 'Parar Ditado', 'إيقاف الإملاء', 'Dá Ọ̀rọ̀ Dúró', 'Kwụsị Okwu', 'Dakatar da Magana'],
    ['Clear', 'Effacer', 'Limpiar', 'Limpar', 'مسح', 'Pa Rẹ́', 'Hichapụ', 'Share'],
    ['Transmit Message To Secretariat →', 'Envoyer le Message au Secrétariat →', 'Enviar Mensaje a Secretaría →', 'Enviar Mensagem à Secretaria →', 'إرسال الرسالة إلى السكرتارية ←', 'Fi Ìfiranṣẹ́ Ránṣẹ́ sí Akọ̀wé →', 'Zipụ Ozi Gaa Odeakwụkwọ →', 'Aika Saƙo zuwa Sakatariya →'],
    ['GIS & Location Map', 'Carte & Localisation GPS', 'Mapa de Ubicación GPS', 'Mapa e Localização GPS', 'خريطة الموقع GPS', 'Àwòrán Ojú-ọ̀nà & GPS', 'Maapụ Ebe & GPS', 'Taswira da Wurin GPS'],
    ['Founded in 2016 by Mr Atundaolu Oluwole Simeon. decade of athletic supremacy, technical excellence, and the pride of Ikoyi Lagos.', 'Fondée en 2016 par M. Atundaolu Oluwole Simeon. Une décennie d\'excellence sportive et technique, la fierté d\'Ikoyi Lagos.', 'Fundada en 2016 por el Sr. Atundaolu Oluwole Simeon. Una década de excelencia atlética y técnica desde Ikoyi Lagos.', 'Fundada em 2016 pelo Sr. Atundaolu Oluwole Simeon. Uma década de excelência atlética e técnica no orgulho de Ikoyi Lagos.', 'تأسست عام 2016 على يد السيد أتونداولوا أولوولي سيميون. عقد من التفوق الرياضي والفني وفخر إيكوي لاغوس.', 'Tí Mr Atundaolu Oluwole Simeon dá sílẹ̀ ní 2016. Ọdún mẹ́wàá ti ìtayọ̀ eré bọ́ọ̀lù àti ògo Ikoyi Èkó.', 'Tọrọ ntọala na 2016 site n\'aka Maazị Atundaolu Oluwole Simeon. Afọ iri nke ọganihu egwuregwu na mpako Ikoyi Lagos.', 'An kafa a 2016 ta hannun Mista Atundaolu Oluwole Simeon. Shekaru goma na ƙwarewar wasanni a Ikoyi Legas.'],
    ['Media & Admissions', 'Médias & Admissions', 'Medios y Admisiones', 'Mídia & Admissões', 'الإعلام والقبول', 'Ìròyìn & Ìgbàwọlé', 'Mgbasa Ozi & Nnabata', 'Labarai & Shigarwa'],
    ['Club & Academy', 'Club & Académie', 'Club y Academia', 'Clube & Academia', 'النادي والأكاديمية', 'Ẹgbẹ́ & Akádẹ́mì', 'Klọb & Academy', 'Ƙungiya & Kwaleji'],
    ['Secretariat', 'Secrétariat', 'Secretaría', 'Secretaria', 'السكرتارية', 'Akọ̀wé Àṣẹ', 'Odeakwụkwọ', 'Sakatariya'],
    ['Contact Desk', 'Bureau de Contact', 'Mesa de Contacto', 'Mesa de Contato', 'مكتب التواصل', 'Ọ́fíìsì Ìbánisọ̀rọ̀', 'Ọfịs Nkwukọrịta', 'Ofishin Tuntuɓa'],
    ['Academy Megastore', 'Boutique de l\'Académie', 'Tienda Oficial', 'Loja da Academia', 'متجر الأكاديمية', 'Ilé-Ìtajà Akádẹ́mì', 'Ụlọ Ahịa Academy', 'Shagon Kwalejin'],
    ['Order Status & Tracking', 'Statut & Suivi de Commande', 'Estado y Rastreo de Pedido', 'Status & Rastreamento', 'حالة وتتبع الطلب', 'Ipò Ọjà & Ìtọ́pinpin', 'Ọnọdụ Ahịa & Nsochi', 'Matsayin Oda & Bin Diddigi'],
    ['Admissions Email', 'E-mail des Admissions', 'Correo de Admisiones', 'E-mail de Admissões', 'بريد القبول', 'Ìméèlì Ìgbàwọlé', 'Email Nnabata', 'Imel ɗin Shigarwa'],
    ['General Inquiries', 'Renseignements Généraux', 'Consultas Generales', 'Consultas Gerais', 'استفسارات عامة', 'Àwọn Ìbéèrè Gbogbogbò', 'Ajụjụ Niile', 'Tambayoyi Gaba Ɗaya'],
    ['Connect With Simolat Sporting Worldwide', 'Connectez-vous avec Simolat Sporting dans le Monde', 'Conecta con Simolat Sporting en Todo el Mundo', 'Conecte-se com a Simolat Sporting Mundialmente', 'تواصل مع سيمولات سبورتينغ حول العالم', 'Darapọ̀ mọ́ Simolat Sporting Káàkiri Àgbáyé', 'Jikọọ na Simolat Sporting Gburugburu Ụwa', 'Haɗa da Simolat Sporting a Duniya'],
    ['Live streams, kit drops & drills', 'Directs, nouveaux maillots & entraînements', 'Transmisiones, camisetas y entrenamientos', 'Lives, novos uniformes & treinos', 'بث مباشر وقمصان جديدة وتدريبات', 'Ìfihàn lójú-ẹsẹ̀, aṣọ tuntun & ìdánilẹ́kọ̀ọ́', 'Mgbasa ozi dị ndụ, uwe ọhụrụ & ọzụzụ', 'Kallo kai tsaye, sababbin kaya & horo'],
    ['© 2027 Simolat Football Academy. All rights reserved. Delivered as a single, self-contained HTML5 master portal.', '© 2027 Simolat Football Academy. Tous droits réservés. Portail officiel HTML5 complet.', '© 2027 Simolat Football Academy. Todos los derechos reservados. Portal oficial HTML5.', '© 2027 Simolat Football Academy. Todos os direitos reservados. Portal oficial HTML5.', '© 2027 أكاديمية سيمولات لكرة القدم. جميع الحقوق محفوظة.', '© 2027 Simolat Football Academy. Gbogbo ẹ̀tọ́ wà ní ìpamọ́.', '© 2027 Simolat Football Academy. Ikike niile echekwabara.', '© 2027 Simolat Football Academy. Dukkan haƙƙoƙi suna nan a ajiye.']
  ];

  const DICT = { fr: {}, es: {}, pt: {}, ar: {}, yo: {}, ig: {}, ha: {} };
  const LANG_INDEX = { fr: 1, es: 2, pt: 3, ar: 4, yo: 5, ig: 6, ha: 7 };
  ROWS.forEach((row) => {
    const enKey = row[0];
    Object.keys(LANG_INDEX).forEach((lc) => {
      if (row[LANG_INDEX[lc]]) DICT[lc][enKey] = row[LANG_INDEX[lc]];
    });
  });

  const SUB_PHRASES = {
    fr: [
      ['Date & Kickoff:', 'Date & Coup d\'envoi :'], ['Venue:', 'Stade :'], ['Squad:', 'Équipe :'],
      ['First Team / U-19', 'Équipe Première / U-19'], ['U-17 Youth Development', 'Développement Jeunes U-17'],
      ['U-19 & U-17 Combined', 'Combiné U-19 & U-17'], ['Stock Countdown:', 'Stock restant :'],
      ['units left', 'unités restantes'], ['In Stock:', 'En stock :'], ['Only 4 Left!', 'Plus que 4 !'],
      ['Out of Stock (0)', 'Rupture de stock (0)'], ['Sold Out (0 units left)', 'Épuisé (0 unité restante)'],
      ['Official portrait of', 'Portrait officiel de'], ['Show ', 'Afficher '], ['yrs', 'ans'], ['Jersey #', 'Maillot #'],
      ['Matchday ', 'Journée '], ['Quarter-Final', 'Quart de finale'], ['Showcase Match', 'Match Vitrine']
    ],
    es: [
      ['Date & Kickoff:', 'Fecha y Hora:'], ['Venue:', 'Estadio:'], ['Squad:', 'Equipo:'],
      ['First Team / U-19', 'Primer Equipo / Sub-19'], ['U-17 Youth Development', 'Desarrollo Juvenil Sub-17'],
      ['U-19 & U-17 Combined', 'Combinado Sub-19 y Sub-17'], ['Stock Countdown:', 'Stock restante:'],
      ['units left', 'unidades restantes'], ['In Stock:', 'En stock:'], ['Only 4 Left!', '¡Solo quedan 4!'],
      ['Out of Stock (0)', 'Agotado (0)'], ['Sold Out (0 units left)', 'Agotado (0 unidades)'],
      ['Official portrait of', 'Retrato oficial de'], ['Show ', 'Mostrar a '], ['yrs', 'años'], ['Jersey #', 'Dorsal #'],
      ['Matchday ', 'Jornada '], ['Quarter-Final', 'Cuartos de Final'], ['Showcase Match', 'Partido de Exhibición']
    ],
    pt: [
      ['Date & Kickoff:', 'Data e Horário:'], ['Venue:', 'Estádio:'], ['Squad:', 'Elenco:'],
      ['First Team / U-19', 'Equipe Principal / Sub-19'], ['U-17 Youth Development', 'Desenvolvimento Base Sub-17'],
      ['U-19 & U-17 Combined', 'Combinado Sub-19 e Sub-17'], ['Stock Countdown:', 'Estoque restante:'],
      ['units left', 'unidades restantes'], ['In Stock:', 'Em estoque:'], ['Only 4 Left!', 'Restam apenas 4!'],
      ['Out of Stock (0)', 'Sem estoque (0)'], ['Sold Out (0 units left)', 'Esgotado (0 unidades)'],
      ['Official portrait of', 'Retrato oficial de'], ['Show ', 'Mostrar '], ['yrs', 'anos'], ['Jersey #', 'Camisa #'],
      ['Matchday ', 'Rodada '], ['Quarter-Final', 'Quartas de Final'], ['Showcase Match', 'Jogo Vitrine']
    ],
    ar: [
      ['Date & Kickoff:', 'التاريخ والانطلاق:'], ['Venue:', 'الملعب:'], ['Squad:', 'الفريق:'],
      ['First Team / U-19', 'الفريق الأول / تحت 19'], ['U-17 Youth Development', 'تطوير الشباب تحت 17'],
      ['U-19 & U-17 Combined', 'منتخب تحت 19 و 17'], ['Stock Countdown:', 'المخزون المتبقي:'],
      ['units left', 'قطعة متبقية'], ['In Stock:', 'متوفر:'], ['Only 4 Left!', 'تبقى 4 فقط!'],
      ['Out of Stock (0)', 'نفذت الكمية (0)'], ['Sold Out (0 units left)', 'نفذ المخزون (0 متبقي)'],
      ['Official portrait of', 'الصورة الرسمية لـ'], ['Show ', 'عرض '], ['yrs', 'سنة'], ['Jersey #', 'القميص #'],
      ['Matchday ', 'الجولة '], ['Quarter-Final', 'ربع النهائي'], ['Showcase Match', 'مباراة استعراضية']
    ],
    yo: [
      ['Date & Kickoff:', 'Ọjọ́ & Àkókò:'], ['Venue:', 'Pápá Ìdíje:'], ['Squad:', 'Ẹgbẹ́:'],
      ['First Team / U-19', 'Ẹgbẹ́ Àkọ́kọ́ / U-19'], ['U-17 Youth Development', 'Ìdàgbàsókè U-17'],
      ['Stock Countdown:', 'Iye Tó Kù:'], ['units left', 'ló kù'], ['In Stock:', 'Wà Lọ́jà:'],
      ['Only 4 Left!', 'Mẹ́rin Péré Ló Kù!'], ['Out of Stock (0)', 'Ti Tán Lọ́jà (0)'],
      ['Show ', 'Fi hàn '], ['yrs', 'ọdún'], ['Jersey #', 'Aṣọ #'], ['Matchday ', 'Ọjọ́ Ìdíje ']
    ],
    ig: [
      ['Date & Kickoff:', 'Ụbọchị & Oge:'], ['Venue:', 'Ámá Egwuregwu:'], ['Squad:', 'Otu:'],
      ['First Team / U-19', 'Ndị Otu Mbụ / U-19'], ['U-17 Youth Development', 'Mmepe U-17'],
      ['Stock Countdown:', 'Ngwaahịa Fọdụrụ:'], ['units left', 'fọdụrụ'], ['In Stock:', 'Dị na Ngwaahịa:'],
      ['Only 4 Left!', 'Naanị 4 Fọdụrụ!'], ['Out of Stock (0)', 'Agwụla (0)'],
      ['Show ', 'Gosi '], ['yrs', 'afọ'], ['Jersey #', 'Uwe #'], ['Matchday ', 'Ụbọchị Egwuregwu ']
    ],
    ha: [
      ['Date & Kickoff:', 'Rana & Lokaci:'], ['Venue:', 'Filin Wasa:'], ['Squad:', 'Ƙungiya:'],
      ['First Team / U-19', 'Ƙungiyar Farko / U-19'], ['U-17 Youth Development', 'Haɓaka U-17'],
      ['Stock Countdown:', 'Kayan da Suka Rage:'], ['units left', 'sun rage'], ['In Stock:', 'Akwai a Kanti:'],
      ['Only 4 Left!', '4 Kawai Ya Rage!'], ['Out of Stock (0)', 'Ya Ƙare (0)'],
      ['Show ', 'Nuna '], ['yrs', 'shekaru'], ['Jersey #', 'Riga #'], ['Matchday ', 'Ranar Wasa ta ']
    ]
  };

  const origTextMap = new WeakMap();
  const origAttrMap = new WeakMap();
  const origHtmlMap = new WeakMap();

  let currentLang = 'en';
  let isApplying = false;
  let observer = null;
  let mutationTimer = null;

  const LEADING_ICON_RE = /^([\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}★⚠️🔵⚪🏆⚡🛡️📊📜✍️📋📦🏠📸🛍✉️🔥⛔📏🟢🦁🔄▶⏸✅🔗•]+\s*)/u;

  function normalizeKey(str) {
    return String(str || '').replace(/\s+/g, ' ').trim();
  }

  function translateText(rawEnglish, lang) {
    if (!rawEnglish || lang === 'en') return rawEnglish;
    const dict = DICT[lang];
    if (!dict) return rawEnglish;

    const leadSpace = (rawEnglish.match(/^\s*/) || [''])[0];
    const trailSpace = (rawEnglish.match(/\s*$/) || [''])[0];
    const norm = normalizeKey(rawEnglish);
    if (!norm || !/[A-Za-z]/.test(norm)) return rawEnglish;

    if (dict[norm]) {
      return leadSpace + dict[norm] + trailSpace;
    }

    const iconMatch = norm.match(LEADING_ICON_RE);
    if (iconMatch) {
      const iconPrefix = iconMatch[1];
      const remainder = norm.slice(iconPrefix.length).trim();
      if (dict[remainder]) {
        return leadSpace + iconPrefix + dict[remainder] + trailSpace;
      }
    }

    let out = norm;
    const phrases = SUB_PHRASES[lang] || [];
    for (let i = 0; i < phrases.length; i++) {
      const [src, dst] = phrases[i];
      if (out.includes(src)) {
        out = out.split(src).join(dst);
      }
    }
    return leadSpace + out + trailSpace;
  }

  function snapshotAndTranslateRoot(rootEl, lang) {
    if (!rootEl) return;

    const htmlNodes = rootEl.querySelectorAll ? rootEl.querySelectorAll('[data-i18n-html]') : [];
    htmlNodes.forEach((el) => {
      if (!origHtmlMap.has(el)) {
        origHtmlMap.set(el, el.innerHTML);
      }
      const key = el.getAttribute('data-i18n-html');
      if (lang === 'en') {
        el.innerHTML = origHtmlMap.get(el);
      } else if (HTML_DICT[key] && HTML_DICT[key][lang]) {
        el.innerHTML = HTML_DICT[key][lang];
      }
    });

    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'TEXTAREA') {
          return NodeFilter.FILTER_REJECT;
        }
        if (tag === 'OPTION' && parent.closest && parent.closest('#navLangSelect')) {
          return NodeFilter.FILTER_REJECT;
        }
        if (parent.closest && (parent.closest('[data-i18n-html]') || parent.closest('#mobileNavLangSection') || parent.closest('svg'))) {
          return NodeFilter.FILTER_REJECT;
        }
        if (!normalizeKey(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    for (let i = 0; i < textNodes.length; i++) {
      const tn = textNodes[i];
      if (!origTextMap.has(tn)) {
        origTextMap.set(tn, tn.nodeValue);
      }
      const orig = origTextMap.get(tn);
      const nextVal = lang === 'en' ? orig : translateText(orig, lang);
      if (tn.nodeValue !== nextVal) {
        tn.nodeValue = nextVal;
      }
    }

    if (rootEl.querySelectorAll) {
      const attrEls = rootEl.querySelectorAll('[placeholder], [aria-label], [title]');
      attrEls.forEach((el) => {
        if (el.id === 'navLangSelect' || el.closest('#mobileNavLangSection')) return;
        let saved = origAttrMap.get(el);
        if (!saved) {
          saved = {};
          if (el.hasAttribute('placeholder')) saved.placeholder = el.getAttribute('placeholder');
          if (el.hasAttribute('aria-label')) saved['aria-label'] = el.getAttribute('aria-label');
          if (el.hasAttribute('title')) saved.title = el.getAttribute('title');
          origAttrMap.set(el, saved);
        }
        Object.keys(saved).forEach((attr) => {
          const origA = saved[attr];
          const nextA = lang === 'en' ? origA : translateText(origA, lang);
          if (el.getAttribute(attr) !== nextA) {
            el.setAttribute(attr, nextA);
          }
        });
      });
    }
  }

  function syncNavUI(lang) {
    const sel = document.getElementById('navLangSelect');
    if (sel && sel.value !== lang) sel.value = lang;

    document.querySelectorAll('#mobileNavLangSection .mobile-nav-lang-link').forEach((link) => {
      const isMatch = link.getAttribute('data-lang') === lang;
      link.classList.toggle('active', isMatch);
      link.setAttribute('aria-current', isMatch ? 'true' : 'false');
    });

    const meta = LANG_META[lang] || LANG_META.en;
    document.documentElement.lang = lang;
    document.documentElement.dir = meta.dir;
  }

  function applyLanguage(lang, opts) {
    const resolved = SUPPORTED_LANGS.includes(lang) ? lang : 'en';
    const options = opts || {};
    currentLang = resolved;
    window.currentSimolatLang = resolved;

    isApplying = true;
    try {
      syncNavUI(resolved);

      if (typeof window.renderLsdflTable === 'function') {
        window.renderLsdflTable(false);
      }
      if (typeof window.renderLsdflDirectory === 'function') {
        window.renderLsdflDirectory();
      }

      snapshotAndTranslateRoot(document.body, resolved);

      try {
        localStorage.setItem('simolat_lang', resolved);
      } catch (_) {}

      if (!options.skipUrl && window.history && typeof window.history.replaceState === 'function') {
        try {
          const nextUrl = new URL(window.location.href);
          if (resolved === 'en') nextUrl.searchParams.delete('lang');
          else nextUrl.searchParams.set('lang', resolved);
          window.history.replaceState(null, '', nextUrl.toString());
        } catch (_) {}
      }

      if (!options.silent && typeof window.showClubToast === 'function') {
        window.showClubToast((LANG_META[resolved] || LANG_META.en).toast);
      }
    } finally {
      isApplying = false;
    }
  }

  function setupDynamicObserver() {
    if (observer || typeof MutationObserver === 'undefined' || !document.body) return;
    observer = new MutationObserver(() => {
      if (isApplying || currentLang === 'en') return;
      clearTimeout(mutationTimer);
      mutationTimer = setTimeout(() => {
        if (isApplying || currentLang === 'en') return;
        isApplying = true;
        try {
          snapshotAndTranslateRoot(document.body, currentLang);
        } finally {
          isApplying = false;
        }
      }, 45);
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  function initSimolatI18n() {
    let initialLang = 'en';
    try {
      const urlLang = new URLSearchParams(window.location.search).get('lang');
      const storedLang = localStorage.getItem('simolat_lang');
      if (urlLang && SUPPORTED_LANGS.includes(urlLang)) initialLang = urlLang;
      else if (storedLang && SUPPORTED_LANGS.includes(storedLang)) initialLang = storedLang;
    } catch (_) {}

    snapshotAndTranslateRoot(document.body, 'en');
    setupDynamicObserver();

    if (initialLang !== 'en') {
      applyLanguage(initialLang, { silent: true, skipUrl: true });
    } else {
      syncNavUI('en');
    }
  }

  window.setSimolatLanguage = function (lang) {
    applyLanguage(lang, { silent: false, skipUrl: false });
  };

  window.initSimolatI18n = initSimolatI18n;

  window.translateLsdflString = function (str) {
    return translateText(str, currentLang);
  };

  window.SIMOLAT_I18N = {
    getLanguage: () => currentLang,
    setLanguage: (lang) => window.setSimolatLanguage(lang),
    supported: SUPPORTED_LANGS.slice(),
    dict: DICT
  };
})();
