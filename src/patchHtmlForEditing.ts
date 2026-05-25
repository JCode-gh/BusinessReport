const MOBILE_STYLES = `
<style id="iframe-mobile-styles">
@media (max-width: 600px) {
  body { background: #fff; }
  .page { width: 100% !important; margin: 0 !important; border-radius: 0 !important; border: none !important; box-shadow: none !important; }
  .cover { padding: 28px 20px 32px !important; }
  .cover h1 { font-size: clamp(1.6rem, 7vw, 2.6rem) !important; }
  .cover-subtitle { font-size: 0.95rem !important; margin-bottom: 20px !important; }
  .workspace { margin: -20px 12px 0 !important; padding: 16px !important; grid-template-columns: 1fr !important; gap: 14px !important; }
  .content { padding: 28px 16px 40px !important; }
  .report-section { padding-bottom: 36px !important; margin-bottom: 36px !important; }
  .section-header { flex-wrap: wrap !important; gap: 8px !important; margin-bottom: 20px !important; }
  .section-badge { margin-left: 0 !important; }
  .section-title { font-size: 1.25rem !important; }
  .action-header-row { flex-wrap: wrap !important; gap: 8px !important; margin-bottom: 20px !important; }
  .action-card { grid-template-columns: 1fr !important; gap: 10px !important; }
  .metrics-table-wrap { overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; }
  .metrics-table { min-width: 480px !important; }
  .metrics-table th, .metrics-table td { padding: 11px 12px !important; }
  .template-header { flex-wrap: wrap !important; gap: 8px !important; }
  .strategy-header { flex-wrap: wrap !important; gap: 8px !important; }
  .scorecard-row { grid-template-columns: 44px 1fr !important; }
}
@media (max-width: 380px) {
  .cover { padding: 20px 14px 24px !important; }
  .content { padding: 20px 14px 32px !important; }
  .workspace { margin: -16px 8px 0 !important; padding: 12px !important; }
  .workspace-stats { grid-template-columns: 1fr 1fr !important; }
}
</style>`;

const IFRAME_SCRIPT = `
<script id="iframe-bridge-script">
(function() {
  window.addEventListener('message', function(e) {
    if (!e.data || typeof e.data !== 'object') return;
    if (e.data.type === 'REQUEST_CONTENT') {
      if (window.syncReportProgressAttributes) window.syncReportProgressAttributes();
      parent.postMessage({ type: 'REPORT_CONTENT', html: document.documentElement.outerHTML }, '*');
    }
    if (e.data.type === 'PRINT') {
      window.print();
    }
  });
  // Override scrollToAnchor to account for the sticky nav height + 20px padding
  window.scrollToAnchor = function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var nav = document.querySelector('.section-jump-nav');
    var offset = (nav ? nav.getBoundingClientRect().height : 0) + 20;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  };
})();
<\/script>`;

export function patchHtmlForEditing(html: string): string {
  return html
    .replace("</head>", MOBILE_STYLES + "\n</head>")
    .replace("</body>", IFRAME_SCRIPT + "\n</body>");
}
