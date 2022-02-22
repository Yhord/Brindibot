module.exports = class SimpleTranslation {
	constructor(langDef, lang) {
		this.langDef = langDef;
		this.lang = lang;
		this.path = './lang/';
	}

	getKeyValue(key) {
		let s = require(`${this.path}${this.lang}.json`)[key];
		if (s === undefined) {
			s = require(`${this.path}${this.langDef}.json`)[key];
			if (s === undefined) {
				return this.error ? this.error : `Key: ${key} not found`;
			}
		}
		return s;
	}

	getST(key, ...values) {
		let s = this.getKeyValue(key);
		for (let i = 0; i < values.length; i++) {
			s = s.replace(/%v/, values[i]);
		}
		return s;
	}
};