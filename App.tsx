import React from 'react';
import {
	View, Text, SafeAreaView,
	ScrollView, StyleSheet, Button, Settings, Alert, Platform
} from 'react-native';
import ListCurrency from "./components/ListCurrency";
import AppSettings from "./components/AppSettings";
import AppAbout from "./components/AppAbout";
import Storage, {ItemCurrency} from "./components/Storage";
import ExtService from "./components/ExtService";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import {BackgroundFetchResult} from "expo-background-fetch";
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const BACKGROUND_FETCH_TASK = 'background-fetch';

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
	const now = Date.now();
	console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
	await ExtService.updateContent(await Storage.getApiKey());

	// await Notifications.scheduleNotificationAsync({
	// 	content: {
	// 		title: "You've got mail! 📬",
	// 		body: "Let's hope this doesn't crash!",
	// 	},
	// 	trigger: new Date(Date.now() + 5000),
	// });

	// new App({dataUpdate: true});
	// App.extUpdate();
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
	listSelectedCurrency: Array<ItemCurrency>;
	activePage: AppMode;
	dataUpdate: boolean;
	expoPushToken: any;
	notification: any;
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
		shouldPlaySound: true,
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
			listSelectedCurrency: [],
			config: {
				apiKey: '',
			},
			activePage: AppMode.main,
			// dataUpdate: props.dataUpdate,
			dataUpdate: false,
			expoPushToken: '',
			notification: false,
		}

		this.registerForPushNotificationsAsync().then((token: any) =>
			this.setState({expoPushToken: token})
		);
		Notifications.addNotificationReceivedListener((notification: any) => {
			console.log('Notification received at: ' + new Date(Date.now()));
			this.setState({notification});
		});
		Notifications.addNotificationResponseReceivedListener((response) => {
			console.log('Notification response received at: ' + new Date(Date.now()));
		});
	}

	// extUpdate() {
	// 	this.setState({dataUpdate: true});
	// }

	async componentDidMount() {
		this.setState({listSelectedCurrency: await Storage.getListCurrency()});
		await ExtService.updateContent(await Storage.getApiKey());
		// console.log(list);
		// console.log('App:Component did mount:currency: ');
		if (ExtService.updateData) {
			// console.log(ExtService.updateData.data[0].name);
			this.setState({currency: ExtService.updateData.data})
		}
		// Alert.alert('warning', 'test!');
		// this.state.dataUpdate && this.setState({dataUpdate: false});
	}

	async componentDidUpdate() {
		this.setState({listSelectedCurrency: await Storage.getListCurrency()});
	}

	// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
	async showNotification() {
		let trigger = new Date(Date.now() + 5000); // notification scheduler after 10 sec
		console.log('Notification scheduled for: ' + trigger);
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "You've got mail! 📬",
				body: "Let's hope this doesn't crash!",
			},
			trigger: trigger,
		});
	}

	async registerForPushNotificationsAsync() {
		let token;
		if (Constants.isDevice) {
			const { status: existingStatus } = await Permissions.getAsync(
				Permissions.NOTIFICATIONS
			);
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!');
				return;
			}
			token = (
				await Notifications.getExpoPushTokenAsync({
					experienceId: '@charliecruzan/myapp',
				})
			).data;
			console.log(token);
		} else {
			alert('Must use physical device for Push Notifications');
		}

		if (Platform.OS === 'android') {
			let result = await Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.NONE,
				enableVibrate: false,
				// shouldPlaySound: false,
				sound: null,
				lightColor: '#FF231F7C',
				vibrationPattern: null,
			});
		}
		return token;
	}


	render() {
		const currency = this.state.currency || [];
		// const listSelectedCurrency = Storage.getListCurrency() || [];
		const listSelectedCurrency = this.state.listSelectedCurrency || [];
		// console.log(listSelectedCurrency);
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
				{/*<Button*/}
				{/*	title="Press here then restart your device"*/}
				{/*	onPress={async () => {*/}
				{/*		await this.showNotification();*/}
				{/*	}}*/}
				{/*/>*/}
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

				{active === AppMode.main && <ListCurrency key={'listCurrency'} items={currency} storageCurrencyList={listSelectedCurrency} />}
				{active === AppMode.settings &&
				<AppSettings key={'appSettings'} listCurrencyName={currency.map((item: any) => item.name)}/>}
				{active === AppMode.about && <AppAbout key={'appAbout'}/>}

			</SafeAreaView>
		);
	}
}
