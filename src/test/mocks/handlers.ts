import { http, HttpResponse } from 'msw';

// Mock handlers for API calls used in tests
export const handlers = [
  // Mock Gemini AI API
  http.post('https://generativelanguage.googleapis.com/*', () => {
    return HttpResponse.json({
      candidates: [
        {
          content: {
            parts: [
              {
                text: 'This is a mocked AI response for testing purposes.',
              },
            ],
          },
        },
      ],
    });
  }),

  // Mock Nominatim Geocoder
  http.get('https://nominatim.openstreetmap.org/search', () => {
    return HttpResponse.json([
      {
        lat: '40.7128',
        lon: '-74.0060',
        display_name: 'New York, NY, USA',
      },
    ]);
  }),
];
