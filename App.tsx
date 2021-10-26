import React from 'react';
import {
	View, Text, SafeAreaView,
	ScrollView, StyleSheet, Button, Settings
} from 'react-native';
import ListCurrency from "./components/ListCurrency";
import AppSettings from "./components/AppSettings";
import AppAbout from "./components/AppAbout";
import Storage from "./components/Storage";
import ExtService from "./components/ExtService";

interface AppState {
	isLoading: boolean;
	fontLoaded: boolean;
	config: Config;
	currency: any;
	activePage: AppMode;
}

interface Config {
	apiKey: string
}

enum AppMode {
	main = 'main',
	settings = 'settings',
	about = 'about',
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	cmdPanel: {
		flexDirection: "row",
		borderColor: '#FFFFFF',
		marginBottom: 5,
		marginTop: 1,
		alignItems: 'stretch',
	},
	buttonWrap: {
		flex: 1,
		marginHorizontal: 1
	}
})

export default class App extends React.Component<{}, AppState> {

	constructor(props: any) {
		super(props);
		this.state = {
			isLoading: true,
			fontLoaded: false,
			currency: undefined,
			config: {
				apiKey: 'c5373e43-fdbc-4360-8015-6724c734ab75',
			},
			activePage: AppMode.main
		}
	}

	async componentDidMount() {
		const apiKey = await Storage.getApiKey();
		const response = await ExtService.updateContent(apiKey);
		if (response) {
			await this.setState({currency: response})
		}
	}

	render() {
		const currency = this.state.currency?.data || [];
		const active = this.state.activePage;
		return (
			<SafeAreaView style={styles.container}>
				<Text style={{
					marginBottom: 10,
					marginTop: 30,
					fontSize: 18,
					textAlign: 'center',
					textDecorationStyle: 'double'
				}}>Список курсов криптовалют</Text>
				<View style={styles.cmdPanel}>
					<View style={styles.buttonWrap}>
						<Button color={'orange'} title='Главная'
						        onPress={() => this.setState({activePage: AppMode.main})}/>
					</View>
					<View style={styles.buttonWrap}>
						<Button color={'orange'} title='Установки'
						        onPress={() => this.setState({activePage: AppMode.settings})}/>
					</View>
					<View style={styles.buttonWrap}>
						<Button color={'orange'} title='Описание'
						        onPress={() => this.setState({activePage: AppMode.about})}/>
					</View>
				</View>

				{active === AppMode.main && <ListCurrency key={'listCurrency'} items={currency}/>}
				{active === AppMode.settings &&
				<AppSettings key={'appSettings'} listCurrencyName={currency.map((item: any) => item.name)}/>}
				{active === AppMode.about && <AppAbout key={'appAbout'}/>}

			</SafeAreaView>
		);
	}
}
