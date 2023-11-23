export const IngressTypes = {
  GENERIC: 'generic',
  TRAEFIK: 'traefik',
} as const;

export type IngressType = (typeof IngressTypes)[keyof typeof IngressTypes];
