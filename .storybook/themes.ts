import fs from 'fs';
import path from 'path';

/**
 * Async function to load themes from the public/static/themes directory.
 * Can be used in Storybook loaders or called directly.
 */
export async function loadThemes(): Promise<Record<string, any>> {
  const projectRoot = process.cwd();

  function loadDirectoryNames(directoryPath: string): string[] {
    return fs.readdirSync(directoryPath).filter((file) => {
      return fs.statSync(path.join(directoryPath, file)).isDirectory();
    });
  }

  const themesDirectory = path.join(projectRoot, 'public/static/themes');
  const themesList: string[] = ['default'];
  try {
    themesList.push(...loadDirectoryNames(themesDirectory));
    // Remove common as it is not a theme
    const commonIndex = themesList.indexOf('common');
    if (commonIndex > -1) {
      themesList.splice(commonIndex, 1);
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(
      `⚠️ Error reading themes directory (${themesDirectory}), please try clearing the broken symlinks from /public/static/themes:`,
      errorMessage
    );
  }

  // Populate available theme data
  const themes: Record<string, any> = {};
  themesList.forEach((themeName) => {
    const themePath = path.join(themesDirectory, themeName, 'theme.json');
    try {
      const data = fs.readFileSync(themePath, 'utf-8');
      themes[themeName] = JSON.parse(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error(`⚠️ Error reading theme data for ${themeName} (${themePath}):`, errorMessage);
    }
  });

  console.log('Loaded themes data', Object.keys(themes));
  return themes;
}
