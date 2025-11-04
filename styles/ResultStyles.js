// ==========================================
// FILE: styles/ResultStyles.js
// ==========================================
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff'
  },
  backButton: {
    padding: 8,
    marginRight: 12
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  resultCard: {
    margin: 16,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2
  },
  healthyCard: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50'
  },
  diseasedCard: {
    backgroundColor: '#FFF9C4',
    borderColor: '#FFC107'
  },
  resultImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 20
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  statusIcon: {
    fontSize: 64,
    marginBottom: 12
  },
  diagnosisTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12
  },
  confidenceBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20
  },
  healthyBadge: {
    backgroundColor: '#C8E6C9'
  },
  diseasedBadge: {
    backgroundColor: '#FFE082'
  },
  confidenceText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  descriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22
  },
  recommendationsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    lineHeight: 20
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    padding: 16
  },
  saveForm: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  saveFormTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 16
  },
  saveFormButtons: {
    flexDirection: 'row',
    gap: 12
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold'
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  // Add to existing styles
headerSpacer: {
  width: 32
},
plantTypeBadge: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#E8F5E9',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 16,
  marginTop: 8
},
plantTypeText: {
  fontSize: 14,
  fontWeight: '600',
  color: '#4CAF50',
  marginLeft: 6
},
severityBadge: {
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 20,
  marginTop: 8
},
severityText: {
  fontSize: 14,
  fontWeight: 'bold'
},
treatmentCard: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#FFEBEE',
  borderRadius: 12,
  padding: 16,
  marginBottom: 16
},
treatmentText: {
  flex: 1,
  fontSize: 14,
  color: '#f44336',
  fontWeight: '600',
  marginLeft: 12
},
showDetailsButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 12,
  marginTop: 16
},
showDetailsText: {
  fontSize: 14,
  color: '#4CAF50',
  fontWeight: '600',
  marginRight: 8
},
allPredictionsCard: {
  backgroundColor: '#f5f5f5',
  borderRadius: 12,
  padding: 16,
  marginTop: 12
},
predictionRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 8,
  borderBottomWidth: 1,
  borderBottomColor: '#e0e0e0'
},
predictionClass: {
  fontSize: 14,
  color: '#333'
},
predictionProb: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#4CAF50'
},
shareButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#E8F5E9',
  padding: 16,
  borderRadius: 12,
  margin: 16,
  marginTop: 0
},
shareButtonText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#4CAF50',
  marginLeft: 8
}
});