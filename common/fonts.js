import FontFaceObserver from 'fontfaceobserver';

const Fonts = (family, headingsFamily, styleUrl) => {
  if (!document.getElementById('global-font-styles')) {
    const link = document.createElement('link');
    link.href = styleUrl;
    link.rel = 'stylesheet';
    link.setAttribute('id', 'global-font-styles');

    // Stylesheets should go before the scripts so that rendering is not blocked.
    const stylesheets = document.head.querySelectorAll('[rel="stylesheet"]');
    if (stylesheets.length) {
      stylesheets[stylesheets.length - 1].after(link);
    } else {
      document.head.appendChild(link);
    }
  }

  const doc = document.documentElement;

  if (doc.classList.contains('has-theme-fonts')) return;

  // Assume theme main font family has two weights and header font one
  // In most cases headingsFamily === family

  const ThemeFontFamily400 = new FontFaceObserver(family, {
    weight: 400,
  });

  const ThemeFontFamily700 = new FontFaceObserver(family, {
    weight: 700,
  });

  const HeadingsFontFamily = new FontFaceObserver(headingsFamily);

  Promise.all([
    ThemeFontFamily400.load(null, 5000),
    ThemeFontFamily700.load(null, 5000),
    HeadingsFontFamily.load(null, 5000),
  ]).then(() => {
    document.documentElement.classList.add('has-theme-fonts');
  });
};

export default Fonts;
