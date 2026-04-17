export type UserRole = 'Resident' | 'Business Owner' | 'Community Organizer';

export interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
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
    return parsed as AuthUser;
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
];

const ROLE_NAV: Record<UserRole, NavItem[]> = {
  'Resident': [
    { to: '/help', label: 'Help', icon: 'handshake' },
  ],
  'Business Owner': [
    { to: '/business', label: 'Business', icon: 'storefront' },
  ],
  'Community Organizer': [
    { to: '/events', label: 'Events', icon: 'event' },
  ],
};

const PROFILE_NAV: NavItem = { to: '/profile', label: 'Profile', icon: 'person' };

/**
 * Returns the navigation items available for a given role.
 * Feed + role-specific section + Profile.
 */
export function getNavForRole(role: UserRole): NavItem[] {
  return [...SHARED_NAV, ...(ROLE_NAV[role] || []), PROFILE_NAV];
}
