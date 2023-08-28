import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ProgressBarAndroid,
  Modal,
  TextInput,
  Button,
  Alert ,
} from 'react-native';

const ProposalTracker = () => {
  const progressData = {
    Proposal: {
        subStages: {
          problemStatement: [
            'Define the problem',
            'Analyze existing solutions',
            'Identify research significance',
          ],
          researchQuestion: [
            'Formulate research question',
            'Hypothesis development',
            'Define research objectives',
          ],
        },
        status: 'complete',
      },
      Thesis: {
        subStages: {
          literatureReview: [
            'Review related literature',
            'Identify research gaps',
            'Critique existing research',
          ],
          methodology: [
            'Choose research methodology',
            'Design data collection methods',
            'Validate research instruments',
          ],
        },
        status: 'inprogress',
      },
      FinalVivaVoce: {
        subStages: {
          presentationDraft: [
            'Create presentation slides',
            'Practice delivery',
            'Incorporate feedback',
          ],
          finalThesis: [
            'Write final thesis',
            'Prepare for defense',
            'Revise thesis based on feedback',
          ],
        },
        status: 'pending',
      },
  };

  const stages = Object.keys(progressData);
  const stageProgress = stages.reduce((acc, stage) => {
    if (progressData[stage].status === 'complete') {
        acc[stage] = 1.0;
      } else if (progressData[stage].status === 'inprogress') {
        acc[stage] = 0.5;
      } else {
        acc[stage] = 0.0;
      }
      return acc;
  }, {});

  const [currentStage, setCurrentStage] = useState(stages[0]);
  const [currentSubStage, setCurrentSubStage] = useState(
    Object.keys(progressData[currentStage].subStages)[0]
  );

  const handleSubStageClick = (subStage) => {
    setCurrentSubStage(subStage);
  };

  const renderSubStages = () => {
    const subStagesData = progressData[currentStage]?.subStages;
    if (!subStagesData) {
      return null; // Return null or a message indicating that sub-stages data is not available
    }
    const subStages = progressData[currentStage].subStages[currentSubStage];
    return subStages.map((subStage, index) => (
      <TouchableOpacity
        key={index}
        style={styles.subStageButton}
      >
        <Text style={styles.subStageText}>{subStage}</Text>
      </TouchableOpacity>
    ));
  };

  const [complaintModalVisible, setComplaintModalVisible] = useState(false);
  const [complaintText, setComplaintText] = useState('');

  const openComplaintModal = () => {
    setComplaintModalVisible(true);
  };

  const closeComplaintModal = () => {
    setComplaintModalVisible(false);
    setComplaintText('');
  };

  const handleComplaintSubmit = () => {
    // Implement logic to send the complaint
    // You can use an API call or any other method here
    closeComplaintModal();
    // Display a notification that the complaint has been sent
    Alert.alert('Complaint Sent', 'Your complaint has been successfully sent!', [
        { text: 'OK', onPress: () => console.log('Complaint sent notification closed') },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Proposal Progress Tracker</Text>
        <View style={styles.stageContainer}>
          {stages.map((stage, index) => (
            <TouchableOpacity
            key={stage}
            onPress={() => setCurrentStage(stage)}
            style={[
              styles.stageButton,
              currentStage === stage && styles.currentStageButton,
            ]}
          >
            <Text
              style={[
                styles.stageButtonText,
                currentStage === stage && styles.currentStageText,
              ]}
            >
              {stage}
            </Text>
          </TouchableOpacity>
          ))}
        </View>
        <View style={styles.progressBarContainer}>
          {stages.map((stage, index) => (
            <View key={stage} style={styles.progressBar}>
              <Text style={styles.progressLabel}>{stage}</Text>
              <ProgressBarAndroid
                styleAttr="Horizontal"
                indeterminate={false}
                progress={stageProgress[stage]}
                color={stageProgress[stage] === 1.0 ? '#4CAF50' : stageProgress[stage] === 0.5 ? '#FFC107' : '#FF5722'}
              />
              <View style={styles.progressStatusContainer}>
                <Text style={styles.progressStatusText}>
                  {stageProgress[stage] === 1.0
                    ? 'Complete'
                    : stageProgress[stage] === 0.5
                    ? 'In Progress'
                    : 'Pending'}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.subStageTitle}>
          {currentSubStage} Sub-Stages for {currentStage}:
        </Text>
        {renderSubStages()}


      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
      },
      scrollView: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 30,
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 30,
        textAlign: 'center',
      },
      stageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      stageButton: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 10,
        margin:5,
        backgroundColor: '#E0E0E0',
      },
      currentStageButton: {
        backgroundColor: '#2196F3',
      },
      stageButtonText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
      },
      currentStageText: {
        color: 'white',
      },
      progressBarContainer: {
        marginBottom: 30,
      },
      progressBar: {
        marginBottom: 20,
      },
      progressLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#444',
      },
      progressStatusContainer: {
        marginTop: 5,
        alignSelf: 'flex-end',
      },
      progressStatusText: {
        fontSize: 12,
        color: '#666',
      },
      subStageTitle: {
        fontSize: 18,
        marginBottom: 10,
        color: '#444',
      },
      subStageButton: {
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#D0D0D0',
      },
      subStageText: {
        fontSize: 14,
        color: '#555',
      },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  complaintInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  // Styles for the Complaint Icon
  complaintIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  complaintIconText: {
    fontSize: 24,
    color: 'white',
  },
});

export default ProposalTracker;
