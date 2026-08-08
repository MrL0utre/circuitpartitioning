import Link from "next/link";
import { primaryNavigation } from "../data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link className="footer-wordmark" href="/">
            Circuit Partitioning
          </Link>
          <p>
            Open infrastructure for inspectable circuit partitioning research.
          </p>
        </div>
        <div>
          <h2>Explore</h2>
          <ul>
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Project</h2>
          <ul>
            <li>
              <a href="https://github.com/MrL0utre/circuitpartitioning">
                GitHub repository
              </a>
            </li>
            <li>
              <Link href="/about#contribute">Contribution policy</Link>
            </li>
            <li>
              <Link href="/about#editorial-policy">Editorial policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>
          Community project · English is the canonical editorial language
        </span>
        <span>Foundation release · 2026</span>
      </div>
    </footer>
  );
}
