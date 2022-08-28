export default function sortObjectKeys(o: Record<string, any>): Record<string, any> {
	return (Object(o) !== o || Array.isArray(o)
		? o
		: Object.keys(o).sort().reduce((a, k) => ({...a, [k]: sortObjectKeys(o[k])}), {}));
}
