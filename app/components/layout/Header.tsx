import { LanguageSwitcher } from "../LanguageSwitcher";
import { ThemeSwitcher } from "../ThemeSwitcher";

export function Header() {
  return (
    <header className="navbar bg-base-200 border-b border-base-300 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <button type="button" className="btn btn-ghost lg:hidden">
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
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a href="/contents">Contents</a>
            </li>
            <li>
              <a href="/tags">Tags</a>
            </li>
          </ul>
        </div>
        <a href="/" className="btn btn-ghost text-xl">
          Chasing the Kernel
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/contents">Contents</a>
          </li>
          <li>
            <a href="/tags">Tags</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
