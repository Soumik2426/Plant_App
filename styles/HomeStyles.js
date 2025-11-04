// ==========================================
// FILE: styles/HomeStyles.js
// ==========================================
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  // Auth Screens
  authContainer: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    padding: 20
  },
  authCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8
  },
  authLogo: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 16
  },
  authTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 8
  },
  authSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32
  },
  authForm: {
    width: '100%'
  },
  authButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 16
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  authLink: {
    color: '#4CAF50',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600'
  },

  // Main Screens
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollContent: {
    flex: 1,
    padding: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff'
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  subtitleText: {
    fontSize: 14,
    color: '#666'
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#FFEBEE',
    borderRadius: 12
  },

  // Screen Headers
  screenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff'
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff'
  },

  // Quick Actions
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12
  },
  quickActionCard: {
    width: (width - 44) / 2,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
    marginBottom: 4
  },
  quickActionDescription: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9
  },

  // Tips Card
  tipsCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    margin: 16,
    marginTop: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    marginBottom: 8
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
    lineHeight: 20
  },

  // Buttons
  primaryButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  secondaryButton: {
    backgroundColor: '#e0e0e0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold'
  },
  addButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6
  },

  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  emptyStateIcon: {
    fontSize: 80,
    marginBottom: 16
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24
  },

  // Diagnose Screen
  diagnoseContainer: {
    flex: 1,
    padding: 20
  },
  diagnoseActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20
  },
  analyzingContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    marginTop: 20
  },
  analyzingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginTop: 16,
    marginBottom: 8
  },
  analyzingSubtext: {
    fontSize: 14,
    color: '#1976D2',
    textAlign: 'center'
  },

  // Store
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  productCard: {
    width: (width - 44) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  productImagePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4
  },
  productCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50'
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8
  },
  // Add to existing styles
plantTypeSelector: {
  padding: 20,
  backgroundColor: '#fff',
  marginBottom: 16
},
selectorLabel: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 12
},
plantTypeButtons: {
  flexDirection: 'row',
  gap: 12
},
plantTypeButton: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  borderRadius: 12,
  borderWidth: 2,
  borderColor: '#4CAF50',
  backgroundColor: '#fff'
},
plantTypeButtonActive: {
  backgroundColor: '#4CAF50',
  borderColor: '#4CAF50'
},
plantTypeButtonText: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#4CAF50',
  marginLeft: 8
},
plantTypeButtonTextActive: {
  color: '#fff'
},
loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 40
},
loadingText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
  marginTop: 16
},
loadingSubtext: {
  fontSize: 14,
  color: '#666',
  marginTop: 8,
  textAlign: 'center'
}
});
