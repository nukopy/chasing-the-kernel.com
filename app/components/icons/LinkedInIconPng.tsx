import LinkedInIconPngImage from "./images/LinkedIn/LinkedInIconBackgroundBlack.png";

/**
 * LinkedIn png icon
 */
export default function LinkedInIconPng({
  className = "w-5 h-5",
}: {
  className?: string;
}) {
  return (
    <img src={LinkedInIconPngImage} alt="LinkedIn Icon" className={className} />
  );
}
