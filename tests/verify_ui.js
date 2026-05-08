/**
 * @file verify_ui.js
 * @description Automated UI verification tests for AuraTravel.
 */

const runTests = () => {
    console.log('--- Starting AuraTravel UI Verification ---');
    
    const testResults = {
        passed: 0,
        failed: 0,
        logs: []
    };

    const assert = (condition, message) => {
        if (condition) {
            testResults.passed++;
            testResults.logs.push(`✅ PASS: ${message}`);
        } else {
            testResults.failed++;
            testResults.logs.push(`❌ FAIL: ${message}`);
        }
    };

    // 1. Check Core Components
    assert(!!document.getElementById('chatToggle'), 'Chat toggle button exists');
    assert(!!document.getElementById('generateBtn'), 'Itinerary generation button exists');
    assert(!!document.querySelector('.hero-img'), 'Hero image loaded');

    // 2. Check Accessibility
    const nav = document.querySelector('nav');
    assert(nav && nav.getAttribute('aria-label') === 'Main Navigation', 'Accessibility: Nav has aria-label');
    
    const selects = document.querySelectorAll('select');
    let allSelectsHaveAria = true;
    selects.forEach(s => { if (!s.getAttribute('aria-label')) allSelectsHaveAria = false; });
    assert(allSelectsHaveAria, 'Accessibility: All select elements have aria-labels');

    // 3. Check Google Services
    const googleFontLink = document.querySelector('link[href*="fonts.googleapis.com"]');
    assert(!!googleFontLink, 'Google Services: Google Fonts integrated');

    // Summary
    console.log(testResults.logs.join('\n'));
    console.log(`--- Test Summary: ${testResults.passed} Passed, ${testResults.failed} Failed ---`);
    
    return testResults;
};

// Auto-run if in a testing environment or manually triggered
if (typeof window !== 'undefined') {
    window.AuraTests = { runTests };
}
