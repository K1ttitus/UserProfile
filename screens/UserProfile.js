import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Image, TouchableWithoutFeedback,FlatList,ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';
import Card from '../components/Card';
import IconSvg from "./IconSvg";
import DatePicker from "react-native-date-picker";
import uploadIcon from '../assets/icon/upload.png';
import calendarIcon from '../assets/icon/calendar.png';
import graphIcon from '../assets/icon/graph.png';
import emojiIcon from '../assets/icon/emoji.png';
import documentIcon from '../assets/icon/document.png';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
const UserProfile = ({ visible, onClose }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [userName, setUserName] = useState("Kittitus");
  const [userSurname, setUserSurname] = useState("Udomkanyingyos");
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [eventModalVisible2, setEventModalVisible2] = useState(false);
  const [imagemodalVisible, setimageModalVisible] = useState(false);
  const [eventName, setEventName] = useState("");
  const [isOnline, setIsOnline] = useState(null); // ✅ This was missing!
  const [timezone, setTimezone] = useState("UTC+07:00");
  const [fileModalVisible, setFileModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [pollTitle, setPollTitle] = useState('');
  const [pollOptions, setPollOptions] = useState(['']);
  const [selectedDuration, setSelectedDuration] = useState('1 day');
  const addOption = () => {
    if (pollOptions.length < 100) {
      setPollOptions([...pollOptions, '']);
    }
  };
  const updateOption = (text, index) => {
    const newOptions = [...pollOptions];
    newOptions[index] = text;
    setPollOptions(newOptions);
  };
  const removeOption = (index) => {
    const newOptions = pollOptions.filter((_, i) => i !== index);
    setPollOptions(newOptions);
  };
  const closeModal = () => {
    setModalVisible(false);
    setPostText('');
    setSelectedImage(null);
  };
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: false, 
    });
    if (result.canceled) return;
    setSelectedFile(result.assets[0]); 
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setimageModalVisible(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
      <Header 
        name={userName} 
        surname={userSurname} 
        description="I am a student at Sripatum University SPU Sripatum Bangkok, Thailand"
        setUserName={setUserName} 
        setUserSurname={setUserSurname}
      />
      <TouchableOpacity>
        
      <Card 
        title="Analytics" 
        content={[
          { icon: '👁️', label: '0 profile views', description: 'Update your profile to attract viewers.' },
          { icon: '📊', label: '0 post impressions', description: 'Start a post to increase engagement.' },
        ]}
      />
      </TouchableOpacity>
      <Card 
        title="About" 
        content={[
          { icon: '⭐', label: 'Top skills', description: 'User Experience (UX) • User Interface (UI) • Computer Engineering' },
        ]}
      />
      <Card 
        title={
          <View style={styles.activityHeader}>
            <Text style={styles.activityTitle}>Activity</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.createPostText}>Create Post</Text>
            </TouchableOpacity>
          </View>
        }
        content={[
          { icon: '', label: 'You haven’t posted', description: 'Posts you share will be displayed here.' },
        ]}
      />
