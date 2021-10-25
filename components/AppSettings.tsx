import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import TextBlock from "./TextBlock";
import {
    Select,
    VStack,
    CheckIcon,
    Center,
    NativeBaseProvider,
} from "native-base"

interface Props {
    listCurrencyName: Array<string>;
}

const styles = StyleSheet.create({
    header: {
      marginTop: 5,
      marginBottom: 20,
      fontSize: 16,
      fontStyle: 'normal',
        justifyContent: 'center'
    },
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
            <NativeBaseProvider>
                <Center flex={1} px="3">

                    <VStack alignItems="center" space={4}>
                        <Select
                            selectedValue={''}
                            minWidth="200"
                            accessibilityLabel="Choose Service"
                            placeholder="Choose Service"
                            _selectedItem={{
                                bg: "teal.600",
                                endIcon: <CheckIcon size="5" />,
                            }}
                            mt={1}
                            onValueChange={()=>{}}
                        >
                            <Select.Item label="UX Research" value="ux" />
                            <Select.Item label="Web Development" value="web" />
                            <Select.Item label="Cross Platform Development" value="cross" />
                            <Select.Item label="UI Designing" value="ui" />
                            <Select.Item label="Backend Development" value="backend" />
                        </Select>
                    </VStack>


                </Center>
            </NativeBaseProvider>
            // <NativeBaseProvider>
            //
            // <View style={styles.header}>
            //     <Text>Установки</Text>
            // </View>

            //     <Select>
            //     <Select.Item label={'test'} value={'test'}>123</Select.Item>
            //     {/*{this.props.listCurrencyName && this.props.listCurrencyName.map(item =>*/}
            //     {/*    <Select.Item label={item} value={item} />*/}
            //     {/*)}*/}
            // </Select>

    // </NativeBaseProvider>
        );
    }
}
