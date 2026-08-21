export type Verdict = 'malicious' | 'suspicious' | 'clean' | 'unknown';

export interface IOCFixture {
  query: string;
  kind: string;
  verdict: Verdict;
  headline: string;
  tags: string[];
  meta: string[];
}

export const heroFixture: IOCFixture = {
  query: '198.51.100.23',
  kind: 'IPv4',
  verdict: 'malicious',
  headline: 'VirusTotal 42/94',
  tags: ['Mirai botnet', 'ELF malware'],
  meta: ['AS13335', 'CN', 'first seen 3d ago'],
};

export const aiFixture: IOCFixture = {
  query: 'CVE-2024-3400',
  kind: 'CVE',
  verdict: 'malicious',
  headline: 'Actively exploited',
  tags: ['Command injection', 'T1190'],
  meta: ['CVSS 10.0', 'PAN-OS', 'patch available'],
};

export const privacyFixture: IOCFixture = {
  query: 'a3f5c9e1…b2d4f6a8',
  kind: 'SHA256',
  verdict: 'clean',
  headline: 'No detections',
  tags: ['No backend', 'Direct to your providers'],
  meta: ['0 telemetry', '0 servers', 'MIT licensed'],
};
