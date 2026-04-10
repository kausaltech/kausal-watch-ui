import React from 'react';

import { screen } from '@testing-library/react';

import RichText from '../../components/common/RichText';
import mockPlan from '../__mocks__/mock-plan-context.json';
import { render } from '../test-utils';

jest.mock('@/context/plan', () => ({
  usePlan: () => mockPlan,
}));

jest.mock('@/components/indicators/IndicatorLinkClient', () => ({
  IndicatorLinkClient: ({ id, children }: { id: string; children: React.ReactNode }) => (
    <a data-testid="indicator-link" data-id={id} href={`/indicators/${id}`}>
      {children}
    </a>
  ),
}));

// react-medium-image-zoom uses ResizeObserver which jsdom doesn't provide
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

/**
 * Builds an example leadContent HTML string exercising every code path in the
 * RichText replace callback, plus common XSS vectors.
 *
 * Broken into groups so individual tests can render only the slice they need
 * (avoids React DOM-nesting warnings from intentionally malformed HTML).
 */
const SAFE_CONTENT = [
  '<h2>Climate Actions Overview</h2>',
  '<p>This plan outlines <strong>key actions</strong> for reducing emissions by <em>40%</em> before 2030.</p>',
].join('\n');

const LINK_CONTENT = [
  // Internal link (domain matches plan.viewUrl)
  '<p><a href="http://sunnydale.localhost/actions/1">Internal action link</a></p>',
  // Hash/anchor link (treated as internal)
  '<p><a href="#section-2">Jump to section 2</a></p>',
  // External link (opens in new tab with rel="noreferrer")
  '<p><a href="https://example.com/report.pdf">External report</a></p>',
  // Link with no href (should degrade to <span>)
  '<p><a>Link with no href</a></p>',
  // File link via data-link-type
  '<p><a href="/documents/plan.pdf" data-link-type="document">Download plan PDF</a></p>',
  // Indicator link via data-link-type="indicator"
  '<p><a href="/indicators/42" data-link-type="indicator" data-id="42">CO2 emissions indicator</a></p>',
].join('\n');

const IMAGE_CONTENT = [
  // Plain image (rewritten by RichTextImage)
  '<div><img src="/media/images/hero.jpg" alt="City skyline" width="800" height="400" /></div>',
  // Image with credit (uses <figure>/<figcaption>, so must NOT be inside <p>)
  '<div><img src="/media/images/park.jpg" alt="Park" width="600" height="300" data-image-credit="J. Doe" /></div>',
  // Image with zoom (original width > 1000)
  '<div><img src="/media/images/detailed-map.jpg" alt="Map" width="800" height="600" data-original-width="2000" data-original-height="1500" /></div>',
].join('\n');

const IFRAME_CONTENT = [
  // Iframe with custom height param
  '<div class="responsive-object"><iframe src="https://embed.example.com/chart?k_height=450" width="100%" height="300"></iframe></div>',
  // Iframe without custom height (returned as-is by parser)
  '<div class="responsive-object"><iframe src="https://embed.example.com/video" width="100%" height="300"></iframe></div>',
].join('\n');

const XSS_CONTENT = [
  // Script tag: React won't mount <script> elements from parsed HTML
  '<script>alert("xss-script")</script>',
  // Inline event handler on a div
  '<div onmouseover="alert(\'xss-mouseover\')">Hover me</div>',
  // javascript: URI in a link (the one theoretical gap)
  '<p><a href="javascript:alert(\'xss-href\')">XSS via javascript URI</a></p>',
  // data: URI with script payload
  '<p><a href="data:text/html,<script>alert(\'xss-data\')</script>">Data URI link</a></p>',
  // onclick handler on external link
  '<p><a href="https://example.com" onclick="alert(\'xss-onclick\')">Click me</a></p>',
].join('\n');

/**
 * Full combined value suitable for passing as leadContent.
 * Individual tests use the slices above to avoid DOM-nesting warnings.
 */
const LEAD_CONTENT = [SAFE_CONTENT, LINK_CONTENT, IMAGE_CONTENT, IFRAME_CONTENT, XSS_CONTENT].join(
  '\n'
);

