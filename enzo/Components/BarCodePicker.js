import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker } from 'expo';

export default class BarCodePicker extends React.Component {
    state = {
        image: null,
    };

    render() {
        let { image } = this.state;

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    title="Pick an image from camera roll"
                    onPress={this._pickImage}
                />
                {image &&
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
        );
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });


        console.log(result);
        let data = await this.getBarCode(result);
        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };
    getBarCode(img) {
        const url = 'http://34.201.128.86:5000/barcode'
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
}