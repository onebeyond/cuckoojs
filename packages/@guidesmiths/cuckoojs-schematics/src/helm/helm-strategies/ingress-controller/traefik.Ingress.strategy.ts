import { IngressStrategy } from './ingress.strategy';
import { IngressTypes } from './ingressTypes.enum';

export class TraefikIngressControllerStrategy extends IngressStrategy {
  constructor() {
    super();
    this.templatePath.push(IngressTypes.TRAEFIK);
  }
}
