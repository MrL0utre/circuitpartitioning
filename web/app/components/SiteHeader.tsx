import Link from "next/link";
import { primaryNavigation } from "../data/site";
import { Search } from "./Search";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link
          className="wordmark"
          href="/"
          aria-label="Circuit Partitioning home"
        >
          <span className="wordmark-mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            Circuit
            <br />
            Partitioning
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="primary-nav">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Search />
      </div>
    </header>
  );
}
