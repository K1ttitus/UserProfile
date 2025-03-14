import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  Image, 
  TouchableWithoutFeedback, 
} from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';

// Import icons
import uploadIcon from '../assets/icon/upload.png';
import calendarIcon from '../assets/icon/calendar.png';
import graphIcon from '../assets/icon/graph.png';
import emojiIcon from '../assets/icon/emoji.png';

const UserProfile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [postText, setPostText] = useState('');

  const closeModal = () => {
    setModalVisible(false);
    setPostText('');
  };
  const [userName, setUserName] = useState("Kittitus");
  const [userSurname, setUserSurname] = useState("Udomkanyingyos");


  
  return (
    <View style={styles.container}>
      <Header 
  name={userName} 
  surname={userSurname} 
  description="I am a student at Sripatum University SPU Sripatum Bangkok, Thailand"
  setUserName={setUserName} 
  setUserSurname={setUserSurname}
/>
      <Card 
        title="Analytics" 
        content={[
          { icon: '👁️', label: '0 profile views', description: 'Update your profile to attract viewers.' },
          { icon: '📊', label: '0 post impressions', description: 'Start a post to increase engagement.' },
        ]}
      />
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
      
      {/* Modal for Creating Post */}
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
                <View style={styles.iconRow}>
                <TouchableOpacity>
                    <Image source={emojiIcon} style={styles.uploadIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={uploadIcon} style={styles.uploadIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={calendarIcon} style={styles.uploadIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image source={graphIcon} style={styles.uploadIcon} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight:220
  },
  createPostText: {
    fontSize: 14,
    color: '#FF0000',
    marginLeft:0,
    width:120
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postPrivacy: {
    fontSize: 12,
    color: '#888',
  },
  postInput: {
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#F4F4F4',
    padding: 10,
    borderRadius: 5,
  },
  iconRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    justifyContent: 'space-around',
  },
  icon: {
    fontSize: 24,
    color: 'grey',
  },
  uploadIcon: {
    width: 24,
    height: 24,
    tintColor: 'grey',
  },
  postButton: {
    backgroundColor: '#FFCCCC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  postButtonActive: {
    backgroundColor: '#FF0000',
  },
  postButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfile;
