import { AdminHeader, Card, Field, TextArea, Checkbox } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { getSettingsRow } from "@/server/admin-data";
import { upsertSettings } from "@/actions/admin/settings";
import { SETTINGS_FALLBACK } from "@/content/site";

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const { error, saved } = await searchParams;
  const row = await getSettingsRow();
  const s = row ?? { ...SETTINGS_FALLBACK, id: "singleton" };

  return (
    <>
      <AdminHeader title="Settings" description="Contact details, hero video and site-wide options." />
      <form action={upsertSettings}>
        <Card className="space-y-5">
          {saved && (
            <p className="rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
              Settings saved.
            </p>
          )}
          {error && (
            <p className="rounded-lg border border-saffron/40 bg-saffron/10 px-4 py-3 text-sm text-text">
              Please check the required fields (a valid email is required).
            </p>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Phone" name="phone" required defaultValue={s.phone} />
            <Field label="Email" name="email" type="email" required defaultValue={s.email} />
          </div>
          <TextArea label="Address" name="address" rows={2} required defaultValue={s.address} />

          <Checkbox label="Admissions open" name="admissionsOpen" defaultChecked={s.admissionsOpen} />

          <hr className="border-line" />
          <h2 className="font-display text-lg font-semibold text-indigo">Media</h2>
          <Field
            label="Hero video URL"
            name="heroVideoUrl"
            defaultValue={s.heroVideoUrl}
            placeholder="https://… mp4 (Cloudinary). Leave blank for the gradient fallback."
          />
          <Field
            label="Prospectus PDF URL"
            name="prospectusPdfUrl"
            defaultValue={s.prospectusPdfUrl}
            placeholder="https://… (shown on the Admissions page)"
          />

          <hr className="border-line" />
          <h2 className="font-display text-lg font-semibold text-indigo">Social links</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Facebook" name="facebookUrl" defaultValue={s.facebookUrl} />
            <Field label="Instagram" name="instagramUrl" defaultValue={s.instagramUrl} />
            <Field label="YouTube" name="youtubeUrl" defaultValue={s.youtubeUrl} />
          </div>

          <div className="pt-2">
            <SubmitButton>Save settings</SubmitButton>
          </div>
        </Card>
      </form>
    </>
  );
}