<View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Study</Text>
        </View>
        <TouchableOpacity>
        <View>
          <IconSvg name="add" />
        </View>
        </TouchableOpacity>
      </View>
      <View style={styles.educationContainer}>
        <Image
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/393a579791ce6df97b07758d39e45a42648c7f23",
          }}
          style={styles.universityLogo}
        />
        <View style={styles.educationDetails}>
          <View>
            <Text style={styles.universityName}>
              Sripatum University SPU Sripatum
            </Text>
          </View>
          <View>
            <Text style={styles.degree}>
              Bachelor of Science, Computer Engineering
            </Text>
          </View>
          <View>
            <Text style={styles.graduationDate}>June 2022</Text>
          </View>
        </View>
        </View>
        
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal} 
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Image 
                    source={{ uri: 'https://via.placeholder.com/50' }} 
                    style={styles.profileImage} 
                  />
                  <View>
                    <Text style={styles.profileName}>{userName} {userSurname}</Text>
                    <Text style={styles.postPrivacy}>Post to Anyone</Text>
                  </View>
                </View>
                <TextInput
                  style={styles.postInput}
                  placeholder="What do you want to talk about?"
                  value={postText}
                  onChangeText={setPostText}
                  multiline
                />
                
                {selectedImage && <Image source={{ uri: selectedImage }} style={styles.previewImage} />}
                
                <View style={styles.iconRow}>
                  <TouchableOpacity>
                    <Image source={emojiIcon} style={styles.uploadIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=> setimageModalVisible(true)}>
                    <Image source={uploadIcon} style={styles.uploadIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={graphIcon} style={styles.uploadIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setEventModalVisible(true)}>
                    <Image source={calendarIcon} style={styles.uploadIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setFileModalVisible(true)}>
                    <Image source={documentIcon} style={styles.uploadIcon} />
                  </TouchableOpacity>

                </View>
                
                <TouchableOpacity 
                  style={[styles.postButton, postText ? styles.postButtonActive : {}]} 
                  disabled={!postText}
                  onPress={() => {
                    console.log("Post submitted:", postText);
                    setPostText('');
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.postButtonText}>Post</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal animationType="slide" 
      transparent={true} 
      visible={imagemodalVisible}>
        <View style={styles.imagemodalOverlay}>
          <View style={styles.imagemodalContainer}>
            <Text style={styles.imagemodalTitle}>Upload Media</Text>
            <TouchableOpacity onPress={pickImage}>
            <View style={styles.imagemodalContent}>    
                <Text style={styles.imagemodalContentText}>Share images or a single video in your post.</Text>
                    <TouchableOpacity style={styles.imagemodalButton} onPress={pickImage}>
                <Text style={styles.imagemodalButtonText}>Upload</Text>
                    </TouchableOpacity>
              </View>
              </TouchableOpacity>
              <View style={styles.underline} />
              <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.imagemodalClose} onPress={() => setimageModalVisible(false)}>
    <Text style={styles.imagemodalCloseText}>Back</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.imagemodalButton} onPress={() => setimageModalVisible(false)}>
    <Text style={styles.imagemodalButtonText}>Next</Text>
  </TouchableOpacity>
  
</View>
          </View>
        </View>
      </Modal>

      <Modal
  animationType="slide"
  transparent={true}
  visible={eventModalVisible}
  onRequestClose={() => setEventModalVisible(false)}
>
    <View style={styles.eventmodalOverlay}>
      <View style={styles.eventmodalContainer}>
        <Text style={styles.eventTitle}>Create an Event</Text>
        <Image source={require('../assets/icon/emoji.png')} style={styles.eventImage} />
        <View style={styles.eventTypeContainer}>
          <TouchableOpacity 
            style={[styles.radioButton, isOnline === true && styles.radioSelected]} 
            onPress={() => setIsOnline(true)}
          >
            <View style={[styles.radioCircle, isOnline === true && styles.radioFilled]} />
            <Text style={styles.radioText}>Online</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.radioButton, isOnline === false && styles.radioSelected]} 
            onPress={() => setIsOnline(false)}
          >
            <View style={[styles.radioCircle, isOnline === false && styles.radioFilled]} />
            <Text style={styles.radioText}>In person</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.eventInput}
          placeholder="Event name"
          value={eventName}
          onChangeText={setEventName}
          maxLength={75}
        />
        <Text style={styles.charCount}>{eventName.length}/75</Text>
        <Picker
          selectedValue={timezone}
          onValueChange={(itemValue) => setTimezone(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="(UTC+07:00) Bangkok, Hanoi, Jakarta" value="UTC+07:00" />
          <Picker.Item label="(UTC+05:30) India Standard Time" value="UTC+05:30" />
          <Picker.Item label="(UTC-05:00) Eastern Time" value="UTC-05:00" />
        </Picker>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => setEventModalVisible(false)} style={styles.cancelButton}>
            <Text style={styles.eventButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={() => setEventModalVisible2(true)}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
</Modal>

<Modal
  animationType="slide"
  transparent={true}
  visible={eventModalVisible2}
  onRequestClose={() => setEventModalVisible2(false)}
>
    <View style={styles.eventmodalOverlay}>
      <View style={styles.eventmodalContainer}>
        <Text style={styles.eventTitle}>Create a poll</Text>
        <View style= {styles.underline}/>
        <View style={{ marginBottom:15}}/>
        <Text style={styles.eventmodalContentText}>Your Question</Text>
        <View style={styles.eventTypeContainer}>
        </View>
        <TextInput
          style={styles.eventInput}
          placeholder="E.g.. How do you commute to work?"
          value={eventName}
          onChangeText={setEventName}
          maxLength={140}
        />
        <Text style={styles.eventmodalContentTextPoll}>Your Option</Text>
        <FlatList
  data={pollOptions}
  keyExtractor={(item, index) => index.toString()}
  nestedScrollEnabled={true} // ✅ Allows scrolling inside FlatList
  keyboardShouldPersistTaps="handled" // ✅ Ensures input taps work properly
  style={{ maxHeight: 200 }} // ✅ Restricts FlatList height to prevent modal expansion
  renderItem={({ item, index }) => (
    <View style={styles.optionContainer}>
      <TextInput
        style={styles.optionInput}
        placeholder={`Option ${index + 1}`}
        value={item}
        onChangeText={(text) => updateOption(text, index)}
      />
      {pollOptions.length > 1 && (
        <TouchableOpacity onPress={() => removeOption(index)}>
          <Text style={styles.removeOption}>✖</Text>
        </TouchableOpacity>
      )}
    </View>
  )}
  ListFooterComponent={
    pollOptions.length < 100 && (
      <TouchableOpacity style={styles.addButton} onPress={addOption}>
        <Text style={styles.addButtonText}>+ Add Option</Text>
      </TouchableOpacity>
    )
  }
/>

<TouchableWithoutFeedback>
  <View>
      <Picker
        selectedValue={selectedDuration}
        onValueChange={(value) => {
          setSelectedDuration(value);
        }}
        style={styles.picker}
      >
        <Picker.Item label="1 Day" value="1 day" />
        <Picker.Item label="3 Days" value="3 days" />
        <Picker.Item label="1 Week" value="1 week" />
        <Picker.Item label="Custom" value="custom" />
      </Picker>
  </View>
</TouchableWithoutFeedback>

          <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => setEventModalVisible2(false)}
        >
          <Text style={styles.eventButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.nextButton]}
          onPress={() => setEventModalVisible2(false)}
        >
          <Text style={styles.nextButtonText}>Done</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
