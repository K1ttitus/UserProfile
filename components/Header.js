import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Button } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import editIcon from '../assets/icon/edit.png';

const Header = ({ name,surname, description }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false); 
  const [userName, setUserName] = useState(name);
  const [userSurname, setUserSurname] = useState(surname); 
  const [userDescription, setUserDescription] = useState(description); 
  const [userEmail, setUserEmail] = useState('yanichsa.plo@spumail.net'); 
  const [userPhone, setUserPhone] = useState('xxxxxxxxxx');
  const [profileImage, setProfileImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    setEditModalVisible(false);
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.headerBackground} />
      <TouchableOpacity onPress={pickImage}>
        <Image 
          style={styles.avatar} 
          source={profileImage ? { uri: profileImage } : { uri: 'https://via.placeholder.com/100' }} 
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setEditModalVisible(true)}>
      <Image source={editIcon} style={styles.editIcon} />
      </TouchableOpacity>
      <View style={styles.textWrapper}>
  <View style={styles.nameRow}>
    <Text style={styles.name}>{userName} {userSurname}</Text>
    <TouchableOpacity style={styles.detailsButton} onPress={() => setModalVisible(true)}>
      <Text style={styles.detailsText}>Contact</Text>
    </TouchableOpacity>
  </View>
  <Text style={styles.description}>{userDescription}</Text>
</View>
      <Modal
  animationType="none"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
    <View style={styles.modalContainer}>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Name: {userName} {userSurname}</Text>
          <View style={styles.divider} />

          <Text style={styles.modalSubtitle}>Contact</Text>
          <Text style={styles.modalText}>Email: {userEmail}</Text>
          <Text style={styles.modalText}>Phone: {userPhone}</Text>
        </View>
      </TouchableWithoutFeedback>

    </View>
  </TouchableWithoutFeedback>
</Modal>

<Modal
  animationType="none"
  transparent={true}
  visible={editModalVisible}
  onRequestClose={() => setEditModalVisible(false)}
>
  <TouchableWithoutFeedback onPress={() => setEditModalVisible(false)}>
    <View style={styles.modalEditContainer}>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.modalEditContent}>
          <ScrollView 
            style={{ width: '100%' }} 
            contentContainerStyle={{ alignItems: 'center' }} 
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.modalTitle}>Edit Profile Info</Text>

            <Text style={styles.modalTopics}>Name</Text>
            <TextInput 
            style={styles.input} 
            placeholder="First Name" 
            value={userName} 
            onChangeText={setUserName} 
          />

            <Text style={styles.modalTopics}>Surname</Text>
            <TextInput 
            style={styles.input} 
            placeholder="Last Name" 
            value={userSurname} 
            onChangeText={setUserSurname} 
          />

            <Text style={styles.modalTopics}>Description</Text>
            <TextInput 
              style={[styles.input, { height: 100 }]} 
              placeholder="Description" 
              value={userDescription} 
              onChangeText={setUserDescription} 
              multiline={true} 
              numberOfLines={4} 
              scrollEnabled={true} 
            />

            <Text style={styles.modalTopics}>Email</Text>
            <TextInput style={styles.input} placeholder="Email" value={userEmail} onChangeText={setUserEmail} keyboardType="email-address" />

            <Text style={styles.modalTopics}>Phone</Text>
            <TextInput style={styles.input} placeholder="Phone" value={userPhone} onChangeText={setUserPhone} keyboardType="phone-pad" />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.cancleButton} onPress={setEditModalVisible}>
            <Text style={styles.cancleText}>cancle</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>

    </View>
  </TouchableWithoutFeedback>
</Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerBackground: {
    height: 120,
    width: '100%',
    backgroundColor: '#AB0000',
    position: 'absolute',
    top: 0,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginTop: 60,
    marginLeft: -170,
    backgroundColor: '#CCC',
  },
  editIcon: {
    left:158,
    width: 24,
    height: 24,
    tintColor: 'grey',
  },
  editText: {
    fontSize: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailsButton: {
    marginLeft: 0,
    padding: 6,
    width: 65,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  saveButton: {
    marginBottom:5,
    padding: 5,
    width: 65,
    backgroundColor: 'red',
    borderRadius: 15,
    left:100 
  },
  cancleButton: {

    padding: 5,
    width: 65,
    height: 35,
    backgroundColor: 'black',
    borderRadius: 5,
    left:100 
  },
  saveText: {
    color: 'white',
    fontWeight:'bold',
    fontSize: 14,
    textAlign: 'center'
  },
  cancleText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginTop:1,
    fontWeight:'bold'
  },
  detailsText: {
    color: '#FF0000',
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    textAlign: 'left',
    marginTop: 4,
    color: '#666',
  },
  scrollView: {
    backgroundColor: 'pink',
  },
  modalTopics: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'left', 
    width: '100%', 
  },
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalEditContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'flex-start', 
  },
  modalEditContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '30%',
    alignItems: 'flex-start', 
  },
  modalText: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'left', 
    width: '100%', 
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    width: '100%',
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'left',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
  },
  divider: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    marginVertical: 10,
  },
  textWrapper: {
    marginTop: 15,
    backgroundColor: '#FFF',  
    padding: 16,  
    borderRadius: 10,  
    shadowColor: '#000',  
    shadowOpacity: 0.1,  
    shadowRadius: 5,  
    elevation: 3,  
    width: '100%',  
  },
  nameRow: {
    flexDirection: 'row',  
    alignItems: 'center',  
    justifyContent: 'space-between',  
  },
  
});

export default Header;
