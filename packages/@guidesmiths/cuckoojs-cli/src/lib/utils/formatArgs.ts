function removeDashesFrom(args: string[], initialIndex: number): string[] {
	return args.map((arg, index) => {
		if (index < initialIndex) {
			return arg;
		}

		return arg.replace(/^--/, '');
	});
}

export function removeDashes(args: string[]): string[] {
	const command = args[2];
	const parsingStrategies: Record<string, () => string[]> = {
		new() {
			return removeDashesFrom(args, 2);
		},
		generate() {
			return removeDashesFrom(args, 5);
		},
		default() {
			return args;
		},
	};

	return (parsingStrategies[command] || parsingStrategies.default)();
}

export function addDashes(args: string[]): string[] {
	return args.map(arg => `--${arg}`);
}
