import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  ActivityIndicator, 
  TouchableOpacity, 
  Alert,
  Image,  
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../hooks/ApiAxios/ApiAxios';
import styles from '../styles/CategoryDetailsScreenStyle';

// Objeto com as imagens por categoria
import labImages from '../constants/labImages';

const CategoryDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params || {};

  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    const fetchLabs = async () => {
      try {
        const response = await api.get('/api/laboratorios');
        const allLabs = response.data || [];
        const filteredLabs = allLabs.filter(lab => lab.categoria.id === category.id);
        setLabs(filteredLabs);
      } catch (error) {
        console.error('Erro ao buscar laboratórios:', error);
        Alert.alert('Erro', 'Não foi possível carregar os laboratórios.');
      } finally {
        setLoading(false);
      }
    };

    fetchLabs();
  }, [category]);

  const getLabLocation = (lab) => {
    if (lab.localizacao?.trim()) return lab.localizacao;
    if (lab.bloco && lab.andar && lab.numero)
      return `Bloco ${lab.bloco}, Andar ${lab.andar}, Sala ${lab.numero}`;
    return 'Sem localização';
  };

  const getCategoryImage = (nomeCategoria) => {
    return labImages[nomeCategoria] || labImages.default;
  };

  if (!category) {
    return (
      <View style={styles.container}>
        <Text>Categoria não encontrada.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{category.nome}</Text>
        <View style={{ width: 28 }} />
      </View>

      <Text style={styles.title}>Laboratórios da categoria</Text>

      <ScrollView contentContainerStyle={styles.labList}>
        {labs.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Nenhum laboratório encontrado.
          </Text>
        ) : (
          labs.map((lab) => (
            <View key={lab.id} style={styles.labCard}>
              <Image
                source={getCategoryImage(lab.categoria?.nome)}
                style={{ width: 100, height: 100, borderRadius: 8, marginBottom: 8 }}
                resizeMode="cover"
              />
              <Text style={styles.labName}>{lab.nome}</Text>
              <Text style={styles.labLocation}>{getLabLocation(lab)}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default CategoryDetails;
