import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT) || 3000;
const DB_FILE = path.join(__dirname, 'data', 'academy_table.json');
const REGISTRATIONS_FILE = path.join(__dirname, 'data', 'academy_registrations.json');
const TRYOUT_REGISTRATIONS_FILE = path.join(__dirname, 'data', 'tryout_registrations.json');
const ORDERS_FILE = path.join(__dirname, 'data', 'academy_orders.json');
const ADMISSIONS_RECIPIENT = process.env.ADMISSIONS_EMAIL || 'admissions@simolatfootballacademy.ng';
const TRYOUTS_RECIPIENT = process.env.TRYOUTS_EMAIL || 'tryouts@simolatfootballacademy.ng';

interface Team {
  id: string;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  form: string[];
}

interface MatchRecord {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeGoals: number;
  awayGoals: number;
  date: string;
}

interface DatabaseStructure {
  teams: Team[];
  matches: MatchRecord[];
}

interface AcademyRegistrationRecord {
  referenceId: string;
  fullName: string;
  age: number;
  position: string;
  phoneNumber: string;
  email: string;
  recipient: string;
  category?: string;
  notes?: string;
  submittedAt: string;
  emailSent: boolean;
  messageId?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_URL ||
      (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
  );
}

function createMailTransporter() {
  if (process.env.SMTP_URL) {
    return nodemailer.createTransport(process.env.SMTP_URL);
  }
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

interface TryoutRegistrationRecord {
  referenceId: string;
  category: string;
  fullName: string;
  dob: string;
  ageGroup: string;
  position: string;
  foot: string;
  nin: string;
  school: string;
  phoneNumber: string;
  email: string;
  guardian: string;
  address: string;
  medical: string;
  recipient: string;
  submittedAt: string;
  emailSent: boolean;
  messageId?: string;
}

function saveRegistrationRecord(record: AcademyRegistrationRecord) {
  try {
    fs.mkdirSync(path.dirname(REGISTRATIONS_FILE), { recursive: true });
    let existing: AcademyRegistrationRecord[] = [];
    if (fs.existsSync(REGISTRATIONS_FILE)) {
      const raw = fs.readFileSync(REGISTRATIONS_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        existing = parsed;
      }
    }
    existing.unshift(record);
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(existing, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving registration record:', err);
  }
}

function saveTryoutRegistrationRecord(record: TryoutRegistrationRecord) {
  try {
    fs.mkdirSync(path.dirname(TRYOUT_REGISTRATIONS_FILE), { recursive: true });
    let existing: TryoutRegistrationRecord[] = [];
    if (fs.existsSync(TRYOUT_REGISTRATIONS_FILE)) {
      const raw = fs.readFileSync(TRYOUT_REGISTRATIONS_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        existing = parsed;
      }
    }
    existing.unshift(record);
    fs.writeFileSync(TRYOUT_REGISTRATIONS_FILE, JSON.stringify(existing, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving tryout registration record:', err);
  }
}

const INITIAL_DATA: DatabaseStructure = {
  teams: [
    { id: 'simolat-fa', name: 'Simolat Football Academy', played: 5, won: 4, drawn: 1, lost: 0, gf: 12, ga: 3, gd: 9, pts: 13, form: ['W', 'W', 'W', 'D', 'W'] },
    { id: 'rising-stars', name: 'Rising Stars FC', played: 5, won: 3, drawn: 1, lost: 1, gf: 9, ga: 5, gd: 4, pts: 10, form: ['W', 'D', 'W', 'L', 'W'] },
    { id: 'sahel-youth', name: 'Sahel Youth', played: 5, won: 2, drawn: 2, lost: 1, gf: 7, ga: 6, gd: 1, pts: 8, form: ['D', 'W', 'D', 'W', 'L'] },
    { id: 'academy-utd', name: 'Academy United', played: 5, won: 1, drawn: 1, lost: 3, gf: 4, ga: 10, gd: -6, pts: 4, form: ['L', 'W', 'L', 'D', 'L'] },
    { id: 'future-pro', name: 'Future Pro FC', played: 5, won: 0, drawn: 1, lost: 4, gf: 2, ga: 10, gd: -8, pts: 1, form: ['L', 'L', 'D', 'L', 'L'] }
  ],
  matches: [
    { id: 'm-init-1', homeTeam: 'Simolat Football Academy', awayTeam: 'Rising Stars FC', homeGoals: 2, awayGoals: 1, date: '2026-10-04' },
    { id: 'm-init-2', homeTeam: 'Sahel Youth', awayTeam: 'Future Pro FC', homeGoals: 3, awayGoals: 1, date: '2026-10-11' },
    { id: 'm-init-3', homeTeam: 'Academy United', awayTeam: 'Simolat Football Academy', homeGoals: 0, awayGoals: 4, date: '2026-10-18' },
    { id: 'm-init-4', homeTeam: 'Rising Stars FC', awayTeam: 'Future Pro FC', homeGoals: 3, awayGoals: 0, date: '2026-10-25' },
    { id: 'm-init-5', homeTeam: 'Simolat Football Academy', awayTeam: 'Sahel Youth', homeGoals: 1, awayGoals: 1, date: '2026-11-01' }
  ]
};

function readDb(): DatabaseStructure {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf8');
      return JSON.parse(JSON.stringify(INITIAL_DATA));
    }
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading db:', err);
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }
}

function writeDb(data: DatabaseStructure) {
  try {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing db:', err);
  }
}

interface OrderItemRecord {
  name: string;
  details: string;
  price: string;
}

interface StoreOrderRecord {
  orderNumber: string;
  customerName: string;
  destination: string;
  carrier: string;
  trackingWaybill: string;
  createdAt: string;
  baseStageIndex: number;
  autoAdvance: boolean;
  items: OrderItemRecord[];
  totalLabel: string;
}

const SHIPPING_STAGES = [
  {
    key: 'confirmed',
    label: 'Order Confirmed',
    hub: 'St. Simolat Arena Store Desk, Ikoyi Lagos',
    detail: 'Payment verified and jersey order queued for kit room fulfillment.'
  },
  {
    key: 'qc',
    label: 'Kit Quality & Crest Check',
    hub: 'Simolat Sporting Kit Room, Ikoyi SW, Lagos',
    detail: 'Official match crest, weave check, and sizing inspection passed.'
  },
  {
    key: 'dispatched',
    label: 'Dispatched to Courier',
    hub: 'Ikoyi Express Dispatch Gate, Lagos',
    detail: 'Sealed match parcel scanned and handed over to express courier.'
  },
  {
    key: 'transit',
    label: 'In Transit — Sorting Hub',
    hub: 'Lagos / National Logistics Sorting Terminal',
    detail: 'Parcel cleared express manifest and is en route to destination city.'
  },
  {
    key: 'out_for_delivery',
    label: 'Out for Delivery',
    hub: 'Local Last-Mile Delivery Rider',
    detail: 'Courier van has departed local depot; recipient signature requested today.'
  },
  {
    key: 'delivered',
    label: 'Delivered',
    hub: 'Destination Address Confirmed',
    detail: 'Package delivered and signed at recipient doorstep.'
  }
];

const SEEDED_ORDERS: StoreOrderRecord[] = [
  {
    orderNumber: 'SFA-2026-1042',
    customerName: 'Adeyemi Balogun',
    destination: 'Victoria Island, Lagos, Nigeria',
    carrier: 'GIG Logistics Express',
    trackingWaybill: 'GIG-IKY-994820',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    baseStageIndex: 4,
    autoAdvance: false,
    items: [
      { name: 'Simolat Sporting 2026/2027 Home Jersey (Red)', details: 'Size L • Crest Authentic Edition', price: '₦18,000' }
    ],
    totalLabel: '₦18,000'
  },
  {
    orderNumber: 'SFA-2026-1088',
    customerName: 'Chidi Nwankwo',
    destination: 'Ilesha, Osun State, Nigeria',
    carrier: 'DHL Express Nigeria',
    trackingWaybill: 'DHL-NG-4471902',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    baseStageIndex: 3,
    autoAdvance: false,
    items: [
      { name: 'Simolat Sporting 2026/2027 Away Jersey (Navy)', details: 'Size M • Official Matchday Fit', price: '₦18,000' },
      { name: 'Simolat Sporting 2026/2027 Home Jersey (White)', details: 'Size L • Gold Collar Trim', price: '₦18,000' }
    ],
    totalLabel: '₦36,000'
  },
  {
    orderNumber: 'SFA-2026-0991',
    customerName: 'Kemi Adeosun',
    destination: 'Lekki Phase 1, Lagos, Nigeria',
    carrier: 'GIG Logistics Express',
    trackingWaybill: 'GIG-LEK-771204',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString(),
    baseStageIndex: 5,
    autoAdvance: false,
    items: [
      { name: 'Official 2026/27 Home Kit', details: 'Custom: MARTINGS #14 (Size L)', price: '€85.00' }
    ],
    totalLabel: '€85.00'
  }
];

function readOrders(): StoreOrderRecord[] {
  try {
    if (!fs.existsSync(ORDERS_FILE)) {
      fs.mkdirSync(path.dirname(ORDERS_FILE), { recursive: true });
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(SEEDED_ORDERS, null, 2), 'utf8');
      return JSON.parse(JSON.stringify(SEEDED_ORDERS));
    }
    const parsed = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return JSON.parse(JSON.stringify(SEEDED_ORDERS));
  } catch (err) {
    console.error('Error reading orders:', err);
    return JSON.parse(JSON.stringify(SEEDED_ORDERS));
  }
}

function writeOrders(orders: StoreOrderRecord[]) {
  try {
    fs.mkdirSync(path.dirname(ORDERS_FILE), { recursive: true });
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing orders:', err);
  }
}

function buildLiveOrderSnapshot(order: StoreOrderRecord) {
  const createdMs = Date.parse(order.createdAt) || Date.now();
  const elapsedSec = Math.max(0, Math.floor((Date.now() - createdMs) / 1000));
  let stageIndex = order.baseStageIndex;
  if (order.autoAdvance) {
    // Advance stages realistically in real time every 12 seconds for live tracking demonstration
    stageIndex = Math.min(SHIPPING_STAGES.length - 1, Math.floor(elapsedSec / 12));
  } else {
    // Seeded active orders (stage < 5) can also tick subtly or stay accurate; advance stage 4->5 only if >48h
    stageIndex = Math.min(SHIPPING_STAGES.length - 1, order.baseStageIndex);
  }

  const currentStage = SHIPPING_STAGES[stageIndex];
  const stepIntervalMs = order.autoAdvance ? 12000 : 1000 * 60 * 60 * 4;
  const timeline = [];
  for (let i = stageIndex; i >= 0; i--) {
    const st = SHIPPING_STAGES[i];
    timeline.push({
      stageIndex: i,
      key: st.key,
      label: st.label,
      hub: st.hub,
      detail: st.detail,
      timestamp: new Date(createdMs + i * stepIntervalMs).toISOString()
    });
  }

  const etaText =
    stageIndex >= 5
      ? 'Delivered & Signed'
      : stageIndex === 4
      ? 'Arriving Today (Estimated 2–4 Hours)'
      : stageIndex === 3
      ? 'Expected Tomorrow by 5:00 PM WAT'
      : 'Estimated Delivery: 24–48 Hours';

  return {
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    destination: order.destination,
    carrier: order.carrier,
    trackingWaybill: order.trackingWaybill,
    createdAt: order.createdAt,
    items: order.items,
    totalLabel: order.totalLabel,
    currentStageIndex: stageIndex,
    currentStageLabel: currentStage.label,
    currentLocation: currentStage.hub,
    eta: etaText,
    delivered: stageIndex >= SHIPPING_STAGES.length - 1,
    stages: SHIPPING_STAGES.map((s, idx) => ({
      index: idx,
      key: s.key,
      label: s.label,
      completed: idx <= stageIndex,
      active: idx === stageIndex
    })),
    timeline,
    serverCheckedAt: new Date().toISOString()
  };
}

function sortTeams(teams: Team[]): Team[] {
  return [...teams].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.gd !== a.gd) return b.gd - a.gd;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return a.name.localeCompare(b.name);
  });
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '12mb' }));
  app.use(express.urlencoded({ extended: true }));

  const imageCacheOpts = { maxAge: '365d', immutable: true, etag: true };
  app.use('/media', express.static(path.join(__dirname, 'public', 'media'), imageCacheOpts));
  app.use('/players', express.static(path.join(__dirname, 'public', 'players'), imageCacheOpts));

  app.post('/api/transcribe', async (req, res) => {
    const rawAudio = String(req.body?.audioBase64 || '').trim();
    const rawMime = String(req.body?.mimeType || 'audio/webm').split(';')[0].trim() || 'audio/webm';
    const rawLang = String(req.body?.language || 'en-US').trim();

    if (!rawAudio) {
      res.status(400).json({ ok: false, error: 'No audio payload received.' });
      return;
    }
    if (rawAudio.length > 10 * 1024 * 1024) {
      res.status(413).json({ ok: false, error: 'Recording exceeds maximum 10MB size limit.' });
      return;
    }

    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        ok: false,
        error: 'Server audio transcription requires GEMINI_API_KEY in Secrets, or use a browser with live Web Speech dictation.'
      });
      return;
    }

    try {
      const langHint = rawLang.startsWith('fr') ? 'French' : 'English';
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-transcribe',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: rawMime,
                data: rawAudio,
              },
            },
            {
              text: `Transcribe this spoken football academy inquiry accurately in ${langHint}. Return only the plain transcribed text without extra commentary or quotes.`,
            },
          ],
        },
      });
      const transcript = (response.text ?? '').trim();
      res.json({ ok: true, transcript });
    } catch (err) {
      console.error('Audio transcription error:', err);
      res.status(502).json({
        ok: false,
        error: 'Unable to transcribe recorded audio right now. Please type or retry dictation.',
      });
    }
  });

  // Academy Registration Email-Forwarding Endpoint -> admissions@simolatfootballacademy.ng
  app.get('/api/academy-registration/status', (_req, res) => {
    res.json({
      recipient: ADMISSIONS_RECIPIENT,
      smtpConfigured: isSmtpConfigured()
    });
  });

  app.post('/api/academy-registration', async (req, res) => {
    const rawFullName = String(req.body?.fullName || '').trim();
    const rawAge = req.body?.age;
    const rawPosition = String(req.body?.position || '').trim();
    const rawPhoneNumber = String(req.body?.phoneNumber || req.body?.phone || '').trim();
    const rawEmail = String(req.body?.email || '').trim();
    const rawCategory = req.body?.category ? String(req.body.category).trim() : undefined;
    const rawNotes = req.body?.notes ? String(req.body.notes).trim() : undefined;

    const ageNum = Number(rawAge);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (rawFullName.length < 2) {
      res.status(400).json({ ok: false, error: 'Please enter a valid Full Name (at least 2 characters).' });
      return;
    }
    if (!Number.isInteger(ageNum) || ageNum < 6 || ageNum > 45) {
      res.status(400).json({ ok: false, error: 'Please enter a valid Age between 6 and 45.' });
      return;
    }
    if (!rawPosition) {
      res.status(400).json({ ok: false, error: 'Please select or enter a Playing Position.' });
      return;
    }
    if (rawPhoneNumber.length < 7) {
      res.status(400).json({ ok: false, error: 'Please enter a valid Phone Number.' });
      return;
    }
    if (!emailRegex.test(rawEmail)) {
      res.status(400).json({ ok: false, error: 'Please enter a valid Email address.' });
      return;
    }

    const submittedAt = new Date().toISOString();
    const referenceId = `SFA-REG-${Date.now().toString(36).toUpperCase()}`;

    const textBody = [
      'SIMOLAT FOOTBALL ACADEMY REGISTRATION FORM',
      '==========================================',
      `Reference ID : ${referenceId}`,
      `Submitted At : ${submittedAt}`,
      `Recipient    : ${ADMISSIONS_RECIPIENT}`,
      '',
      `Full Name    : ${rawFullName}`,
      `Age          : ${ageNum}`,
      `Position     : ${rawPosition}`,
      `Phone Number : ${rawPhoneNumber}`,
      `Email        : ${rawEmail}`,
      ...(rawCategory ? [`Category     : ${rawCategory}`] : []),
      ...(rawNotes ? [`Notes        : ${rawNotes}`] : [])
    ].join('\n');

    const htmlBody = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 620px; margin: 0 auto; border: 2px solid #047857; border-radius: 12px; overflow: hidden; color: #0f172a;">
        <div style="background: #047857; color: #ffffff; padding: 20px 24px;">
          <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #facc15;">Official Academy Admissions</div>
          <h2 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 900;">Simolat Football Academy Registration Form</h2>
        </div>
        <div style="padding: 22px 24px; background: #ffffff;">
          <p style="margin: 0 0 16px 0; font-size: 14px; color: #334155;">
            A new player registration has been submitted and forwarded to <strong>${escapeHtml(ADMISSIONS_RECIPIENT)}</strong>.
          </p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700; width: 36%;">Reference ID</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 800; color: #047857;">${escapeHtml(referenceId)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Full Name</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0;">${escapeHtml(rawFullName)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Age</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0;">${ageNum}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Position</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0;">${escapeHtml(rawPosition)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Phone Number</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0;">${escapeHtml(rawPhoneNumber)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Email</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0;"><a href="mailto:${escapeHtml(rawEmail)}">${escapeHtml(rawEmail)}</a></td>
            </tr>
            ${rawCategory ? `
            <tr>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Category</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0;">${escapeHtml(rawCategory)}</td>
            </tr>` : ''}
            ${rawNotes ? `
            <tr>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Additional Notes</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0;">${escapeHtml(rawNotes)}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Submitted At</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0;">${escapeHtml(submittedAt)}</td>
            </tr>
          </table>
        </div>
        <div style="background: #f8fafc; padding: 12px 24px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
          Simolat Football Academy • 77 Awolowo Road, Ikoyi SW, Lagos • ${escapeHtml(ADMISSIONS_RECIPIENT)}
        </div>
      </div>
    `;

    saveRegistrationRecord({
      referenceId,
      fullName: rawFullName,
      age: ageNum,
      position: rawPosition,
      phoneNumber: rawPhoneNumber,
      email: rawEmail,
      recipient: ADMISSIONS_RECIPIENT,
      category: rawCategory,
      notes: rawNotes,
      submittedAt,
      emailSent: false
    });

    res.status(200).json({
      ok: true,
      emailSent: false,
      deliveryMode: 'mailto-backup',
      smtpConfigured: false,
      recipient: ADMISSIONS_RECIPIENT,
      referenceId,
      message: `Registration saved (${referenceId}). Opening pre-filled mailto:${ADMISSIONS_RECIPIENT} backup link.`
    });
  });

  // Open Tryouts Registration Form 2027 Email-Forwarding Endpoint -> tryouts@simolatfootballacademy.ng
  app.get('/api/tryouts-registration/status', (_req, res) => {
    res.json({
      recipient: TRYOUTS_RECIPIENT,
      smtpConfigured: isSmtpConfigured()
    });
  });

  app.post('/api/tryouts-registration', async (req, res) => {
    const category = String(req.body?.category || 'Category (A) - Academic Standard Registration').trim();
    const fullName = String(req.body?.fullName || '').trim();
    const dob = String(req.body?.dob || '').trim();
    const ageGroup = String(req.body?.ageGroup || 'Under-18').trim();
    const position = String(req.body?.position || '').trim();
    const foot = String(req.body?.foot || 'Right').trim();
    const nin = String(req.body?.nin || 'Not Provided').trim() || 'Not Provided';
    const school = String(req.body?.school || 'Not Provided').trim() || 'Not Provided';
    const phoneNumber = String(req.body?.phoneNumber || req.body?.phone || '').trim();
    const email = String(req.body?.email || '').trim();
    const guardian = String(req.body?.guardian || 'N/A').trim() || 'N/A';
    const address = String(req.body?.address || 'Not Provided').trim() || 'Not Provided';
    const medical = String(req.body?.medical || 'None / Cleared by Physician').trim() || 'None / Cleared by Physician';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fullName.length < 2) {
      res.status(400).json({ ok: false, error: 'Please enter a valid Player Full Name (at least 2 characters).' });
      return;
    }
    if (!dob) {
      res.status(400).json({ ok: false, error: 'Please enter a valid Date of Birth.' });
      return;
    }
    if (!position) {
      res.status(400).json({ ok: false, error: 'Please select a Playing Position.' });
      return;
    }
    if (phoneNumber.length < 7) {
      res.status(400).json({ ok: false, error: 'Please enter a valid Phone Number.' });
      return;
    }
    if (email && !emailRegex.test(email)) {
      res.status(400).json({ ok: false, error: 'Please enter a valid Email Address.' });
      return;
    }

    const submittedAt = new Date().toISOString();
    const referenceId = `SFA-TRY-2027-${Date.now().toString(36).toUpperCase()}`;

    const textBody = [
      'SIMOLAT FOOTBALL ACADEMY OPEN TRYOUTS REGISTRATION FORM 2027',
      '================================================================',
      `Reference ID         : ${referenceId}`,
      `Submitted At         : ${submittedAt}`,
      `Recipient Desk       : ${TRYOUTS_RECIPIENT}`,
      '',
      `Registration Category: ${category}`,
      `Player Full Name     : ${fullName}`,
      `Date of Birth        : ${dob}`,
      `Age Group            : ${ageGroup}`,
      `Playing Position     : ${position}`,
      `Preferred Foot       : ${foot}`,
      `NIN                  : ${nin}`,
      `School / Result      : ${school}`,
      `Phone Number         : ${phoneNumber}`,
      `Email Address        : ${email || 'Not Provided'}`,
      `Parent / Guardian    : ${guardian}`,
      `Residential Address  : ${address}`,
      `Medical / Clearance  : ${medical}`,
      '',
      'MANDATORY SAFEGUARDING NOTICE: Players of "UNDER 18" must be accompanied by their parents for the tryout.'
    ].join('\n');

    const htmlBody = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 640px; margin: 0 auto; border: 2px solid #1d4ed8; border-radius: 12px; overflow: hidden; color: #0f172a;">
        <div style="background: #1e3a8a; color: #ffffff; padding: 20px 24px; border-bottom: 4px solid #facc15;">
          <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #fde047;">Open Tryouts Registration 2027 (FREE)</div>
          <h2 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 900;">SIMOLAT FOOTBALL ACADEMY OPEN TRYOUTS REGISTRATION FORM 2027</h2>
        </div>
        <div style="padding: 22px 24px; background: #ffffff;">
          <p style="margin: 0 0 16px 0; font-size: 14px; color: #334155;">
            A new Open Tryouts 2027 player application has been delivered to <strong>${escapeHtml(TRYOUTS_RECIPIENT)}</strong>.
          </p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 9px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700; width: 38%;">Reference ID</td><td style="padding: 9px 12px; border: 1px solid #e2e8f0; font-weight: 800; color: #1d4ed8;">${escapeHtml(referenceId)}</td></tr>
            <tr><td style="padding: 9px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Registration Category</td><td style="padding: 9px 12px; border: 1px solid #e2e8f0;">${escapeHtml(category)}</td></tr>
            <tr><td style="padding: 9px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Player Full Name</td><td style="padding: 9px 12px; border: 1px solid #e2e8f0; font-weight: 800;">${escapeHtml(fullName)}</td></tr>
            <tr><td style="padding: 9px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Date of Birth</td><td style="padding: 9px 12px; border: 1px solid #e2e8f0;">${escapeHtml(dob)}</td></tr>
            <tr><td style="padding: 9px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Age Group</td><td style="padding: 9px 12px; border: 1px solid #e2e8f0;">${escapeHtml(ageGroup)}</td></tr>
            <tr><td style="padding: 9px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Playing Position</td><td style="padding: 9px 12px; border: 1px solid #e2e8f0;">${escapeHtml(position)}</td></tr>
            <tr><td style="padding: 9px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Preferred Foot</td><td style="padding: 9px 12px; border: 1px solid #e2e8f0;">${escapeHtml(foot)}</td></tr>
            <tr><td style="padding: 9px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">NIN</td><td style="padding: 9px 12px; border: 1px solid #e2e8f0;">${escapeHtml(nin)}</td></tr>
            <tr><td style="padding: 9px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">School / Academic Result</td><td style="padding: 9px 12px; border: 1px solid #e2e8f0;">${escapeHtml(school)}</td></tr>
            <tr><td style="padding: 9px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Phone Number</td><td style="padding: 9px 12px; border: 1px solid #e2e8f0;">${escapeHtml(phoneNumber)}</td></tr>
            <tr><td style="padding: 9px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Email Address</td><td style="padding: 9px 12px; border: 1px solid #e2e8f0;">${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : 'Not Provided'}</td></tr>
            <tr><td style="padding: 9px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Parent / Guardian (Under-18)</td><td style="padding: 9px 12px; border: 1px solid #e2e8f0;">${escapeHtml(guardian)}</td></tr>
            <tr><td style="padding: 9px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Residential Address</td><td style="padding: 9px 12px; border: 1px solid #e2e8f0;">${escapeHtml(address)}</td></tr>
            <tr><td style="padding: 9px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Medical History &amp; Clearance</td><td style="padding: 9px 12px; border: 1px solid #e2e8f0;">${escapeHtml(medical)}</td></tr>
            <tr><td style="padding: 9px 12px; border: 1px solid #e2e8f0; background: #f8fafc; font-weight: 700;">Submitted At</td><td style="padding: 9px 12px; border: 1px solid #e2e8f0;">${escapeHtml(submittedAt)}</td></tr>
          </table>
          <p style="margin-top: 14px; font-size: 12px; background: #fef9c3; border: 1px solid #eab308; padding: 10px 12px; border-radius: 6px; color: #854d0e;">
            <strong>MANDATORY SAFEGUARDING NOTICE:</strong> Players of "UNDER 18" must be accompanied by their parents for the tryout.
          </p>
        </div>
        <div style="background: #f8fafc; padding: 12px 24px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
          Simolat Football Academy • 77 Awolowo Road, Ikoyi SW, Lagos • ${escapeHtml(TRYOUTS_RECIPIENT)}
        </div>
      </div>
    `;

    const smtpReady = isSmtpConfigured();

    if (!smtpReady) {
      saveTryoutRegistrationRecord({
        referenceId,
        category,
        fullName,
        dob,
        ageGroup,
        position,
        foot,
        nin,
        school,
        phoneNumber,
        email: email || 'Not Provided',
        guardian,
        address,
        medical,
        recipient: TRYOUTS_RECIPIENT,
        submittedAt,
        emailSent: false
      });

      res.status(200).json({
        ok: true,
        emailSent: false,
        smtpConfigured: false,
        recipient: TRYOUTS_RECIPIENT,
        referenceId,
        message: `Tryouts registration saved (${referenceId}) for ${TRYOUTS_RECIPIENT}. Automated server SMTP delivery requires SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables.`
      });
      return;
    }

    try {
      const transporter = createMailTransporter();
      const fromAddress =
        process.env.SMTP_FROM ||
        `Simolat Football Academy Tryouts <${process.env.SMTP_USER || TRYOUTS_RECIPIENT}>`;

      const info = await transporter.sendMail({
        from: fromAddress,
        to: TRYOUTS_RECIPIENT,
        ...(email ? { replyTo: email } : {}),
        subject: `Open Tryouts 2027 Application: ${fullName} (${ageGroup} • ${position}) [${referenceId}]`,
        text: textBody,
        html: htmlBody
      });

      saveTryoutRegistrationRecord({
        referenceId,
        category,
        fullName,
        dob,
        ageGroup,
        position,
        foot,
        nin,
        school,
        phoneNumber,
        email: email || 'Not Provided',
        guardian,
        address,
        medical,
        recipient: TRYOUTS_RECIPIENT,
        submittedAt,
        emailSent: true,
        messageId: info.messageId
      });

      res.status(200).json({
        ok: true,
        emailSent: true,
        smtpConfigured: true,
        recipient: TRYOUTS_RECIPIENT,
        referenceId,
        messageId: info.messageId,
        message: `Tryouts application successfully delivered to ${TRYOUTS_RECIPIENT}.`
      });
    } catch (err) {
      console.error('Tryouts SMTP email-forwarding error:', err);
      saveTryoutRegistrationRecord({
        referenceId,
        category,
        fullName,
        dob,
        ageGroup,
        position,
        foot,
        nin,
        school,
        phoneNumber,
        email: email || 'Not Provided',
        guardian,
        address,
        medical,
        recipient: TRYOUTS_RECIPIENT,
        submittedAt,
        emailSent: false
      });

      res.status(502).json({
        ok: false,
        emailSent: false,
        smtpConfigured: true,
        recipient: TRYOUTS_RECIPIENT,
        referenceId,
        error: `Tryouts application saved (${referenceId}), but SMTP delivery to ${TRYOUTS_RECIPIENT} failed. Use the direct email button below or check SMTP credentials.`
      });
    }
  });

  // API Routes for Simolat Football Academy Table
  app.get('/api/academy-table', (_req, res) => {
    const db = readDb();
    db.teams = sortTeams(db.teams);
    res.json(db);
  });

  app.post('/api/academy-table/match', (req, res) => {
    const { homeTeamName, awayTeamName, homeGoals, awayGoals, matchDate } = req.body;
    const hg = parseInt(homeGoals, 10);
    const ag = parseInt(awayGoals, 10);

    if (isNaN(hg) || isNaN(ag) || !homeTeamName || !awayTeamName) {
      res.status(400).json({ error: 'Valid team names and numeric goals required' });
      return;
    }

    if (homeTeamName === awayTeamName) {
      res.status(400).json({ error: 'Home team and away team must be different' });
      return;
    }

    const db = readDb();
    const homeTeam = db.teams.find((t) => t.name.toLowerCase() === homeTeamName.toLowerCase());
    const awayTeam = db.teams.find((t) => t.name.toLowerCase() === awayTeamName.toLowerCase());

    if (!homeTeam || !awayTeam) {
      res.status(404).json({ error: 'Team not found in academy database' });
      return;
    }

    // Update Home Team stats
    homeTeam.played += 1;
    homeTeam.gf += hg;
    homeTeam.ga += ag;
    homeTeam.gd = homeTeam.gf - homeTeam.ga;

    // Update Away Team stats
    awayTeam.played += 1;
    awayTeam.gf += ag;
    awayTeam.ga += hg;
    awayTeam.gd = awayTeam.gf - awayTeam.ga;

    if (hg > ag) {
      homeTeam.won += 1;
      homeTeam.pts += 3;
      awayTeam.lost += 1;
      homeTeam.form = [...(homeTeam.form || []).slice(-4), 'W'];
      awayTeam.form = [...(awayTeam.form || []).slice(-4), 'L'];
    } else if (hg === ag) {
      homeTeam.drawn += 1;
      homeTeam.pts += 1;
      awayTeam.drawn += 1;
      awayTeam.pts += 1;
      homeTeam.form = [...(homeTeam.form || []).slice(-4), 'D'];
      awayTeam.form = [...(awayTeam.form || []).slice(-4), 'D'];
    } else {
      homeTeam.lost += 1;
      awayTeam.won += 1;
      awayTeam.pts += 3;
      homeTeam.form = [...(homeTeam.form || []).slice(-4), 'L'];
      awayTeam.form = [...(awayTeam.form || []).slice(-4), 'W'];
    }

    const newMatch: MatchRecord = {
      id: 'm-' + Date.now(),
      homeTeam: homeTeam.name,
      awayTeam: awayTeam.name,
      homeGoals: hg,
      awayGoals: ag,
      date: matchDate || new Date().toISOString().split('T')[0]
    };

    db.matches = [newMatch, ...(db.matches || [])];
    db.teams = sortTeams(db.teams);

    writeDb(db);
    res.json(db);
  });

  app.post('/api/academy-table/reset', (_req, res) => {
    writeDb(INITIAL_DATA);
    res.json(INITIAL_DATA);
  });

  // Official Store Order Creation & Real-Time Shipping Status API
  app.get('/api/orders', (_req, res) => {
    const orders = readOrders();
    res.json({
      ok: true,
      orders: orders.slice(0, 20).map((o) => ({
        orderNumber: o.orderNumber,
        customerName: o.customerName,
        totalLabel: o.totalLabel,
        createdAt: o.createdAt
      }))
    });
  });

  app.get('/api/orders/:orderNumber', (req, res) => {
    const query = String(req.params.orderNumber || '').trim().toUpperCase();
    if (!query) {
      res.status(400).json({ ok: false, error: 'Please provide an order number (e.g., SFA-2026-1042).' });
      return;
    }
    const orders = readOrders();
    const found = orders.find((o) => o.orderNumber.toUpperCase() === query);
    if (!found) {
      res.status(404).json({
        ok: false,
        error: `No order found matching "${query}". Check your confirmation receipt or try SFA-2026-1042.`
      });
      return;
    }
    res.json({ ok: true, order: buildLiveOrderSnapshot(found) });
  });

  app.post('/api/orders', (req, res) => {
    const customerName = String(req.body?.customerName || 'Simolat Supporter').trim().slice(0, 80) || 'Simolat Supporter';
    const destination = String(req.body?.destination || 'Ikoyi SW, Lagos, Nigeria').trim().slice(0, 120) || 'Ikoyi SW, Lagos, Nigeria';
    const totalLabel = String(req.body?.totalLabel || '€85.00').trim().slice(0, 32) || '€85.00';
    const rawItems = Array.isArray(req.body?.items) ? req.body.items : [];
    const items: OrderItemRecord[] = rawItems.length
      ? rawItems.slice(0, 12).map((it: Record<string, unknown>) => ({
          name: String(it?.name || 'Official Simolat Sporting Kit').slice(0, 100),
          details: String(it?.details || 'Official Matchday Edition').slice(0, 120),
          price: String(it?.price || '₦18,000').slice(0, 32)
        }))
      : [{ name: 'Official 2026/27 Home Kit', details: 'Official Matchday Edition', price: totalLabel }];

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `SFA-2026-${randomCode}`;
    const waybill = `SFA-EXP-${Date.now().toString().slice(-6)}`;
    const newOrder: StoreOrderRecord = {
      orderNumber,
      customerName,
      destination,
      carrier: 'Simolat Express / DHL Dispatch',
      trackingWaybill: waybill,
      createdAt: new Date().toISOString(),
      baseStageIndex: 0,
      autoAdvance: true,
      items,
      totalLabel
    };

    const orders = readOrders();
    orders.unshift(newOrder);
    writeOrders(orders.slice(0, 100));

    res.status(201).json({
      ok: true,
      order: buildLiveOrderSnapshot(newOrder)
    });
  });

  // In development, mount Vite middleware
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
