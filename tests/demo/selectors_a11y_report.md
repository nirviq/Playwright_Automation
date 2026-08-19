Accessibility report — tests/demo/selectors.spec.js

Summary
- Test run: `tests/demo/selectors.spec.js` (Axe via @axe-core/playwright AxeBuilder)
- Browsers: chromium, firefox, webkit (failures observed)
- Result: Axe reported multiple violations; test currently fails because `expect(results.violations.length).toBe(0)`.

Top violations (observed)
1. landmark-one-main (moderate)
   - Description: Page does not have a `main` landmark.
   - Example failing node(s): `<html lang="en">` (whole document)
   - Why it matters: Landmarks (like `<main>`) help screen reader users skip to primary content.
   - Fix: Wrap primary content in `<main>` or add `role="main"` to the primary container.
     - Example: `<main id="main-content">...page content...</main>`

2. page-has-heading-one (moderate)
   - Description: Page must have a single level-one heading (`<h1>`).
   - Example failing node(s): `<html lang="en">`
   - Why it matters: H1 provides clear page topic for assistive tech and improves document structure.
   - Fix: Add a clear `<h1>` representing the page title (visible or offscreen if needed).
     - Example: `<h1 class="visually-hidden">Login to Swag Labs</h1>`

3. region (moderate)
   - Description: Some content is not contained by landmarks.
   - Example failing nodes: `.login_logo`, `.form_group` (username/password inputs), `.login_credentials_wrap`
   - Why it matters: Landmarks improve navigation and context for keyboard/screen-reader users.
   - Fix: Ensure relevant sections are contained inside semantic landmarks: `<header>`, `<main>`, `<nav>`, `<footer>`, or add `role` attributes.
     - Example: `<header class="login_header"> <div class="login_logo">Swag Labs</div> </header>`

Notes specific to this test file
- The test uses `page.getByPlaceholder('Username')` to target the username input; that is an accessible locator, but the Axe results are about the page's semantic structure rather than the selector.
- The failures are on production sample site `https://www.saucedemo.com/`; resolving them requires changes to the application markup (add landmarks, headings).

Suggested actions
- If you control the app code:
  - Add a `<main>` element around the login content and include an `<h1>` with the page title.
  - Ensure prominent regions (login form, header/logo) are wrapped in landmarks.
  - Re-run the Axe test until violations are cleared.

- If you don't control the app (third-party):
  - Document the violations as known issues.
  - Add a test-level expectation that filters/ignores these specific rules if acceptable, e.g.:
    ```js
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aa', 'wcag21aa']) // run desired tags only
      .analyze();

    // Option: filter out 'page-has-heading-one' if you accept it
    const violations = results.violations.filter(v => v.id !== 'page-has-heading-one');
    expect(violations.length).toBe(0);
    ```
  - Prefer documenting the exceptions and only filtering when justified by product/UX.

Commands to re-run the test

```bash
# from project root
npm install --save-dev axe-core @axe-core/playwright
npx playwright test tests/demo/selectors.spec.js --reporter=list
```

Next steps I can take
- Open a PR patch for the test to either (A) assert only new violations are zero, or (B) add filtering for known exceptions and add documentation of why.
- Help prepare a minimal app-side patch (HTML snippets) if you can edit the app's source.

Report created at: `/tests/demo/selectors_a11y_report.md`

----

Remediations & concrete examples

1) Add landmarks and page title

If you can edit the HTML for the login page, apply these structural changes:

```html
<header class="login_header">
  <div class="login_logo">Swag Labs</div>
</header>

<main id="main-content">
  <h1 class="visually-hidden">Login to Swag Labs</h1>
  <section class="login_credentials_wrap" aria-labelledby="login-heading">
    <!-- form and inputs -->
  </section>
</main>

<footer class="site_footer"> ... </footer>
```

2) Ensure form inputs have programmatic labels

Use visible labels or accessible labels that are programmatic (for/aria):

```html
<label for="user-name" class="visually-hidden">Username</label>
<input id="user-name" name="user-name" type="text" placeholder="Username" />

<label for="password" class="visually-hidden">Password</label>
<input id="password" name="password" type="password" placeholder="Password" />
```

If visible labels are not desired, `aria-label` or `aria-labelledby` is acceptable:

```html
<input id="user-name" aria-label="Username" />
```

3) CSS helper for visually-hidden content

```css
.visually-hidden {
  position: absolute !important;
  height: 1px; width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
```

4) Test-side: narrow Axe rules or ignore known failures

If you cannot change the app, either restrict Axe to run only specific tags/rules, or filter results in the test. Examples:

Filter results in the Playwright test (keeps test green while documenting exception):

```js
const results = await new AxeBuilder({ page }).analyze();
// whitelist exceptions by id
const allowlist = new Set(['page-has-heading-one', 'landmark-one-main']);
const violations = results.violations.filter(v => !allowlist.has(v.id));
expect(violations.length).toBe(0);

if (violations.length === 0) {
  console.log('Only allowed/known Axe violations present:', results.violations.map(v => v.id));
} else {
  console.log('Unexpected violations:', violations.map(v => v.id));
}
```

Or limit Axe to specific tags (WCAG categories):

```js
const results = await new AxeBuilder({ page })
  .withTags(['wcag2aa'])
  .analyze();
```

5) Re-run and iterate

- Re-run the Playwright Axe test after each app change until violations are resolved.
- Keep a documented list of accepted exceptions if you must ship without fixes.

Additional resources

- Axe rule docs: https://dequeuniversity.com/rules/axe/4.13/
- Playwright accessibility guide: https://playwright.dev/docs/accessibility-testing

If you'd like, I can prepare a small PR that (A) suggests the HTML snippets as a patch for the app (if repo contains the app source), or (B) updates the test to filter the known exceptions and documents the rationale in a comment. Tell me which option you prefer.
