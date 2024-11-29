import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';

const ResultScreen = () => {
  const [testResults, setTestResults] = useState([]);
  const [sortedResults, setSortedResults] = useState([]);
  const [sortOrder, setSortOrder] = useState('recent'); // Default to "recent"

  const fetchTestResults = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('User is not logged in');
        return;
      }

      const { data, error } = await supabase
        .from('results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }); // Default fetch order: most recent

      if (error) {
        console.error('Error fetching test results:', error);
      } else {
        setTestResults(data);
        setSortedResults(data); // Initial sorting
      }
    } catch (error) {
      console.error('Error fetching test results:', error);
    }
  };

  const sortResults = (order) => {
    setSortOrder(order);
    if (order === 'recent') {
      const sorted = [...testResults].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setSortedResults(sorted);
    } else if (order === 'old') {
      const sorted = [...testResults].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      setSortedResults(sorted);
    }
  };

  useEffect(() => {
    fetchTestResults();
  }, []);

  const renderResultCard = ({ item, index }) => (
    <View style={styles.card}>
      {/* Result Number */}
      <Text style={styles.resultNumber}>Result #{index + 1}</Text>
  
      {/* Astigmatism Results */}
      <View style={styles.section}>
        <Text style={styles.cardTitle}>Astigmatism Result</Text>
        <View style={styles.row}>
          <Image source={require('../assets/Eye(1).png')} style={styles.iconImage} />
          <Text style={styles.resultText}>{item.final_astigmatismresult}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Right Eye:</Text>
          <Text style={styles.value}>{item.right_eyeanswer}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Left Eye:</Text>
          <Text style={styles.value}>{item.left_eyeanswer}</Text>
        </View>
      </View>
  
      {/* Visual Acuity Results */}
      <View style={styles.section}>
        <Text style={styles.cardTitle}>Visual Acuity Test Result</Text>
        <View style={styles.row}>
          <Image source={require('../assets/vaChart.png')} style={styles.iconImage} />
          <Text style={styles.resultText}>{item.overall_result}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Right Eye Score:</Text>
          <Text style={styles.value}>{item.right_eyescore}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Left Eye Score:</Text>
          <Text style={styles.value}>{item.left_eyescore}</Text>
        </View>
      </View>
  
      {/* Additional Results */}
      <View style={styles.section}>
        <Text style={styles.label}>Date & Time:</Text>
        <Text style={styles.date}>
          {new Date(item.created_at).toLocaleString()} {/* Formats date & time */}
        </Text>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, sortOrder === 'recent' && styles.activeFilter]}
          onPress={() => sortResults('recent')}
        >
          <Text style={styles.filterText}>Recent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, sortOrder === 'old' && styles.activeFilter]}
          onPress={() => sortResults('old')}
        >
          <Text style={styles.filterText}>Old</Text>
        </TouchableOpacity>
      </View>

      {sortedResults.length > 0 ? (
        <FlatList
          data={sortedResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderResultCard}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noResults}>No test results available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginBottom: 50,
  },
  list: {
    paddingBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: 30,
  },
  filterButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  activeFilter: {
    backgroundColor: '#007bff',
  },
  filterText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  section: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  noResults: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  iconImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default ResultScreen;
