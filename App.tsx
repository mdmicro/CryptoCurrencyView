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
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import {BackgroundFetchResult} from "expo-background-fetch";
import * as Notifications from 'expo-notifications';

const BACKGROUND_FETCH_TASK = 'background-fetch';

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
	const now = Date.now();
	console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
	await ExtService.updateContent(await Storage.getApiKey());
	new App({dataUpdate: true});
	// Be sure to return the successful result type!
	return BackgroundFetchResult.NewData;
	// return BackgroundFetch.Result?.NewData;
});

// 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync() {
	return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
		minimumInterval: 2, // 60 sec
		stopOnTerminate: false, // android only,
		startOnBoot: true, // android only
	});
}

interface AppState {
	isLoading: boolean;
	fontLoaded: boolean;
	config: Config;
	currency: Array<any>;
	list: Array<any>;
	activePage: AppMode;
	dataUpdate: boolean;
}

interface AppProps {
	dataUpdate: boolean;
}

interface Config {
	apiKey: string
}

enum AppMode {
	main = 'main',
	settings = 'settings',
	about = 'about',
}

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

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
});
(async () => await registerBackgroundFetchAsync())();


export default class App extends React.Component<AppProps, AppState> {

	constructor(props: any) {
		super(props);
		this.state = {
			isLoading: true,
			fontLoaded: false,
			currency: [],
			list: [],
			config: {
				apiKey: '',
			},
			activePage: AppMode.main,
			dataUpdate: props.dataUpdate,
		}
	}

	async componentDidMount() {
		await ExtService.updateContent(await Storage.getApiKey());
		const list = await Storage.getListCurrency();
		this.setState({list});
		// console.log(list);
		// console.log('App:Component did mount:currency: ');
		if (ExtService.updateData) {
			// console.log(ExtService.updateData.data[0].name);
			this.setState({currency: ExtService.updateData.data})
		}
	}

	render() {
		const currency = this.state.currency || [];
		const list = this.state.list || [];
		// console.log(list);
		// console.log(currency);
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

				{active === AppMode.main && <ListCurrency key={'listCurrency'} items={currency} list={list} />}
				{active === AppMode.settings &&
				<AppSettings key={'appSettings'} listCurrencyName={currency.map((item: any) => item.name)}/>}
				{active === AppMode.about && <AppAbout key={'appAbout'}/>}

			</SafeAreaView>
		);
	}
}
