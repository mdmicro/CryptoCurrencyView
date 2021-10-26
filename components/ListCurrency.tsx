import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import TextBlock from "./TextBlock";
import Storage from "./Storage";

interface Props {
	items: Array<any>;
}

interface State {
	storageCurrencyList: Array<string>;
}

const styles = StyleSheet.create({
	block: {
		flex: 1,
		backgroundColor: '#d2c731',
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 2,
		paddingHorizontal: 2,
		paddingVertical: 2,
		borderStyle: 'dotted',
		borderWidth: 2,
		borderColor: 'rgba(35,31,10,0.35)'
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
});


export default class ListCurrency extends React.Component<Props, State> {

	constructor(props: any) {
		super(props);
		this.state = {
			storageCurrencyList: [],
		}
	}

	async componentDidMount() {
		const list = await Storage.getListCurrency();
		this.setState({storageCurrencyList: list})
		console.log(list);
	}

	render() {
		const items = this.props.items || [];

		return (
			<View>
				<Text style={{marginBottom: 5, marginTop: 5, fontSize: 12, textAlign: 'center'}}>обновлено </Text>
				<ScrollView>
					{
						items && items
							.filter(item => this.state.storageCurrencyList.includes(item.name))
							.map((item: any) => (
								<TextBlock
									key={item.id}
									id={item.id}
									name={item.name}
									nameShort={item.symbol}
									price={item.quote.USD.price}
									changedHourPrc={item.quote.USD.percent_change_1h}
									changedDayPrc={item.quote.USD.percent_change_24h}
								/>
							))}
				</ScrollView>
			</View>
		);
	}
}
