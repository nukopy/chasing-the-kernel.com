import NucopyIconPngImage from "./images/NukopyIcon.png";

/**
 * Nukopy png icon
 */
export default function NukopyIconPng({
  className = "w-5 h-5",
}: {
  className?: string;
}) {
  return (
    <img src={NucopyIconPngImage} alt="Nucopy Icon" className={className} />
  );
}
