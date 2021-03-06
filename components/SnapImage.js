import React, { useState, useEffect } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

export default function SnapImage() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

// import React from 'react'
// import { Text, View, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native'
// import { ActionSheet, Root, Picker } from "native-base"
// import ImagePicker from 'react-native-image-crop-picker'

// const width = Dimensions.get('window').width

// export default class SnapImage extends React.Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             fileList: []
//         }
//     }

//     onSelectImage = (image) => {
//         let newDataImg = this.state.fileList
//         const source = { uri: image.path }
//         let item = {
//             id: Date.now(),
//             url: source,
//             content: image.data
//         }

//         newDataImg.push(item)
//         this.setState(state = { fileList: newDataImg })
//     }

//     takePhotoFromCamera = () => {
//         ImagePicker.openCamera(options = {
//             width: 300,
//             height: 400,
//             cropping: true,
//         }).then(onfulfilled = image => {
//             this.onSelectImage(image)
//             console.log(image)
//         })
//     }

//     choosePhotoFromLibrary = () => {
//         ImagePicker.openPicker(options = {
//             width: 300,
//             height: 400,
//             cropping: true
//         }).then(onfulfilled = image => {
//             this.onSelectImage(image)
//             console.log(image)
//         })
//     }

//     onClickAddImage = () => {
//         const BUTTONS = ['Prendre une photo', 'Choisir une photo dans l\'album', 'Annuler']
//         ActionSheet.show(
//             configuration = {
//                 options: BUTTONS,
//                 cancelButtonIndex: 2,
//                 title: 'Selectionner une photo'
//             },
//             onSelect = buttonIndex => {
//                 switch (buttonIndex) {
//                     case 0:
//                         this.takePhotoFromCamera()
//                         break;
//                     case 1:
//                         this.choosePhotoFromLibrary()
//                         break
//                     default:
//                         break
//                 }
//             }
//         )
//     }

//     renderItem = ({ item, index }) => {

//         return (
//             <View>
//                 <Image source={item.url} style={styles.itemImage} />
//             </View>
//         )
//     }

//     render() {

//         let { content, btnPressStyle, txtStyle } = styles;
//         let { fileList } = this.state;

//         return (
//             <Root>
//                 <View style={content}>
//                     <Text>Vas-y! Envoi ton Snap ;)!</Text>
//                     <FlatList
//                         data={fileList}
//                         renderItem={this.renderItem}
//                         keyExtractor={(item, index) => index.toString()}
//                         extraData={this.state}
//                     />
//                     <TouchableOpacity
//                         onPress={this.onClickAddImage}
//                         style={btnPressStyle}>
//                         <Text style={txtStyle}>Ajoute une image</Text>
//                     </TouchableOpacity>
//                 </View>
//             </Root>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     content: {
//         flex: 1,
//         alignItems: 'center',
//         marginTop: 50,
//         paddingLeft: 30,
//         paddingRight: 30,
//         marginBottom: 30
//     },
//     btnPressStyle: {
//         backgroundColor: '#0080ff',
//         height: 50,
//         width: width - 60,
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 10,
//     },
//     txtStyle: {
//         color: '#fff',
//         marginBottom: 30,
//         color: '#fff',
//         borderBottomColor: '#f8f8f8',
//         borderBottomWidth: 1,
//     },
//     itemImage: {
//         backgroundColor: '#2F455C',
//         height: 150,
//         width: width - 60,
//         borderRadius: 8,
//         resizeMode: 'contain',

//     }
// })