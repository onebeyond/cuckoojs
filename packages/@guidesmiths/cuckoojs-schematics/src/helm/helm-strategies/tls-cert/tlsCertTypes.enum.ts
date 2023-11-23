export const TlsCertTypes = {
  NONE: 'none',
  CERT_MANAGER: 'cert-manager',
} as const;

export type TlsCertType = (typeof TlsCertTypes)[keyof typeof TlsCertTypes];
