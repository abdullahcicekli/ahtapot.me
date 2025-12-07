'use client';

import { useLanguage } from '@/lib/language-context';
import Link from 'next/link';
import { CHROME_STORE_URL, GITHUB_URL } from '@/data/constants';
import Script from 'next/script';

export default function PrivacyPage() {
  const { language } = useLanguage();

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: language === 'en' ? 'Privacy Policy - Ahtapot IOC Analyzer Extension' : 'Gizlilik Politikası - Ahtapot IOC Analizci Eklentisi',
    description: language === 'en'
      ? 'Privacy policy for Ahtapot Security Extension. Learn how we protect your privacy with our privacy-first architecture.'
      : 'Ahtapot Güvenlik Eklentisi gizlilik politikası. Gizlilik öncelikli mimarimizle gizliliğinizi nasıl koruduğumuzu öğrenin.',
    url: `https://ahtapot.me/${language}/privacy`,
    inLanguage: language,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Ahtapot - IOC Analyzer Extension',
      url: 'https://ahtapot.me',
    },
    about: {
      '@type': 'SoftwareApplication',
      name: 'Ahtapot - IOC Analyzer Extension',
    },
    dateModified: '2025-12-07',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: language === 'en' ? 'Home' : 'Ana Sayfa',
          item: `https://ahtapot.me/${language}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: language === 'en' ? 'Privacy Policy' : 'Gizlilik Politikası',
          item: `https://ahtapot.me/${language}/privacy`,
        },
      ],
    },
  };

  if (language === 'tr') {
    return (
      <>
        <Script
          id="privacy-schema-tr"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <PrivacyTR />
      </>
    );
  }

  return (
    <>
      <Script
        id="privacy-schema-en"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <PrivacyEN />
    </>
  );
}

