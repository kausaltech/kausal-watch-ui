/*
 * The optional per-plan integrations, declared once so the components that render them and the
 * content security policy cannot disagree. Each one is switched on by a theme setting.
 *
 * `scriptUrl` is what we put on the page. `connectHosts` are the hosts the vendor's own script
 * contacts afterwards, which appear nowhere in our code or in any setting: they follow from
 * configuration in the vendor's console and are taken from the vendor's published CSP guidance.
 */
type Integration = {
  /* The theme setting that switches it on, where there is one. */
  settingKey?: string;
  scriptUrl: string;
  connectHosts: string[];
};

export const GOOGLE_ANALYTICS: Integration = {
  settingKey: 'googleAnalyticsId',
  scriptUrl: 'https://www.googletagmanager.com/gtag/js',
  connectHosts: [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://region1.google-analytics.com',
  ],
};

export const MONSIDO: Integration = {
  settingKey: 'monsidoToken',
  scriptUrl: 'https://app-script.monsido.com/v2/monsido-script.js',
  connectHosts: [
    'https://cdn.monsido.com',
    'https://pagecorrect.monsido.com',
    'https://heatmaps.monsido.com',
  ],
};

/* Rendered by the Zurich navigation rather than switched on by a setting. */
export const ZURICH_ANALYTICS: Integration = {
  scriptUrl:
    'https://www.stadt-zuerich.ch/etc/clientlibs/stzh/analytics/294297d554c0/068a31a4609c/launch-9189fcb507a0.min.js',
  connectHosts: ['https://analytics.stadt-zuerich.ch', 'https://dpm.demdex.net'],
};

export const INTEGRATIONS = [GOOGLE_ANALYTICS, MONSIDO, ZURICH_ANALYTICS];

export const integrationHosts = (integration: Integration) => [
  new URL(integration.scriptUrl).origin,
  ...integration.connectHosts,
];
