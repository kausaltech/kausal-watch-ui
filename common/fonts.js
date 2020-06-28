import FontFaceObserver from 'fontfaceobserver';

const Fonts = (family, styleUrl) => {
  const link = document.createElement('link');
  link.href = styleUrl;
  link.rel = 'stylesheet';

  document.head.appendChild(link);

  const ThemeFontFamily400 = new FontFaceObserver(family, {
    weight: 400,
  });

  const ThemeFontFamily700 = new FontFaceObserver(family, {
    weight: 700,
  });

  Promise.all([
    ThemeFontFamily400.load(),
    ThemeFontFamily700.load(),
  ]).then(() => {
    document.documentElement.classList.add('has-theme-fonts');
  });
};

export default Fonts;
