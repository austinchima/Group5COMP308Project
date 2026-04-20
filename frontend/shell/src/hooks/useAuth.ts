export type UserRole = 'Resident' | 'Business Owner' | 'Community Organizer';

export interface AuthUser {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
}

function normalizeRole(role: string | undefined | null): UserRole {
  switch (role) {
    case 'RESIDENT':
    case 'Resident':
      return 'Resident';

    case 'BUSINESS_OWNER':
    case 'Business Owner':
      return 'Business Owner';

    case 'COMMUNITY_ORGANIZER':
    case 'Community Organizer':
      return 'Community Organizer';

    default:
      return 'Resident';
  }
}

/**
 * Reads the current authenticated user from localStorage.
 * Returns null when no user is logged in.
 */
export function getAuthUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    return {
      ...parsed,
      role: normalizeRole(parsed?.role),
    } as AuthUser;
  } catch {
    return null;
  }
}

/** Navigation items gated by role */
export interface NavItem {
  to: string;
  label: string;
  icon: string;
}

const SHARED_NAV: NavItem[] = [
  { to: '/feed', label: 'Feed', icon: 'dynamic_feed' },
  { to: '/events', label: 'Events', icon: 'event' },
  { to: '/business', label: 'Business', icon: 'storefront' },
];

const ROLE_NAV: Record<UserRole, NavItem[]> = {
  Resident: [{ to: '/help', label: 'Help', icon: 'handshake' }],
  'Business Owner': [],
  'Community Organizer': [],
};

const PROFILE_NAV: NavItem = { to: '/profile', label: 'Profile', icon: 'person' };

/**
 * Returns the navigation items available for a given role.
 * Feed + role-specific section + Profile.
 */
export function getNavForRole(role: UserRole): NavItem[] {
  return [...SHARED_NAV, ...(ROLE_NAV[role] || []), PROFILE_NAV];
}