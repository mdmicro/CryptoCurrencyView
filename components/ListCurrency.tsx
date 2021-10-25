import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import TextBlock from "./TextBlock";

interface Props {
    // items: any;
    items: Array<any>;
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


export default class ListCurrency extends React.Component<Props, {}> {

    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
    }

    render() {
        const items = this.props.items || [];
        return (
            <ScrollView>
                {items && items.map((item: any) => (
                    <TextBlock
                        id={item.id}
                        name={item.name}
                        nameShort={item.symbol}
                        price={item.quote.USD.price}
                        changedHourPrc={item.quote.USD.percent_change_1h}
                        changedDayPrc={item.quote.USD.percent_change_24h}
                    />
                ))}
            </ScrollView>
        );
    }
}
