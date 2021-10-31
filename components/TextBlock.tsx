import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {
    id: string;
    name: string;
    nameShort: string;
    price: number;
    changedHourPrc: number;
    changedDayPrc: number;
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
           <View collapsable={true} key={this.props.id} style={styles.block} >
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
        );
    }
}
