# Interval Chart Visualization Options

## Current Data We Have:
- Urge timestamps
- Urge types (resisted, smoking, gum)
- Urge intensity (1-10)

## Calculated Metric: Time Intervals Between Urges
- Calculate the time difference between consecutive urges
- Display in hours (or days for longer intervals)

---

## OPTION A: Add to Existing Chart Card
### Approach: Dual Y-Axis Line Chart
```
Left Y-Axis: Intensity (1-10)
Right Y-Axis: Hours since last urge
X-Axis: Time

Lines:
- Blue line: Urge Intensity (existing)
- Purple line: Hours since previous urge (new)
```

### Visual Example:
```
  Intensity                              Hours
    10 |                                | 48
     9 |        *---*                   | 43
     8 |       /     \                  | 38
     7 |   *--/       \                 | 33
     6 |  /            \--*             | 28
     5 | /                 \            | 24
     4 |*                   \           | 19
     3 |                     \          | 14
     2 |                      \         | 9
     1 |                       *        | 5
       |________________________        | 0
         Mon  Tue  Wed  Thu  Fri
```

**Pros:**
- Compact, all data in one place
- Easy to correlate intensity with intervals

**Cons:**
- Two different scales can confuse users
- Cluttered appearance
- Hard to focus on just interval trends

---

## OPTION B: Separate Interval Progress Card
### Approach: Bar Chart with Trend Line

```
Hours
  48 |                            ╱
  43 |                       ┌──┐╱
  38 |                  ┌──┐ │  │
  33 |             ┌──┐ │  │ │  │
  28 |        ┌──┐ │  │ │  │ │  │
  24 |   ┌──┐ │  │ │  │ │  │ │  │
  19 |   │  │ │  │ │  │ │  │ │  │
     |___|__|_|__|_|__|_|__|_|__|___
      Mon Tue Wed Thu Fri Sat Sun
```

**Features:**
- Green bars: > 24 hours (excellent!)
- Orange bars: 12-24 hours (moderate)
- Red bars: < 12 hours (needs attention)
- Dotted trend line showing overall direction
- Can filter by urge type (resisted, smoking, gum)

**Pros:**
- Clear, focused on one metric
- Easy to see progress at a glance
- Color coding provides instant feedback
- Trend line shows if user is improving

**Cons:**
- Takes additional card space
- Users need to scroll to see it

---

## OPTION C: Hybrid - Tabbed View in Same Card
### Approach: Two tabs in the "Your Progress Journey" card

**Tab 1:** Intensity Over Time (current)
**Tab 2:** Interval Progress (new)

**Pros:**
- Same screen real estate
- User chooses what to view
- Clean, organized

**Cons:**
- Requires clicking to switch views
- Can't see both simultaneously

---

## My Recommendation: **Option B (Separate Card)**

### Why?
1. **Clarity**: Intervals deserve their own focused visualization
2. **Actionable**: Color-coded bars give immediate feedback
3. **Motivating**: Users can celebrate increasing bars (longer intervals = progress!)
4. **Flexible**: Can add more interval analytics later (average, longest streak, etc.)

### Proposed Layout:
```
┌────────────────────────────────────────────────┐
│  Track, Limit, and Quit                        │
│  [Timers: 00:08:36, 00:23:32, 00:23:26]       │
└────────────────────────────────────────────────┘

┌──────────────────┐  ┌─────────────────────────┐
│ Track a New Urge │  │ Your Progress Journey   │
│                  │  │ (Intensity Chart)       │
│  [Slider]        │  │                         │
│  [Radio buttons] │  │  [Line Chart]          │
│  [Button]        │  │  [Stats Cards]         │
└──────────────────┘  └─────────────────────────┘

┌──────────────────────────────────────────────┐
│  Interval Progress                            │
│  "Time Between Urges - Are You Improving?"    │
│                                               │
│  [Bar Chart with Trend Line]                 │
│  [Filter: All / Resisted / Smoking / Gum]   │
│                                               │
│  Stats: Average: 18.5h | Longest: 48h        │
└──────────────────────────────────────────────┘
```

---

## Technical Implementation Notes:

### Chart.js Chart Types Available:
1. **Bar Chart** - Best for showing individual intervals
2. **Line Chart** - Good for trend visualization
3. **Mixed Chart** - Bars + Line (intervals + trend)
4. **Area Chart** - Shows cumulative improvement

### Data Calculation:
```javascript
const calculateIntervals = (urges) => {
  const intervals = [];
  for (let i = 1; i < urges.length; i++) {
    const timeDiff = (new Date(urges[i].timestamp) - 
                      new Date(urges[i-1].timestamp)) / 
                      (1000 * 60 * 60); // hours
    intervals.push({
      timestamp: urges[i].timestamp,
      hours: timeDiff,
      type: urges[i].type
    });
  }
  return intervals;
};
```

### Color Thresholds:
- Red: < 6 hours
- Orange: 6-12 hours  
- Yellow: 12-24 hours
- Light Green: 24-48 hours
- Green: > 48 hours

---

## Next Steps:
1. Choose option (A, B, or C)
2. Design the specific chart type and colors
3. Implement the interval calculation logic
4. Add filtering by urge type
5. Include summary statistics

What would you like to proceed with?
