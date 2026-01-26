
# Bidirectional CRM Integration Plan

## Overview

This plan extends the existing integration infrastructure to support **two-way data flow** - allowing users to enter information in the portal that automatically syncs to Housecall Pro, Enzy, and GoHighLevel.

| Platform | Data FROM Platform | Data TO Platform (NEW) |
|----------|-------------------|------------------------|
| **Housecall Pro** | Jobs, revenue, customers | Create jobs, update job status |
| **Enzy** | Leaderboard rankings, badges | Update scores, log activities |
| **GoHighLevel** | Contacts, pipeline, deals | Create leads, move deals through stages |

---

## What Users Will Be Able To Do

### From the Portal Dashboard

**Add New Lead** (pushes to GoHighLevel)
- Quick "Add Lead" button opens a form
- Enter: Name, phone, email, lead source
- Lead instantly appears in GHL CRM
- Assigned to the rep who entered it

**Log Activity** (pushes to Enzy)
- Quick "Log Win" or "Record Activity" button
- Enter: Activity type, points earned
- Updates user's Enzy score in real-time
- Leaderboard reflects changes immediately

**Schedule Job** (pushes to Housecall Pro)
- Quick "New Job" button
- Enter: Customer info, job type, date/time
- Creates job in Housecall Pro system
- Shows up in Today's Jobs widget

### From the Pipeline Page

**Move Deals Between Stages**
- Drag-and-drop on Kanban board
- Status change syncs to GHL in real-time
- Update deal values, add notes

**Create New Opportunity**
- "Add Deal" button at top of any column
- Links to existing contact or creates new one

### From the Check-ins Page

**Daily Check-in with Auto-Sync**
- When user submits daily check-in with appointments/sales counts
- Data pushes to Enzy as activity log
- Updates their score on the leaderboard

---

## Technical Architecture

```text
User Input in Portal
         |
         v
+------------------+
| React Form/Modal |
+------------------+
         |
         v
+------------------------+
| Push Edge Functions    |
| /housecall-push        |
| /enzy-push             |  
| /ghl-push              |
+------------------------+
         |
         v
+------------------------+
| External API           |
| (POST/PATCH requests)  |
+------------------------+
         |
         v
+------------------------+
| Update Local DB Cache  |
| (optimistic update)    |
+------------------------+
```

---

## Implementation Details

### Phase 1: New Edge Functions for Pushing Data

**1. `ghl-push` function**
Creates or updates contacts/deals in GoHighLevel

Endpoints:
- `POST /create-lead` - Creates new contact in GHL
- `POST /update-deal` - Moves deal to different stage
- `POST /add-note` - Adds note to contact

**2. `enzy-push` function** 
Updates scores and logs activities in Enzy

Endpoints:
- `POST /log-activity` - Records activity with points
- `POST /update-score` - Directly update user score

**3. `housecall-push` function**
Creates jobs and updates status in Housecall Pro

Endpoints:
- `POST /create-job` - Schedules new job
- `POST /update-job` - Changes job status

---

### Phase 2: UI Components for Data Entry

**New Components:**

| Component | Location | Purpose |
|-----------|----------|---------|
| `AddLeadModal` | Dashboard, Pipeline | Form to create new lead in GHL |
| `LogActivityModal` | Dashboard, Leaderboard | Quick activity logging for Enzy |
| `CreateJobModal` | Dashboard | Schedule new Housecall Pro job |
| `DealCard` (enhanced) | Pipeline | Drag-drop with stage sync |

**Updated Pages:**

| Page | Changes |
|------|---------|
| `Dashboard.tsx` | Add quick action buttons for each integration |
| `PipelinePage.tsx` | Enable drag-drop stage changes, add deal button |
| `LeaderboardPage.tsx` | Add "Log Activity" button |
| `CheckinsPage.tsx` | Connect submit to Enzy score update |

---

### Phase 3: Form Designs

**Add Lead Form (GHL)**
```text
+----------------------------------+
|  Add New Lead                    |
+----------------------------------+
|  First Name: [____________]      |
|  Last Name:  [____________]      |
|  Phone:      [____________]      |
|  Email:      [____________]      |
|  Lead Source: [Dropdown____]     |
|    - Web Form                    |
|    - Referral                    |
|    - Home Depot                  |
|    - D2D                         |
|  Notes:      [____________]      |
|                                  |
|  [ Cancel ]  [ Add Lead ]        |
+----------------------------------+
```

