import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// interface IStorage {
// 	/** список криптовалют с id из полученного списка с сервера */
// 	// listCurrency: Array<{ id: number, name: string }>;
// 	listCurrency: Array<string>;
// }

export enum KeyStorage {
	listCurrency = 'listCurrency',
	apiKey = 'apiKey'
}

export interface ItemCurrency {
	name: string;
	notification?: {
		enable?: boolean;
		maxLevel?: number;
		minLevel?: number;
	}
}

export default class Storage {
	public static listCurrency: ItemCurrency[];
	constructor(props: any) {
	}

	public static async getListCurrency(): Promise<ItemCurrency[]> {
		const items = await AsyncStorage.getItem(KeyStorage.listCurrency);
		const resItems = items ? JSON.parse(items) : [];
		this.listCurrency = resItems;
		// console.log('Storage:Список выбранных валют:');
		// console.log(resItems);
		return resItems;
	}

	public static async getCurrency(name: string): Promise<ItemCurrency> {
		const items = await AsyncStorage.getItem(KeyStorage.listCurrency);
		const resItems = items ? JSON.parse(items) : [];
		const resArr = resItems.filter((item: ItemCurrency) =>item.name===name);
		// console.log('Storage:getCurrency:');
		// console.log(resArr);
		return resArr && resArr[0] || [];
	}

	public static async addItemCurrency(itemName: string): Promise<boolean> {
		if (!itemName) return false;
		let items = await this.getListCurrency();
		// if (items.length > 0 && items.filter(element => element.name === itemName).length === 0) return false;

		const newItem: ItemCurrency = {
			name: itemName,
			notification: {
				enable: false,
				minLevel: 0,
				maxLevel: 0,
			}
		}

		items.push(newItem);
		try {
			await AsyncStorage.setItem(KeyStorage.listCurrency, JSON.stringify(items));
		} catch (e) {
			throw new Error(e);
		}
		return true;
	}

	public static async updateItemCurrency(item: ItemCurrency): Promise<boolean> {
		if (!item) return false;
		let items = await this.getListCurrency()
		// if (items.filter(element => element.name === item.name).length === 0) return false;

		const newItems = items.filter(element => element.name !== item.name) // список за исключением обновляемого элемента
		newItems.push(item)
		// console.log('UpdateItemCurrency:')
		// console.log(newItems)
		try {
			await AsyncStorage.setItem(KeyStorage.listCurrency, JSON.stringify(newItems))
		} catch (e) {
			throw new Error(e)
		}
		return true
	}

	public static async delItemCurrency(itemName: string): Promise<boolean> {
		let items = await this.getListCurrency()
		const newItems = items.filter(element => element.name !== itemName)

		if (items.length > newItems.length) {
			await AsyncStorage.setItem(KeyStorage.listCurrency, JSON.stringify(newItems))
			return true
		}
		return false
	}

	public static async removeObjStorage(key: KeyStorage): Promise<boolean> {
		try {
			 await AsyncStorage.removeItem(key)
			 this.listCurrency = []
			 return true
		} catch (e) {
			 return false
		}
	}

	public static async saveApiKey(apiKey: string): Promise<boolean> {
		if (!apiKey) return false;
		try {
			await AsyncStorage.setItem(KeyStorage.apiKey, apiKey);
		} catch (e) {
			throw new Error(e);
		}
		return true;
	}

	public static async getApiKey(): Promise<string> {
		const res =  await AsyncStorage.getItem(KeyStorage.apiKey) || 'c5373e43-fdbc-4360-8015-6724c734ab75';
		// console.log('key: ' + res);
		return res;
	}
}
