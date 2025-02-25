import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, StatusBar, Dimensions } from 'react-native';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import { API_KEY, API_URL } from './config';

interface WeatherData {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    daily_chance_of_rain: number;
    condition: {
      text: string;
      icon: string; 
    };
  };
}

const Clima: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            key: API_KEY,
            q: 'Hidalgo,Mexico', 
            days: 5, 
          },
        });
        setWeatherData(response.data.forecast.forecastday);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  
  const getBackgroundColor = (temp: number) => {
    if (temp < 20) return '#87CEEB'; // Azul
    if (temp >= 21 && temp <= 30) return '#FFD700'; // Amarillo
    return '#FFA500'; // Naranja
  };

  
  const backgroundColor = weatherData.length > 0 ? getBackgroundColor(weatherData[0].day.maxtemp_c) : '#87CEEB';

  const renderItem = ({ item }: { item: WeatherData }) => {
    const date = new Date(item.date);
    const dayOfWeek = date.toLocaleDateString('es-ES', { weekday: 'long' });
    const formattedDate = date.toLocaleDateString('es-ES');

    return (
      <WeatherCard
        day={dayOfWeek}
        date={formattedDate}
        maxTemp={item.day.maxtemp_c}
        minTemp={item.day.mintemp_c}
        rainProbability={item.day.daily_chance_of_rain}
        condition={item.day.condition.text}
        icon={`https:${item.day.condition.icon}`} // Asegúrate de agregar "https:"
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="light-content" />
      <FlatList
        data={weatherData}
        renderItem={renderItem}
        keyExtractor={(item) => item.date}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default Clima;