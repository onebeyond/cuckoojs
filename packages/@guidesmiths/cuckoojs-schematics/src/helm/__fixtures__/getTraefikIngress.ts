export const getTraefikIngress = () => `apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: {{ include "serviceName.fullname" . }}
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(\`{{ .Values.ingressroute.dns }}\`)
      kind: Rule
      services:
        - name: {{ include "serviceName.fullname" . }}
          port: {{ .Values.ingressroute.port }}
  tls:
    secretName: {{ include "serviceName.fullname" . }}-tls`;
