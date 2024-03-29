export const getBasicValues = () => `# Default values for serviceName.
# This is a YAML-formatted file.
# Declare variables to be passed into your templates.

replicaCount: 1

image:
  repository: imageName
  pullPolicy: IfNotPresent
  # Overrides the image tag whose default is the chart appVersion.
  tag: ""

imagePullSecrets: []
nameOverride: ""
fullnameOverride: ""

serviceAccount:
  # Specifies whether a service account should be created
  create: true
  # Annotations to add to the service account
  annotations: {}
  # The name of the service account to use.
  # If not set and create is true, a name is generated using the fullname template
  name: ""

# Environment variables to be sended to our container
# env:
#   # Environment from a value
#   - name: NODE_ENV
#     value: production
#   # Environment from a kubernetes secret
#   - name: JSON_CREDENTIALS
#     valueFrom:
#       secretKeyRef:
#         name: json-credentials
#         key: username
#         optional: false

# Secrets to be passed to kubernetes, this will be replaced at CI stage (Azure DevOps, for example)
# secrets:
#   MY_ENV_VAR: "\${base64(MyAzureSecret)}"

podAnnotations: {}

podSecurityContext:
  fsGroup: 1000

securityContext:
  capabilities:
    drop:
      - ALL
    add: ["NET_ADMIN", "SYS_TIME"]
  readOnlyRootFilesystem: true
  runAsNonRoot: true
  runAsUser: 1000
  runAsGroup: 1000
  allowPrivilegeEscalation: false

ports:
  - name: main
    containerPort: 4000
    protocol: TCP

service:
  type: ClusterIP
  port: 80

ingress:
  enabled: false
  className: ""
  annotations: {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"
  hosts:
    - host: chart-example.local
      paths:
        - path: /
          pathType: ImplementationSpecific
  tls: []
  #  - secretName: chart-example-tls
  #    hosts:
  #      - chart-example.local

livenessProbe:
  httpGet:
    path: /
    port: main
  periodSeconds: 30
  timeoutSeconds: 30
  initialDelaySeconds: 10

readinessProbe:
  httpGet:
    path: /
    port: main
  periodSeconds: 30
  timeoutSeconds: 30
  initialDelaySeconds: 20

resources:
  limits:
    cpu: 100m
    memory: 128Mi
  requests:
    cpu: 100m
    memory: 128m

autoscaling:
  enabled: true
  minReplicas: 1
  maxReplicas: 5
  # metrics:
  #   - type: Resource
  #     resource:
  #       name: cpu
  #       target:
  #         type: Utilization
  #         averageUtilization: 75
  #   - type: Resource
  #     resource:
  #       name: memory
  #       target:
  #         type: Utilization
  #         averageUtilization: 80

nodeSelector: {}

tolerations: []

affinity: {}
`;
