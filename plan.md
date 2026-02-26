

# User Feedback Feature

## Overview
Add a floating "Feedback" button (visible on all tabs) that opens a slide-out panel where users can submit text feedback and view their prior submissions with statuses.

## What Gets Built

### 1. New Component: `FeedbackPanel.tsx`
A self-contained component with:
- **Floating trigger button** -- fixed to the bottom-right corner, styled in the `#D71600` brand red with a `MessageSquare` icon and "Feedback" label
- **Slide-out panel** (using Radix Sheet) that opens from the right side containing two sections:

**Submit Feedback section:**
- A textarea for entering feedback text
- A "Submit" button
- On submit, the feedback is saved to local state with a timestamp and an initial status of "Under Review"

**Prior Feedback section:**
- A scrollable list showing all previously submitted feedback
- Each entry displays:
  - The feedback text (truncated if long)
  - Submission date/time
  - A status badge: "Under Review" (amber), "Acknowledged" (blue), or "Resolved" (green)
- Mock seed data pre-populated with 2-3 prior feedback entries at varying statuses so the feature looks alive on first load

### 2. Integration in `Index.tsx`
- Import and render `FeedbackPanel` at the bottom of the root layout (outside tab content), so it appears on every tab

## Technical Details

### Files Created
- `src/components/dashboard/FeedbackPanel.tsx`

### Files Modified
- `src/pages/Index.tsx` -- add `<FeedbackPanel />` import and render

### Component Structure (FeedbackPanel.tsx)
- Uses `Sheet`, `SheetTrigger`, `SheetContent`, `SheetHeader`, `SheetTitle` from `@/components/ui/sheet`
- Local `useState` for feedback list (seeded with mock data), input text, and open/closed state
- Status badge colors: amber for "Under Review", blue for "Acknowledged", green for "Resolved"
- Feedback entries sorted newest-first
- Floating button uses `fixed bottom-6 right-6 z-40` positioning with shadow and brand red background

### Mock Seed Data
Three pre-populated entries:
1. "Latency charts would benefit from a p99 percentile option" -- status: Resolved
2. "Would like to filter agents by team ownership" -- status: Acknowledged  
3. "Cost breakdown by department would be very useful" -- status: Under Review

