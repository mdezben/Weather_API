import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

interface WeatherCardProps {
  day: string;
  date: string;
  maxTemp: number;
  minTemp: number;
  rainProbability: number;
  condition: string;
  icon: string; 
}

const WeatherCard: React.FC<WeatherCardProps> = ({ day, date, maxTemp, minTemp, rainProbability, condition, icon }) => {
  const { width } = Dimensions.get('window'); 

  return (
    <View style={[styles.card, { width: width * 0.9 }]}>
      <Text style={styles.day}>{day}</Text>
      <Text style={styles.date}>{date}</Text>
      <Image
        source={{ uri: icon }} 
        style={styles.icon}
      />
      <Text style={styles.temp}>Máx: {maxTemp}°C</Text>
      <Text style={styles.temp}>Mín: {minTemp}°C</Text>
      <Text style={styles.rain}>Lluvia: {rainProbability}%</Text>
      <Text style={styles.condition}>{condition}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  day: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  icon: {
    width: 50,
    height: 50,
    marginVertical: 8,
  },
  temp: {
    fontSize: 16,
    color: '#444',
  },
  rain: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  condition: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    marginTop: 8,
  },
});

export default WeatherCard;