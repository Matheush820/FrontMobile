import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/HomeScreenStyle';
import api from '../hooks/ApiAxios/ApiAxios';
import labImages from '../constants/labImages';  

const HomeScreen = () => {
  const navigation = useNavigation();

  const [labs, setLabs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('Home');
  const [searchText, setSearchText] = useState('');

  const scaleValues = useRef({
    Home: new Animated.Value(1),
    Rooms: new Animated.Value(1),
    Appointments: new Animated.Value(1),
    Profile: new Animated.Value(1),
  }).current;

  useEffect(() => {
    const fetchLabsAndCategories = async () => {
      try {
        const [labsResponse, categoriesResponse] = await Promise.all([
          api.get('/api/laboratorios'),
          api.get('/api/categorias'),
        ]);

        setLabs(labsResponse.data.slice(0, 4));
        setCategories(categoriesResponse.data.slice(0, 4));
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchLabsAndCategories();
  }, []);

  const handleTabPress = (tab, route) => {
    setActiveTab(tab);
    Animated.sequence([
      Animated.timing(scaleValues[tab], {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValues[tab], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    navigation.navigate(route);
  };

  const getColor = (index) => {
    const colors = ['#FF5733', '#33FF57', '#5733FF', '#FFC300'];
    return colors[index % colors.length];
  };

  const getLabLocation = (lab) => {
    if (lab.localizacao) return lab.localizacao;
    if (lab.bloco && lab.andar && lab.numero)
      return `Bloco ${lab.bloco}, Andar ${lab.andar}, Sala ${lab.numero}`;
    return 'Sem localização';
  };

  const categoryIcons = ['laptop', 'flask', 'construct', 'server'];

  const filteredCategories = categories.filter(category =>
    category?.nome?.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredLabs = labs.filter(lab =>
    lab?.nome?.toLowerCase().includes(searchText.toLowerCase())
  );

  if (!labs.length || !categories.length) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#1794B9" />
        <Text style={{ marginTop: 10 }}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>SalaFácil Space</Text>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={28} color="#000" style={styles.searchIcon} />
        <TextInput
          placeholder="Pesquise seu laboratório..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Resultados da busca: categorias e labs */}
      {searchText.length > 0 && (
        <View style={styles.searchResultsContainer}>
          {filteredCategories.map((category) => (
            <TouchableOpacity
              key={`cat-${category.id}`}
              style={styles.searchResultItem}
              onPress={() => {
                navigation.navigate('CategoryDetails', { category });
                setSearchText('');
              }}
            >
              <Ionicons name="albums" size={20} color="#555" style={{ marginRight: 8 }} />
              <Text style={styles.searchResultText}>{category.nome}</Text>
            </TouchableOpacity>
          ))}

          {filteredLabs.map((lab) => (
            <TouchableOpacity
              key={`lab-${lab.id}`}
              style={styles.searchResultItem}
              onPress={() => {
                navigation.navigate('LabDetails', { labId: lab.id });
                setSearchText('');
              }}
            >
              <Ionicons name="flask" size={20} color="#555" style={{ marginRight: 8 }} />
              <Text style={styles.searchResultText}>{lab.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Categorias */}
      <Text style={styles.sectionTitle}>Categorias</Text>
      <View style={styles.categoryHeader}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: getColor(index) }]}
              onPress={() => navigation.navigate('CategoryDetails', { category })}
            >
              <Ionicons
                name={categoryIcons[index] || 'apps'}
                size={20}
                color="#fff"
                style={styles.categoryIcon}
              />
              <Text style={styles.categoryText}>{category.nome}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={() => navigation.push('LabsOverview')} style={styles.viewAllButton}>
          <Text style={styles.viewAll}>Explorar todos</Text>
        </TouchableOpacity>
      </View>

      {/* Laboratórios */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Laboratórios Disponíveis</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Rooms')}>
          <Text style={[styles.viewAll, { textAlign: 'right' }]}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ paddingHorizontal: 4 }}>
          {filteredLabs.map((lab) => (
            <TouchableOpacity key={lab.id} onPress={() => navigation.navigate('LabDetails', { labId: lab.id })}>
              <View style={styles.labCard}>
                <Image source={ lab.categoria && lab.categoria.nome && labImages[lab.categoria.nome]
                  ? labImages[lab.categoria.nome]
                  : labImages.default}style={styles.labImage}/>

                <View style={styles.labInfo}>
                  <Text style={styles.labName}>{lab.nome || 'Sem nome'}</Text>
                  <Text style={styles.labLocation}>{getLabLocation(lab)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Barra de navegação inferior */}
      <View style={styles.navBar}>
        {[
          { tab: 'Home', icon: 'home', route: 'Home' },
          { tab: 'Rooms', icon: 'search', route: 'Rooms' },
          { tab: 'Appointments', icon: 'calendar', route: 'Appointments' },
          { tab: 'Profile', icon: 'person', route: 'Profile' },
        ].map(({ tab, icon, route }) => (
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

export default HomeScreen;
