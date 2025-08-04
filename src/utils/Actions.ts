'use strict';

import { BaseUIElement } from '../Lib/BaseComponent/baseComponent';
import { FetchService } from '../Services/api/APIService';
import { appliers, generateUUID } from './common';
import { setState } from './Actions/setState';
import { setStateWithoutNotify } from './Actions/setStateWithoutNotify';
import { undo } from './Actions/undo';
import { redo } from './Actions/redo';
import { read } from './Actions/read';
import { write } from './Actions/write';
import { Mask } from './Actions/Mask';
import { toggle } from './Actions/toggle';
import { get } from './Actions/get';
import { put } from './Actions/put';
import { post } from './Actions/post';
import { deleteCall } from './Actions/deleteCall';
import { stream } from './Actions/stream';
import { getMethod } from './Actions/getMethod';
import { setMethod } from './Actions/setMethod';
import { validateInput } from './Actions/validateInput';
import { addNewAtom } from './Actions/addNewAtom';
import { parseAtomsToJSON } from './Actions/parseAtomsToJSON';
import { removeAtomsFromJSON } from './Actions/removeAtomsToJSON';
import { addAtomsToJSON } from './Actions/addAtomsToJSON';
import { handleZoom } from './Actions/handleZoom';
import { handleInput } from './Actions/handleInput';
import { AddBorder } from './Actions/AddBorder';
import { RemoveBorder } from './Actions/RemoveBorder';
import { panEnd } from './Actions/panEnd';
import { GetAtoms } from './Actions/GetAtoms';
import { GetComponentId } from './Actions/GetComponentId';
import { removeAtomsFromArray } from './Actions/removeAtomsFromArray';
import { panStart } from './Actions/panStart';
import { handlePan } from './Actions/handlePan';
import { dragElement } from './Actions/dragElement';
import { dragOverElement } from './Actions/dragOverElement';
import { dropElement } from './Actions/dropElement';
import { collectAllAtomsFromJSON } from './Actions/collectAllAtomsFromJSON';
import { addAtomToComponent } from './Actions/addAtomToComponent';
import { generateID } from './Actions/generateID';
import { traverse } from './Actions/traverse';
import { updateCallback } from './Actions/updateCallback';
import { Operate } from './Actions/Operate';
import { Switch } from './Actions/Swith';
import { updatePropertyInAtom } from './Actions/updatePropertyInAtom';
import { replaceAtomInComponent } from './Actions/replaceAtomInComponent';
import { replaceAtomsOfComponentInJSON } from './Actions/replaceAtomsOfComponentInJSON';
import { pushToArray } from './Actions/pushToArray';
import { renderTemplate } from './Actions/renderTemplate';
import { createContentAtom } from './Actions/createContentAtom';
import { createColourAtom } from './Actions/createColourAtom';
import { createSpacingAtom } from './Actions/createSpacingAtom';
import { createTypographyAtom } from './Actions/createTypographyAtom';
import { createImageAtom } from './Actions/createImageAtom';
import { createLayoutAtom } from './Actions/createLayoutAtom';
import { createStyleAtom } from './Actions/createStyleAtom';
import { createAttributeAtom } from './Actions/createAttributeAtom';
import { createMicroAnimationAtom } from './Actions/createMicroAnimationAtom';
import { createStateAtom } from './Actions/createStateAtom';
import { createAPIAtom } from './Actions/createAPIAtom';
import { createRouterAtom } from './Actions/createRouterAtom';
import { createKeyboardEventAtom } from './Actions/createKeyboardEventAtom';
import { convertAtomConfigsToArray } from './Actions/convertAtomConfigsToArray';
import { parseComponentTree } from './Actions/parseComponentTree';
import { toggleAttribute } from './Actions/toggleAttribute';
import { toggleChildList } from './Actions/toggleChildList';
import { makeListAccordion } from './Actions/makeListAccordion';
import { updateOptionsVisibility } from './Actions/updateOptionsVisibility';
import { setToLocalStorage } from './Actions/setToLocalStorage';
import { importLocalImage } from './Actions/importLocalImage';
import { addCSS } from './Actions/addCSS';
import { GetDataFromIndexDb } from './Actions/getDataFromIndexDb';
import { SetDataToIndexDb } from './Actions/setDataToIndexDb';
import { addItemInArrayByKey } from './Actions/addItemInArrayByKey';
import { colorPicker } from './Actions/Components/ColorPicker';
import { fileUpload } from './Actions/Components/fileupload';

