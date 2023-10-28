import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Dimensions, Text } from 'react-native';
import { Card, Title, Button } from 'react-native-paper'; // Step 1
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useRoute } from '@react-navigation/native'; // Import useRoute hook
import apiKey from '../../utils/youtubeConfig';

const VideoListScreen = ({ navigation }) => {
  const [videos, setVideos] = useState([]);
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  const MAX_CARD_WIDTH = SCREEN_WIDTH * 0.45;
  const MAX_CARD_HEIGHT = SCREEN_HEIGHT * 0.65;

  const route = useRoute(); // Get the route object


  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const playlistId = route.params?.playlistId; // Retrieve playlistId from route params
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=${playlistId}&key=${apiKey}`
    );
    const data = await response.json();
    // Filter out private videos
    const publicVideos = data.items.filter(
      (item) => item.snippet.title !== 'Private video'
    );
    setVideos(publicVideos);
  };

  const handleVideoClick = (videoId) => {
    navigation.navigate('videodetails', { videoId });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // <TouchableOpacity onPress={() => handleVideoClick(item.contentDetails.videoId)}>
            <Card style={{ 
              width: Math.min(MAX_CARD_WIDTH, (SCREEN_WIDTH / 2) - 20),
              height: Math.min(MAX_CARD_HEIGHT, SCREEN_HEIGHT * 0.5),
              marginBottom: 20, 
              marginHorizontal: 10 
            }}>
              <Card.Cover source={{ uri: item.snippet.thumbnails.default.url }} />
              <Card.Content>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                  <Button
                    mode="contained"
                    color="green"
                    contentStyle={{ width: '100%', height: 50 }}
                    onPress={() => handleVideoClick(item.contentDetails.videoId)}
                    labelStyle={{ color: '#fff' }}
                    icon={() => <FontAwesomeIcon name="video-camera" size={20} color="#fff" />}
                  >
                    <Text  style={{ 
                    textAlign:'center',
                    fontFamily: 'Droid', 
                    fontSize: 10, 
                    color: '#FFFFFF',
                  }}>شاهد الفيديو</Text>
                  </Button>
                </View>
                <Title 
                  numberOfLines={4} 
                  style={{ 
                    textAlign:'center',
                    fontFamily: 'Droid', 
                    fontSize: 10, 
                    color: '#51117f',
                  }}
                >
                  {item.snippet.title}
                </Title>
        
              </Card.Content>
            </Card>
          // </TouchableOpacity>
        )}
        numColumns={2} 
      />
    </View>
  );
};

export default VideoListScreen;
