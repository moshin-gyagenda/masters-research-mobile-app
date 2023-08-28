import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Dimensions  } from 'react-native';
import { BarChart, PieChart, ProgressChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose an appropriate icon library

const Dashboard = () => {
  const statistics = {
    progressReport: 8,
    workDone: 78,
    assignedStudents: 2,
    pendingProposals: 7,
    completeProposals: 3,
    approvedResearchTitles: 15,
    rejectedResearchTitles: 2,
    newResearchTitles: 7,
  };

  const data = [1, 0.6, 0]; // Example data for completion of 3 stages
  const labels = ['Proposal', 'Thesis', 'Viva Voce']; // Corresponding labels

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Blue color for progress
    style: {
      borderRadius: 10,
    },
  };
  // Get the screen width
  const screenWidth = Dimensions.get('window').width;
  // Calculate the desired width as 90% of the screen width
  const desiredWidth = screenWidth * 0.9;
  const chartData = {
    labels: ['Progress', 'Pending', 'Complete'],
    datasets: [
      {
        data: [
          statistics.progressReport,
          statistics.pendingProposals,
          statistics.completeProposals,
        ],
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
        <View style={styles.chartContainer}>
            
            <View style={styles.chartBackground}>
              
                <Text style={styles.chartTitle}>Appointments Status</Text>
                <PieChart
                data={[
                    {
                    name: 'Approved',
                    population: statistics.approvedResearchTitles,
                    color: '#4CAF50',
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15,
                    },
                    {
                    name: 'Rejected',
                    population: statistics.rejectedResearchTitles,
                    color: '#F44336',
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15,
                    },
                    {
                    name: 'New',
                    population: statistics.newResearchTitles,
                    color: '#2196F3',
                    legendFontColor: '#7F7F7F',
                    legendFontSize: 15,
                    },
                ]}
                width={desiredWidth}
                height={200}
                chartConfig={{
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Black color for labels
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
                />
            </View>
    
        </View>
        <View style={styles.statisticsContainer}>
        
        <TouchableOpacity style={[styles.statistic, styles.greenBackground]}>
        <Icon name="calendar" size={24} color="white" />
        <Text style={styles.statisticLabel}>Appointments</Text>
        <Text style={styles.statisticValue}>{statistics.workDone}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.statistic, styles.purpleBackground]}>
        <Icon name="users" size={24} color="white" />
        <Text style={styles.statisticLabel}>Assigned Supervisors</Text>
        <Text style={styles.statisticValue}>{statistics.assignedStudents}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.statistic, styles.orangeBackground]}>
        <Icon name="clock-o" size={24} color="white" />
        <Text style={styles.statisticLabel}>Pending </Text>
        <Text style={styles.statisticValue}>{statistics.pendingProposals}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.statistic, styles.yellowBackground]}>
        <Icon name="check-circle" size={24} color="white" />
        <Text style={styles.statisticLabel}>Complete </Text>
        <Text style={styles.statisticValue}>{statistics.completeProposals}</Text>
      </TouchableOpacity>
        </View>
        <View>
        <View style={styles.legendContainer}>
        {labels.map((label, index) => (
          <View style={styles.legendItem} key={index}>
            <View
              style={{
                backgroundColor: chartConfig.color(1),
                width: 10,
                height: 10,
                borderRadius: 5,
                marginRight: 5,
              }}
            />
            <Text>{label}</Text>
          </View>
        ))}
      </View>
      <ProgressChart
        data={data}
        width={desiredWidth}
        height={200}
        chartConfig={chartConfig}
        style={styles.chart}
      />
      
    </View>

        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chartBackground: {
    backgroundColor: '#ffffff', // White background color
    borderRadius: 10,
    padding: 10,
  },
  chart: {
    borderRadius: 10,
  },
  flexibleBarChart: {
    marginVertical: 8,
    borderRadius: 10,
  },
  statisticsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statistic: {
    width: '20%',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  statisticLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  statisticValue: {
    fontSize: 24,
    color: '#007AFF', // Blue color for values
  },
  blueBackground: {
    color:'#fff',
    fontSize:'bolder',
    backgroundColor: '#0074D9', // Blue color
  },
  greenBackground: {
    fontSize:'bolder',
    backgroundColor: '#2ECC40', // Green color
  },
  purpleBackground: {
    backgroundColor: '#B10DC9', // Purple color
  },
  orangeBackground: {
    backgroundColor: '#FF851B', // Orange color
  },
  yellowBackground: {
    backgroundColor: '#FFDC00', // Yellow color
  },
  statisticsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statistic: {
    width: '48%',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  statisticLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff', // White text color
  },
  statisticValue: {
    fontSize: 24,
    color: '#ffffff', // White text color
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Dashboard;