**Log Activity Form (Enzy)**
```text
+----------------------------------+
|  Log Activity                    |
+----------------------------------+
|  Activity Type: [Dropdown____]   |
|    - Door Knock                  |
|    - Appointment Set             |
|    - Demo Completed              |
|    - Sale Closed                 |
|  Points: [Auto-calculated]       |
|  Notes:  [____________]          |
|                                  |
|  [ Cancel ]  [ Log Activity ]    |
+----------------------------------+
```

**Create Job Form (Housecall Pro)**
```text
+----------------------------------+
|  Schedule New Job                |
+----------------------------------+
|  Customer Name: [____________]   |
|  Phone:         [____________]   |
|  Address:       [____________]   |
|  Job Type:      [Dropdown____]   |
|    - Water Test                  |
|    - Installation                |
|    - Maintenance                 |
|    - Service Call                |
|  Date:          [Calendar___]    |
|  Time:          [Time Picker]    |
|                                  |
|  [ Cancel ]  [ Create Job ]      |
+----------------------------------+
```

---

### Phase 4: Data Validation and Error Handling

**Input Validation:**
- Phone numbers validated with regex
- Email format validation
- Required fields enforced
- Date/time must be in future

**Error Handling:**
- Show toast on success/failure
- Retry logic for network errors
- Optimistic updates with rollback on failure
- Queue failed submissions for retry

---

## Database Updates

**New table: `pending_syncs`**
Queues failed push requests for retry

| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| system | text | 'housecall_pro', 'enzy', 'ghl' |
| action | text | 'create_lead', 'update_score', etc. |
| payload | jsonb | Data to push |
| status | text | 'pending', 'failed', 'completed' |
| retry_count | int | Number of retry attempts |
| created_at | timestamptz | When queued |
| last_attempt | timestamptz | Last retry time |

---

## Files to Create

| File | Purpose |
|------|---------|
| `supabase/functions/ghl-push/index.ts` | Push data to GoHighLevel |
| `supabase/functions/enzy-push/index.ts` | Push data to Enzy |
| `supabase/functions/housecall-push/index.ts` | Push data to Housecall Pro |
| `src/components/portal/modals/AddLeadModal.tsx` | Lead creation form |
| `src/components/portal/modals/LogActivityModal.tsx` | Enzy activity form |
| `src/components/portal/modals/CreateJobModal.tsx` | Job scheduling form |
| `src/hooks/usePushIntegration.ts` | Hook for push mutations |

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/portal/Dashboard.tsx` | Add quick action buttons for push |
| `src/pages/portal/PipelinePage.tsx` | Enable drag-drop, add deal button |
| `src/pages/portal/LeaderboardPage.tsx` | Add log activity button |
| `src/pages/portal/CheckinsPage.tsx` | Connect to Enzy push on submit |
| `supabase/config.toml` | Register new edge functions |

---

## Security Considerations

- All push requests authenticated via JWT
- Rate limiting on push functions (prevent spam)
- Input sanitization before API calls
- API keys stored as secrets (never exposed to client)
- Audit log of all pushed data

---

## User Experience Flow

1. User clicks "Add Lead" on Dashboard
2. Modal opens with form fields
3. User fills in lead details
4. Clicks "Add Lead" button
5. Loading spinner shows
6. If GHL connected: Lead created in GHL, success toast
7. If GHL not connected: Warning shown, saved locally only
8. Dashboard/Pipeline updates to show new lead

---

## Implementation Order

1. **Database schema** - Add `pending_syncs` table
2. **Push edge functions** - Build GHL, Enzy, Housecall push functions
3. **React hooks** - Create `usePushIntegration` hook
4. **Modal components** - Build AddLead, LogActivity, CreateJob modals
5. **Page updates** - Add action buttons and wire up modals
6. **Enhanced Pipeline** - Add drag-drop with sync
7. **Check-in integration** - Connect daily check-in to Enzy

---

## Summary

This plan enables **true bidirectional sync** where your team can:
- Add leads in the portal that appear in GoHighLevel
- Log activities that update Enzy leaderboards
- Schedule jobs that sync to Housecall Pro
- Move deals through stages from the Pipeline page

All data flows seamlessly between the portal and external platforms, creating a unified command center for your sales team.
