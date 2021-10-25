import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import TextBlock from "./TextBlock";

interface Props {
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
        color: '#040d17',
        fontWeight: 'bold',
        marginBottom: 10,
        marginHorizontal: 20
    },
    textRed: {
        fontSize: 12,
        color: '#de889b',
        fontWeight: 'normal'
    },
    textGreen: {
        fontSize: 12,
        color: '#5b9554',
        fontWeight: 'normal',
        marginHorizontal: 20
    },
    textNormal: {
        fontSize: 12,
        color: '#081a1a',
        fontWeight: 'normal',
        marginHorizontal: 20
    },
    textRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});


export default class AppSettings extends React.Component<Props, {}> {

    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
    }

    render() {
        return (
            <View>
                <Text style={styles.textMain}>О программе</Text>
                <Text style={styles.textNormal}>
                    Отображает текущий курс криптовалют, отклонение за час, день.
                </Text>
            </View>
        );
    }
}
