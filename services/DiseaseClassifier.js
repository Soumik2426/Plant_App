export class DiseaseClassifier {
  constructor() {
    // Define disease classes for each plant type
    this.diseaseClasses = {
      coffee: [
        'Healthy',
        'Cercospora Leaf Spot',
        'Coffee Rust',
        'Leaf Miner',
        'Phoma Leaf Spot',
        'Red Spider Mite'
      ],
      jute: [
        'Healthy',
        'Anthracnose',
        'Stem Rot',
        'Root Rot',
        'Leaf Spot',
        'Powdery Mildew'
      ]
    };

    // Disease information and recommendations
    this.diseaseInfo = {
      coffee: {
        'Healthy': {
          description: 'Your coffee plant appears healthy with no visible disease symptoms.',
          recommendations: [
            'Continue regular watering schedule',
            'Maintain proper fertilization',
            'Monitor plant regularly for early disease detection',
            'Ensure adequate sunlight (4-6 hours daily)',
            'Prune dead or damaged leaves'
          ],
          severity: 'none',
          treatment: null
        },
        'Cercospora Leaf Spot': {
          description: 'Fungal disease causing brown spots with yellow halos on leaves.',
          recommendations: [
            'Remove and destroy infected leaves immediately',
            'Apply copper-based fungicide every 14 days',
            'Improve air circulation around plants',
            'Avoid overhead watering',
            'Apply organic mulch to prevent soil splash'
          ],
          severity: 'moderate',
          treatment: 'Fungicide application required'
        },
        'Coffee Rust': {
          description: 'Serious fungal disease causing orange-yellow powdery spots on leaf undersides.',
          recommendations: [
            'Apply systemic fungicide immediately',
            'Remove severely infected leaves',
            'Increase plant spacing for better air flow',
            'Apply copper-based preventive sprays',
            'Consider resistant varieties for replanting'
          ],
          severity: 'high',
          treatment: 'Urgent fungicide treatment needed'
        },
        'Leaf Miner': {
          description: 'Insect larvae tunneling through leaves, creating serpentine mines.',
          recommendations: [
            'Remove and destroy affected leaves',
            'Apply neem oil spray weekly',
            'Use yellow sticky traps to catch adult flies',
            'Apply insecticidal soap',
            'Encourage natural predators (parasitic wasps)'
          ],
          severity: 'moderate',
          treatment: 'Insecticide treatment recommended'
        },
        'Phoma Leaf Spot': {
          description: 'Fungal disease causing circular brown spots with dark margins.',
          recommendations: [
            'Prune infected leaves immediately',
            'Apply broad-spectrum fungicide',
            'Improve drainage around plants',
            'Reduce leaf wetness duration',
            'Space plants properly for air circulation'
          ],
          severity: 'moderate',
          treatment: 'Fungicide application needed'
        },
        'Red Spider Mite': {
          description: 'Tiny mites causing yellow stippling and webbing on leaves.',
          recommendations: [
            'Spray plants with strong water jet',
            'Apply miticide or insecticidal soap',
            'Increase humidity around plants',
            'Use neem oil spray weekly',
            'Remove heavily infested leaves'
          ],
          severity: 'moderate',
          treatment: 'Miticide treatment recommended'
        }
      },
      jute: {
        'Healthy': {
          description: 'Your jute plant is healthy with no disease symptoms.',
          recommendations: [
            'Maintain consistent watering',
            'Apply balanced fertilizer regularly',
            'Monitor for early signs of disease',
            'Ensure proper drainage',
            'Practice crop rotation'
          ],
          severity: 'none',
          treatment: null
        },
        'Anthracnose': {
          description: 'Fungal disease causing dark sunken lesions on stems and leaves.',
          recommendations: [
            'Apply copper-based fungicide',
            'Remove infected plant parts',
            'Avoid overhead irrigation',
            'Improve air circulation',
            'Use disease-free seeds'
          ],
          severity: 'high',
          treatment: 'Fungicide treatment required'
        },
        'Stem Rot': {
          description: 'Fungal disease causing rotting at the base of the stem.',
          recommendations: [
            'Remove and destroy infected plants',
            'Improve soil drainage',
            'Apply fungicide to healthy plants',
            'Reduce watering frequency',
            'Use raised beds if soil drainage is poor'
          ],
          severity: 'high',
          treatment: 'Immediate removal and fungicide application'
        },
        'Root Rot': {
          description: 'Disease affecting roots, causing wilting and yellowing.',
          recommendations: [
            'Improve soil drainage immediately',
            'Reduce watering frequency',
            'Apply biological fungicide to soil',
            'Remove affected plants',
            'Avoid waterlogged conditions'
          ],
          severity: 'high',
          treatment: 'Soil treatment and drainage improvement'
        },
        'Leaf Spot': {
          description: 'Fungal disease causing circular spots on leaves.',
          recommendations: [
            'Apply fungicide spray',
            'Remove infected leaves',
            'Improve air circulation',
            'Avoid leaf wetness',
            'Practice crop sanitation'
          ],
          severity: 'moderate',
          treatment: 'Fungicide application needed'
        },
        'Powdery Mildew': {
          description: 'White powdery fungal growth on leaves and stems.',
          recommendations: [
            'Apply sulfur-based fungicide',
            'Improve air circulation',
            'Reduce humidity levels',
            'Remove severely infected parts',
            'Apply neem oil spray weekly'
          ],
          severity: 'moderate',
          treatment: 'Fungicide treatment recommended'
        }
      }
    };
  }

  /**
   * Process model predictions
   */
  processePredictions(predictionData, plantType) {
    // Get class labels for plant type
    const classes = this.diseaseClasses[plantType];
    
    // Find the class with highest probability
    let maxProb = -1;
    let predictedClassIndex = 0;
    
    for (let i = 0; i < predictionData.length; i++) {
      if (predictionData[i] > maxProb) {
        maxProb = predictionData[i];
        predictedClassIndex = i;
      }
    }

    const predictedClass = classes[predictedClassIndex];
    const confidence = maxProb;

    // Get disease information
    const diseaseInfo = this.diseaseInfo[plantType][predictedClass];

    // Determine status
    const status = predictedClass === 'Healthy' ? 'healthy' : 'diseased';

    // Build result object
    const result = {
      plantType: plantType,
      status: status,
      diagnosis: predictedClass,
      confidence: confidence,
      description: diseaseInfo.description,
      recommendations: diseaseInfo.recommendations,
      severity: diseaseInfo.severity,
      treatment: diseaseInfo.treatment,
      allPredictions: this.formatAllPredictions(predictionData, classes),
      timestamp: new Date().toISOString()
    };

    return result;
  }

  /**
   * Format all predictions for debugging
   */
  formatAllPredictions(predictionData, classes) {
    return classes.map((className, index) => ({
      class: className,
      probability: predictionData[index],
      percentage: (predictionData[index] * 100).toFixed(2) + '%'
    }));
  }

  /**
   * Get confidence level description
   */
  getConfidenceLevel(confidence) {
    if (confidence >= 0.9) return 'Very High';
    if (confidence >= 0.75) return 'High';
    if (confidence >= 0.6) return 'Moderate';
    if (confidence >= 0.4) return 'Low';
    return 'Very Low';
  }
}