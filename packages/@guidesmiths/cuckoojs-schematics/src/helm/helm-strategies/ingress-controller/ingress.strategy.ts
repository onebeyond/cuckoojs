import { HelmStrategy } from '../helm.strategy';

export class IngressStrategy extends HelmStrategy {
  constructor() {
    super();
    this.templatePath.push('ingress');
  }

  enrichOptions(options: any): any {
    return options;
  }
}
