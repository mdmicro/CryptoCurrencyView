import React from 'react';
import {StyleSheet, Text, ToastAndroid, TouchableHighlight, View} from 'react-native';
import {Button, Checkbox, Input, NativeBaseProvider} from "native-base";
import Storage, {ItemCurrency} from "./Storage";

export interface TextBlockProps extends ItemCurrency {
    id: string;
    name: string;
    price: number;
    changedHourPrc: number;
    changedDayPrc: number;
}

interface TextBlockState {
    settingView: boolean;

    enableNotification: boolean;
    maxLevel: number;
    minLevel: number;
}


/** Текстовый блок криптовалюты в списке на главной */
export default class TextBlock extends React.Component<TextBlockProps, TextBlockState> {

    constructor(props: any) {
        super(props);
        this.state = {
            settingView: false,

            enableNotification: false,
            maxLevel: 0,
            minLevel: 0,
        }
    }

    async componentDidMount() {
        const currencySettings = await Storage.getCurrency(this.props.name);
        currencySettings && this.setState({
            enableNotification: currencySettings.notification?.enable || false,
            maxLevel: currencySettings.notification?.maxLevel || 0,
            minLevel: currencySettings.notification?.minLevel || 0,
        })
    }

    render() {
        const settingView = this.state.settingView;
        const {enableNotification, maxLevel, minLevel} = this.state;
        return (
            <NativeBaseProvider>
            <TouchableHighlight onPress={()=>{this.setState({settingView: !this.state.settingView})}}>
                <View collapsable={true} key={this.props.id} style={styles.block}>

               <Text style={styles.textMain}>
                   {`${this.props.name}`}
               </Text>
               <Text  style={{fontSize: 18, fontWeight: 'bold'}}>
                   {`${this.props.price.toFixed(0)} usd`}
               </Text>

               <View style={styles.textRow}>
               <Text style={this.props.changedHourPrc > 0 ? styles.textGreen : styles.textRed}>
                   {`hour: ${this.props.changedHourPrc.toFixed(2)}% `}
               </Text>
                   <Text> | </Text>
               <Text style={this.props.changedDayPrc > 0 ? styles.textGreen : styles.textRed}>
                   {`day: ${this.props.changedDayPrc.toFixed(2)}%`}
               </Text>
               </View>

                </View>
           </TouchableHighlight>

                {settingView &&
                <View style={styles.settingBlock}>
                    <Checkbox value='' isChecked={enableNotification} onChange={(enableNotification: boolean) => this.setState({enableNotification})}>уведомления</Checkbox>
                    <Input placeholder={'верхний порог, USD'} value={(maxLevel > 0) ? maxLevel.toString() : ''} onChangeText={(text)=>this.setState({maxLevel: parseInt(text) || 0})} style={{fontSize: 16}} />
                    <Input placeholder={'нижний порог, USD'} value={(minLevel > 0) ? minLevel.toString() : ''} onChangeText={(text)=>this.setState({minLevel: parseInt(text) || 0})} style={{fontSize: 16}}/>
                    <Button onPress={async () => {
                        const itemCurrency: ItemCurrency = {
                            name: this.props.name,
                            notification: {
                                enable: this.state.enableNotification,
                                maxLevel: this.state.maxLevel,
                                minLevel: this.state.minLevel
                            }
                        }
                        await Storage.updateItemCurrency(itemCurrency)
                            ? (ToastAndroid.show('Сохранено!', ToastAndroid.SHORT))
                            : (ToastAndroid.show('Ошибка сохранения настроек!', ToastAndroid.SHORT))
                    }}>сохранить</Button>
                </View>
                }
            </NativeBaseProvider>
                );
    }
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        backgroundColor: 'rgba(224,218,209,0.78)',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2,
        marginBottom: 2,
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderStyle: 'dotted',
        borderWidth: 0,
        borderColor: 'rgba(35,31,10,0.35)'
    },
    textMain: {
        fontSize: 22,
        color: '#1063b4',
        fontWeight: 'bold'
    },
    textRed: {
        fontSize: 14,
        color: '#de889b',
        fontWeight: 'normal'
    },
    textGreen: {
        fontSize: 14,
        color: '#5b9554',
        fontWeight: 'normal'
    },
    textNormal: {
        fontSize: 14,
        color: '#081a1a',
        fontWeight: 'normal'
    },
    textRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    settingBlock: {
        flexDirection: "column",
        borderColor: '#FFFFFF',
        marginBottom: 2,
        marginTop: 1,
        marginVertical: 2,
        alignItems: 'stretch',
        paddingHorizontal: 5,
        paddingVertical: 2,
        fontSize: 14,
        color: '#081a1a',
        fontWeight: 'normal'
    },
    settingHorizonBlock: {
        flexDirection: "row",
        // borderColor: '#FFFFFF',
        marginBottom: 2,
        marginTop: 2,
        // alignItems: 'stretch',
        marginHorizontal: 2,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderStyle: 'dotted',
        borderWidth: 0,
    },
});
