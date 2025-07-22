// Test data transformation for lead source success rates
import { transformLeadSourceSuccessRateData } from './chart-config-utils';

const mockApiData = [
  {
    "leadSource": "SOCIAL_MEDIA",
    "closed": 1,
    "notClosed": 0,
    "successRate": 100
  },
  {
    "leadSource": "ORGANIC_SEARCH",
    "closed": 7,
    "notClosed": 1,
    "successRate": 87.5
  },
  {
    "leadSource": "CONFERENCE",
    "closed": 10,
    "notClosed": 2,
    "successRate": 83.33
  },
  {
    "leadSource": "EVENT",
    "closed": 13,
    "notClosed": 6,
    "successRate": 68.42
  },
  {
    "leadSource": "REFERRAL",
    "closed": 11,
    "notClosed": 8,
    "successRate": 57.89
  },
  {
    "leadSource": "OTHER",
    "closed": 0,
    "notClosed": 1,
    "successRate": 0
  }
];

// Test transformation
const transformedData = transformLeadSourceSuccessRateData(mockApiData);
console.log('Transformed data:', transformedData);

// Validate color logic
transformedData.forEach(item => {
  console.log(`${item.sourceLabel}: ${item.successRate}% - Color: ${item.successRateColor}`);
});

export { transformedData };