function PrivacyEN() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy for Ahtapot Security Extension</h1>
        <p className="text-[var(--text-secondary)] mb-8"><strong>Last Updated:</strong> December 7, 2025 | <strong>Version:</strong> 3.0.0</p>

        <Link href="/tr/privacy" className="text-primary hover:underline mb-8 inline-block">
          Türkçe versiyonu için tıklayın
        </Link>

        <h2 className="text-2xl font-bold mt-10 mb-4">Overview</h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Ahtapot Security Extension is committed to protecting your privacy. This extension analyzes cybersecurity indicators (IOCs) using third-party security APIs to help security professionals assess potential threats.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          <strong>Install from Chrome Web Store:</strong>{' '}
          <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Chrome Web Store
          </a>
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Data Collection and Storage</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">What We Store Locally</h3>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          All data is stored <strong>exclusively on your local device</strong> using Chrome's secure storage API. We do not have any servers, and no data is transmitted to us.
        </p>

        <ol className="list-decimal list-inside space-y-4 text-[var(--text-secondary)]">
          <li>
            <strong>Security API Keys</strong>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Your API keys for 10 security services (VirusTotal, Shodan, AbuseIPDB, OTX, GreyNoise, etc.)</li>
              <li>Stored securely in Chrome's encrypted local storage</li>
              <li>Never transmitted to our servers (we don't have any)</li>
              <li>Only used to authenticate with respective security services</li>
            </ul>
          </li>
          <li>
            <strong>AI API Keys (Optional)</strong>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Your API keys for AI providers (Claude, Gemini, OpenAI) - if you choose to use AI analysis</li>
              <li>Stored in Chrome's encrypted local storage with timestamp</li>
              <li>Sent directly to the AI provider you select - never to us</li>
              <li>Can be removed at any time from settings</li>
            </ul>
          </li>
          <li>
            <strong>Cached Security Results</strong>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Previously analyzed IOCs (11 types: IPv4, IPv6, Domain, URL, MD5, SHA1, SHA256, Email, CVE, Bitcoin, Ethereum)</li>
              <li>Cached to avoid redundant API calls and respect rate limits</li>
              <li>Retention period: 1-30 days (default: 5 days, user-configurable)</li>
              <li>Stored in daily buckets for efficient cleanup</li>
            </ul>
          </li>
          <li>
            <strong>Cached AI Analysis Results</strong>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>AI-generated threat analysis for previously analyzed IOCs</li>
              <li>Cached for 24 hours only to reduce API costs</li>
              <li>Automatically deleted after expiration</li>
              <li>Error results are never cached</li>
            </ul>
          </li>
          <li>
            <strong>User Preferences</strong>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Language preference (English/Turkish)</li>
              <li>Cache retention period settings</li>
              <li>AI provider and model preferences</li>
              <li>Provider display order customization</li>
            </ul>
          </li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">Cache Retention and Management</h3>
        <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)]">
          <li><strong>Security Results</strong>: Configurable 1-30 days (default: 5 days)</li>
          <li><strong>AI Analysis Results</strong>: Fixed 24-hour retention for cost efficiency</li>
          <li><strong>Automatic Cleanup</strong>: Expired data is automatically deleted</li>
          <li><strong>Manual Clearing</strong>: Clear all cache from settings at any time</li>
          <li><strong>Daily Buckets</strong>: Data organized by date for efficient cleanup</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">Data We Do NOT Collect</h2>
        <p className="text-[var(--text-secondary)] mb-4">We want to be crystal clear about what we <strong>DO NOT</strong> do:</p>
        <ul className="space-y-2 text-[var(--text-secondary)]">
          <li>We do NOT collect any personal information</li>
          <li>We do NOT track your browsing history beyond selected text analysis</li>
          <li>We do NOT transmit any data to our servers (we don't operate any servers)</li>
          <li>We do NOT sell or share your data with anyone</li>
          <li>We do NOT use analytics or tracking services</li>
          <li>We do NOT display advertisements</li>
          <li>We do NOT monitor your activity</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">How the Extension Works</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">Security Analysis Flow</h3>
        <ol className="list-decimal list-inside space-y-2 text-[var(--text-secondary)]">
          <li><strong>User-Initiated Analysis</strong>: You select text or right-click on a webpage</li>
          <li><strong>Local IOC Detection</strong>: Extension extracts IOCs (11 types) using pattern matching locally</li>
          <li><strong>Provider Queries</strong>: Using YOUR API keys, requests go directly to security providers</li>
          <li><strong>Results Display</strong>: Analysis results shown in the side panel with threat scores</li>
          <li><strong>Local Caching</strong>: Results cached locally to reduce API calls (configurable retention)</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">AI Analysis Flow (Optional)</h3>
        <ol className="list-decimal list-inside space-y-2 text-[var(--text-secondary)]">
          <li><strong>User Request</strong>: You click "AI Analysis" button in the side panel</li>
          <li><strong>Data Compilation</strong>: Security provider results are compiled locally</li>
          <li><strong>AI Request</strong>: Using YOUR AI API key, request sent directly to selected AI provider</li>
          <li><strong>Analysis Display</strong>: AI-generated threat analysis shown (Summary, Analysis, or Detailed mode)</li>
          <li><strong>24-Hour Cache</strong>: AI results cached for 24 hours to reduce API costs</li>
        </ol>

        <h2 className="text-2xl font-bold mt-10 mb-4">Third-Party Security Services</h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          When you analyze IOCs, the extension sends requests <strong>directly</strong> to third-party security APIs using your API keys. We act as a client only:
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Security Providers (10 Services)</h3>
        <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)]">
          <li><strong>VirusTotal</strong> - File, URL, and IP address malware scanning</li>
          <li><strong>OTX AlienVault</strong> - Open Threat Exchange intelligence</li>
          <li><strong>AbuseIPDB</strong> - IP address abuse and reputation database</li>
          <li><strong>MalwareBazaar</strong> - Malware sample database (abuse.ch)</li>
          <li><strong>ARIN</strong> - IP WHOIS and registration data</li>
          <li><strong>Shodan</strong> - Internet-connected device search engine</li>
          <li><strong>GreyNoise</strong> - Internet noise and scanner detection</li>
          <li><strong>URLhaus</strong> - Malicious URL database (abuse.ch)</li>
          <li><strong>Pulsedive</strong> - IOC enrichment and threat intelligence</li>
          <li><strong>Scamalytics</strong> - IP fraud score and risk assessment</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">AI Analysis Providers (16 Models)</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Optional AI-powered threat analysis using your own API keys:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)]">
          <li><strong>Claude (Anthropic)</strong> - Sonnet 4, 3.5 Sonnet, 3.5 Haiku, 3 Opus</li>
          <li><strong>Gemini (Google)</strong> - 2.5 Flash, 2.5 Pro, 2.0 Flash, 2.0 Flash Lite, 1.5 Pro, 1.5 Flash</li>
          <li><strong>OpenAI</strong> - GPT-4o, GPT-4o Mini, GPT-4 Turbo, o1, o1 Mini, o3 Mini</li>
        </ul>
        <p className="text-[var(--text-secondary)] mt-4">
          AI analysis is <strong>completely optional</strong>. You provide your own API keys, and requests go directly to the AI provider.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Third-Party Privacy Policies</h3>
        <p className="text-[var(--text-secondary)] mb-4">Each service has its own privacy policy. We recommend reviewing their policies:</p>

        <p className="text-[var(--text-secondary)] font-semibold mt-4 mb-2">Security Providers:</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><a href="https://support.virustotal.com/hc/en-us/articles/115002168385-Privacy-Policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">VirusTotal</a></li>
          <li><a href="https://otx.alienvault.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OTX AlienVault</a></li>
          <li><a href="https://www.abuseipdb.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AbuseIPDB</a></li>
          <li><a href="https://abuse.ch/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MalwareBazaar & URLhaus (abuse.ch)</a></li>
          <li><a href="https://www.arin.net/resources/registry/whois/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ARIN</a></li>
          <li><a href="https://account.shodan.io/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Shodan</a></li>
          <li><a href="https://www.greynoise.io/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GreyNoise</a></li>
          <li><a href="https://pulsedive.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Pulsedive</a></li>
          <li><a href="https://scamalytics.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Scamalytics</a></li>
        </ul>

        <p className="text-[var(--text-secondary)] font-semibold mt-4 mb-2">AI Providers:</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Anthropic (Claude)</a></li>
          <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google (Gemini)</a></li>
          <li><a href="https://openai.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI (GPT)</a></li>
        </ul>
        <p className="text-[var(--text-secondary)] mt-4">
          <strong>Important</strong>: We do not control these services. Data you send to them is subject to their privacy policies, not ours.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Your Control and Rights</h2>
        <p className="text-[var(--text-secondary)] mb-4">You have <strong>complete control</strong> over your data:</p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Data Management</h3>
        <ul className="space-y-2 text-[var(--text-secondary)]">
          <li><strong>View</strong>: See what API keys are configured</li>
          <li><strong>Modify</strong>: Change or update API keys anytime</li>
          <li><strong>Delete</strong>: Remove API keys from settings</li>
          <li><strong>Clear Cache</strong>: Delete all cached IOC results instantly</li>
          <li><strong>Configure Retention</strong>: Set how long cache is kept (1-30 days)</li>
          <li><strong>Export</strong>: No export needed - all data stays on your device</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Complete Removal</h3>
        <p className="text-[var(--text-secondary)] mb-2">Uninstalling the extension automatically removes:</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li>All API keys</li>
          <li>All cached data</li>
          <li>All user preferences</li>
          <li>All extension data</li>
        </ul>
        <p className="text-[var(--text-secondary)] mt-2">No data remains after uninstallation.</p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Data Security</h2>
        <p className="text-[var(--text-secondary)] mb-4">We take security seriously:</p>
        <ul className="space-y-2 text-[var(--text-secondary)]">
          <li><strong>Secure Storage</strong>: API keys stored using Chrome's secure storage API</li>
          <li><strong>Encrypted Communication</strong>: All API requests use HTTPS</li>
          <li><strong>No Transmission</strong>: No data sent to our servers (we don't have any)</li>
          <li><strong>Local Processing</strong>: All IOC extraction happens on your device</li>
          <li><strong>No Tracking</strong>: No analytics, no tracking, no telemetry</li>
          <li><strong>Open Source</strong>: Code is available for review on <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a></li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">Permissions Explained</h2>
        <p className="text-[var(--text-secondary)] mb-4">The extension requires the following Chrome permissions:</p>

        <h3 className="text-xl font-semibold mt-6 mb-3">storage</h3>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>Purpose</strong>: Store API keys and cache IOC results locally</li>
          <li><strong>Scope</strong>: Local device only</li>
          <li><strong>Access</strong>: Extension only</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">contextMenus</h3>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>Purpose</strong>: Add "Analyze IOCs" option to right-click menu</li>
          <li><strong>Scope</strong>: Right-click menu only</li>
          <li><strong>Access</strong>: User-initiated only</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">activeTab</h3>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>Purpose</strong>: Read selected text when user clicks "Analyze IOCs"</li>
          <li><strong>Scope</strong>: Current tab only, when user explicitly triggers analysis</li>
          <li><strong>Access</strong>: User-initiated only</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">sidePanel</h3>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>Purpose</strong>: Display analysis results in a side panel</li>
          <li><strong>Scope</strong>: Extension UI only</li>
          <li><strong>Access</strong>: User-initiated only</li>
        </ul>

        <p className="text-[var(--text-secondary)] mt-4">
          <strong>No broad permissions</strong>: We do not request access to all websites or browsing history.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Children's Privacy</h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          This extension is designed for security professionals and is not intended for children under 13. We do not knowingly collect information from children.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">International Users</h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          This extension can be used worldwide. All data processing happens locally on your device, regardless of your location.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Changes to Privacy Policy</h2>
        <p className="text-[var(--text-secondary)] mb-4">We may update this privacy policy to reflect changes in:</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li>Extension functionality</li>
          <li>Legal requirements</li>
          <li>Best practices</li>
        </ul>
        <p className="text-[var(--text-secondary)] mt-4">
          <strong>Notification</strong>: Changes will be posted on this page with an updated "Last Updated" date. Significant changes will be highlighted in extension update notes.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Compliance</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">GDPR Compliance (EU Users)</h3>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>Data Controller</strong>: You are the data controller (data stays on your device)</li>
          <li><strong>Data Processor</strong>: Third-party security services process your API requests</li>
          <li><strong>Right to Access</strong>: Access your data anytime in extension settings</li>
          <li><strong>Right to Erasure</strong>: Delete data anytime or uninstall extension</li>
          <li><strong>Right to Portability</strong>: Data stays on your device</li>
          <li><strong>Data Minimization</strong>: We only store what's necessary</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">CCPA Compliance (California Users)</h3>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>No Sale of Data</strong>: We do not sell personal information</li>
          <li><strong>No Sharing</strong>: We do not share personal information</li>
          <li><strong>Access Rights</strong>: You can access all your data in settings</li>
          <li><strong>Deletion Rights</strong>: You can delete all data anytime</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">Contact and Support</h2>
        <p className="text-[var(--text-secondary)] mb-4">For privacy-related questions, please:</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li>Open an issue on our <a href={`${GITHUB_URL}/issues`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub repository</a></li>
          <li>Label it with "privacy" tag</li>
          <li>We typically respond within 48 hours</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">Transparency Commitment</h2>
        <p className="text-[var(--text-secondary)] mb-4">We believe in complete transparency:</p>
        <ul className="space-y-2 text-[var(--text-secondary)]">
          <li><strong>Open Source</strong>: Code is published on <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a></li>
          <li><strong>No Hidden Features</strong>: All functionality is documented</li>
          <li><strong>No Telemetry</strong>: Zero tracking or analytics</li>
          <li><strong>Clear Communication</strong>: Privacy policy in plain language</li>
          <li><strong>User Control</strong>: You decide what to store and for how long</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">Your Acceptance</h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          By using Ahtapot Security Extension, you acknowledge that you have read and understood this privacy policy and agree to its terms.
        </p>

        <hr className="my-10 border-[var(--border)]" />

        <p className="text-[var(--text-secondary)] text-center">
          <strong>Summary</strong>: We don't collect your data. Everything stays on your device. You're in control.
        </p>

        <p className="text-[var(--text-secondary)] text-center mt-4">
          For the complete source code and updates, visit our{' '}
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub repository</a>.
        </p>

        <p className="text-[var(--text-secondary)] text-sm mt-8 italic">
          This privacy policy is effective as of December 7, 2025, and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
        </p>
      </div>
    </div>
  );
}

