import { type HelmStrategy } from './helm.strategy';

export abstract class HelmStrategyFactory<T extends HelmStrategy> {
  protected abstract create(type: string): T;
}
