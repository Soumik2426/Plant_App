// ==========================================
// FILE: screens/StoreScreen.js
// ==========================================
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { products } from '../store/database';
import { styles } from '../styles/HomeStyles';

export default function StoreScreen() {
  const handleAddToCart = (product) => {
    Alert.alert(
      'Added to Cart',
      `${product.name} has been added to your cart!`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Plant Care Store 🛒</Text>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.productsGrid}>
          {products.map(product => (
            <View key={product.id} style={styles.productCard}>
              <View style={styles.productImagePlaceholder}>
                <Icon name="leaf" size={40} color="#4CAF50" />
              </View>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productCategory}>{product.category}</Text>
              
              <View style={styles.ratingContainer}>
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name={i < Math.floor(product.rating) ? 'star' : 'star-outline'}
                    size={14}
                    color="#FFC107"
                  />
                ))}
                <Text style={styles.reviewCount}>({product.reviews})</Text>
              </View>

              <View style={styles.productFooter}>
                <Text style={styles.productPrice}>${product.price}</Text>
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart(product)}
                >
                  <Icon name="cart" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}