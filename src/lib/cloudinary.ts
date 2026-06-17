import { env } from "./env";

/**
 * Build a Cloudinary delivery URL for an image public id. Returns null when no
 * cloud name is configured (pre-media), so callers render a placeholder.
 * A full next-cloudinary integration can replace this once media lands.
 */
export function cloudinaryImageUrl(
  publicId: string | null | undefined,
  { width = 800, height }: { width?: number; height?: number } = {},
): string | null {
  const cloud = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloud || !publicId) return null;
  const transform = ["f_auto", "q_auto", `w_${width}`, height ? `h_${height}` : "", "c_fill"]
    .filter(Boolean)
    .join(",");
  return `https://res.cloudinary.com/${cloud}/image/upload/${transform}/${publicId}`;
}
