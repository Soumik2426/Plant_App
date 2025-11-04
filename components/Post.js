// ==========================================
// FILE: components/Post.js
// ==========================================
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Post({ post, onLike }) {
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: post.userAvatar }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{post.username}</Text>
          <Text style={styles.timestamp}>{timeAgo(post.timestamp)}</Text>
        </View>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, post.liked && styles.likedButton]}
          onPress={onLike}
        >
          <Icon
            name={post.liked ? 'heart' : 'heart-outline'}
            size={20}
            color={post.liked ? '#f44336' : '#666'}
          />
          <Text
            style={[styles.actionText, post.liked && styles.likedText]}
          >
            {post.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="chatbubble-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Icon name="share-social-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12
  },
  userInfo: {
    flex: 1
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2
  },
  timestamp: {
    fontSize: 12,
    color: '#999'
  },
  content: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    marginBottom: 12
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 20
  },
  likedButton: {
    backgroundColor: '#FFEBEE'
  },
  actionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    fontWeight: '600'
  },
  likedText: {
    color: '#f44336'
  }
});