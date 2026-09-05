/**
 * Ambar Specialty Roasters (محمصة عنبر للقهوة المختصة)
 * The 16 Dialects™ (لهجات الذائقة الستة عشر™)
 * 
 * A cultural-sensory archetype engine blending MBTI-style 4-letter cognitive axes
 * with Enneagram motivational depth and Levantine roastery heritage.
 * 
 * SENSORY AXES:
 * 1. Philosophy: [T] Terroir vs [A] Alchemy
 * 2. Frequency:  [L] Luminous vs [D] Depth
 * 3. Texture:    [N] Naked vs [S] Silk
 * 4. Rhythm:     [R] Ritual vs [V] Velocity
 * 
 * Plus Archetype 17: [POLY] The Dialect Polyglot (for fluid, unconstrained, or all-weather palates).
 */

export const HOUSES = {
  terroir: {
    id: 'terroir',
    name: 'House of Terroir',
    nameAr: 'حماة الأرض والمصدر',
    description: 'Unmasked single-origin clarity, high-altitude washing, and botanical purity.',
    descriptionAr: 'النقاء المطلق للمصدر الواحد، معالجات الغسيل في المرتفعات، والوضوح البوتانيكي.',
    color: '#38bdf8', // crystal blue
    symbol: '🏛️'
  },
  alchemy: {
    id: 'alchemy',
    name: 'House of Alchemy',
    nameAr: 'كيميائيو الحداثة والتراث',
    description: 'Artisanal culinary innovation, micro-distilled botanicals, effervescence, and open flame.',
    descriptionAr: 'الابتكار الكيميائي الحرفي، مستخلصات الزهور المقطرة، الفوران الطبيعي، ونار الركوة.',
    color: '#f97316', // bright amber-orange
    symbol: '🌿'
  },
  velvet: {
    id: 'velvet',
    name: 'House of Velvet',
    nameAr: 'عشاق المخمل والحرير',
    description: 'Single-origin precision cradled in dense, textured oat and dairy microfoam.',
    descriptionAr: 'دقة المصدر الواحد محمولة على سحاب المايكروفوم الحريري ورغوة الشوفان الكثيفة.',
    color: '#eab308', // pure warm gold
    symbol: '☁️'
  },
  epicure: {
    id: 'epicure',
    name: 'House of Epicure',
    nameAr: 'صفوة التواقيع الشرقية',
    description: 'Levantine luxury, warm hospitality, stone-ground pistachios, and golden honey comfort.',
    descriptionAr: 'الفخامة الشامية، دفء الضيافة الأصيلة، الفستق الحلبي المطحون حجرياً، وعسل الهيل.',
    color: '#ec4899', // rose damascene
    symbol: '✨'
  },
  guild: {
    id: 'guild',
    name: 'Master Roastery Guild',
    nameAr: 'ديوان فصحاء القهوة الشامل',
    description: 'Transcendent sensory fluidity. Omnivorous mastery of every craft style and mood.',
    descriptionAr: 'مرونة الذائقة المطلقة، عابر للحدود والمذاقات، يستمتع بكل فنجان بلا قيود.',
    color: '#a855f7', // royal purple
    symbol: '🌟'
  }
}

