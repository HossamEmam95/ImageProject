import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { Camera, Permissions } from 'expo';

class ExpiraitonDateScreen extends Component {
    camera = null;
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        ready: false
    };

    static navigationOptions = {
        title: "scan"
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    getExpirationDate(img) {
        const url = 'http://34.201.128.86:5000/ocr'
        const data = new FormData();
        const imguri = img.uri
        const imgName = imguri.split('/').pop()
        const imgType = imgName.split('.').pop()

        data.append('img', {
            uri: imguri,
            type: `image/${imgType}`,
            name: imgName
        });
        options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: data,
        }
        console.log("here")
        return fetch(url, options)
            .then((res) => {
                status = res.status;
                return res.json()
            })
            .then((jsonData) => {
                console.log(jsonData);
                console.log(status);
                alert(jsonData)
                return jsonData
            })
            .catch(console.log);
    }

    snap = async () => {
        let { photo } = this.state;
        const { navigate } = this.props.navigation;
        if (this.camera) {
            photo = await this.camera.takePictureAsync();
            console.log("hiiiiiiiiiii")
            // this.props.getImage(photo);
            // http Request
            let data = await this.getExpirationDate(photo);
            // this.props.getExpirationDate(data);
        }
    };


    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 0.9,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={this.snap}>
                                    <View style={styles.inCap}></View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Text
                                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                    {' '}Flip{' '}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}
export default ExpiraitonDateScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    },
    cam: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent:'center',
  
    },
  
    capture:{
      alignSelf: 'flex-end',
      alignItems: 'center',
      backgroundColor:'transparent',
      width:70,
      height:70,
      borderWidth: 2,
      borderColor: '#e3e7f1',
      borderRadius: 40,
      marginBottom: 15,
      justifyContent:'center',
      alignItems:'center'
    },
  
    inCap:{
      backgroundColor:'#fff',
      width:60,
      height:60,
      borderWidth: 1,
      borderColor: '#fff',
      borderRadius: 30,
    },
    overlay: {
      flex: 1,
      position: 'absolute',
      left: 0,
      top: 0,
      opacity: 0.5,
      backgroundColor: 'black',
      width: "100%",
      height: "100%"
    } 
});