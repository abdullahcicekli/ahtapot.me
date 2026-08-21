export const translations = {
  en: {
    'nav.product': 'Product',
    'nav.install': 'Install',

    'hero.eyebrow': 'Free and open source',
    'hero.title1': 'Threat intel,',
    'hero.title2': 'in your browser.',
    'hero.subtitle':
      'Select any indicator on any page and get a verdict from every source you already trust without breaking your flow.',
    'hero.install': 'Install',
    'hero.github': 'View source',

    'providers.title': 'Queries the sources your SOC already runs on',

    'showcase.title': 'Select, analyze, move on.',
    'showcase.select.title': 'Select anything',
    'showcase.select.desc':
      'IPv4, IPv6, domains, URLs, MD5, SHA1, SHA256, emails, CVEs, Bitcoin and Ethereum addresses are detected automatically. Highlight one, right-click, and every provider that supports it answers at once.',
    'showcase.ai.title': 'A verdict, not a data dump',
    'showcase.ai.desc':
      'Claude, Gemini and GPT turn raw provider output into a triage decision, with MITRE ATT&CK mapping and hunting queries ready to paste into your workflow.',
    'showcase.privacy.title': 'We never see your data',
    'showcase.privacy.desc':
      'No accounts, no servers, no telemetry. Requests go straight from your browser to the providers you configure, using your own keys that Ahtapot never sees.',

    'social.rating': 'on the Chrome Web Store',
    'social.ratings': 'ratings',
    'social.users': 'users',
    'social.openSource': 'MIT licensed',

    'cta.title': 'Add it to your browser.',
    'cta.install': 'Install',

    'footer.privacy': 'Privacy',
    'footer.license': 'License',
    'footer.madeWith': 'Built for the security community',
  },
  tr: {
    'nav.product': 'Ürün',
    'nav.install': 'Yükle',

    'hero.eyebrow': 'Ücretsiz ve açık kaynak',
    'hero.title1': 'Tehdit istihbaratı,',
    'hero.title2': 'tarayıcının içinde.',
    'hero.subtitle':
      'Herhangi bir sayfadaki göstergeyi seç, akışını bölmeden güvendiğin tüm kaynaklardan tek seferde sonuç al.',
    'hero.install': 'Yükle',
    'hero.github': 'Kaynağı gör',

    'providers.title': "SOC'unun zaten kullandığı kaynakları sorgular",

    'showcase.title': 'Seç, analiz et, devam et.',
    'showcase.select.title': 'Her şeyi seç',
    'showcase.select.desc':
      "IPv4, IPv6, domain, URL, MD5, SHA1, SHA256, e-posta, CVE, Bitcoin ve Ethereum adresleri otomatik tespit edilir. Birini işaretle, sağ tıkla, destekleyen tüm sağlayıcılar aynı anda cevap versin.",
    'showcase.ai.title': 'Veri yığını değil, karar',
    'showcase.ai.desc':
      'Claude, Gemini ve GPT ham sağlayıcı çıktısını triage kararına dönüştürür; MITRE ATT&CK eşlemesi ve hunting sorguları iş akışına yapıştırmaya hazır gelir.',
    'showcase.privacy.title': 'Verini asla görmeyiz',
    'showcase.privacy.desc':
      "Hesap yok, sunucu yok, telemetri yok. İstekler tarayıcından doğrudan senin yapılandırdığın sağlayıcılara, Ahtapot'un asla görmediği kendi anahtarlarınla gider.",

    'social.rating': 'Chrome Web Store puanı',
    'social.ratings': 'değerlendirme',
    'social.users': 'kullanıcı',
    'social.openSource': 'MIT lisanslı',

    'cta.title': 'Tarayıcına ekle.',
    'cta.install': 'Yükle',

    'footer.privacy': 'Gizlilik',
    'footer.license': 'Lisans',
    'footer.madeWith': 'Güvenlik topluluğu için geliştirildi',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