export const DIALECT_REGISTRY = {
  // =========================================================================
  // 🏛️ HOUSE OF TERROIR [T-*-N-*]
  // =========================================================================
  'TLNR': {
    code: 'TLNR',
    house: 'terroir',
    title: 'The High-Altitude Sage',
    titleAr: 'حكيم التضاريس العالية',
    tagline: 'Monastic reverence for pristine volcanic terroir and tea-like floral clarity.',
    taglineAr: 'تقديس نسكي لحبوب البن البركانية ونقاء الأزهار الشفافة الشبيهة بالشاي الأخضر.',
    coreDesire: 'Unadulterated single-origin clarity and razor-sharp malic brightness.',
    coreDesireAr: 'نقاء أزهار المصدر الواحد وحمضية التفاح الأخضر دون أي إضافات.',
    shadowStressState: 'Retreats into sullen silence when served scorched, dark, or artificially flavored robusta.',
    shadowStressStateAr: 'ينسحب بصمت تام عند تقديم قهوة محروقة أو نكهات اصطناعية مشوشة.',
    soulmateDrinkId: 'panama-geisha-pourover',
    soulmateDrinkName: 'Panama Boquete Geisha Pour-Over',
    growthDrinkId: 'damascus-rose-cortado',
    growthDrinkName: 'Damascus Rose Cortado',
    growthReason: 'Expands the palate by embracing subtle botanical alchemy and microfoam texture.',
    nemesisDrink: '20 oz Commercial Caramel Frappe with whipped cream',
    nemesisRoast: 'A sugary, artificial commercial frappe would make you file a formal sensory grievance.',
    bestMatchCode: 'TLSR',
    bestMatchTitle: 'The Geisha Cloud Dreamer',
    radar: { terroir: 98, depth: 25, silk: 10, velocity: 20 },
    watermark: '[ ⟡ THE 16 DIALECTS™ • NO. 16-TLNR ⟡ ]'
  },
  'TLNV': {
    code: 'TLNV',
    house: 'terroir',
    title: 'The Cold-Drip Philosopher',
    titleAr: 'فيلسوف التقطير البارد',
    tagline: 'Treats extraction time as the supreme ingredient, savored over crystalline ice.',
    taglineAr: 'يرى في وقت التقطير البطيء العنصر الأهم، مستمتعاً بالنقاء فوق مكعب ثلج نقي.',
    coreDesire: 'Crisp, unmuddied fruit notes extracted drop-by-drop over 24 patient hours.',
    coreDesireAr: 'استخلاص فاكهي نقي قطرة بقطرة على مدار ٢٤ ساعة من الصبر.',
    shadowStressState: 'Experiences severe agitation when offered scalding, stale airport filter brew.',
    shadowStressStateAr: 'يشعر بالانزعاج الشديد عند تقديم قهوة فلتر مغلية وراكدة.',
    soulmateDrinkId: 'kyoto-slow-drip',
    soulmateDrinkName: '24-Hour Kyoto Slow-Drip Cold Brew',
    growthDrinkId: 'cascara-sparkling-tonic',
    growthDrinkName: 'Cascara Sparkling Blood Orange Tonic',
    growthReason: 'Discovers effervescent botanical carbonation as an exciting evolution of cold drip.',
    nemesisDrink: 'Boiling hot, bitter, over-extracted dark filter coffee',
    nemesisRoast: 'Lukewarm, burnt batch brew violates your core sensory philosophy.',
    bestMatchCode: 'ADNV',
    bestMatchTitle: 'The Shakerato Pioneer',
    radar: { terroir: 90, depth: 35, silk: 10, velocity: 85 },
    watermark: '[ ⟡ THE 16 DIALECTS™ • NO. 16-TLNV ⟡ ]'
  },
  'TDNR': {
    code: 'TDNR',
    house: 'terroir',
    title: 'The Obsidian Monk',
    titleAr: 'الراهب الأوبسيدياني',
    tagline: 'Stoic, meditative worship of the espresso machine portafilter and roasted cacao crema.',
    taglineAr: 'عشق تأملي صارم لجرعة الإسبريسو الصافية والكريما الذهبية وكاكاو المصدر.',
    coreDesire: 'Dense single-origin extraction intensity, heavy body, zero dairy or syrup distraction.',
    coreDesireAr: 'كثافة استخلاص مركزة للمصدر، قوام مخملي ثقيل، وبلا أي تشويش بالحليب أو السكر.',
    shadowStressState: 'Annoyed by complex, sugary drink menus; demands a demitasse cup immediately.',
    shadowStressStateAr: 'ينفد صبره من قوائم المشروبات المعقدة؛ يطلب فنجان الإسبريسو فوراً.',
    soulmateDrinkId: 'sidama-double-espresso',
    soulmateDrinkName: 'Sidama Double Ristretto Espresso',
    growthDrinkId: 'traditional-rakwa',
    growthDrinkName: 'Traditional Copper Rakwa',
    growthReason: 'Bridges modern espresso ristretto with ancient copper cezve immersion boiling.',
    nemesisDrink: 'Watery, lukewarm decaf Americano in a giant paper cup',
    nemesisRoast: 'A diluted, lukewarm decaf cup would fundamentally ruin your morning.',
    bestMatchCode: 'TDSR',
    bestMatchTitle: 'The Cortado Architect',
    radar: { terroir: 92, depth: 95, silk: 15, velocity: 25 },
    watermark: '[ ⟡ THE 16 DIALECTS™ • NO. 16-TDNR ⟡ ]'
  },
  'TDNV': {
    code: 'TDNV',
    house: 'terroir',
    title: 'The Kinetic Nomad',
    titleAr: 'الرحّال الديناميكي',
    tagline: 'High-velocity executive energy driven by bold black coffee poured directly over ice.',
    taglineAr: 'طاقة حركية عالية يقودها إسبريسو صافٍ ومكثف يُسكب مباشرة فوق مياه مثلجة.',
    coreDesire: 'Rapid, razor-clean espresso fuel that sustains relentless focus without heavy dairy.',
    coreDesireAr: 'وقود إسبريسو سريع وحاد يمنح تركيزاً فائقاً دون أي ثقل من مشتقات الحليب.',
    shadowStressState: 'Waits more than 90 seconds for an order and begins pacing restlessly.',
    shadowStressStateAr: 'ينتظر أكثر من دقيقة ونصف في الطابور فيبدأ بالحركة بعدم ارتياح.',
    soulmateDrinkId: 'single-origin-americano',
    soulmateDrinkName: 'Artisanal Flash-Iced Long Black',
    growthDrinkId: 'orange-blossom-shakerato',
    growthDrinkName: 'Beirut Orange Blossom Shakerato',
    growthReason: 'Learns how cocktail aeration elevates black espresso into a frothy cold experience.',
    nemesisDrink: 'Heavy condensed milk frappe that induces an afternoon food coma',
    nemesisRoast: 'A slow, sugary, milky drink would put your kinetic schedule to an immediate halt.',
    bestMatchCode: 'TDSV',
    bestMatchTitle: 'The Iced Velvet Virtuoso',
    radar: { terroir: 85, depth: 88, silk: 10, velocity: 95 },
    watermark: '[ ⟡ THE 16 DIALECTS™ • NO. 16-TDNV ⟡ ]'
  },

  // =========================================================================
  // 🌿 HOUSE OF ALCHEMY [A-*-N-*]
  // =========================================================================
  'ALNR': {
    code: 'ALNR',
    house: 'alchemy',
    title: 'The Botanical Mystic',
    titleAr: 'العطّار الصوفي',
    tagline: 'Views the roastery as an ancient apothecary, blending origin beans with wild flora.',
    taglineAr: 'يرى في المحمصة صيدلية شرقية قديمة، تمزج حبوب المصدر بالأعشاب والزهور البرية.',
    coreDesire: 'Subtle herbal harmony—wildflower infusions, steeped cascara, and floral aromatics.',
    coreDesireAr: 'تناغم عشبي لطيف، منقوع كرز القهوة، ونفحات الزهور البرية العطرية.',
    shadowStressState: 'Feels sensory claustrophobia when trapped in a dark, burnt commercial cafe.',
    shadowStressStateAr: 'يشعر بالاختناق الحسي في المقاهي التجارية الداكنة ذات البن الرديء.',
    soulmateDrinkId: 'panama-geisha-pourover',
    soulmateDrinkName: 'Yemeni Al-Aqeeq Infused V60',
    growthDrinkId: 'damascus-rose-cortado',
    growthDrinkName: 'Damascus Rose Cortado',
    growthReason: 'Discovers that plant microfoam can enhance, rather than hide, delicate botanicals.',
    nemesisDrink: 'Burnt French roast with artificial chemical hazelnut syrup',
    nemesisRoast: 'Chemical syrups and burnt beans are an insult to your apothecary palate.',
    bestMatchCode: 'ALSR',
    bestMatchTitle: 'The Damascus Courtyard Dreamer',
    radar: { terroir: 70, depth: 30, silk: 20, velocity: 30 },
    watermark: '[ ⟡ THE 16 DIALECTS™ • NO. 16-ALNR ⟡ ]'
  },
  'ALNV': {
    code: 'ALNV',
    house: 'alchemy',
    title: 'The Effervescent Rebel',
    titleAr: 'المتمرّد الفوّار',
    tagline: 'Avant-garde boundary pusher celebrating natural fizz, coffee cherries, and cold botanicals.',
    taglineAr: 'رائد يكسر القواعد؛ يحتفي بالفوران الطبيعي وقشور كرز القهوة والتونيك الصقلي البارد.',
    coreDesire: 'Crisp carbonated fruit acids, sparkling refreshment, and modern roastery alchemy.',
    coreDesireAr: 'أحماض فوارة منعشة، تونيك البحر الأبيض المتوسط، ونفحات الكاسكارا غير المسبوقة.',
    shadowStressState: 'Suffers through boring, hot meetings while dreaming of sparkling citrus.',
    shadowStressStateAr: 'يضيق ذرعاً بالاجتماعات الطويلة الرتيبة وهو يحلم برشفة كاسكارا فوارة.',
    soulmateDrinkId: 'cascara-sparkling-tonic',
    soulmateDrinkName: 'Cascara Sparkling Blood Orange Tonic',
    growthDrinkId: 'orange-blossom-shakerato',
    growthDrinkName: 'Beirut Orange Blossom Shakerato',
    growthReason: 'Explores aerated double espresso crema paired with Lebanese orange blossom.',
    nemesisDrink: 'Lukewarm, thick, muddy Turkish cezve coffee without foam',
    nemesisRoast: 'A flat, muddy hot cup is your sensory antithesis.',
    bestMatchCode: 'TLNV',
    bestMatchTitle: 'The Cold-Drip Philosopher',
    radar: { terroir: 65, depth: 25, silk: 15, velocity: 98 },
    watermark: '[ ⟡ THE 16 DIALECTS™ • NO. 16-ALNV ⟡ ]'
  },
  'ADNR': {
    code: 'ADNR',
    house: 'alchemy',
    title: 'The Heritage Cezve Keeper',
    titleAr: 'حارس الركوة التراثي',
    tagline: 'Guardian of the sand flame, crushed green cardamom, and dense unbroken golden wajh.',
    taglineAr: 'حارس رمل الركوة الأصيل، وبذور الهيل الأخضر الطازج، ووجه القهوة الكثيف الذهبي.',
    coreDesire: 'Slow, ritual boiling in handcrafted copper; deep roasted Levantine cultural roots.',
    coreDesireAr: 'استخلاص بطيء في ركوة نحاسية عريقة؛ تجذر عميق في تقاليد القهوة المشرقية.',
    shadowStressState: 'Offended when served coffee in a flimsy paper cup without proper crema foam.',
    shadowStressStateAr: 'ينزعج بشدة عند تقديم القهوة في كوب ورقي رديء دون وجه الكريما الرغوي.',
    soulmateDrinkId: 'traditional-rakwa',
    soulmateDrinkName: 'Traditional Copper Rakwa (Cezve)',
    growthDrinkId: 'sidama-double-espresso',
    growthDrinkName: 'Sidama Double Ristretto Espresso',
    growthReason: 'Explores how modern single-origin 9-bar pressure parallels copper cezve density.',
    nemesisDrink: 'Thin, sour, paper-filtered light roast served in a plastic cup',
    nemesisRoast: 'A sour, watery, paper-tasting light roast disrespects your hospitality heritage.',
    bestMatchCode: 'ADSR',
    bestMatchTitle: 'The Cardamom Sovereign',
    radar: { terroir: 65, depth: 98, silk: 20, velocity: 15 },
    watermark: '[ ⟡ THE 16 DIALECTS™ • NO. 16-ADNR ⟡ ]'
  },
  'ADNV': {
    code: 'ADNV',
    house: 'alchemy',
    title: 'The Shakerato Pioneer',
    titleAr: 'رائد الشاكيراتو',
    tagline: 'Theatrical cosmopolitan showmanship; double espresso vigorously shaken with blossom mist.',
    taglineAr: 'حضور مدني مسرحي جذاب؛ إسبريسو مزدوج يُخفق بقوة مع الثلج وماء زهر الليمون.',
    coreDesire: 'Thick aerated cold crema head produced by rigorous mixologist ice shaking.',
    coreDesireAr: 'طبقة رغوة مخملية باردة وكثيفة تتولد من خفق احترافي مع قطع الثلج المكسر.',
    shadowStressState: 'Sluggish afternoons without dramatic sensory stimulation.',
    shadowStressStateAr: 'فترات خمول الظهيرة التي تخلو من الإثارة الحسية والحيوية المنعشة.',
    soulmateDrinkId: 'orange-blossom-shakerato',
    soulmateDrinkName: 'Beirut Orange Blossom Shakerato',
    growthDrinkId: 'single-origin-americano',
    growthDrinkName: 'Artisanal Flash-Iced Long Black',
    growthReason: 'Appreciates pure un-aerated bean body over crystal ice.',
    nemesisDrink: 'Lukewarm, flat, stale cappuccino with deflated foam',
    nemesisRoast: 'A lifeless, room-temperature drink with dead foam drains your energy.',
    bestMatchCode: 'ALSV',
    bestMatchTitle: 'The Rose Blossom Shaker',
    radar: { terroir: 65, depth: 85, silk: 25, velocity: 95 },
    watermark: '[ ⟡ THE 16 DIALECTS™ • NO. 16-ADNV ⟡ ]'
  },

  // =========================================================================
  // ☁️ HOUSE OF VELVET [T-*-S-*]
  // =========================================================================
  'TLSR': {
    code: 'TLSR',
    house: 'velvet',
    title: 'The Geisha Cloud Dreamer',
    titleAr: 'حالم سحاب الغيشا',
    tagline: 'Gentle, romantic soul seeking pristine high-altitude florals wrapped in silk microfoam.',
    taglineAr: 'روح رومانسية شاعرة تبحث عن أزهار البن الشاهقة معانقةً سحاب المايكروفوم الخفيف.',
    coreDesire: 'Delicate floral washed beans cushioned in sweet, perfectly steamed oat microfoam.',
    coreDesireAr: 'حبوب مغسولة رقيقة النكهات محمية برغوة حليب الشوفان الحريرية العذبة.',
    shadowStressState: 'Paralyzed between wanting pure pour-over clarity and warm comfort.',
    shadowStressStateAr: 'يتردد طويلاً بين الرغبة في نقاء التقطير الصافي وبين دفء الحليب الحريري.',
    soulmateDrinkId: 'classic-oat-flat-white',
    soulmateDrinkName: 'Light-Roast Geisha Oat Cortado',
    growthDrinkId: 'panama-geisha-pourover',
    growthDrinkName: 'Panama Boquete Geisha Pour-Over',
    growthReason: 'Takes the brave leap to experience delicate florals completely unclouded by milk.',
    nemesisDrink: 'Scorched, bitter, ash-heavy dark roast with burnt dairy',
    nemesisRoast: 'Boiled, scorched dairy that burns delicate origin notes is heartbreaking.',
    bestMatchCode: 'TLNR',
    bestMatchTitle: 'The High-Altitude Sage',
    radar: { terroir: 92, depth: 35, silk: 85, velocity: 30 },
    watermark: '[ ⟡ THE 16 DIALECTS™ • NO. 16-TLSR ⟡ ]'
  },
  'TLSV': {
    code: 'TLSV',
    house: 'velvet',
    title: 'The Sunlit Cloud',
    titleAr: 'السحاب المشمس',
    tagline: 'Radiant morning optimism; light roast berry and citrus notes folded through chilled oat milk.',
    taglineAr: 'تفاؤل صباحي مشرق؛ نفحات التوت والحمضيات الخفيفة تنساب بنعومة عبر حليب شوفان مثلج.',
    coreDesire: 'Crisp natural sweetness, cold refreshing silk, and gentle high-altitude energy.',
    coreDesireAr: 'حلاوة طبيعية صافية، نعومة باردة منعشة، وطاقة صباحية هادئة وخفيفة.',
    shadowStressState: 'Overcast, cold winter mornings; needs a visual and sensory burst of sunlight.',
    shadowStressStateAr: 'أيام الشتاء الرمادية الكئيبة؛ يحتاج فوراً لدفقة شمس باردة تسعد حواسه.',
    soulmateDrinkId: 'classic-oat-flat-white',
    soulmateDrinkName: 'Flash-Iced Sidama Oat Latte',
    growthDrinkId: 'cascara-sparkling-tonic',
    growthDrinkName: 'Cascara Sparkling Blood Orange Tonic',
    growthReason: 'Expands into pure botanical effervescence without milk texture.',
    nemesisDrink: 'Bitter, dark, room-temperature black drip coffee',
    nemesisRoast: 'A gloomy, bitter, black cup without any brightness or silk.',
    bestMatchCode: 'ALSV',
    bestMatchTitle: 'The Rose Blossom Shaker',
    radar: { terroir: 88, depth: 30, silk: 88, velocity: 88 },
    watermark: '[ ⟡ THE 16 DIALECTS™ • NO. 16-TLSV ⟡ ]'
  },
  'TDSR': {
    code: 'TDSR',
    house: 'velvet',
    title: 'The Cortado Architect',
    titleAr: 'مهندس الكورتادو',
    tagline: 'Geometric perfectionist obsessed with the exact 1:1 craft ratio and dense 62°C microfoam.',
    taglineAr: 'هندسي دقيق يعشق النسبة الحرفية المتساوية ١:١ ومايكروفوم محكم بدرجة حرارة ٦٢° مئوية.',
    coreDesire: 'Equilibrium: dense roasted espresso richness balanced by equal textured milk density.',
    coreDesireAr: 'التوازن الهندسي: كثافة إسبريسو غنية تعادلها تماماً كثافة حليب مخملي محكم.',
    shadowStressState: 'Visibly cringes when a barista overheats milk past 70°C or delivers loose foam.',
    shadowStressStateAr: 'يتألم بصرياً عندما يرفع الباريستا حرارة الحليب فوق ٧٠° أو يقدم رغوة صابونية رخوة.',
    soulmateDrinkId: 'classic-oat-flat-white',
    soulmateDrinkName: 'Classic Oat Flat White (62°C)',
    growthDrinkId: 'sidama-double-espresso',
    growthDrinkName: 'Sidama Double Ristretto Espresso',
    growthReason: 'Removes the milk training wheels to experience the raw espresso foundation.',
    nemesisDrink: '24 oz enormous milk bucket with weak single espresso shot',
    nemesisRoast: 'A giant, diluted bucket of warm milk is a structural and craft catastrophe.',
    bestMatchCode: 'TDNR',
    bestMatchTitle: 'The Obsidian Monk',
    radar: { terroir: 85, depth: 85, silk: 90, velocity: 25 },
    watermark: '[ ⟡ THE 16 DIALECTS™ • NO. 16-TDSR ⟡ ]'
  },
  'TDSV': {
    code: 'TDSV',
    house: 'velvet',
    title: 'The Iced Velvet Virtuoso',
    titleAr: 'عازف المخمل البارد',
    tagline: 'Modern luxury; rich double espresso cutting cleanly through cold, velvety oat microfoam.',
    taglineAr: 'فخامة عصرية؛ إسبريسو مزدوج غني يخترق بنقاء رغوة حليب الشوفان الباردة والمخملية.',
    coreDesire: 'Cold velvety mouthfeel, deep caramelized coffee backbone, and zero ice dilution.',
    coreDesireAr: 'قوام مخملي بارد يرتكز على عمق الكراميل المحمص مع انعدام ذوبان الثلج.',
    shadowStressState: 'Hot summer afternoons with watered-down iced drinks.',
    shadowStressStateAr: 'أوقات الصيف الحارة عند استلام مشروب بارد ذاب ثلجه فصار مائياً.',
    soulmateDrinkId: 'velvet-spanish-latte',
    soulmateDrinkName: 'Iced Velvet Spanish Latte (Subtle)',
    growthDrinkId: 'orange-blossom-shakerato',
    growthDrinkName: 'Beirut Orange Blossom Shakerato',
    growthReason: 'Swaps milk density for aerated citrus crema foam.',
    nemesisDrink: 'Warm, lukewarm, watery coffee with floating melted ice bits',
    nemesisRoast: 'Diluted, watery cold drinks offend your appreciation for silky body.',
    bestMatchCode: 'ADSV',
    bestMatchTitle: 'The Velvet Pistachio Maverick',
    radar: { terroir: 80, depth: 88, silk: 92, velocity: 90 },
    watermark: '[ ⟡ THE 16 DIALECTS™ • NO. 16-TDSV ⟡ ]'
  },

  // =========================================================================
  // ✨ HOUSE OF EPICURE [A-*-S-*]
  // =========================================================================
  'ALSR': {
    code: 'ALSR',
    house: 'epicure',
    title: 'The Damascus Courtyard Dreamer',
    titleAr: 'حالم الدار الشامية',
    tagline: 'Nostalgic poet evoking morning jasmine courtyards and rosewater breezes beside hot coffee.',
    taglineAr: 'شاعر حالم يستحضر بيوت دمشق القديمة، ونسيم ماء الورد الشامي بجانب فنجان الصباح.',
    coreDesire: 'Micro-distilled Damascene rosewater, crushed cardamom, and comforting silky microfoam.',
    coreDesireAr: 'ماء الورد الدمشقي المقطر، حب الهيل، وحرارة حليب مخملي يبث الطمأنينة في الصباح.',
    shadowStressState: 'Homesick, overstimulated, or drained; craves sensory cultural grounding.',
    shadowStressStateAr: 'يشعر بالحنين أو التشتت؛ يحتاج لمرسى حسي يربطه بجذوره ودفء أسرته.',
    soulmateDrinkId: 'damascus-rose-cortado',
    soulmateDrinkName: 'Damascus Rose Cortado (Steaming Hot)',
    growthDrinkId: 'traditional-rakwa',
    growthDrinkName: 'Traditional Copper Rakwa',
    growthReason: 'Explores the pure, unfiltered cezve ancestor of modern Levantine drinks.',
    nemesisDrink: 'Stale corporate machine coffee in a paper cup',
    nemesisRoast: 'Lifeless, industrial machine coffee with zero hospitality or soul.',
    bestMatchCode: 'ALNR',
    bestMatchTitle: 'The Botanical Mystic',
    radar: { terroir: 65, depth: 40, silk: 95, velocity: 25 },
    watermark: '[ ⟡ THE 16 DIALECTS™ • NO. 16-ALSR ⟡ ]'
  },
  'ALSV': {
    code: 'ALSV',
    house: 'epicure',
    title: 'The Rose Blossom Shaker',
    titleAr: 'خافق زهر الورد',
    tagline: 'Chic, trendsetting aesthetic soul sipping floral iced coffee like an artisanal craft cocktail.',
    taglineAr: 'ذائقة عصرية متألقة ترتشف القهوة الباردة كأيقونة جمالية مفعمة بماء الورد والثلج.',
    coreDesire: 'Iced floral elegance, delicate rose aroma, and smooth plant milk over cracked ice.',
    coreDesireAr: 'أناقة الورد المثلج، عطر شامي منعش، وانسيابية حليب نباتي بارد فوق الثلج المكسر.',
    shadowStressState: 'Frustrated when a drink tastes dark and bitter instead of fragrant and light.',
    shadowStressStateAr: 'ينزعج بشدة عندما يطغى الطعم المر القاسي على العطر الزهري المشرق.',
    soulmateDrinkId: 'damascus-rose-cortado',
    soulmateDrinkName: 'Iced Damascus Rose Cortado',
    growthDrinkId: 'orange-blossom-shakerato',
    growthDrinkName: 'Beirut Orange Blossom Shakerato',
    growthReason: 'Tastes citrus floral notes through pure cold foam without milk.',
    nemesisDrink: 'Boiling, mud-heavy, bitter dark roast',
    nemesisRoast: 'A muddy, bitter, scorched brew clashes with your light floral aesthetic.',
    bestMatchCode: 'TLSV',
    bestMatchTitle: 'The Sunlit Cloud',
    radar: { terroir: 65, depth: 35, silk: 92, velocity: 92 },
    watermark: '[ ⟡ THE 16 DIALECTS™ • NO. 16-ALSV ⟡ ]'
  },
  'ADSR': {
    code: 'ADSR',
    house: 'epicure',
    title: 'The Cardamom Sovereign',
    titleAr: 'سلطان الهيل والذهب',
    tagline: 'Radiates majestic warmth, authentic Levantine generosity, golden honey, and fragrant spice.',
    taglineAr: 'يشتعل بدفء الكرم المشرقي الأصيل، وعسل السدر الذهبي، وعطر الهيل الفاخر.',
    coreDesire: 'Opulent comfort: rich spiced honey, crushed green cardamom, and dense velvety warmth.',
    coreDesireAr: 'فخامة الراحة: عسل بري متبل، هيل أخضر طازج، ودفء مخملي غني يغمر الحواس.',
    shadowStressState: 'Feels rushed or unwelcome; treats coffee as a sacred gesture of dignity.',
    shadowStressStateAr: 'ينزعج من الاستعجال والجفاف؛ يرى في القهوة ميثاقاً من الكرامة والترحاب.',
    soulmateDrinkId: 'vanilla-cardamom-miel',
    soulmateDrinkName: 'Vanilla Cardamom Miel (Hot)',
    growthDrinkId: 'aleppo-pistachio-latte',
    growthDrinkName: 'Aleppo Pistachio Cream Latte',
    growthReason: 'Elevates spiced honey comfort into nutty stone-ground pistachio luxury.',
    nemesisDrink: 'Sour, ultra-acidic lemon pour-over black coffee',
    nemesisRoast: 'Sour, acidic, biting black coffee feels stingy and harsh to your palate.',
    bestMatchCode: 'ADNR',
    bestMatchTitle: 'The Heritage Cezve Keeper',
    radar: { terroir: 60, depth: 95, silk: 96, velocity: 20 },
    watermark: '[ ⟡ THE 16 DIALECTS™ • NO. 16-ADSR ⟡ ]'
  },
  'ADSV': {
    code: 'ADSV',
    house: 'epicure',
    title: 'The Velvet Pistachio Maverick',
    titleAr: 'مبتكر الفستق المخملي',
    tagline: 'Unapologetic epicurean seeking the absolute summit of iced roastery indulgence.',
    taglineAr: 'متذوق استثنائي يبحث عن قمة الرفاهية والفخامة في مشروبات القهوة الباردة.',
    coreDesire: 'Stone-ground raw Aleppo pistachio paste, bold double espresso, iced velvet microfoam.',
    coreDesireAr: 'فستق حلبي أخضر مطحون حجرياً، إسبريسو مزدوج غني، ورغوة حليب مثلجة وفائقة النعومة.',
    shadowStressState: 'Exhausting workday; demands an opulent, comforting liquid reward.',
    shadowStressStateAr: 'نهاية يوم عمل شاق؛ يطالب بمكافأة حسية فاخرة تُعيد له بهجته وطاقته.',
    soulmateDrinkId: 'aleppo-pistachio-latte',
    soulmateDrinkName: 'Aleppo Pistachio Cream Latte (Iced)',
    growthDrinkId: 'damascus-rose-cortado',
    growthDrinkName: 'Damascus Rose Cortado',
    growthReason: 'Refines nutty pistachio richness into delicate floral craft ratios.',
    nemesisDrink: 'Bone-dry, sugar-free black cold brew in a can',
    nemesisRoast: 'An austere, zero-sweetness canned black brew drains all joy from life.',
    bestMatchCode: 'TDSV',
    bestMatchTitle: 'The Iced Velvet Virtuoso',
    radar: { terroir: 60, depth: 92, silk: 98, velocity: 92 },
    watermark: '[ ⟡ THE 16 DIALECTS™ • NO. 16-ADSV ⟡ ]'
  },

  // =========================================================================
  // 🌟 MASTER ROASTERY GUILD [POLY]
  // =========================================================================
  'POLY': {
    code: 'POLY',
    house: 'guild',
    title: 'The Dialect Polyglot',
    titleAr: 'فصيح القهوة والمتذوق الشامل',
    tagline: 'Transcendent sensory wanderer who refuses to be confined to a single cup or tradition.',
    taglineAr: 'متذوق حر متجاوز للحدود، يرفض أن يُسجن في نمط واحد أو كوب محدد.',
    coreDesire: 'Total sensory fluidity: Geisha purist at dawn, iced pistachio alchemist at dusk.',
    coreDesireAr: 'مرونة الذائقة الشاملة: نقاء الغيشا فجراً، وفخامة الفستق المثلج عند المغيب.',
    shadowStressState: 'Boredom from ordering the exact same routine drink twice in a row.',
    shadowStressStateAr: 'الملل والضجر عند تكرار نفس المشروب مرتين على التوالي.',
    soulmateDrinkId: 'damascus-rose-cortado',
    soulmateDrinkName: 'The Entire Roastery Shelf (Mood Dependent)',
    growthDrinkId: 'cascara-sparkling-tonic',
    growthDrinkName: "Roaster's Roulette (حظّ الفنجان)",
    growthReason: 'Embraces the mystery of letting the master roaster curate their cup today.',
    nemesisDrink: 'Predictable, boring, mass-produced commercial coffee chains',
    nemesisRoast: 'Monotonous, standardized coffee is the only thing that suffocates your palate.',
    bestMatchCode: 'ALL',
    bestMatchTitle: 'Every Dialect in the Roastery',
    radar: { terroir: 85, depth: 85, silk: 85, velocity: 85 },
    watermark: '[ ⟡ THE 16 DIALECTS™ • MASTER GUILD POLYGLOT ⟡ ]'
  }
}

