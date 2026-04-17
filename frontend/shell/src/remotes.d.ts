// TypeScript declarations for remote Micro Frontend modules
// These are resolved at runtime by Module Federation, not at build time

declare module 'mfe_auth/Auth' {
  const Auth: React.ComponentType<{ onAuth: () => void }>;
  export default Auth;
}

declare module 'mfe_auth/Profile' {
  const Profile: React.ComponentType<{ onLogout: () => void }>;
  export default Profile;
}

declare module 'mfe_community/Feed' {
  const Feed: React.ComponentType;
  export default Feed;
}

declare module 'mfe_community/Help' {
  const Help: React.ComponentType;
  export default Help;
}

declare module 'mfe_community/Business' {
  const Business: React.ComponentType;
  export default Business;
}

declare module 'mfe_events/Events' {
  const Events: React.ComponentType;
  export default Events;
}
