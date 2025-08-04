import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function updateOptionsVisibility(this: BaseUIElement): void {
	console.log('State Options changed', this);
	this.style.display = this.style.display === 'none' ? 'block' : 'none';

	const options = this.store?.getState('options');
	console.log(options);

	const prevUl = this.querySelector('#xyz');
	if (prevUl && prevUl.parentNode === this) {
		this.removeChild(prevUl);
	}

	if (options && Array.isArray(options)) {
		const ul = document.createElement('ul');
		ul.id = 'xyz';

		options.forEach((op) => {
			const li = document.createElement('li');
			li.innerText = op.label;
			li.style.listStyleType = 'none';
			li.style.paddingBottom = '12px';

			li.addEventListener('click', () => {
				console.log('clicked', op.value);
				// actions['updateOptionsValues'].call(this, op.label)
				// this.parentNode.childNodes[1].textContent = op.label
				this.store?.setState('selectedOption', op.label);
			});

			ul.append(li);
		});

		this.append(ul);
	}
}
