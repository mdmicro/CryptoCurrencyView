import axios from "axios";

export default class ExtService {
	public static updateData: any;

	// запрос списка криптовалют с информацией о курсе
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
				console.log('ExtService:updateContent:resp.data: ');
				console.log(response.data);
				this.updateData = response.data;
				return response.data;
			}
			this.updateData = undefined;
			return undefined;
		} catch (error) {
			console.error(error);
			throw new Error('Ошибка запроса  валюты!')
		}
	}


}
