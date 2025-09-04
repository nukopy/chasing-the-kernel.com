/**
 * Nukopy png icon
 */
export default function NukopyIconPng({
  className = "w-5 h-5",
}: {
  className?: string;
}) {
  const src = "/images/NukopyIcon.png";
  return <img src={src} alt="Nucopy Icon" className={className} />;
}
