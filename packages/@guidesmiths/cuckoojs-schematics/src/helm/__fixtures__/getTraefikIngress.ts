export const getTraefikIngress = () => `{{- if .Values.ingress.enabled -}}
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: {{ include "serviceName.fullname" . }}
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(\`{{ .Values.ingress.host }}\`)
      kind: Rule
      services:
        - name: {{ include "serviceName.fullname" . }}
          port: {{ .Values.ingress.port }}
{{- end }}`;
