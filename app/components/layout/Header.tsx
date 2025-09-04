import { Link } from "react-router";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { ThemeSwitcher } from "../ThemeSwitcher";

const MENU_ITEMS = [
  {
    id: "contents",
    href: "/contents",
    label: "Contents",
  },
  {
    id: "tags",
    href: "/tags",
    label: "Tags",
  },
  {
    id: "about",
    href: "/about",
    label: "About",
  },
  {
    id: "misc",
    href: "/misc",
    label: "Misc",
  },
];

export function Header() {
  return (
    <header className="navbar bg-base-200 border-b border-base-300 sticky top-0 z-50">
      <div className="navbar-start">
        {/* dropdown menu displayed when small screen, hidden on lg */}
        <div className="dropdown dropdown-bottom">
          <button type="button" tabIndex={0} className="btn lg:hidden">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              role="img"
              aria-label="メニュー"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            // biome-ignore lint/a11y/noNoninteractiveTabindex: to close when focus is lost
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-30 p-2 shadow"
          >
            {MENU_ITEMS.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.href}
                  onClick={() => {
                    // ドロップダウンを閉じるためにフォーカスを外す
                    (document.activeElement as HTMLElement)?.blur();
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* logo */}
        <Link to="/" className="btn btn-ghost text-xl">
          Chasing the Kernel
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {MENU_ITEMS.map((item) => (
            <li key={item.id}>
              <Link to={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
