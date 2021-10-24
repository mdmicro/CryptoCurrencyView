import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import { FontAwesome } from '@expo/vector-icons';
// import config from 'expo-config';
// const config = require('config');

interface Props {
    id: string;
    name: string;
    nameShort: string;
    price: number;
    changedHourPrc: number;
    changedDayPrc: number;
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3da6c',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default class TextBlock extends React.Component<Props, {}> {

    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {

    }

    render() {
        return (
           <View collapsable={true} key={this.props.id} style={styles.container} >
           <Text>
           {`${this.props.name}(${this.props.nameShort})`}
           </Text>
               <Text>
                   {`${this.props.price.toFixed(2)} usd`}
               </Text>
               <Text>
                   {`hour: ${this.props.changedHourPrc.toFixed(2)}%, day: ${this.props.changedDayPrc.toFixed(2)}%  `}
               </Text>
               <Text>---------------------------------------------------------------------</Text>
           </View>
        );
    }
}
