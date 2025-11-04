
// ==========================================
// FILE: screens/CommunityScreen.js
// ==========================================
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Post from '../components/Post';
import { styles } from '../styles/HomeStyles';

export default function CommunityScreen() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      userId: 'user2',
      username: 'PlantLover22',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      content: 'My monstera is thriving after repotting! 🌿',
      image: null,
      timestamp: new Date(Date.now() - 3600000),
      likes: 42,
      comments: 7,
      liked: false
    },
    {
      id: 2,
      userId: 'user3',
      username: 'GreenThumb',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
      content: 'Just diagnosed my snake plant using the app. Super helpful!',
      image: null,
      timestamp: new Date(Date.now() - 7200000),
      likes: 28,
      comments: 3,
      liked: false
    },
    {
      id: 3,
      userId: 'user4',
      username: 'BotanicalBabe',
      userAvatar: 'https://i.pravatar.cc/150?img=3',
      content: 'Found spider mites on my fiddle leaf fig. Thanks to PlantCare AI for the early detection! 🕷️',
      image: null,
      timestamp: new Date(Date.now() - 10800000),
      likes: 56,
      comments: 12,
      liked: false
    }
  ]);

  const toggleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Community Feed 🌍</Text>
      <ScrollView style={styles.scrollContent}>
        {posts.map(post => (
          <Post
            key={post.id}
            post={post}
            onLike={() => toggleLike(post.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}