import CustomImage from "@/components/CustomImageProps";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/lib/links";

/** App store badges; a badge is only shown once its store URL is set. */
export default function StoreBadges({ className = "" }: { className?: string }) {
  if (!APP_STORE_URL && !PLAY_STORE_URL) return null;
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {APP_STORE_URL && (
        <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
          <CustomImage
            src="/landingImageAppStore.svg"
            alt="Download on the App Store"
            width={150}
            height={51}
            className="h-auto w-[150px]"
          />
        </a>
      )}
      {PLAY_STORE_URL && (
        <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
          <CustomImage
            src="/landingImagePlayStore.svg"
            alt="Get it on Google Play"
            width={150}
            height={46}
            className="h-auto w-[150px]"
          />
        </a>
      )}
    </div>
  );
}
