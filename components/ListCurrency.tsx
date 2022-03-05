import React from 'react';
import {Button, ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import TextBlock, {TextBlockProps} from "./TextBlock";
import Storage, {ItemCurrency} from "./Storage";
import ExtService from "./ExtService";

interface Props {
	items: Array<any>;
	/** массив криптовалюты с настройками уведомлений из Storage */
	storageCurrencyList: Array<ItemCurrency>;
}

interface State {
	storageCurrencyList: Array<ItemCurrency>;
	currency: Array<any> | undefined;
}


export default class ListCurrency extends React.Component<Props, State> {

	constructor(props: any) {
		super(props);
		this.state = {
			storageCurrencyList: [],
			currency: undefined,
		}
	}

	async componentDidMount() {
		this.setState({
			storageCurrencyList: this.props.storageCurrencyList,
			currency: this.props.items,
		})
		console.log(this.props.storageCurrencyList)
	}

	render() { // нельзя делать асинхронным !!! будет валить ошибку рендера!!!
		const extCurrencyData = this.state.currency || [];
		const currencyList = this.props.storageCurrencyList || [];
		const listArr = currencyList?.map( item => {
				const extData = extCurrencyData.filter(extItem => extItem.name === item.name);
				if (extData.length > 0) {
					const curData = extData[0]
					return {
						...item,
						id: curData.id,
						price: curData.quote.USD.price,
						changedHourPrc: curData.quote.USD.percent_change_1h,
						changedDayPrc: curData.quote.USD.percent_change_24h,
					}
				}
			})
		return (
			<View>
				<View style={styles.buttonUpdate}>
					<Button color={'orange'} title={'Обновить'} onPress={async () => {
						const res = await ExtService.updateContent(await Storage.getApiKey());
						if (res) {
							await this.setState({currency: res.data});
							// console.log(res);
							ToastAndroid.show('Обновлено!', ToastAndroid.SHORT);
						}
					}}/>
				</View>
				<ScrollView>
					{
						listArr && listArr.map( item => (
									item && <TextBlock
													key={item.id}
													id={item.id}
													name={item.name}
													price={item.price}
													changedHourPrc={item.changedHourPrc}
													changedDayPrc={item.changedDayPrc}
													notification={item.notification}
												 	// enableNotification={item.notification.enable}
												 	// maxLevelNotification={item.notification.maxLevel}
													// minLevelNotification={item.notification.minLevel}/>
							/>
						))
						// extCurrencyData && extCurrencyData
						// 	.filter((item: any) => currencyList.includes(item.name))
						// 	.map((item: any) => (
						// 		<TextBlock
						// 			key={item.id}
						// 			id={item.id}
						// 			name={item.name}
						// 			nameShort={item.symbol}
						// 			price={item.quote.USD.price}
						// 			changedHourPrc={item.quote.USD.percent_change_1h}
						// 			changedDayPrc={item.quote.USD.percent_change_24h}
						// 		 	enableNotification={false}
						// 		 	maxLevelNotification={0}
						// 			minLevelNotification={0}/>
						// 	))
					}
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(239,136,17,0.68)',
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 2,
		paddingHorizontal: 2,
		paddingVertical: 2,
		borderStyle: 'dotted',
		borderWidth: 2,
		borderColor: 'rgba(35,31,10,0.35)'
	},
	item: {
		marginBottom: 20,
	},
	textMain: {
		fontSize: 18,
		color: '#1063b4',
		fontWeight: 'bold'
	},
	textRed: {
		fontSize: 12,
		color: '#de889b',
		fontWeight: 'normal'
	},
	textGreen: {
		fontSize: 12,
		color: '#5b9554',
		fontWeight: 'normal'
	},
	textNormal: {
		fontSize: 12,
		color: '#081a1a',
		fontWeight: 'normal'
	},
	textRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	buttonUpdate: {
		marginHorizontal: 2,
		marginBottom: 15,
		marginTop: 5,
	}
});
