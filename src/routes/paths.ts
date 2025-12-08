export const PATHS = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  RECOVER_PASSWORD: '/recover-password',
  REGISTER: '/register',
  NOT_FOUND: '/*',
  // Public routes
  SEARCH: '/search',
  DOCUMENTS: '/documents',
  DOCUMENT_DETAIL: '/documents/:id',
  PERSON_PROFILE: '/person/:id',
};

export const DASHBOARD_PATHS = {
  HOME: `${PATHS.DASHBOARD}/home`,
  USER_MANAGEMENT: `${PATHS.DASHBOARD}/users`,
  DOCUMENT_APPROVAL: `${PATHS.DASHBOARD}/document-approval`,
  PROCESSES: `${PATHS.DASHBOARD}/processes`,
  SETTINGS: `${PATHS.DASHBOARD}/settings`,
  PERSONAL_DATA: `${PATHS.DASHBOARD}/personal-data`,
};
