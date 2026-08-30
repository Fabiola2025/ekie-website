// lib/pay-api.ts — API client for the /pay/[slug] flow
//
// Wraps calls to the existing public endpoints on api.myekie.com:
//   GET  /api/schools/pay/:slug
//   GET  /api/schools/pay/:slug/student/:studentId?last_name=X
//   GET  /api/schools/pay/:slug/student/:studentId/fees
//   POST /api/payments/initiate-web      (initiates CinetPay for /pay/[slug])
//   GET  /api/payments/public-status/:id (receipt data for success/failed pages)
//
// Security notes:
//   - All URLs hardcoded to https://api.myekie.com — no env-var overrides
//     accepted from client bundle
//   - No auth token needed for these public endpoints (they're intended
//     for parent web payment flow)
//   - Payments always redirect to CinetPay's hosted checkout — Ékié never
//     handles card/MoMo credentials directly

const API_URL = 'https://api.myekie.com';

// ── Types ─────────────────────────────────────────────────────

export interface School {
  slug: string;
  name: string;
  location?: string;
  academic_year?: string;
  logo_url?: string;
}

export interface Student {
  id: string;                    // internal UUID
  student_id: string;            // school-assigned ID (e.g. NUR001)
  full_name: string;
  class_name?: string;
  term?: string;
  total_fee: number | string;
  amount_paid: number | string;
  balance_due: number | string;
  status: 'unpaid' | 'partial' | 'paid';
  parent_name?: string;
}

export interface FeeItem {
  id: string;
  student_id: string;
  fee_name: string;
  amount: number | string;
  amount_paid: number | string;
  fee_type?: 'mandatory' | 'optional';
  due_date?: string | null;
}

export interface PayInitResponse {
  success: boolean;
  paymentId?: string;
  paymentUrl?: string;
  merchantTransactionId?: string;
  amount?: number;
  message?: string;
}

export interface PublicPaymentStatus {
  id: string;
  status: 'INITIATED' | 'PENDING' | 'SUCCESS' | 'FAILED';
  amount: number;
  currency: string;
  feature_type: string;
  designation?: string;
  merchant_transaction_id: string;
  initiated_at: string;
  completed_at?: string;
  schoolName?: string;
  schoolSlug?: string;
  studentName?: string;
  studentId?: string;
  className?: string;
  term?: string;
  feeItemNames?: string[];
  payerName?: string;
}

// ── API functions ─────────────────────────────────────────────

export async function fetchSchool(slug: string): Promise<School | null> {
  const res = await fetch(`${API_URL}/api/schools/pay/${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`School fetch failed (${res.status})`);
  const data = await res.json();
  if (!data.success || !data.school) return null;
  return data.school;
}

export async function fetchStudent(
  slug: string,
  studentId: string,
  lastName: string,
): Promise<Student | null> {
  const url =
    `${API_URL}/api/schools/pay/${encodeURIComponent(slug)}` +
    `/student/${encodeURIComponent(studentId)}` +
    `?last_name=${encodeURIComponent(lastName)}`;
  const res = await fetch(url);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Student fetch failed (${res.status})`);
  const data = await res.json();
  if (!data.success || !data.student) return null;
  return data.student;
}

export async function fetchStudentFees(
  slug: string,
  studentId: string,
): Promise<FeeItem[]> {
  const url =
    `${API_URL}/api/schools/pay/${encodeURIComponent(slug)}` +
    `/student/${encodeURIComponent(studentId)}/fees`;
  const res = await fetch(url);
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`Fees fetch failed (${res.status})`);
  const data = await res.json();
  if (!data.success || !Array.isArray(data.feeItems)) return [];
  return data.feeItems;
}

export async function initiatePayment(input: {
  slug: string;
  studentId: string;
  feeItemIds: string[];
  payerName: string;
  payerPhone: string;
  payerEmail?: string;
}): Promise<PayInitResponse> {
  const res = await fetch(`${API_URL}/api/payments/initiate-web`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      slug: input.slug,
      studentId: input.studentId,
      feeItemIds: input.feeItemIds,
      payerName: input.payerName,
      payerPhone: input.payerPhone,
      payerEmail: input.payerEmail || undefined,
    }),
  });

  if (!res.ok) {
    try {
      const data = await res.json();
      return { success: false, message: data.message || `HTTP ${res.status}` };
    } catch {
      return { success: false, message: `Payment init failed (${res.status})` };
    }
  }

  const data = await res.json();
  return data;
}

export async function fetchPaymentStatus(paymentId: string): Promise<PublicPaymentStatus | null> {
  const res = await fetch(
    `${API_URL}/api/payments/public-status/${encodeURIComponent(paymentId)}`
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.success ? data.payment : null;
}

// ── Utility ───────────────────────────────────────────────────

export const formatXAF = (n: number | string) =>
  Number(n || 0).toLocaleString('en-US') + ' XAF';

export const num = (v: number | string | undefined | null): number => Number(v || 0);
