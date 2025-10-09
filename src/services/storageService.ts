// Enhanced secure version of storageService with additional security measures
export interface Urge {
  intensity: number;
  timestamp: string;
  type?: 'resisted' | 'nicotine' | 'recorded'; // New field for urge type
}

const STORAGE_KEY = 'smokingUrges';
const THEME_STORAGE_KEY = 'themePreference';
const URGE_TYPE_STORAGE_KEY = 'urgeTypePreference';
const CALENDAR_INTERVAL_STORAGE_KEY = 'calendarIntervalPreference';
const CUSTOM_DATE_RANGE_STORAGE_KEY = 'customDateRange';
const MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB limit

// Sanitize string to prevent XSS
function sanitizeString(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Validate timestamp format
function isValidTimestamp(timestamp: string): boolean {
  const date = new Date(timestamp);
  return date instanceof Date && !isNaN(date.getTime()) && 
         date.getTime() <= Date.now() && // No future dates
         date.getTime() > new Date('2020-01-01').getTime(); // Reasonable past limit
}

// Check storage size to prevent quota exceeded attacks
function checkStorageSize(): boolean {
  let totalSize = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      totalSize += localStorage[key].length + key.length;
    }
  }
  return totalSize < MAX_STORAGE_SIZE;
}

export const storageService = {
  getUrges(): Urge[] {
    try {
      const urgesJson = localStorage.getItem(STORAGE_KEY);
      if (!urgesJson) return [];
      
      const urges = JSON.parse(urgesJson);
      
      // Validate data structure
      if (!Array.isArray(urges)) {
        console.error('Invalid data format in localStorage');
        return [];
      }
      
      // Filter out invalid entries and add default type for backward compatibility
      return urges.filter(urge => 
        urge &&
        typeof urge.intensity === 'number' &&
        urge.intensity >= 1 &&
        urge.intensity <= 10 &&
        typeof urge.timestamp === 'string' &&
        isValidTimestamp(urge.timestamp)
      ).map(urge => ({
        ...urge,
        type: urge.type || 'resisted' // Default to 'resisted' for backward compatibility
      }));
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  saveUrge(urge: Urge): boolean {
    try {
      // Validate input
      if (!urge || 
          typeof urge.intensity !== 'number' || 
          urge.intensity < 1 || 
          urge.intensity > 10 ||
          !isValidTimestamp(urge.timestamp)) {
        throw new Error('Invalid urge data');
      }
      
      // Check storage size
      if (!checkStorageSize()) {
        throw new Error('Storage quota exceeded');
      }
      
      const urges = this.getUrges();
      
      // Limit total number of urges to prevent memory issues
      const MAX_URGES = 10000;
      if (urges.length >= MAX_URGES) {
        // Remove oldest entries
        urges.splice(0, urges.length - MAX_URGES + 1);
      }
      
      urges.push({
        intensity: Math.floor(urge.intensity), // Ensure integer
        timestamp: sanitizeString(urge.timestamp),
        type: urge.type || 'resisted' // Include type with default
      });
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(urges));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  downloadUrges(): void {
    try {
      const urges = this.getUrges();
      const dataStr = "data:text/json;charset=utf-8," + 
                     encodeURIComponent(JSON.stringify(urges, null, 2));
      
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `i-dont-smoke-data-${Date.now()}.json`);
      downloadAnchorNode.style.display = 'none';
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    } catch (error) {
      console.error('Error downloading data:', error);
      alert('Failed to download data. Please try again.');
    }
  },

  importUrges(file: File, mergeWithExisting: boolean = false): Promise<void> {
    return new Promise((resolve, reject) => {
      // Validate file type
      if (!file.name.endsWith('.json')) {
        reject(new Error('Invalid file type. Please upload a JSON file.'));
        return;
      }
      
      // Limit file size to 10MB
      const MAX_FILE_SIZE = 10 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        reject(new Error('File too large. Maximum size is 10MB.'));
        return;
      }
      
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const result = event.target?.result;
          if (typeof result !== 'string') {
            throw new Error('Failed to read file content');
          }
          
          // Parse with size limit check
          let importedUrges: Urge[];
          try {
            importedUrges = JSON.parse(result);
          } catch {
            throw new Error('Invalid JSON format');
          }
          
          // Validate data structure
          if (!Array.isArray(importedUrges)) {
            throw new Error('Invalid data format: expected an array of urges');
          }
          
          // Limit number of imported urges
          const MAX_IMPORT = 10000;
          if (importedUrges.length > MAX_IMPORT) {
            throw new Error(`Too many urges. Maximum is ${MAX_IMPORT}.`);
          }
          
          // Validate and sanitize each urge
          const validUrges: Urge[] = [];
          for (const urge of importedUrges) {
            if (typeof urge.intensity === 'number' &&
                typeof urge.timestamp === 'string' &&
                urge.intensity >= 1 &&
                urge.intensity <= 10 &&
                isValidTimestamp(urge.timestamp)) {
              validUrges.push({
                intensity: Math.floor(urge.intensity),
                timestamp: sanitizeString(urge.timestamp),
                type: urge.type || 'resisted' // Include type with default
              });
            }
          }
          
          if (validUrges.length === 0) {
            throw new Error('No valid urges found in the file');
          }
          
          if (mergeWithExisting) {
            const existingUrges = this.getUrges();
            const mergedUrges = [...existingUrges, ...validUrges];
            
            // Remove duplicates based on timestamp
            const uniqueUrges = mergedUrges.filter((urge, index, self) =>
              index === self.findIndex(u => u.timestamp === urge.timestamp)
            );
            
            // Sort by timestamp
            uniqueUrges.sort((a, b) =>
              new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );
            
            // Limit total size
            const finalUrges = uniqueUrges.slice(-MAX_IMPORT);
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(finalUrges));
          } else {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(validUrges));
          }
          
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      // Use readAsText with UTF-8 encoding
      reader.readAsText(file, 'UTF-8');
    });
  },

  getThemePreference(): string | null {
    try {
      const theme = localStorage.getItem(THEME_STORAGE_KEY);
      // Validate theme value - now includes 'system'
      if (theme && ['light', 'dark', 'system'].includes(theme)) {
        return theme;
      }
      return null;
    } catch (error) {
      console.error('Error reading theme preference:', error);
      return null;
    }
  },

  saveThemePreference(theme: string): boolean {
    try {
      // Validate theme value - now includes 'system'
      if (!['light', 'dark', 'system'].includes(theme)) {
        throw new Error('Invalid theme value');
      }
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      return true;
    } catch (error) {
      console.error('Error saving theme preference:', error);
      return false;
    }
  },

  getUrgeTypePreference(): string | null {
    try {
      const urgeType = localStorage.getItem(URGE_TYPE_STORAGE_KEY);
      // Validate urge type value
      if (urgeType && ['resisted', 'nicotine', 'recorded'].includes(urgeType)) {
        return urgeType;
      }
      return 'resisted'; // Default value
    } catch (error) {
      console.error('Error reading urge type preference:', error);
      return 'resisted';
    }
  },

  saveUrgeTypePreference(urgeType: string): boolean {
    try {
      // Validate urge type value
      if (!['resisted', 'nicotine', 'recorded'].includes(urgeType)) {
        throw new Error('Invalid urge type value');
      }
      localStorage.setItem(URGE_TYPE_STORAGE_KEY, urgeType);
      return true;
    } catch (error) {
      console.error('Error saving urge type preference:', error);
      return false;
    }
  },

  getCalendarIntervalPreference(): string | null {
    try {
      const interval = localStorage.getItem(CALENDAR_INTERVAL_STORAGE_KEY);
      console.log('getCalendarIntervalPreference - Raw localStorage value:', interval);
      console.log('getCalendarIntervalPreference - Storage key used:', CALENDAR_INTERVAL_STORAGE_KEY);
      // Validate interval value
      if (interval && ['all', 'week', 'month', 'custom'].includes(interval)) {
        console.log('getCalendarIntervalPreference - Valid interval found:', interval);
        return interval;
      }
      console.log('getCalendarIntervalPreference - Using default: all');
      return 'all'; // Default value
    } catch (error) {
      console.error('Error reading calendar interval preference:', error);
      return 'all';
    }
  },

  saveCalendarIntervalPreference(interval: string): boolean {
    try {
      console.log('saveCalendarIntervalPreference - Saving interval:', interval);
      console.log('saveCalendarIntervalPreference - Storage key used:', CALENDAR_INTERVAL_STORAGE_KEY);
      // Validate interval value
      if (!['all', 'week', 'month', 'custom'].includes(interval)) {
        throw new Error('Invalid calendar interval value');
      }
      localStorage.setItem(CALENDAR_INTERVAL_STORAGE_KEY, interval);
      console.log('saveCalendarIntervalPreference - Successfully saved:', interval);
      
      // Verify the save worked
      const verify = localStorage.getItem(CALENDAR_INTERVAL_STORAGE_KEY);
      console.log('saveCalendarIntervalPreference - Verification read:', verify);
      
      return true;
    } catch (error) {
      console.error('Error saving calendar interval preference:', error);
      return false;
    }
  },

  getCustomDateRange(): { startDate: string; endDate: string } | null {
    try {
      const dateRange = localStorage.getItem(CUSTOM_DATE_RANGE_STORAGE_KEY);
      console.log('getCustomDateRange - Raw localStorage value:', dateRange);
      
      if (!dateRange) {
        console.log('getCustomDateRange - No custom date range saved');
        return null;
      }
      
      // Parse the stored value (format: "2025-10-07_2025-10-08")
      const parts = dateRange.split('_');
      if (parts.length !== 2) {
        console.error('getCustomDateRange - Invalid format:', dateRange);
        return null;
      }
      
      const [startDate, endDate] = parts;
      
      // Validate date format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
        console.error('getCustomDateRange - Invalid date format');
        return null;
      }
      
      // Validate dates are valid
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.error('getCustomDateRange - Invalid dates');
        return null;
      }
      
      console.log('getCustomDateRange - Valid range found:', { startDate, endDate });
      return { startDate, endDate };
    } catch (error) {
      console.error('Error reading custom date range:', error);
      return null;
    }
  },

  saveCustomDateRange(startDate: string, endDate: string): boolean {
    try {
      console.log('saveCustomDateRange - Saving range:', { startDate, endDate });
      
      // Validate date format (YYYY-MM-DD)
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
        throw new Error('Invalid date format. Expected YYYY-MM-DD');
      }
      
      // Validate dates are valid
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error('Invalid dates');
      }
      
      // Validate start date is before or equal to end date
      if (start > end) {
        throw new Error('Start date must be before or equal to end date');
      }
      
      // Store in format: "2025-10-07_2025-10-08"
      const dateRangeString = `${startDate}_${endDate}`;
      localStorage.setItem(CUSTOM_DATE_RANGE_STORAGE_KEY, dateRangeString);
      console.log('saveCustomDateRange - Successfully saved:', dateRangeString);
      
      // Verify the save worked
      const verify = localStorage.getItem(CUSTOM_DATE_RANGE_STORAGE_KEY);
      console.log('saveCustomDateRange - Verification read:', verify);
      
      return true;
    } catch (error) {
      console.error('Error saving custom date range:', error);
      return false;
    }
  },
  
  // Clear all data (with confirmation)
  clearAllData(): boolean {
    try {
      if (confirm('Are you sure you want to delete all your tracking data? This cannot be undone.')) {
        localStorage.removeItem(STORAGE_KEY);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }
};
