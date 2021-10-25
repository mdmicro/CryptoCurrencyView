import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'dotted',
    },
    buttonWrap: {
        flex: 1,
        marginHorizontal: 1
    }
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
            // <NativeBaseProvider>
            //     <Center flex={1} px="3">
            //
            //         <VStack alignItems="center" space={4}>
            //             <Select
            //                 selectedValue={''}
            //                 minWidth="200"
            //                 accessibilityLabel="Choose Service"
            //                 placeholder="Choose Service"
            //                 _selectedItem={{
            //                     bg: "teal.600",
            //                     endIcon: <CheckIcon size="5" />,
            //                 }}
            //                 mt={1}
            //                 onValueChange={()=>{}}
            //             >
            //                 <Select.Item label="UX Research" value="ux" />
            //                 <Select.Item label="Web Development" value="web" />
            //                 <Select.Item label="Cross Platform Development" value="cross" />
            //                 <Select.Item label="UI Designing" value="ui" />
            //                 <Select.Item label="Backend Development" value="backend" />
            //             </Select>
            //         </VStack>
            //     </Center>
            // </NativeBaseProvider>
            <NativeBaseProvider>
            <View style={styles.header}>
                <Text>Установки</Text>
            </View>
                <View style={styles.block}>
                    <View style={styles.buttonWrap}>
                <Select placeholder={'Выбор валюты'}>
                {this.props.listCurrencyName && this.props.listCurrencyName.map(item =>
                <Select.Item label={item} value={item} />
                )}
            </Select>
                    </View>
                    <View  style={styles.buttonWrap}>
                        <Button title={'Добавить'} onPress={()=>{}}></Button>
                    </View>

                </View>
            </NativeBaseProvider>
        );
    }
}
