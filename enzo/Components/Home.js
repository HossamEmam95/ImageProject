import React, { Component } from "react";
import { 
  View,
  Text,
  StyleSheet
} from "react-native";
import Camera from './Camera'
export default class Home extends React.Component {
  state = {
    ready: false,
    photo: null
  }

  getImage = (image) => {
    let { ready } = this.state;
    this.setState({
      photo: image,
      ready: !ready
    });
    console.log(this.state.photo)
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    BackHandler.exitApp() // works best when the goBack is async
    return true;
  }

  render() {
    let { ready, photo } = this.state;
    return (
      // <View style={styles.container}>
      // <Text>Open up App.js to start working on your app!</Text>
      // </View>
      <View style={!ready ? { flex: 1, justifyContent: 'center', alignItems: 'center' } : { flex: 1 }}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Welcome To Enzo</Text>
        {
          !ready 
          ? <Button
              onPress={() => {
                this.setState({
                  ready: true
                });
              }}
              title='Enable Camera'
            /> 
            : <Camera 
              getImage={this.getImage}
            />
        }

        {
          photo ?  <Image
          style={ready ? {width: 100, height: 100} : {}}
          source={{uri: photo.uri}}
        />
        : null
        }



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});