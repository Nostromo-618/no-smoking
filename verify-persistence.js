// Calendar Persistence Verification Script
// Run this in the browser console on the main application page

console.log('=== Calendar Persistence Verification ===');

// Check current localStorage value
const currentValue = localStorage.getItem('calendarIntervalPreference');
console.log('Current saved value:', currentValue);

// Function to test saving a value
function testSave(value) {
    console.log(`Testing save of: ${value}`);
    localStorage.setItem('calendarIntervalPreference', value);
    const saved = localStorage.getItem('calendarIntervalPreference');
    console.log(`Saved value: ${saved}`);
    return saved === value;
}

// Function to test the Vue component's storage service
function testVueComponent() {
    console.log('Testing Vue component storage service...');
    
    // Check if the storage service is available
    if (typeof storageService !== 'undefined') {
        console.log('storageService is available');
        
        // Test saving
        const saveResult = storageService.saveCalendarIntervalPreference('month');
        console.log('Save result:', saveResult);
        
        // Test loading
        const loadedValue = storageService.getCalendarIntervalPreference();
        console.log('Loaded value:', loadedValue);
        
        return loadedValue === 'month';
    } else {
        console.log('storageService not available in global scope');
        return false;
    }
}

// Run basic tests
console.log('Running basic persistence tests...');
const testResults = {
    saveAll: testSave('all'),
    saveWeek: testSave('week'),
    saveMonth: testSave('month'),
    saveCustom: testSave('custom')
};

console.log('Test results:', testResults);

// Test Vue component if available
setTimeout(() => {
    const vueTestResult = testVueComponent();
    console.log('Vue component test result:', vueTestResult);
}, 1000);

console.log('=== Verification Complete ===');