export const actions: Record<string, Function> = {
	a: function () {
		return 4;
	},

	b: function (n: number): number {
		if (n <= 1) return 1;
		return n * this.b(n - 1);
	},

	setState,

	colorPicker,

	setStateWithoutNotify,

	undo,

	redo,

	read,

	write,

	fileUpload,

	c: function (a: any): number {
		return a * 2;
	},

	d: function (f: any, b: any, c: any): number {
		return b + 2 * c + f;
	},

	e: function (c: any): number {
		return c - 3;
	},

	f: function (e: any) {
		return e * 10;
	},

	g: function (f: any) {
		return f + 1;
	},

	d3: function () {
		return 10;
	},

	func1: function () {
		////console.log('Function 1 executed');
		return 1;
	},

	func2: function (a: any, b: any) {
		////console.log('Function 2 executed with', a, b);
		return 2;
	},

	func3: function (a: any) {
		////console.log('Function 3 executed with', a);
		return 3;
	},

	func4: function (a: any) {
		////console.log('Function 4 executed with', a);
		return 4;
	},

	alert: (message: string) => {
		alert(message);
	},

	Mask,

	toggle,

	get,

	put,

	post,

	deleteCall,

	stream,

	setHeader: function (this: BaseUIElement, key: string, value: string) {
		return this.apiService?.setHeader(key, value);
	},

	concatString: function (this: BaseUIElement, value1: string, value2: string) {
		return value1 + value2;
	},

	getLength: function (this: BaseUIElement, value: any): number {
		console.log('GET LENGTH', value);
		if (typeof value === 'string') {
			return value.length;
		}

		if (Array.isArray(value)) {
			return value.length;
		}

		if (typeof value === 'boolean') {
			return value ? 1 : 0;
		}

		if (typeof value === 'object' && value !== null) {
			return Object.keys(value).length;
		}

		if (typeof value === 'number') {
			return value;
		}

		return 0; // default fallback for undefined, null, etc.
	},

	setHeaders: function (this: BaseUIElement, headers: Record<string, string>) {
		return this.apiService?.setHeaders(headers);
	},

	getHeaders: function (
		this: BaseUIElement
	): Record<string, string> | undefined {
		return this.apiService?.getHeaders();
	},

	removeHeader: function (this: BaseUIElement, key: string) {
		return this.apiService?.removeHeader(key);
	},

	setBaseUrl: function (this: BaseUIElement, url: string) {
		return this.apiService?.setBaseUrl(url);
	},

	getBaseUrl: function (this: BaseUIElement): string | undefined {
		return this.apiService?.getBaseUrl();
	},

	setRequestInterceptor: function (
		this: BaseUIElement,
		interceptor: Parameters<FetchService['setRequestInterceptor']>[0]
	) {
		return this.apiService?.setRequestInterceptor(interceptor);
	},

	setResponseInterceptor: function (
		this: BaseUIElement,
		interceptor: Parameters<FetchService['setResponseInterceptor']>[0]
	) {
		return this.apiService?.setResponseInterceptor(interceptor);
	},

	setResponseErrorInterceptor: function (
		this: BaseUIElement,
		interceptor: Parameters<
			FetchService['setResponseErrorInterceptor']
		>[0]
	) {
		return this.apiService?.setResponseErrorInterceptor(interceptor);
	},

	getInterceptors: function (this: BaseUIElement) {
		return this.apiService?.getInterceptors();
	},

	clickAnimate: function (this: HTMLElement) {
		const d = 10;
		this.style.transition = `transform ${d}ms ease-out,box-shadow ${d}ms ease-out`;
		this.style.transform = 'scale(0.9)';
		this.style.boxShadow = '0 4px 10px rgba(0,0,0,.25)';
		setTimeout(() => {
			this.style.transform = 'scale(1)';
			this.style.boxShadow = 'none';
		}, d);
	},

	toggleCheckbox: function (this: HTMLElement) {
		if (this.hasAttribute('checked')) {
			this.removeAttribute('checked');
			this.setAttribute('aria-checked', 'false');
			this.style.backgroundColor = 'white';
		} else {
			this.setAttribute('checked', 'true');
			this.setAttribute('aria-checked', 'true');
			this.style.backgroundColor = 'lightblue';
		}
	},
	validationErrorMsg: function (this: HTMLElement, isValid: boolean) {
		this.style.outline = isValid ? '1px solid grey' : '1px solid red';
	},

	/**
	 * Safely retrieves a nested value from an HTMLElement using a path.
	 */
	getMethod,

	/**
	 * Safely sets a nested value on an HTMLElement using a path.
	 */
	setMethod,

	render: function (this: BaseUIElement, plan: any) {
		this.childDefs = [plan];
	},

	emptyChild: function (this: BaseUIElement) {
		this.childDefs = [];
	},

	validate: function (res: any) {
		if (res.accessToken) {
			return true;
		}
		return false;
	},

	getJsonFromApi: function (
		this: BaseUIElement,
		isValid: boolean,
		path: string
	) {
		console.log('GET JSON FROM API:', isValid, path);
		if (isValid) {
			return this.routerService?.returnRoute(path);
		} else {
			return '';
		}
	},

	redirect: function (this: BaseUIElement, isApiSuccess: boolean) {
		if (isApiSuccess) {
			this.routerService?.navigate("");
		}
	},

	panTrigger: function (this: BaseUIElement, e: MouseEvent) {
		let start = {
			x: e.clientX,
			y: e.clientY,
		};
		return start;
	},

	panFunction: function (this: BaseUIElement, start: any, e: MouseEvent) {
		this.actionData.translateX = e.clientX - start.x;
		this.actionData.translateY = e.clientY - start.y;
	},

	hideUnhide: function (this: BaseUIElement, isVisible: boolean) {
		this.style.display = isVisible ? 'flex' : 'none';
		return true;
	},

	handleZoom,

	handleInput,

	cleanInput: function (this: BaseUIElement) {
		let value = this.textContent;
		let cleanValue =
			value
				?.replace(/\u200B/g, '')
				.replace(/\n/g, '')
				.trim() || '';
		////console.log('Cleaned:', cleanValue);
		return cleanValue;
	},

	validateInput,

	AddBorder,

	RemoveBorder,

	addNewAtom,

	panEnd,

	GetAtoms,

	GetComponentId,

	parseAtomsToJSON,

	removeAtomsFromJSON,

	removeAtomsFromArray,

	addAtomsToJSON,

	renderTemplate,

	// panStart: called on mousedown or pointerdown
	// On grab:
	panStart,

	// On move:
	handlePan,

	// createObject: function(this: HTMLElement, ...args: any) {
	// 	args.forEach()
	// }
	dragElement,

	dragOverElement,

	dropElement,

	collectAllAtomsFromJSON,

	addAtomToComponent,

	generateID,

	traverse,

	updateCallback,

	Operate,

	Switch,

	updatePropertyInAtom,

	replaceAtomInComponent,

	replaceAtomsOfComponentInJSON,

	pushToArray,

	createContentAtom,

	createColourAtom,

	createSpacingAtom,

	createTypographyAtom,

	createImageAtom,

	createLayoutAtom,

	createStyleAtom,

	createAttributeAtom,

	createMicroAnimationAtom,

	createStateAtom,

	createAPIAtom,

	createRouterAtom,

	createKeyboardEventAtom,

	convertAtomConfigsToArray,

	parseComponentTree,

	toggleAttribute,

	toggleChildList,

	makeListAccordion,

	updateOptionsVisibility,

	setToLocalStorage,

	importLocalImage,

	addCSS,

	getCurrentPath: function (this: BaseUIElement) {
		return this.routerService?.getCurrentRoute();
	},

	setDataToBrowserToCoockie: function (
		this: BaseUIElement,
		value: Record<string, any>,
		path: string
	) {
		for (let key in value) {
			if (value.hasOwnProperty(key)) {
				const encodedKey = encodeURIComponent(key);
				const encodedValue = encodeURIComponent(value[key]);
				document.cookie = `${encodedKey}=${encodedValue}; max-age=31536000000;path=${path}`;
			}
		}
	},

	SetJsonToIndexDb: function (this: BaseUIElement, json: any, path: string) {
		this.idexedDBService?.save(path, json);
		// return path
	},

	GetJsonFromIndexDb: async function (this: BaseUIElement, path: string) {
		const json = await this.idexedDBService?.get(path);
		return json ?? null;
	},

	getDataFromBrowserCookie: function (
		this: BaseUIElement,
		key: string
	): string | null {
		const nameEQ = encodeURIComponent(key) + '=';
		const cookies = document.cookie.split(';');

		for (let cookie of cookies) {
			cookie = cookie.trim();
			if (cookie.startsWith(nameEQ)) {
				return decodeURIComponent(cookie.substring(nameEQ.length));
			}
		}
		return null;
	},

	navigate: function (this: BaseUIElement, path: string, isValid: boolean) {
		return this.routerService?.navigate(path);
		if (isValid) {
		} else {
			return '';
		}
	},

	attachRouteOnPopState: function (
		this: BaseUIElement,
		path: string,
		json: any
	) {
		this.routerService?.attachRouteOnPopState(path, json);
	},

	changeDesignSystem: function (this: BaseUIElement, designSystem: string) {
		this.designSystemService
			? (this.designSystemService.currentSystem = designSystem)
			: '';
	},

	changeTheme: function (this: BaseUIElement, theme: string) {
		this.designSystemService
			? (this.designSystemService.currentTheme = theme)
			: '';
	},

	test: function (this: BaseUIElement) {
		console.log('State Changed', this);
		if (this.store?.getState('openPopup') === false) {
			this.style.display = 'none';
		} else {
			this.style.display = 'flex';
			this.style.alignItems = 'center';
			this.style.justifyContent = 'center';
		}
	},

	test3: function (this: BaseUIElement) {
		console.log(this);
		this.style.display = 'flex';
	},

	test4: function (this: BaseUIElement) {
		console.log(this);
		if (this.store?.getState('openEditPanel') === false) {
			this.style.display = 'none';
			return;
		}
		if (this.store?.getState('openEditPanel') === true) {
			this.style.display = 'flex';
			this.style.alignItems = 'center';
			this.style.justifyContent = 'center';
			return;
		}
	},

	test5: function (this: BaseUIElement) {
		this.style.display = 'none';
	},

	test7: function (this: BaseUIElement) {

		const selectedComp = this.store?.getState('selectedComp');
		if (selectedComp) {
			actions.render.call(this, selectedComp);
			console.log(this, this.childDefs);
		} else {
			return;
		}
	},

    generateMetadata: function(this: BaseUIElement, componentName: String){
        //const id = generateUUID()
        return {
            "tag": `mobius-${componentName}`,
            "type": "component",
            "id": generateUUID(),
            "createdBy": "user_2001",
            "usageInfo": "Dummy component for testing",
            "atoms": [
                {
                    "type": "LayoutAtom",
                    "id": generateUUID(),
                    "config": {
                       "role": "width",
                       "value": "15%"
                    }
                },
                {
                    "type": "LayoutAtom",
                    "id": generateUUID(),
                    "config": {
                       "role": "height",
                       "value": "15%"
                    }
                },
                {
                    "type": "InteractionAtom",
                    "id": generateUUID(),
                    "config": {
                        "trigger": "click",
                        "params": [],
                        "action": "test8"
                    }
                },
                {
                    "type": "ContentAtom",
                    "id": generateUUID(),
                    "config": {
                        "text": componentName
                    }
                },
                {
                    "type": "ColourAtom",
                    "id": generateUUID(),
                    "config": {
                        "role": "background",
                        "value": "lightblue"
                    }
                },
                {
                    "type": "ColourAtom",
                    "id": generateUUID(),
                    "config": {
                        "role": "color",
                        "value": "white"
                    }
                },
                {
                    "type": "StyleAtom",
                    "id": generateUUID(),
                    "config": {
                        "role": "display",
                        "value": "flex"
                    }
                },
                  {
                    "type": "StyleAtom",
                    "id": generateUUID(),
                    "config": {
                        "role": "align",
                        "value": "center"
                    }
                },
                  {
                    "type": "StyleAtom",
                    "id": generateUUID(),
                    "config": {
                        "role": "justify",
                        "value": "center"
                    }
                }
            ],
            "children": [],
        };
    },

	test8: function (this: BaseUIElement) {
		console.log(this.getAttribute('id'), typeof this.id);
		this.store?.setState('selectedComponent', this.id);
		this.store?.setState('atomState', this._atoms);
		this.store?.setState('apiResponse', this._currentPlan);
	},

	updateComponentAtomsAndRender: function (this: BaseUIElement) {
		const updatedComp = this.store?.getState('apiResponse');
		actions.render.call(this, updatedComp);
	},

	getVariableAndValue: function (this: BaseUIElement) {
		if (this.designSystemService)
			return this.designSystemService.getCurrentThemeVariables();
		return [];
	},

	setCssVar: function (this: BaseUIElement, name: string, value: string) {
		if (this.designSystemService)
			return this.designSystemService.setCSSVar(name, value);
		return [];
	},

	updateCssVar: function (this: BaseUIElement, name: string, value: string) {
		if (this.designSystemService)
			return this.designSystemService.updateCssVar(name, value);
		return [];
	},

	reApplyAtoms: function (this: BaseUIElement, atoms: Array<any> | any) {
		if (Array.isArray(atoms)) {
			atoms.forEach((a: any) => {
				const config = a.config;
				appliers[a.type]?.(this, config);
			});
		} else if (atoms.config) {
			const config = atoms.config;
			appliers[atoms.type]?.(this, config);
		}
	},

	toggleDropdown: function (this: BaseUIElement, id: string): void {
		const parent = this.parentNode as HTMLElement | null;
		const triggerElement = parent?.querySelector(`#${id}`) as BaseUIElement | null;
		if (!triggerElement) return;

		// Toggle visibility
		const isNowVisible = triggerElement.style.display === 'none';
		triggerElement.style.display = isNowVisible ? 'flex' : 'none';

		if (isNowVisible) {
			const handleOutsideClick = (e: MouseEvent) => {
				const clickedInside = (e.target as HTMLElement).closest(`#${id}`);
				if (!clickedInside) {
					triggerElement.style.display = 'none';
					document.removeEventListener('click', handleOutsideClick);
				}
			};

			// Delay registering the click listener to avoid firing on the current click
			setTimeout(() => {
				document.addEventListener('click', handleOutsideClick);
			}, 0);
		}
	},

	GetDataFromIndexDb,

	SetDataToIndexDb,

	addItemInArrayByKey,

	arrayMethods: function (
		this: BaseUIElement,
		type: string,
		data: Array<any>,
		obj: any,
		index: number = 0
	) {
		switch (type) {
			case 'push': {
				data.push(obj);
				return data;
			}
			case 'pop': {
				data.pop();
				return data;
			}
			case 'getIndex': {
				return data[index];
			}
			default: {
				return obj;
			}
		}
	},

	objectMethods: function (this: BaseUIElement, data: Array<any>, id: string) {
		console.log(data, id);
		return data.find((dt) => dt.id === id);
	},

	callThirdPartyService: function (this: BaseUIElement, variableName: string, methodName: string, ...args: any[]) {
		const instance = BaseUIElement._thirdPartyInstances?.registry[variableName];
		if (instance && typeof instance[methodName] === 'function') {
			return instance[methodName](this, ...args);
		} else {
			console.warn(`Service ${instance} or method ${methodName} not found.`);
			return null;
		}
	},
};
