
# CRM Integration Infrastructure Plan

## Overview

This plan builds the complete foundation for Housecall Pro, Enzy, and GoHighLevel integrations so that everything is ready and waiting - you just need to add the API keys when you get them.

The system will be designed to:
- Store integration settings in the database
- Show connection status in the admin Settings page  
- Have edge functions ready that check for API keys gracefully
- Display placeholder widgets on the dashboard that activate when connected

---

## What You'll See When Complete

### Admin Settings Page (New "Integrations" Tab)
```text
+------------------------------------------+
|  Integrations                            |
+------------------------------------------+
|                                          |
|  [Housecall Pro]          Not Connected  |
|  Job scheduling & invoicing              |
|  [Connect] button                        |
|                                          |
|  [Enzy]                   Not Connected  |
|  Sales gamification & leaderboards       |
|  [Connect] button                        |
|                                          |
|  [GoHighLevel]            Not Connected  |
|  CRM & lead pipeline                     |
|  [Connect] button                        |
|                                          |
+------------------------------------------+
```

When you click "Connect", you'll be prompted to enter the API key. Once saved, the status changes to "Connected" with a green checkmark.

### Dashboard Widgets (Activate When Connected)
- Leaderboard widget showing Enzy rankings
- Pipeline summary showing GHL deals  
- Today's Jobs from Housecall Pro

---

## Technical Implementation

### Phase 1: Database Schema

Create new tables to store integration configuration and synced data:

**`integrations` table** - Stores API connection settings
| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| system | text | 'housecall_pro', 'enzy', 'ghl' |
| is_active | boolean | Whether integration is enabled |
| config | jsonb | Non-sensitive settings (sync frequency, etc.) |
| last_sync_at | timestamptz | When data was last pulled |
| last_error | text | Any error from last sync attempt |
| created_at | timestamptz | Record creation time |

**`external_user_mappings` table** - Links portal users to external system IDs
| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| user_id | uuid | References profiles(id) |
| system | text | 'housecall_pro', 'enzy', 'ghl' |
| external_id | text | User's ID in external system |
| created_at | timestamptz | Record creation time |

**`kpi_snapshots` table** - Unified daily metrics from all sources
| Column | Type | Purpose |
|--------|------|---------|
| id | uuid | Primary key |
| user_id | uuid | References profiles(id) |
| snapshot_date | date | The date for this data |
| source | text | 'housecall', 'enzy', 'ghl', 'manual' |
| metrics | jsonb | Flexible KPI data |
| created_at | timestamptz | Record creation time |

**Row Level Security:**
- Admins can manage all integration settings
- Users can only see their own KPI snapshots
- Managers can see their team's snapshots

---

### Phase 2: Backend Functions (Edge Functions)

Create 4 edge functions that are ready to work once API keys are added:

**1. `integration-status` function**
- Returns which integrations have API keys configured
- Called by the Settings page to show connection status
- No API key required - just checks if secrets exist

**2. `housecall-sync` function**  
- Pulls jobs, customers, and revenue from Housecall Pro
- Gracefully returns "not configured" if API key missing
- When configured: syncs data to `kpi_snapshots` table

**3. `enzy-sync` function**
- Pulls leaderboard rankings and badges from Enzy
- Gracefully returns "not configured" if API key missing  
- When configured: syncs to `kpi_snapshots` and `leaderboard_cache`

**4. `ghl-sync` function**
- Pulls contacts, opportunities, and pipeline data from GHL
- Gracefully returns "not configured" if API key missing
- When configured: syncs to `kpi_snapshots` and `leads` tables

All functions follow this pattern:
```text
1. Check if API key exists in secrets
2. If no key: return { configured: false, message: "API key not set" }
3. If key exists: attempt sync and return results
4. Update last_sync_at and last_error in integrations table
```

---

### Phase 3: Settings Page Updates

Add new "Integrations" tab to the existing Settings page:

**Features:**
- Card for each integration (Housecall Pro, Enzy, GHL)
- Shows connection status (Connected/Not Connected)
- "Connect" button opens secure modal to enter API key
- "Test Connection" button to verify key works
- "Sync Now" button to manually trigger data pull
- Last sync time and any error messages displayed

