import axios from "axios";

export default class ExtService {

	public static async updateContent(apiKey: string): Promise<any> {
		try {
			const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
				{
					headers: {
						'Content-Type': "application/json; charset=utf-8",
						'X-CMC_PRO_API_KEY': apiKey,
					},
				});
			if (response && response.data) {
				return response.data;
			}
		} catch (error) {
			console.error(error);
			throw new Error('Ошибка запроса  валюты!')
		}
	}


}
