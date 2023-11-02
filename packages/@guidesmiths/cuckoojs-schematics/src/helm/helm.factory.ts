import {
	apply,
	MergeStrategy,
	mergeWith,
	type Rule,
	type SchematicContext,
	template,
	type Tree,
	url,
} from '@angular-devkit/schematics';
import {resolve} from 'path';

type Options = {
	serviceName: string;
	imageName: string;
	resourcesLimitCpu: string;
	resourcesLimitMemory: string;
	resourcesRequestCpu: string;
	resourcesRequestMemory: string;
	autoscalingEnabled: boolean;
	autoscalingReplicasMin: number;
	autoscalingReplicasMax: number;
	autoscalingTargetCpu: number;
};

export function main(options: Options): Rule {
	return (_tree: Tree, context: SchematicContext) => {
		context.logger.info('Creating Helm Chart...');

		const templateSource = apply(url(resolve('.', 'files')), [
			template({...options}),
		]);

		return mergeWith(templateSource, MergeStrategy.Overwrite);
	};
}
