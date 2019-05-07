import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

class WelcomScreen extends Component {

    static = navigationOptions = {
        header: 'none'
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.app}>Pro-Care</Text>
                <Text style={styles.text}>Your product expiration tracker</Text>
                <Button title="Get barcode" onPress={() => this.props.navigation.navigate('BarCodeScreen')}></Button>
                <Button title="Get barcode from galery" onPress={() => this.props.navigation.navigate('BarCodePicker')}></Button>
                <Button title="Get expiration Date" onPress={() => this.props.navigation.navigate('ExpiraitonDateScreen')}></Button>
                <Button title="Get Date from galery" onPress={() => this.props.navigation.navigate('DatePicker')}></Button>
            </View>
        );
    }
}
export default WelcomScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        justifyContent: 'space-around',
        padding: 10,
    },
    app: {
        fontSize: 30,
        fontWeight: 'bold',
        margin: 60,
        color: 'black'

    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginLeft: 20,
        color: 'black'

    }
});