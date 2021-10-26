import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// interface IStorage {
// 	/** список криптовалют с id из полученного списка с сервера */
// 	// listCurrency: Array<{ id: number, name: string }>;
// 	listCurrency: Array<string>;
// }

enum KeyStorage {
	listCurrency = 'listCurrency'
}

export default class Storage {
	constructor(props: any) {
	}

	public static async getListCurrency(): Promise<Array<string>> {
		const items = await AsyncStorage.getItem(KeyStorage.listCurrency);
		const resItems = items ? JSON.parse(items) : [];
		return resItems;
	}

	public static async addItemCurrency(item: string): Promise<boolean> {
		if (!item) return false;

		let items = await this.getListCurrency();
		if (items.includes(item)) return false;
		items.push(item);
		try {
			await AsyncStorage.setItem(KeyStorage.listCurrency, JSON.stringify(items));
		} catch (e) {
			throw new Error(e);
		}
		return true;
	}

	public static async delItemCurrency(item: string): Promise<boolean> {
		let items = await this.getListCurrency();
		
		if (items.indexOf(item) !== -1) {
			items.splice(items.indexOf(item))
			await AsyncStorage.setItem(KeyStorage.listCurrency, JSON.stringify(items));
			return true;
		}
		return false;
	}

}