/**
 * Computes the guest's 16 Dialects profile code and rich archetype dossier.
 * Seamlessly resolves from userProfile preferences or detects Polyglot fluidity.
 * 
 * @param {Object} profile - User Taste Passport profile
 * @returns {Object} Full dialect resolution dossier with 4-letter code, house, and lore
 */
export function computeCoffeeDialect(profile = {}) {
  const affinities = Array.isArray(profile.tasteAffinities) ? profile.tasteAffinities : []
  const roast = profile.roastPreference || 'medium'
  const sweetness = profile.sweetnessPreference || 'subtle'
  const temp = profile.temperature || 'any'
  const palateScore = profile.palateScore ?? 5
  const isVegan = Boolean(profile.dietary?.includes('vegan'))
  const isLactoseFree = Boolean(profile.dietary?.includes('lactose_free'))
  const preferredMilk = profile.preferredMilk

  // ---------------------------------------------------------------------------
  // 1. POLYGLOT DETECTION (The 17th Archetype)
  // ---------------------------------------------------------------------------
  // If explicitly flagged, or if user chosen "All-Weather / Any" with neutral/diverse affinities
  const hasDiverseAffinities = affinities.length >= 3
  const isAllWeatherNeutral = (temp === 'any' || temp === 'all') && sweetness === 'balanced' && (affinities.length === 0 || hasDiverseAffinities)
  const isExplicitPolyglot = Boolean(profile.isPolyglot)

  if (isExplicitPolyglot || isAllWeatherNeutral) {
    const fluidityScore = Math.min(99, Math.max(82, 75 + affinities.length * 6 + (palateScore >= 5 ? 8 : 4)))
    return {
      code: 'POLY',
      dialect: DIALECT_REGISTRY['POLY'],
      house: HOUSES.guild,
      isPolyglot: true,
      fluidityScore
    }
  }

  // ---------------------------------------------------------------------------
  // 2. AXIS 1: PHILOSOPHY [T] Terroir vs [A] Alchemy
  // ---------------------------------------------------------------------------
  // Terroir: values pure single-origin clarity, unmasked bean, light/dark roasts, zero syrups
  // Alchemy: values Levant signature blends, spices (cardamom), botanical rose/blossom infusions, rich sweets
  let axis1 = 'T'
  if (affinities.includes('spiced') || sweetness === 'sweet' || (affinities.includes('silky') && sweetness !== 'unsweetened')) {
    axis1 = 'A'
  } else if (sweetness === 'unsweetened' || affinities.includes('floral') || affinities.includes('citrus') || affinities.includes('cacao')) {
    axis1 = 'T'
  } else {
    axis1 = affinities.includes('spiced') ? 'A' : 'T'
  }

  // ---------------------------------------------------------------------------
  // 3. AXIS 2: FREQUENCY [L] Luminous vs [D] Depth
  // ---------------------------------------------------------------------------
  // Luminous: light roast, high acidity, citrus, floral, sparkling, palateScore <= 4
  // Depth: dark/medium-dark roast, cacao, body, heavy crema, palateScore >= 6
  let axis2 = 'D'
  if (roast === 'light') {
    axis2 = 'L'
  } else if (roast === 'dark') {
    axis2 = 'D'
  } else {
    // Medium roast tie-break
    if (affinities.includes('citrus') || affinities.includes('floral') || palateScore <= 3) {
      axis2 = 'L'
    } else {
      axis2 = 'D'
    }
  }

  // ---------------------------------------------------------------------------
  // 4. AXIS 3: TEXTURE [N] Naked vs [S] Silk
  // ---------------------------------------------------------------------------
  // Naked: zero milk, crystal black extraction, demitasse, cezve
  // Silk: oat/dairy microfoam, textured lattes, flat whites, clouds
  let axis3 = 'N'
  if (preferredMilk || isVegan || isLactoseFree || affinities.includes('silky') || profile.usualDrink?.milk) {
    axis3 = 'S'
  } else if (profile.blackCoffeeOnly) {
    axis3 = 'N'
  } else {
    // If not specified, look at affinities and usual drink
    axis3 = affinities.includes('silky') ? 'S' : 'N'
  }

  // ---------------------------------------------------------------------------
  // 5. AXIS 4: RHYTHM [R] Ritual vs [V] Velocity
  // ---------------------------------------------------------------------------
  // Ritual: hot, ceremonial, slow pour-over, cezve in sand, ceramic cup
  // Velocity: flash-iced, shakerato, sparkling tonic, cold brew, fast-paced
  let axis4 = 'R'
  if (temp === 'iced') {
    axis4 = 'V'
  } else if (temp === 'hot') {
    axis4 = 'R'
  } else {
    // Any/neutral: check usual drink note or default to hot ritual
    const note = profile.usualDrink?.note?.toLowerCase() || ''
    axis4 = note.includes('iced') ? 'V' : 'R'
  }

  // ---------------------------------------------------------------------------
  // 6. ASSEMBLE 4-LETTER CODE & RETRIEVE REGISTRY
  // ---------------------------------------------------------------------------
  const code = `${axis1}${axis2}${axis3}${axis4}`
  const dialect = DIALECT_REGISTRY[code] || DIALECT_REGISTRY['TDSR']
  const house = HOUSES[dialect.house] || HOUSES.terroir

  return {
    code,
    dialect,
    house,
    isPolyglot: false,
    fluidityScore: 45
  }
}

