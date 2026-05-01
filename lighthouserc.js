export default {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local',
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
      },
    },
    assert: {
      assertions: {
        // Performance — warn below 80, error below 50
        'categories:performance': ['warn', { minScore: 0.8 }],
        // Accessibility — error below 90
        'categories:accessibility': ['error', { minScore: 0.9 }],
        // Best Practices — warn below 80
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        // SEO — warn below 80
        'categories:seo': ['warn', { minScore: 0.8 }],
        // PWA — warn below 50 (optional for now)
        'categories:pwa': ['warn', { minScore: 0.5 }],
      },
    },
    upload: {
      // Set LHCI_GITHUB_APP_TOKEN to enable GitHub status checks
      target: 'temporary-public-storage',
    },
  },
};
