export interface Urge {
  intensity: number;
  timestamp: string;
}

const STORAGE_KEY = 'smokingUrges';
const THEME_STORAGE_KEY = 'themePreference';

export const storageService = {
  getUrges(): Urge[] {
    const urgesJson = localStorage.getItem(STORAGE_KEY);
    return urgesJson ? JSON.parse(urgesJson) : [];
  },

  saveUrge(urge: Urge): void {
    const urges = this.getUrges();
    urges.push(urge);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(urges));
  },

  downloadUrges(): void {
    const urges = this.getUrges();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(urges, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "i-dont-smoke-data.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  },

  importUrges(file: File, mergeWithExisting: boolean = false): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const result = event.target?.result;
          if (typeof result !== 'string') {
            throw new Error('Failed to read file content');
          }
          
          const importedUrges = JSON.parse(result) as Urge[];
          
          // Validate the imported data
          if (!Array.isArray(importedUrges)) {
            throw new Error('Invalid data format: expected an array of urges');
          }
          
          // Validate each urge object
          for (const urge of importedUrges) {
            if (typeof urge.intensity !== 'number' ||
                typeof urge.timestamp !== 'string' ||
                urge.intensity < 1 ||
                urge.intensity > 10) {
              throw new Error('Invalid urge data format');
            }
          }
          
          if (mergeWithExisting) {
            // Merge with existing data
            const existingUrges = this.getUrges();
            const mergedUrges = [...existingUrges, ...importedUrges];
            
            // Sort by timestamp
            mergedUrges.sort((a, b) =>
              new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedUrges));
          } else {
            // Replace existing data
            localStorage.setItem(STORAGE_KEY, JSON.stringify(importedUrges));
          }
          
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsText(file);
    });
  },

  getThemePreference(): string | null {
    return localStorage.getItem(THEME_STORAGE_KEY);
  },

  saveThemePreference(theme: string): void {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }
};