</Modal>

<Modal
  animationType="slide"
  transparent={true}
  visible={fileModalVisible}
  onRequestClose={() => setFileModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.fileModalContainer}>
      <View style={styles.underline}>
      <Text style={styles.fileModalTitle}>Share a Document</Text>
      </View>
      <TouchableOpacity style={styles.fileButton} onPress={pickDocument}>
        <Text style={styles.fileButtonText}>
          {selectedFile ? selectedFile.name : 'Choose File'}
        </Text>
      </TouchableOpacity>
      <View style={styles.underline}>
      <Text style={styles.fileText}>For accessibility purpose, Match Intern members who can view your post will be able download your document as a PDF.
      </Text>
      </View>
      {selectedFile && (
        <Text style={styles.selectedFileText}>{selectedFile.name}</Text>
      )}
      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.cancelButton} 
          onPress={() => setFileModalVisible(false)}
        >
          <Text style={styles.eventButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.nextButton]}
          onPress={() => setFileModalVisible(false)}
          disabled={!selectedFile}
        >
          <Text style={styles.nextButtonText}>Done</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  </View> 
</Modal>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  activityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  activityTitle: { fontSize: 16, fontWeight: 'bold', marginRight: 220 },
  createPostText: { fontSize: 14, color: '#FF0000', width: 120,left:-25 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  imagemodalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  imagemodalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15,borderBottomWidth: 1,borderBottomColor: '#CCC',marginBottom:10 },
  imagemodalContainer: { width: '90%',height:300, backgroundColor: 'white', padding: 16, borderRadius: 10 },
  imagemodalButton: { backgroundColor: '#F9003A', padding:7, borderRadius: 20, width: 65, alignItems: 'center', marginBottom: 5 },
  imagemodalButtonText: { color: 'white', fontSize: 12,fontWeight:'bold' },
  imagemodalClose: { backgroundColor: 'white',borderWidth: 3, padding: 3, borderRadius: 20,borderColor:'#F9003A', width: 65,height:30, alignItems: 'center'},
  imagemodalCloseText: { fontSize: 12, color: '#F9003A' },
  imagemodalContent:{width:'100%',height:190,marginBottom:5,justifyContent: 'center',alignItems: 'center',textAlign: 'center'},
  imagemodalContentText:{textAlign: 'center',color: 'grey',marginBottom:10},
  buttonRow: {flexDirection: 'row',justifyContent: 'flex-end',marginTop: 10,gap: 5,}, 
  modalContainer: { width: '90%', backgroundColor: 'white', padding: 16, borderRadius: 10 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  profileName: { fontSize: 16, fontWeight: 'bold' },
  postPrivacy: { fontSize: 12, color: '#888' },
  postInput: { height: 200, textAlignVertical: 'top', fontSize: 16, marginBottom: 10, backgroundColor: '#F4F4F4', padding: 10, borderRadius: 5 },
  iconRow: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#ddd' },
  uploadIcon: { width: 24, height: 24, tintColor: 'grey' },
  previewImage: { width: '100%', height: 200, marginTop: 10, borderRadius: 5 },
  postButton: { backgroundColor: '#F9003A', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, alignItems: 'center', marginTop: 10, alignSelf: 'flex-end' },
  postButtonActive: { backgroundColor: '#FF0000' },
  postButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  eventTitle:{fontSize: 18,fontWeight: 'bold',marginBottom: 10},
  eventInput:{width: '100%',padding: 10,borderWidth: 1,borderColor: '#ddd',borderRadius: 5,marginBottom: 5},
  eventmodalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  eventmodalContainer:{width: '90%', backgroundColor: 'white', padding: 16, borderRadius: 10 },
  eventImage: {width: 150,height: 150,marginBottom: 10},
  eventTypeContainer: {flexDirection: 'row',justifyContent: 'center',alignItems: 'center',marginBottom: 10},
  radioButton: {flexDirection: 'row',alignItems: 'center',padding: 10,marginHorizontal: 10},
  radioCircle: {width: 16,height: 16,borderRadius: 8,borderWidth: 2,borderColor: '#F9003A',marginRight: 5},
  radioFilled: {backgroundColor: '#F9003A'},
  radioText: {fontSize: 14},
  charCount: {fontSize: 12,color: 'gray',alignSelf: 'flex-end',marginBottom: 10},
  picker: {width: '100%',height: 60,backgroundColor: '#F4F4F4',borderRadius: 5,marginBottom: 10},
  cancelButton: {backgroundColor: 'white',borderWidth: 2,borderColor: '#F9003A',paddingVertical: 8,paddingHorizontal: 20,borderRadius: 20,justifyContent: 'center',alignItems: 'center',textAlign: 'center'},
  nextButton: {backgroundColor: '#F9003A',paddingVertical: 8,paddingHorizontal: 20,borderRadius: 20,justifyContent: 'center',alignItems: 'center',textAlign: 'center'},
  eventButtonText: {fontSize: 14,color: '#F9003A',fontWeight: 'bold'},
  nextButtonText: {color: 'white',fontWeight:'bold'},
  underline:{borderBottomWidth: 1,borderColor: '#ccc'},
  topline:{borderTopWidth: 1,borderColor: '#ccc'},
  fileModalContainer: {width: '90%',backgroundColor: 'white',padding: 16,borderRadius: 10,alignItems: 'center',},
  fileModalTitle: {fontSize: 18,fontWeight: 'bold',marginBottom: 3,width:350,textAlign:'center'},
  fileButton: {backgroundColor: 'white',width:'100%',borderWidth: 2,borderColor: '#F9003A',padding: 5,borderRadius: 20,marginBottom: 20,marginTop:40},
  fileButtonText: {fontSize: 12,color: '#F9003A',fontWeight:'bold',textAlign:'center'},
  fileText:{fontSize:12, color:'gray',marginBottom:10},
  selectedFileText: {fontSize: 12,color: 'gray', marginBottom: 10,textAlign: 'center',maxWidth: '80%',},
  eventmodalContentText:{color: 'gray',marginBottom:-4,marginLeft:4},
  eventmodalContentTextPoll:{color: 'gray',marginBottom:5,marginLeft:4},
  optionContainer: {flexDirection: 'row',alignItems: 'center',marginBottom: 10,},
  optionInput: {flex: 1,padding: 10,borderWidth: 1,borderColor: '#ddd',borderRadius: 5,},
  removeOption: {color: 'red',fontSize: 18,marginLeft: 10,},
  addButton: {padding: 3,borderRadius: 20,borderWidth:2,alignItems: 'center',borderColor:'#F9003A',width:120,marginBottom: 10,},
  addButtonText: {color: '#F9003A',fontSize: 14,fontWeight:'bold'},
  durationLabel: {fontSize: 14,fontWeight: 'bold',marginTop: 10,borderRadius:10},
  header: {display: "flex",flexDirection: "row",alignItems: "center",justifyContent: "space-between",},
  titleContainer: {fontSize: 18,fontWeight: "600",color: "#000",},
  title: {fontSize: 18,fontWeight: "600",color: "#000",},
  educationContainer: {display: "flex",flexDirection: "row",alignItems: "center",gap: 12, marginTop: 16,},
  universityLogo: {width: 57,height: 53,borderRadius: 10,},
  educationDetails: {flex: 1,},
  universityName: {fontSize: 16,color: "#646464",},
  degree: {fontSize: 16,color: "#646464",},
  graduationDate: {fontSize: 16,color: "#646464",},


});

export default UserProfile;
