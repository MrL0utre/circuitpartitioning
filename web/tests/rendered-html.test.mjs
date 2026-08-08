import assert from "node:assert/strict";
import test from "node:test";

const routes = [
  ["/", /Circuit partitioning: models, methods, and evidence\./i],
  ["/learn", /Course on circuit partitioning/i],
  [
    "/learn/foundations",
    /Definitions and objectives for circuit partitioning/i,
  ],
  ["/research", /Classification of circuit-partitioning research/i],
  ["/benchmarks", /Protocol for reproducible algorithm comparison/i],
  ["/circuits", /Circuits, representations, and derived analyses/i],
  ["/about", /Scope, governance, and contribution policy/i],
];

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "test",
    `${process.pid}-${Date.now()}-${pathname}`,
  );
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

for (const [pathname, expected] of routes) {
  test(`server-renders ${pathname}`, async () => {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await response.text();
    assert.match(html, expected);
    assert.match(html, /<html lang="en">/i);
    assert.match(html, /Skip to content/i);
    assert.doesNotMatch(html, /Your site is taking shape|Building your site/i);
  });
}

test("foundation lesson includes accessible mathematical output", async () => {
  const response = await render("/learn/foundations");
  const html = await response.text();
  assert.match(html, /class="katex-mathml"/i);
  assert.match(html, /f_c/i);
  assert.match(html, /f_/i);
  assert.match(html, /Initial model profile/i);
  assert.match(html, /References and scope/i);
  assert.match(html, /starts at a red source boundary/i);
  assert.match(html, /data-path-boundary="source"/i);
  assert.match(html, /data-path-boundary="sink"/i);
});

test("reference circuit exposes only red-to-red timing paths", async () => {
  const response = await render("/circuits");
  const html = await response.text();
  assert.match(html, /two red-to-red paths/i);
  assert.match(html, /source register/i);
  assert.match(html, /sink register/i);
  assert.match(html, /critical path · 3 ns/i);
});

test("navigation exposes every stable top-level route", async () => {
  const response = await render("/");
  const html = await response.text();
  for (const pathname of [
    "/learn",
    "/research",
    "/benchmarks",
    "/circuits",
    "/about",
  ]) {
    assert.match(html, new RegExp(`href=["']${pathname}["']`, "i"));
  }
});
