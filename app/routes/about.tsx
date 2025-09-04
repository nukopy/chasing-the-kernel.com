import { Calendar, MapPin } from "lucide-react";
import { useLoaderData } from "react-router";
import { getIconByType, type IconType } from "../components/icons";

type LoaderData = {
  name: string;
  description: string;
  location: string;
  links: {
    id: string;
    href: string;
    label: string;
    icon: IconType;
    className: string;
  }[];
};

const DEFAULT_ICON_CLASSNAME = "w-5 h-5";
export function loader(): LoaderData {
  console.info("[loader: About] try");

  return {
    name: "nukopy",
    description: "I'm a software developer",
    location: "Yamanashi, Japan",
    links: [
      {
        id: "github",
        href: "https://github.com/nukopy",
        label: "GitHub",
        icon: "github",
        className: DEFAULT_ICON_CLASSNAME,
      },
      {
        id: "twitter",
        href: "https://twitter.com/nukopy_dev",
        label: "X (Twitter)",
        icon: "x",
        className: DEFAULT_ICON_CLASSNAME,
      },
      {
        id: "zenn",
        href: "https://zenn.dev/nukopy",
        label: "Zenn",
        icon: "zenn",
        className: DEFAULT_ICON_CLASSNAME,
      },
      {
        id: "linkedin",
        href: "https://www.linkedin.com/in/nukopy/",
        label: "LinkedIn",
        icon: "linkedin",
        className: "w-6",
      },
      {
        id: "hatena",
        href: "https://pyteyon.hatenablog.com/",
        label: "Hatena Blog",
        icon: "blog",
        className: DEFAULT_ICON_CLASSNAME,
      },
    ],
    hoge: "hoge",
  } as LoaderData;
}

export default function About() {
  const { name, description, location, links } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="d-card bg-base-100 shadow-lg">
        <div className="d-card-body">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="d-avatar">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                {getIconByType("nukopy", "w-12 h-12 text-primary-content")}
              </div>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-base-content mb-2">
                {name}
              </h1>
              <p className="text-lg text-base-content/80 mb-3">{description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/60">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {/* <span>Joined {joinedDate}</span> */}
                </div>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="text-xl font-semibold text-base-content mb-4">
              Connect with me
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-btn d-btn-outline d-btn-primary flex items-center justify-start gap-3 h-auto py-3 hover:d-btn-primary hover:scale-105 transition-all duration-200"
                >
                  {getIconByType(link.icon, link.className)}
                  <span className="font-medium">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
