import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator, 
  Animated 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '../hooks/ApiAxios/ApiAxios';
import styles from '../styles/LabsOverviewScreenStyle';

const iconMap = {
  'Tecnologia da Informação': 'laptop-outline',
  'Saúde': 'heart-outline',
  'Engenharia': 'construct-outline',
  'Ciências Humanas': 'people-outline',
  'Ciências Exatas': 'calculator-outline',
  'Ciências Biológicas': 'leaf-outline',
};

const getColor = (category) => {
  switch (category) {
    case 'Tecnologia da Informação': return '#FF5733';
    case 'Saúde': return '#33FF57';
    case 'Engenharia': return '#5733FF';
    case 'Ciências Humanas': return '#FFD700';
    case 'Ciências Exatas': return '#FFA500';
    case 'Ciências Biológicas': return '#228B22';
    default: return '#808080';
  }
};

const Tabs = [
  { tab: 'Home', icon: 'home', route: 'Home' },
  { tab: 'Rooms', icon: 'search', route: 'Rooms' },
  { tab: 'Appointments', icon: 'calendar', route: 'Appointments' },
  { tab: 'Profile', icon: 'person', route: 'Profile' },
];

const LabsOverview = () => {
  const navigation = useNavigation();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Home');

  const scaleValues = useRef(
    Tabs.reduce((acc, { tab }) => {
      acc[tab] = new Animated.Value(1);
      return acc;
    }, {})
  ).current;

  const handleTabPress = (tab, route) => {
    setActiveTab(tab);
    Animated.sequence([
      Animated.timing(scaleValues[tab], { toValue: 1.2, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleValues[tab], { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
    navigation.navigate(route);
  };

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get('/api/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategorias();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Navbar topo com seta voltar */}
      <View style={styles.navbarTop}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.navbarTitle}>Categorias</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Conteúdo */}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Categorias de Laboratórios</Text>
        <View style={styles.gridContainer}>
          {categorias.map((categoria) => (
            <TouchableOpacity
              key={categoria.id}
              style={[styles.categoryCard, { backgroundColor: getColor(categoria?.nome ?? '') }]}
              onPress={() => navigation.navigate('CategoryDetails', { category: categoria })}
            >
              <Ionicons
                name={iconMap[categoria?.nome] || 'apps-outline'}
                size={30}
                color="#fff"
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryText}>
                {String(categoria?.nome ?? 'Sem nome')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Navbar inferior */}
      <View style={styles.navBar}>
        {Tabs.map(({ tab, icon, route }) => (
          <TouchableOpacity key={tab} onPress={() => handleTabPress(tab, route)}>
            <Animated.View style={{ transform: [{ scale: scaleValues[tab] }] }}>
              <Ionicons name={icon} size={28} color={activeTab === tab ? '#1794B9' : '#000'} />
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default LabsOverview;
