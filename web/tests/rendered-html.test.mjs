import assert from "node:assert/strict";
import test from "node:test";

const routes = [
  ["/", /Circuit partitioning, made inspectable\./i],
  ["/learn", /Learn the problem before comparing solutions\./i],
  ["/learn/foundations", /Turn a circuit into a partitioning question/i],
  ["/research", /Organize the literature by questions, not allegiance\./i],
  ["/benchmarks", /A result is more than one number\./i],
  ["/circuits", /Inspect before you download\. Verify after you do\./i],
  ["/about", /Infrastructure for a field, not a monument to one result\./i],
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
  assert.match(html, /Model boundary/i);
  assert.match(html, /References and scope/i);
  assert.match(html, /always starts at a red source boundary/i);
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