**Security:**
- API keys are stored as Supabase secrets (not in the database)
- Only admins can access the Integrations tab
- Keys are never displayed after being saved

---

### Phase 4: Dashboard Enhancements

Add conditional widgets to the Dashboard that only appear when integrations are connected:

**Integration Status Banner**
```text
+------------------------------------------------+
|  Connect your tools to unlock real-time data   |
|  [Housecall Pro] [Enzy] [GoHighLevel]          |
|              [Go to Settings]                  |
+------------------------------------------------+
```
This banner disappears once at least one integration is connected.

**Enzy Leaderboard Widget** (when connected)
- Top 5 rankings with avatars and scores
- User's current position highlighted
- "View Full Leaderboard" link

**GHL Pipeline Widget** (when connected)  
- Deal count by stage (Lead > Qualified > Proposal > Closed)
- Total pipeline value
- "View Pipeline" link

**Housecall Jobs Widget** (when connected)
- Today's scheduled jobs count
- Revenue this week
- "View All Jobs" link

---

### Phase 5: New Portal Pages

**Pipeline Page** (`/portal/pipeline`)
- Kanban board showing GHL deals by stage
- Cards show contact name, value, and assigned rep
- Managers see full team pipeline
- Filter by rep, date range, deal size

**Leaderboard Page** (`/portal/leaderboard`)
- Full Enzy rankings display
- Weekly, monthly, all-time views
- Badge showcase for achievements
- Personal stats and trends

---

## Files to Create/Modify

### New Files
| File | Purpose |
|------|---------|
| `supabase/functions/integration-status/index.ts` | Check which integrations are configured |
| `supabase/functions/housecall-sync/index.ts` | Sync Housecall Pro data |
| `supabase/functions/enzy-sync/index.ts` | Sync Enzy leaderboard data |
| `supabase/functions/ghl-sync/index.ts` | Sync GoHighLevel CRM data |
| `src/pages/portal/PipelinePage.tsx` | GHL pipeline kanban view |
| `src/pages/portal/LeaderboardPage.tsx` | Enzy leaderboard display |
| `src/components/portal/IntegrationCard.tsx` | Reusable integration status card |
| `src/components/portal/widgets/EnzyWidget.tsx` | Dashboard leaderboard widget |
| `src/components/portal/widgets/GHLWidget.tsx` | Dashboard pipeline widget |
| `src/components/portal/widgets/HousecallWidget.tsx` | Dashboard jobs widget |
| `src/hooks/useIntegrations.ts` | Hook to check integration status |

### Modified Files
| File | Changes |
|------|---------|
| `src/pages/portal/admin/SettingsPage.tsx` | Add Integrations tab with API key management |
| `src/pages/portal/Dashboard.tsx` | Add conditional integration widgets |
| `src/components/portal/PortalSidebar.tsx` | Add Pipeline and Leaderboard nav items |
| `src/pages/portal/PortalRoutes.tsx` | Add routes for new pages |

---

## API Keys You'll Need

When you're ready, you'll add these as secrets:

| Integration | Secret Name | How to Get It |
|-------------|-------------|---------------|
| Housecall Pro | `HOUSECALL_PRO_API_KEY` | Housecall Pro Settings > API |
| Enzy | `ENZY_API_KEY` | Contact Enzy support or check dashboard |
| GoHighLevel | `GHL_API_KEY` | GHL Settings > API Keys |

---

## Implementation Order

1. **Database first** - Create tables and RLS policies
2. **Edge functions** - Build sync functions that check for keys gracefully
3. **Settings UI** - Add Integrations tab with connect buttons
4. **Dashboard widgets** - Add conditional display components
5. **New pages** - Pipeline and Leaderboard views
6. **Sidebar updates** - Add navigation to new pages

---

## Summary

This approach builds everything now so that when you get the API keys, you simply:
1. Go to Portal Settings > Integrations
2. Click "Connect" on each integration
3. Enter the API key
4. Data starts syncing automatically

No code changes needed once the infrastructure is in place - just add keys and go!
