/**
 * LinkedIn png icon
 */
export default function LinkedInIconPng({
  className = "w-5 h-5",
}: {
  className?: string;
}) {
  const src = "/images/LinkedIn/LinkedInIconBackgroundBlack.png";
  return <img src={src} alt="LinkedIn Icon" className={className} />;
}