describe('<RichText /> with leadContent HTML', () => {
  // ── Safe content rendering ──

  it('renders plain HTML content', () => {
    render(<RichText html={SAFE_CONTENT} />);
    expect(screen.getByText('Climate Actions Overview')).toBeInTheDocument();
    expect(screen.getByText(/key actions/)).toBeInTheDocument();
  });

  // ── Link handling ──

  it('renders internal links as plain anchors', () => {
    render(<RichText html={LINK_CONTENT} />);
    const link = screen.getByText('Internal action link');
    expect(link.closest('a')).toHaveAttribute('href', 'http://sunnydale.localhost/actions/1');
    expect(link.closest('a')).not.toHaveAttribute('target');
  });

  it('renders hash links as plain anchors', () => {
    render(<RichText html={LINK_CONTENT} />);
    const link = screen.getByText('Jump to section 2');
    expect(link.closest('a')).toHaveAttribute('href', '#section-2');
  });

  it('renders external links with target="_blank" and rel="noreferrer"', () => {
    const { container } = render(<RichText html={LINK_CONTENT} />);
    // RichText splits the first word into a <span> with an icon, so text
    // queries won't match the full string. Query by href instead.
    const anchor = container.querySelector(
      'a[href="https://example.com/report.pdf"]'
    ) as HTMLAnchorElement;
    expect(anchor).not.toBeNull();
    expect(anchor).toHaveAttribute('target', '_blank');
    expect(anchor).toHaveAttribute('rel', 'noreferrer');
    expect(anchor).toHaveTextContent(/External/);
    expect(anchor).toHaveTextContent(/report/);
  });

  it('renders links with no href as <span>', () => {
    render(<RichText html={LINK_CONTENT} />);
    const el = screen.getByText('Link with no href');
    expect(el.tagName).toBe('SPAN');
  });

  it('renders file links with serveFileBaseUrl prefix', () => {
    render(<RichText html={LINK_CONTENT} />);
    const link = screen.getByText('Download plan PDF');
    expect(link.closest('a')).toHaveAttribute(
      'href',
      'https://watch-api.staging.kausal.tech/documents/plan.pdf'
    );
  });

  it('renders indicator links via data-link-type="indicator"', () => {
    render(<RichText html={LINK_CONTENT} />);
    const link = screen.getByTestId('indicator-link');
    expect(link).toHaveAttribute('data-id', '42');
    expect(link).toHaveTextContent('CO2 emissions indicator');
  });

  // ── Image handling ──

  it('renders images with serveFileBaseUrl prefix', () => {
    render(<RichText html={IMAGE_CONTENT} />);
    const img = screen.getByAltText('City skyline');
    expect(img).toHaveAttribute(
      'src',
      'https://watch-api.staging.kausal.tech/media/images/hero.jpg'
    );
  });

  it('renders image credit when data-image-credit is set', () => {
    render(<RichText html={IMAGE_CONTENT} />);
    expect(screen.getByText(/J\. Doe/)).toBeInTheDocument();
  });

  // ── Iframe handling ──

  it('applies custom height from k_height query parameter', () => {
    const { container } = render(<RichText html={IFRAME_CONTENT} />);
    const iframe = container.querySelector('iframe[src*="k_height"]') as HTMLIFrameElement | null;
    expect(iframe).not.toBeNull();
    expect(iframe!.height).toBe('450');
  });

  // ── XSS mitigation ──

  it('does not render executable <script> tags', () => {
    // Track whether any script executes via a global side-effect
    (window as any).__xss_fired = false;
    const html = '<script>window.__xss_fired = true</script><p>safe text</p>';
    render(<RichText html={html} />);
    expect((window as any).__xss_fired).toBe(false);
    expect(screen.getByText('safe text')).toBeInTheDocument();
    delete (window as any).__xss_fired;
  });

  it('does not render onmouseover handlers', () => {
    render(<RichText html={XSS_CONTENT} />);
    const el = screen.getByText('Hover me');
    expect(el.getAttribute('onmouseover')).toBeNull();
  });

  it('does not render onclick handlers on links', () => {
    const { container } = render(<RichText html={XSS_CONTENT} />);
    const anchors = container.querySelectorAll('a');
    anchors.forEach((a) => {
      expect(a.getAttribute('onclick')).toBeNull();
    });
  });

  it('sanitizes javascript: URIs in links (blocked by React)', () => {
    const { container } = render(<RichText html={XSS_CONTENT} />);
    // React rewrites javascript: URIs — the original payload is replaced with
    // a safe throw so the link cannot execute arbitrary code.
    const anchor = container.querySelector('a[href^="javascript:"]') as HTMLAnchorElement | null;
    expect(anchor).not.toBeNull();
    expect(anchor!.getAttribute('href')).not.toContain('alert');
    expect(anchor!.getAttribute('href')).toContain(
      'React has blocked a javascript: URL as a security precaution'
    );
  });
});
