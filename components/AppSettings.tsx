import React from 'react';
import {StyleSheet, Text, View, ToastAndroid, Button} from 'react-native';
import Storage from "./Storage";
import {
	Select,
	NativeBaseProvider, Input,
} from "native-base"

interface Props {
	listCurrencyName: Array<string>;
}

interface StateSettings {
	currencySelected: string | undefined;
	apiKey: string;
}

const styles = StyleSheet.create({
	header: {
		marginTop: 5,
		marginBottom: 20,
		fontSize: 16,
		fontStyle: 'normal',
		justifyContent: 'center'
	},
	block: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderStyle: 'dotted',
	},
	item: {
		marginBottom: 35,
	},
	itemInput: {
		fontSize: 13,
	},
	buttonWrap: {
		flex: 1,
		marginHorizontal: 1
	},
	selectedWrap: {
		flex: 2,
		marginHorizontal: 1
	}
});

export default class AppSettings extends React.Component<Props, StateSettings> {

	constructor(props: any) {
		super(props);
		this.state = {
			apiKey: '',
			currencySelected: undefined
		}
	}

	async componentDidMount() {
		this.setState({apiKey: await Storage.getApiKey()});
	}

	selectItem = () => (
		<View style={styles.item}>
			<View>
				<Select placeholder={'Выбор валюты'}
				        onValueChange={item => this.setState({currencySelected: item})}
				>
					{this.props.listCurrencyName && this.props.listCurrencyName.map(item =>
						<Select.Item label={item} value={item} key={item}/>
					)}
				</Select>
			</View>
			<View style={styles.block}>
				<View style={styles.buttonWrap}>
					<Button title={'Добавить'} onPress={async () => {
						if (this.state.currencySelected) {
							const res = await Storage.addItemCurrency(this.state.currencySelected);
							res
								? ToastAndroid.show('Сохранено!', ToastAndroid.SHORT)
								: ToastAndroid.show('Уже есть в списке или ничего не было выбрано!', ToastAndroid.SHORT);
						}
					}
					}/>
				</View>
				<View style={styles.buttonWrap}>
					<Button title={'Удалить'} onPress={async () => {
						if (this.state.currencySelected) {
							const res = await Storage.delItemCurrency(this.state.currencySelected);
							res
								? ToastAndroid.show('Удалено!', ToastAndroid.SHORT)
								: ToastAndroid.show('Отсутствует в списке или ничего не было выбрано!', ToastAndroid.SHORT);
						}
					}
					}/>
				</View>
			</View>
		</View>
	)

	apiKeyItem = () => (
		<View>
			<Input placeholder={'ключ API https://coinmarketcap.com/'}
			       onChangeText={val => this.setState({apiKey: val})}
			>{this.state.apiKey}
			</Input>
			<Button title={'Сохранить ключ API'} onPress={async () => {
				await Storage.saveApiKey(this.state.apiKey);
				ToastAndroid.show('Сохранено!', ToastAndroid.SHORT)
			}}/>
		</View>
	)

	render() {
		return (
			<NativeBaseProvider>
				<View style={styles.header}>
					<Text>Установки</Text>
				</View>
				<View>
					{this.selectItem()}
					{this.apiKeyItem()}
				</View>
			</NativeBaseProvider>
		);
	}
}
