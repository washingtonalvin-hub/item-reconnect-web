# Implementation Plan: FOUND IT - Lost & Found Platform

The goal is to create a functional frontend for "FOUND IT", a platform where people can report found items by snapping pictures and owners can reconnect with their belongings. Since no backend/database is available, we will use `localStorage` for data persistence and mock the "reach out" functionality.

## Scope Summary
- **Landing Page**: Action-oriented hero section with the provided copy.
- **Report Item Flow**: A wizard or form to upload a photo (simulated) and add details (category, location found, description).
- **Search/Browse**: A gallery of reported items with filters (category, date).
- **Item Detail View**: Full details of a found item and a way for owners to "Claim" or contact the finder.
- **Mock User Context**: Simple "Finder" vs "Owner" simulation.

## Non-Goals
- Real-time chat (will be simulated via a message form).
- Real image hosting (will use base64 strings in localStorage or placeholder URLs).
- User authentication (will use local state to track current "user" sessions).

## Assumptions
- The application is a Single Page Application (SPA).
- React with Tailwind CSS and Shadcn UI components (already present in the project).
- Lucide-react for icons.

## Affected Areas
- `src/App.tsx`: Main routing and layout.
- `src/components/`: New components for item cards, report forms, and search.
- `src/hooks/`: Custom hook for managing the mock store in `localStorage`.

---

## Phases

### Phase 1: Foundation & Layout
- Set up basic routing using a simple state-based navigation or `react-router-dom` (if preferred, but state-based is faster for this scope).
- Create a `Layout` component with a Navbar and Footer.
- **Specialist**: `frontend_engineer`

### Phase 2: Landing Page & Item Discovery
- Implement the Hero section using the provided branding copy.
- Create an "Item Feed" component that displays a grid of found items.
- Implement basic filtering by category (ID Card, Wallet, Personal Item, Others).
- **Specialist**: `frontend_engineer`

### Phase 3: Reporting Flow (The "Snap & Share")
- Create a `ReportItem` form.
- Include a simulated photo upload (using file input and converting to data URL for `localStorage`).
- Fields: Title, Category, Location Found, Date, Description, Contact Info.
- **Specialist**: `frontend_engineer`

### Phase 4: Item Detail & Communication Mockup
- Create an `ItemDetail` page/modal.
- Add a "This is Mine" button that opens a "Message Finder" form.
- Mock the message sending process with a success toast.
- **Specialist**: `frontend_engineer`

### Phase 5: Data Persistence & Final Polish
- Connect all forms to a `useLocalStorage` hook to ensure items persist across refreshes.
- Add "My Reports" section to see items the current user has posted.
- Final CSS/UI polish using the Shadcn components.
- **Specialist**: `quick_fix_engineer` (for polish and text updates)

---

## Data Model (Local Only)
```typescript
interface FoundItem {
  id: string;
  image: string; // Base64
  title: string;
  category: 'ID Card' | 'Wallet' | 'Personal Item' | 'Other';
  location: string;
  dateFound: string;
  description: string;
  finderName: string;
  finderContact: string;
  status: 'available' | 'returned';
}
```

## Open Questions
- Should we include a "Rewards" section since the copy mentions "rewarding"? 
  - *Decision*: Will add a small "Reward Offered" badge option in the reporting flow.