/**
 * Calculates coffee compatibility between two 4-letter Dialects.
 * Used for social sharing, partner matches, and roastery coffee dates.
 * 
 * @param {string} codeA - First Dialect code (e.g. 'TLNR')
 * @param {string} codeB - Second Dialect code (e.g. 'TLSR')
 * @returns {Object} Compatibility percentage and relational storytelling microcopy
 */
export function calculateDialectCompatibility(codeA = 'TLNR', codeB = 'ADSV') {
  if (codeA === 'POLY' || codeB === 'POLY') {
    return {
      score: 96,
      verdict: 'Cosmic Sensory Harmony (تناغم ذوقي كوني)',
      dynamic: 'The Polyglot speaks every roastery language, making every coffee date an adventurous masterclass.'
    }
  }

  let matches = 0
  for (let i = 0; i < 4; i++) {
    if (codeA[i] === codeB[i]) matches++
  }

  if (matches === 4) {
    return {
      score: 99,
      verdict: 'Sensory Twin Souls (توأم الذائقة)',
      dynamic: 'You share the exact same sensory frequency. You can order for each other blindfolded with 100% confidence.'
    }
  }

  if (matches === 3) {
    return {
      score: 88,
      verdict: 'Harmonious Counterparts (تناغم متقارب)',
      dynamic: 'Close enough to share sips and appreciate each other\'s choices, with one distinct point of debate.'
    }
  }

  if (matches === 2) {
    return {
      score: 75,
      verdict: 'Fascinating Contrast (تكامل الأضداد)',
      dynamic: 'Opposites that attract: one brings crisp clarity, the other brings comforting richness. Perfect coffee table balance.'
    }
  }

  if (matches === 1) {
    return {
      score: 62,
      verdict: 'Sensory Exploration Partners (رحلة استكشاف)',
      dynamic: 'Your palates inhabit different worlds. Visiting Ambar together is a thrilling cross-cultural roastery journey.'
    }
  }

  return {
    score: 55,
    verdict: 'Total Palate Polar Opposites (قطبان متباعدان)',
    dynamic: 'One craves unmasked volcanic acid; the other craves iced pistachio velvet. Never sip from each other\'s cup without warning!'
  }
}