function PrivacyTR() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
        <h1 className="text-4xl font-bold mb-2">Ahtapot Güvenlik Eklentisi Gizlilik Politikası</h1>
        <p className="text-[var(--text-secondary)] mb-8"><strong>Son Güncelleme:</strong> 7 Aralık 2025 | <strong>Versiyon:</strong> 3.0.0</p>

        <Link href="/en/privacy" className="text-primary hover:underline mb-8 inline-block">
          Click for English version
        </Link>

        <h2 className="text-2xl font-bold mt-10 mb-4">Genel Bakış</h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Ahtapot Güvenlik Eklentisi gizliliğinizi korumaya kararlıdır. Bu eklenti, güvenlik profesyonellerinin potansiyel tehditleri değerlendirmesine yardımcı olmak için üçüncü taraf güvenlik API'lerini kullanarak siber güvenlik göstergelerini (IOC) analiz eder.
        </p>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          <strong>Chrome Web Store'dan yükleyin:</strong>{' '}
          <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Chrome Web Store
          </a>
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Veri Toplama ve Depolama</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">Yerel Olarak Depoladıklarımız</h3>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Tüm veriler Chrome'un güvenli depolama API'si kullanılarak <strong>yalnızca yerel cihazınızda</strong> depolanır. Hiçbir sunucumuz yok ve bize hiçbir veri iletilmiyor.
        </p>

        <ol className="list-decimal list-inside space-y-4 text-[var(--text-secondary)]">
          <li>
            <strong>Güvenlik API Anahtarları</strong>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>10 güvenlik servisi için API anahtarlarınız (VirusTotal, Shodan, AbuseIPDB, OTX, GreyNoise vb.)</li>
              <li>Chrome'un şifreli yerel depolamasında güvenli şekilde saklanır</li>
              <li>Sunucularımıza asla iletilmez (sunucumuz yok)</li>
              <li>Yalnızca ilgili güvenlik servislerinde kimlik doğrulaması için kullanılır</li>
            </ul>
          </li>
          <li>
            <strong>AI API Anahtarları (İsteğe Bağlı)</strong>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>AI sağlayıcıları için API anahtarlarınız (Claude, Gemini, OpenAI) - AI analizini kullanmayı seçerseniz</li>
              <li>Chrome'un şifreli yerel depolamasında zaman damgasıyla saklanır</li>
              <li>Seçtiğiniz AI sağlayıcısına doğrudan gönderilir - bize asla değil</li>
              <li>Ayarlardan istediğiniz zaman kaldırılabilir</li>
            </ul>
          </li>
          <li>
            <strong>Önbelleğe Alınmış Güvenlik Sonuçları</strong>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Daha önce analiz edilmiş IOC'ler (11 tür: IPv4, IPv6, Domain, URL, MD5, SHA1, SHA256, Email, CVE, Bitcoin, Ethereum)</li>
              <li>Gereksiz API çağrılarından kaçınmak için önbelleğe alınır</li>
              <li>Saklama süresi: 1-30 gün (varsayılan: 5 gün, kullanıcı tarafından yapılandırılabilir)</li>
              <li>Verimli temizlik için günlük paketlerde saklanır</li>
            </ul>
          </li>
          <li>
            <strong>Önbelleğe Alınmış AI Analiz Sonuçları</strong>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Daha önce analiz edilmiş IOC'ler için AI tarafından oluşturulan tehdit analizi</li>
              <li>API maliyetlerini azaltmak için yalnızca 24 saat önbelleğe alınır</li>
              <li>Süresi dolduktan sonra otomatik olarak silinir</li>
              <li>Hatalı sonuçlar asla önbelleğe alınmaz</li>
            </ul>
          </li>
          <li>
            <strong>Kullanıcı Tercihleri</strong>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Dil tercihi (İngilizce/Türkçe)</li>
              <li>Önbellek saklama süresi ayarları</li>
              <li>AI sağlayıcı ve model tercihleri</li>
              <li>Sağlayıcı görüntüleme sırası özelleştirmesi</li>
            </ul>
          </li>
        </ol>

        <h2 className="text-2xl font-bold mt-10 mb-4">Toplamadığımız Veriler</h2>
        <p className="text-[var(--text-secondary)] mb-4"><strong>YAPMADIĞIMIZ</strong> şeyler hakkında çok net olmak istiyoruz:</p>
        <ul className="space-y-2 text-[var(--text-secondary)]">
          <li>Hiçbir kişisel bilgi TOPLAMIYORUZ</li>
          <li>Seçili metin analizi dışında tarama geçmişinizi TAKİP ETMİYORUZ</li>
          <li>Sunucularımıza hiçbir veri İLETMİYORUZ (sunucu işletmiyoruz)</li>
          <li>Verilerinizi kimseye SATMIYORUZ veya PAYLAŞMIYORUZ</li>
          <li>Analitik veya izleme hizmetleri KULLANMIYORUZ</li>
          <li>Reklam GÖSTERMİYORUZ</li>
          <li>Etkinliğinizi İZLEMİYORUZ</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">Eklenti Nasıl Çalışır</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">Güvenlik Analizi Akışı</h3>
        <ol className="list-decimal list-inside space-y-2 text-[var(--text-secondary)]">
          <li><strong>Kullanıcı Tarafından Başlatılan Analiz</strong>: Metin seçersiniz veya bir web sayfasına sağ tıklarsınız</li>
          <li><strong>Yerel IOC Tespiti</strong>: Eklenti IOC'leri (11 tür) yerel olarak desen eşleştirme ile çıkarır</li>
          <li><strong>Sağlayıcı Sorguları</strong>: SİZİN API anahtarlarınızı kullanarak istekler doğrudan güvenlik sağlayıcılarına gider</li>
          <li><strong>Sonuç Gösterimi</strong>: Analiz sonuçları tehdit puanlarıyla yan panelde gösterilir</li>
          <li><strong>Yerel Önbelleğe Alma</strong>: Sonuçlar API çağrılarını azaltmak için yerel olarak önbelleğe alınır</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6 mb-3">AI Analizi Akışı (İsteğe Bağlı)</h3>
        <ol className="list-decimal list-inside space-y-2 text-[var(--text-secondary)]">
          <li><strong>Kullanıcı İsteği</strong>: Yan panelde "AI Analizi" düğmesine tıklarsınız</li>
          <li><strong>Veri Derleme</strong>: Güvenlik sağlayıcı sonuçları yerel olarak derlenir</li>
          <li><strong>AI İsteği</strong>: SİZİN AI API anahtarınızı kullanarak istek seçtiğiniz AI sağlayıcısına gönderilir</li>
          <li><strong>Analiz Gösterimi</strong>: AI tarafından oluşturulan tehdit analizi gösterilir (Özet, Analiz veya Detaylı mod)</li>
          <li><strong>24 Saatlik Önbellek</strong>: AI sonuçları API maliyetlerini azaltmak için 24 saat önbelleğe alınır</li>
        </ol>

        <h2 className="text-2xl font-bold mt-10 mb-4">Üçüncü Taraf Güvenlik Hizmetleri</h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          IOC'leri analiz ettiğinizde, eklenti API anahtarlarınızı kullanarak <strong>doğrudan</strong> üçüncü taraf güvenlik API'lerine istek gönderir. Biz sadece bir istemci olarak hareket ediyoruz.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Güvenlik Sağlayıcıları (10 Servis)</h3>
        <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)]">
          <li><strong>VirusTotal</strong> - Dosya, URL ve IP adresi zararlı yazılım taraması</li>
          <li><strong>OTX AlienVault</strong> - Açık Tehdit Değişim istihbaratı</li>
          <li><strong>AbuseIPDB</strong> - IP adresi kötüye kullanım ve itibar veritabanı</li>
          <li><strong>MalwareBazaar</strong> - Zararlı yazılım örnek veritabanı (abuse.ch)</li>
          <li><strong>ARIN</strong> - IP WHOIS ve kayıt verileri</li>
          <li><strong>Shodan</strong> - İnternete bağlı cihaz arama motoru</li>
          <li><strong>GreyNoise</strong> - İnternet gürültüsü ve tarayıcı tespiti</li>
          <li><strong>URLhaus</strong> - Kötü amaçlı URL veritabanı (abuse.ch)</li>
          <li><strong>Pulsedive</strong> - IOC zenginleştirme ve tehdit istihbaratı</li>
          <li><strong>Scamalytics</strong> - IP dolandırıcılık puanı ve risk değerlendirmesi</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">AI Analiz Sağlayıcıları (16 Model)</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          Kendi API anahtarlarınızı kullanarak isteğe bağlı AI destekli tehdit analizi:
        </p>
        <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)]">
          <li><strong>Claude (Anthropic)</strong> - Sonnet 4, 3.5 Sonnet, 3.5 Haiku, 3 Opus</li>
          <li><strong>Gemini (Google)</strong> - 2.5 Flash, 2.5 Pro, 2.0 Flash, 2.0 Flash Lite, 1.5 Pro, 1.5 Flash</li>
          <li><strong>OpenAI</strong> - GPT-4o, GPT-4o Mini, GPT-4 Turbo, o1, o1 Mini, o3 Mini</li>
        </ul>
        <p className="text-[var(--text-secondary)] mt-4">
          AI analizi <strong>tamamen isteğe bağlıdır</strong>. Kendi API anahtarlarınızı sağlarsınız ve istekler doğrudan AI sağlayıcısına gider.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Kontrolünüz ve Haklarınız</h2>
        <p className="text-[var(--text-secondary)] mb-4">Verileriniz üzerinde <strong>tam kontrole</strong> sahipsiniz:</p>

        <h3 className="text-xl font-semibold mt-6 mb-3">Veri Yönetimi</h3>
        <ul className="space-y-2 text-[var(--text-secondary)]">
          <li><strong>Görüntüle</strong>: Hangi API anahtarlarının yapılandırıldığını görün</li>
          <li><strong>Değiştir</strong>: API anahtarlarını istediğiniz zaman değiştirin veya güncelleyin</li>
          <li><strong>Sil</strong>: Ayarlardan API anahtarlarını kaldırın</li>
          <li><strong>Önbelleği Temizle</strong>: Tüm önbelleğe alınmış IOC sonuçlarını anında silin</li>
          <li><strong>Saklama Süresini Yapılandır</strong>: Önbelleğin ne kadar süre tutulacağını ayarlayın (1-30 gün)</li>
          <li><strong>Dışa Aktar</strong>: Dışa aktarmaya gerek yok - tüm veriler cihazınızda kalır</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">Tam Kaldırma</h3>
        <p className="text-[var(--text-secondary)] mb-2">Eklentiyi kaldırmak otomatik olarak şunları siler:</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li>Tüm API anahtarları</li>
          <li>Tüm önbelleğe alınmış veriler</li>
          <li>Tüm kullanıcı tercihleri</li>
          <li>Tüm eklenti verileri</li>
        </ul>
        <p className="text-[var(--text-secondary)] mt-2">Kaldırma işleminden sonra hiçbir veri kalmaz.</p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Veri Güvenliği</h2>
        <p className="text-[var(--text-secondary)] mb-4">Güvenliği ciddiye alıyoruz:</p>
        <ul className="space-y-2 text-[var(--text-secondary)]">
          <li><strong>Güvenli Depolama</strong>: API anahtarları Chrome'un güvenli depolama API'si kullanılarak saklanır</li>
          <li><strong>Şifreli İletişim</strong>: Tüm API istekleri HTTPS kullanır</li>
          <li><strong>İletim Yok</strong>: Sunucularımıza hiçbir veri gönderilmez (sunucumuz yok)</li>
          <li><strong>Yerel İşleme</strong>: Tüm IOC çıkarımı cihazınızda gerçekleşir</li>
          <li><strong>İzleme Yok</strong>: Analitik yok, izleme yok, telemetri yok</li>
          <li><strong>Açık Kaynak</strong>: Kod <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a>'da incelenebilir</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">İzin Açıklamaları</h2>
        <p className="text-[var(--text-secondary)] mb-4">Eklenti aşağıdaki Chrome izinlerini gerektirir:</p>

        <h3 className="text-xl font-semibold mt-6 mb-3">storage</h3>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>Amaç</strong>: API anahtarlarını ve IOC sonuçlarını yerel olarak depolamak</li>
          <li><strong>Kapsam</strong>: Yalnızca yerel cihaz</li>
          <li><strong>Erişim</strong>: Yalnızca eklenti</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">contextMenus</h3>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>Amaç</strong>: Sağ tıklama menüsüne "IOC'leri Analiz Et" seçeneği eklemek</li>
          <li><strong>Kapsam</strong>: Yalnızca sağ tıklama menüsü</li>
          <li><strong>Erişim</strong>: Yalnızca kullanıcı tarafından başlatılan</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">activeTab</h3>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>Amaç</strong>: Kullanıcı "IOC'leri Analiz Et"e tıkladığında seçili metni okumak</li>
          <li><strong>Kapsam</strong>: Yalnızca mevcut sekme, kullanıcı açıkça analizi tetiklediğinde</li>
          <li><strong>Erişim</strong>: Yalnızca kullanıcı tarafından başlatılan</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">sidePanel</h3>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>Amaç</strong>: Analiz sonuçlarını yan panelde göstermek</li>
          <li><strong>Kapsam</strong>: Yalnızca eklenti arayüzü</li>
          <li><strong>Erişim</strong>: Yalnızca kullanıcı tarafından başlatılan</li>
        </ul>

        <p className="text-[var(--text-secondary)] mt-4">
          <strong>Geniş izin yok</strong>: Tüm web sitelerine veya tarama geçmişine erişim istemiyoruz.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Çocukların Gizliliği</h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Bu eklenti güvenlik profesyonelleri için tasarlanmıştır ve 13 yaşın altındaki çocuklar için uygun değildir. Çocuklardan bilerek bilgi toplamıyoruz.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Uluslararası Kullanıcılar</h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Bu eklenti dünya çapında kullanılabilir. Konumunuzdan bağımsız olarak tüm veri işleme yerel olarak cihazınızda gerçekleşir.
        </p>

        <h2 className="text-2xl font-bold mt-10 mb-4">Uyumluluk</h2>

        <h3 className="text-xl font-semibold mt-6 mb-3">GDPR Uyumluluğu (AB Kullanıcıları)</h3>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>Veri Sorumlusu</strong>: Siz veri sorumlusunuz (veriler cihazınızda kalır)</li>
          <li><strong>Veri İşleyici</strong>: Üçüncü taraf güvenlik hizmetleri API isteklerinizi işler</li>
          <li><strong>Erişim Hakkı</strong>: Eklenti ayarlarında verilerinize istediğiniz zaman erişin</li>
          <li><strong>Silme Hakkı</strong>: İstediğiniz zaman verileri silin veya eklentiyi kaldırın</li>
          <li><strong>Taşınabilirlik Hakkı</strong>: Veriler cihazınızda kalır</li>
          <li><strong>Veri Minimizasyonu</strong>: Yalnızca gerekli olanı depoluyoruz</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3">CCPA Uyumluluğu (Kaliforniya Kullanıcıları)</h3>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><strong>Veri Satışı Yok</strong>: Kişisel bilgileri satmıyoruz</li>
          <li><strong>Paylaşım Yok</strong>: Kişisel bilgileri paylaşmıyoruz</li>
          <li><strong>Erişim Hakları</strong>: Ayarlarda tüm verilerinize erişebilirsiniz</li>
          <li><strong>Silme Hakları</strong>: İstediğiniz zaman tüm verileri silebilirsiniz</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">İletişim ve Destek</h2>
        <p className="text-[var(--text-secondary)] mb-4">Gizlilikle ilgili sorular için lütfen:</p>
        <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
          <li><a href={`${GITHUB_URL}/issues`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub deposunda</a> bir sorun açın</li>
          <li>"privacy" etiketi ile işaretleyin</li>
          <li>Genellikle 48 saat içinde yanıt veriyoruz</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">Şeffaflık Taahhüdümüz</h2>
        <p className="text-[var(--text-secondary)] mb-4">Tam şeffaflığa inanıyoruz:</p>
        <ul className="space-y-2 text-[var(--text-secondary)]">
          <li><strong>Açık Kaynak</strong>: Kod <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub</a>'da yayınlandı</li>
          <li><strong>Gizli Özellik Yok</strong>: Tüm işlevler belgelenmiştir</li>
          <li><strong>Telemetri Yok</strong>: Sıfır izleme veya analitik</li>
          <li><strong>Açık İletişim</strong>: Sade dilde gizlilik politikası</li>
          <li><strong>Kullanıcı Kontrolü</strong>: Ne depolanacağına ve ne kadar süre saklanacağına siz karar verirsiniz</li>
        </ul>

        <h2 className="text-2xl font-bold mt-10 mb-4">Kabulünüz</h2>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Ahtapot Güvenlik Eklentisini kullanarak, bu gizlilik politikasını okuduğunuzu ve anladığınızı ve şartlarını kabul ettiğinizi beyan edersiniz.
        </p>

        <hr className="my-10 border-[var(--border)]" />

        <p className="text-[var(--text-secondary)] text-center">
          <strong>Özet</strong>: Verilerinizi toplamıyoruz. Her şey cihazınızda kalır. Kontrol sizdedir.
        </p>

        <p className="text-[var(--text-secondary)] text-center mt-4">
          Tam kaynak kodu ve güncellemeler için{' '}
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub deposumuzu</a> ziyaret edin.
        </p>

        <p className="text-[var(--text-secondary)] text-sm mt-8 italic">
          Bu gizlilik politikası 7 Aralık 2025 tarihinden itibaren geçerlidir ve gelecekte hükümlerinde yapılacak değişiklikler hariç olmak üzere yürürlükte kalacaktır; bu değişiklikler bu sayfada yayınlandıktan hemen sonra geçerli olacaktır.
        </p>
      </div>
    </div>
  );
}
