import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/RoomsScreenStyle';
import api from '../hooks/ApiAxios/ApiAxios';
import labImages from '../constants/labImages';  // Importa as imagens por categoria

const RoomsScreen = () => {
  const navigation = useNavigation();
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await api.get('/api/laboratorios');
        setLabs(response.data);
      } catch (error) {
        console.error('Erro ao buscar laboratórios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabs();
  }, []);

  const filteredLabs = labs.filter(lab =>
    lab.nome?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Barra de busca */}
      <View style={styles.searchBar}>
        <TouchableOpacity>
          <Ionicons name="search" size={28} color="#333" style={styles.searchIcon} />
        </TouchableOpacity>
        <TextInput
          placeholder="Pesquise seu laboratório..."
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <Text style={styles.sectionTitle}>Laboratórios Disponíveis</Text>

      {loading ? (
        <View style={{ marginTop: 40, alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#1794B9" />
          <Text style={{ marginTop: 10 }}>Carregando laboratórios...</Text>
        </View>
      ) : (
        <ScrollView style={styles.labList}>
          {filteredLabs.map((lab) => (
            <TouchableOpacity
              key={lab.id}
              style={styles.labCard}
              onPress={() => navigation.navigate('LabDetails', { labId: lab.id })}
            >
              <Image
                source={
                  lab.categoria && lab.categoria.nome && labImages[lab.categoria.nome]
                    ? labImages[lab.categoria.nome]
                    : labImages.default
                }
                style={styles.labImage}
              />
              <View style={styles.labInfo}>
                <Text style={styles.labName}>{lab.nome || 'Nome não informado'}</Text>
                <Text style={styles.labLocation}>
                  {lab.localizacao || `Bloco ${lab.bloco || '?'} - Andar ${lab.andar || '?'} - Sala ${lab.numero || '?'}`}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Barra de navegação inferior */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={28} color="#1794B9" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Rooms')}>
          <Ionicons name="search" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="calendar" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person" size={28} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RoomsScreen;
