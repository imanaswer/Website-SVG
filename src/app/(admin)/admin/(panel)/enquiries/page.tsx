import type { EnquiryStatus } from "@prisma/client";
import { AdminHeader, Badge, EmptyState } from "@/components/admin/ui";
import { listEnquiries } from "@/server/admin-data";
import { setEnquiryStatus } from "@/actions/admin/enquiries";
import { formatDateTime } from "@/lib/format";

const STATUS_TONE: Record<EnquiryStatus, "indigo" | "amber" | "gray"> = {
  NEW: "indigo",
  CONTACTED: "amber",
  CLOSED: "gray",
};

const NEXT_STATUS: { label: string; value: EnquiryStatus }[] = [
  { label: "Mark new", value: "NEW" },
  { label: "Mark contacted", value: "CONTACTED" },
  { label: "Mark closed", value: "CLOSED" },
];

export default async function AdminEnquiriesPage() {
  const enquiries = await listEnquiries();

  return (
    <>
      <AdminHeader title="Enquiries" description="Admissions and contact-form submissions." />
      {enquiries.length === 0 ? (
        <EmptyState message="No enquiries yet." />
      ) : (
        <ul className="space-y-4">
          {enquiries.map((e) => (
            <li key={e.id} className="rounded-xl border border-line bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-indigo">
                    {e.parentName}
                    {e.childName ? <span className="text-muted"> · for {e.childName}</span> : null}
                  </p>
                  <p className="text-sm text-muted">{formatDateTime(e.createdAt)}</p>
                </div>
                <Badge tone={STATUS_TONE[e.status]}>{e.status}</Badge>
              </div>

              <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                <div>
                  <dt className="inline text-muted">Phone: </dt>
                  <dd className="inline">
                    <a href={`tel:${e.phone}`} className="text-indigo hover:underline">
                      {e.phone}
                    </a>
                  </dd>
                </div>
                {e.email && (
                  <div>
                    <dt className="inline text-muted">Email: </dt>
                    <dd className="inline">
                      <a href={`mailto:${e.email}`} className="text-indigo hover:underline">
                        {e.email}
                      </a>
                    </dd>
                  </div>
                )}
                {e.gradeInterest && (
                  <div>
                    <dt className="inline text-muted">Class of interest: </dt>
                    <dd className="inline">{e.gradeInterest}</dd>
                  </div>
                )}
              </dl>

              {e.message && <p className="mt-3 rounded-lg bg-parchment px-4 py-3 text-sm text-text">{e.message}</p>}

              <div className="mt-4 flex flex-wrap gap-2">
                {NEXT_STATUS.filter((s) => s.value !== e.status).map((s) => (
                  <form key={s.value} action={setEnquiryStatus}>
                    <input type="hidden" name="id" value={e.id} />
                    <input type="hidden" name="status" value={s.value} />
                    <button
                      type="submit"
                      className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-indigo hover:bg-parchment"
                    >
                      {s.label}
                    </button>
                  </form>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
