/* eslint-disable @typescript-eslint/no-require-imports */
import loading = require('loading-cli');

type FontColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'none';

type BackgroundColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'none';

type Alignment = 'left' | 'center';

type Decoration = 'bold' | 'underline' | 'reversed' | 'none';

const reset = '\u001b[0m';
const none = '';

const fontColorMap: Record<FontColor, string> = {
	black: '\u001b[30m',
	red: '\u001b[31m',
	green: '\u001b[32m',
	yellow: '\u001b[33m',
	blue: '\u001b[34m',
	magenta: '\u001b[35m',
	cyan: '\u001b[35m',
	white: '\u001b[37m',
	none,
};

const backgroundColorMap: Record<BackgroundColor, string> = {
	black: '\u001b[40m',
	red: '\u001b[41m',
	green: '\u001b[42m',
	yellow: '\u001b[43m',
	blue: '\u001b[44m',
	magenta: '\u001b[45m',
	cyan: '\u001b[46m',
	white: '\u001b[47m',
	none,
};

const decorationMap: Record<Decoration, string> = {
	bold: '\u001b[1m',
	underline: '\u001b[4m',
	reversed: '\u001b[7m',
	none,
};

type Style = {
	fontColor?: FontColor;
	backgroundColor?: BackgroundColor;
	alignment?: Alignment;
	decoration?: Decoration;
};
export default class Printer {
	public static format({
		backgroundColor = 'none',
		fontColor = 'none',
		alignment = 'left',
		decoration = 'none',
	}: Style) {
		const backgroundCode = backgroundColorMap[backgroundColor];
		const fontCode = fontColorMap[fontColor];
		const decorationCode = decorationMap[decoration];
		return function (text: string) {
			const formattedText = `${backgroundCode}${fontCode}${decorationCode}${text}${reset}`;
			let leftPaddingAmount = 0;
			if (alignment === 'center') {
				leftPaddingAmount = Printer.calculateLeftPadding(text);
			}

			process.stdout.write(`${' '.repeat(leftPaddingAmount)}${formattedText}\n`);
		};
	}

	private static calculateLeftPadding(text: string) {
		const columns = process.stdout.columns || 80;
		return Math.floor((columns - text.length) / 2);
	}

	total: number;
	step: number;
	load: loading.Loading;
	constructor({total, step}: {total: number; step: number}) {
		this.total = total;
		this.step = step;
		this.load = this.initLoader();
	}

	public initLoader(): loading.Loading {
		return loading({
			color: 'green',
			interval: 100,
			stream: process.stdout,
			frames: ['◐', '◓', '◑', '◒'],
		}).start();
	}

	public startStep(text: string): any {
		this.load.text = `(${this.step}/${this.total}) ${text}`;
		this.load.start();
	}

	public info(): any {
		this.load.info('ei');
	}

	public endStep(): number {
		this.load.succeed(this.load.text);
		this.step += 1;
		return this.step;
	}
}
