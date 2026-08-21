export const translations = {
  en: {
    'nav.product': 'Product',
    'nav.install': 'Install',

    'hero.title1': 'Threat intel,',
    'hero.title2': 'in your browser.',
    'hero.subtitle':
      'Free and open source. Select any indicator on any page and get a verdict from every source you already trust without breaking your flow.',
    'hero.install': 'Install',
    'hero.github': 'View source',

    'providers.title': 'Queries the sources your SOC already runs on',

    'product.title': 'Select, analyze, decide.',
    'product.tabs.detect': 'Detect',
    'product.tabs.analyze': 'Analyze',
    'product.tabs.ai': 'AI',
    'product.tabs.privacy': 'Privacy',
    'product.detect.desc':
      'Select text anywhere on the page, right-click, and Ahtapot recognizes which of eleven indicator types it is.',
    'product.analyze.desc':
      'Every provider that supports that indicator answers at once, with results grouped in tabs in the side panel.',
    'product.ai.desc':
      'Three depths turn provider output into a decision: Summary for triage, Analysis for escalation, Detailed for investigation. MITRE ATT&CK mapping and detection rule suggestions come with the deeper two, powered by Claude, Gemini or GPT.',
    'product.ai.ruleLabel': 'Detection rule suggestion',
    'product.privacy.desc':
      "Your API keys live in the browser's encrypted storage. There is no Ahtapot server; requests go straight from your browser to the providers you enabled.",

    'social.title': 'From the Chrome Web Store',
    'social.openSource': 'MIT licensed',

    'faq.title': 'Frequently asked questions',

    'cta.title': 'Add it to your browser.',
    'cta.install': 'Install',

    'footer.privacy': 'Privacy',
    'footer.license': 'License',
    'footer.madeWith': 'Built for the security community',
  },
  tr: {
    'nav.product': 'Ürün',
    'nav.install': 'Yükle',

    'hero.title1': 'Tehdit istihbaratı,',
    'hero.title2': 'tarayıcının içinde.',
    'hero.subtitle':
      'Ücretsiz ve açık kaynak. Herhangi bir sayfadaki göstergeyi seç, akışını bölmeden güvendiğin tüm kaynaklardan tek seferde sonuç al.',
    'hero.install': 'Yükle',
    'hero.github': 'Kaynağı gör',

    'providers.title': "SOC'unun zaten kullandığı kaynakları sorgular",

    'product.title': 'Seç, analiz et, karar ver.',
    'product.tabs.detect': 'Algıla',
    'product.tabs.analyze': 'Analiz',
    'product.tabs.ai': 'AI',
    'product.tabs.privacy': 'Gizlilik',
    'product.detect.desc':
      'Sayfadaki herhangi bir metni seç, sağ tıkla; Ahtapot on bir gösterge türünden hangisi olduğunu tanır.',
    'product.analyze.desc':
      'Göstergeyi destekleyen tüm sağlayıcılar aynı anda yanıt verir; sonuçlar yan paneldeki sekmelerde gruplanır.',
    'product.ai.desc':
      'Üç derinlik, sağlayıcı çıktısını karara dönüştürür: triyaj için Summary, yükseltme için Analysis, soruşturma için Detailed. Daha derin ikisinde MITRE ATT&CK eşlemesi ve tehdit avı için kural önerileri gelir; Claude, Gemini veya GPT ile çalışır.',
    'product.ai.ruleLabel': 'Önerilen tespit kuralı',
    'product.privacy.desc':
      "API anahtarların tarayıcının şifreli deposunda tutulur. Ahtapot sunucusu yoktur; istekler tarayıcından doğrudan etkinleştirdiğin sağlayıcılara gider.",

    'social.title': "Chrome Web Store'dan",
    'social.openSource': 'MIT lisanslı',

    'faq.title': 'Sıkça sorulan sorular',

    'cta.title': 'Tarayıcına ekle.',
    'cta.install': 'Yükle',

    'footer.privacy': 'Gizlilik',
    'footer.license': 'Lisans',
    'footer.madeWith': 'Güvenlik topluluğu için geliştirildi',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
