import React from 'react';
import {StyleSheet, Text, ToastAndroid, TouchableHighlight, View} from 'react-native';
import {Button, Checkbox, Input, NativeBaseProvider} from "native-base";
import Storage from "./Storage";

interface Props {
    id: string;
    name: string;
    nameShort: string;
    price: number;
    changedHourPrc: number;
    changedDayPrc: number;
}

interface TextBlockI {
    settingView: boolean;
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
        fontSize: 18,
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


export default class TextBlock extends React.Component<Props, TextBlockI> {

    constructor(props: any) {
        super(props);
        this.state = {
            settingView: false,
        }
    }

    async componentDidMount() {
    }

    render() {
        const settingView = this.state.settingView;
        return (
            <NativeBaseProvider>
            <TouchableHighlight onPress={()=>{this.setState({settingView: !this.state.settingView})}}>
                <View collapsable={true} key={this.props.id} style={styles.block}>

               <Text  style={styles.textMain}>
                   {`${this.props.name}(${this.props.nameShort})`}
               </Text>
               <Text>
                   {`${this.props.price.toFixed(2)} usd`}
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
                    {/*<View style={styles.settingHorizonBlock}>*/}
                         <Checkbox value='enabled'>уведомления</Checkbox>
                    {/*</View>*/}
                    {/*<View style={styles.settingHorizonBlock}>*/}
                        <Input style={styles.textNormal} placeholder={'станет выше, USD'}/>
                        <Input placeholder={'станет ниже, USD'}/>
                    {/*</View>*/}
                    <Button onPress={async () => {
                        // await Storage.saveApiKey(this.state.apiKey);
                        ToastAndroid.show('Сохранено!', ToastAndroid.SHORT)
                    }}>сохранить</Button>

                </View>
                }

            </NativeBaseProvider>
                );
    }
}
