export class Signal {
	value: any = undefined;
	listeners: Function[] = [];

	constructor(value: any) {
		this.value = value;
		this.listeners = [];
	}

	get() {
		return structuredClone(this.value);
	}

	set(value: any) {
		this.value = value;
		this.listeners.forEach((listener: Function) => listener(value));
	}

	setWithoutNotify(value: any) {
		this.value = value;
	}

	attach(listener: Function) {
		this.listeners.push(listener);
	}

	detach(listener: Function) {
		const index = this.listeners.indexOf(listener);
		if (index !== -1) this.listeners.splice(index, 1);
	}
}
