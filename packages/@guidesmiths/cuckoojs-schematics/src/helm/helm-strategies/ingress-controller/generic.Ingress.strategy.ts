import { IngressStrategy } from './ingress.strategy';
import { IngressTypes } from './ingressTypes.enum';

export class GenericIngressControllerStrategy extends IngressStrategy {
  constructor() {
    super();
    this.templatePath.push(IngressTypes.GENERIC);
  }
}
