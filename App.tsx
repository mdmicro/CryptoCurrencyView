import React from 'react';
import axios from 'axios';
import {
    View, Text, SafeAreaView,
    ScrollView, StyleSheet
} from 'react-native';
import {List, FlatList} from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import TextBlock from "./components/TextBlock";
// import config from 'expo-config';
// const config = require('config');


interface AppState {
  isLoading: boolean;
  fontLoaded: boolean;
  config: Config;
  currency: any;
  // currency: Array<any> | undefined;
}

interface Config {
  apiKey: string
}

export default class App extends React.Component<{},AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
        isLoading: true,
      fontLoaded: false,
      currency: undefined,
        config: {
            apiKey: 'c5373e43-fdbc-4360-8015-6724c734ab75',
        }
    }
  }

  async componentDidMount() {
    const apiKey = this.state.config?.apiKey;
    console.log('KEY: ' + apiKey);
    // await this.setState({config: {apiKey: apiKey}});
    try {
      const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
          {
            headers: {
              // 'Access-Control-Allow-Origin':'*',
              'Content-Type': "application/json; charset=utf-8",
              'X-CMC_PRO_API_KEY': apiKey,
            },
          })

    // const responseJSON = response.json();
      console.log(response.data);
      if(response && response.data) {
        await this.setState({currency: response.data});
      }
    } catch(error) {
          console.error(error);
          throw new Error('Ошибка запроса  валюты!')
        }
  }

  FlatListItemSeparator = () => {
    return (
        <View
        />
    );
  }

  render() {
    const currency = this.state.currency;
    return (
        <SafeAreaView>
          <ScrollView>
            <View>
                <Text>ReactNativeExpo</Text>

                {currency && currency.data?.map((item: any) => (
                    <TextBlock
                        id={item.id}
                        name={item.name}
                        nameShort={item.symbol}
                        price={item.quote.USD.price}
                        changedHourPrc={item.quote.USD.percent_change_1h}
                        changedDayPrc={item.quote.USD.percent_change_24h}
                    />
                ))}
              </View>

          </ScrollView>
        </SafeAreaView>

    );
  }
}
