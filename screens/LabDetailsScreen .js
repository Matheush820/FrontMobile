import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/LabDetailsScreenStyle';
import api from '../hooks/ApiAxios/ApiAxios';  
import labFeatures from '../constants/labFeatures';
import labImages from '../constants/labImages'; // <-- Importando imagens por categoria

const LabDetailsScreen = ({ navigation, route }) => {
  const { labId } = route.params;
  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabDetails = async () => {
      try {
        const response = await api.get(`/api/laboratorios/${labId}`);
        setLab(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do laboratório:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLabDetails();
  }, [labId]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#1794B9" />
      </View>
    );
  }

  if (!lab) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Laboratório não encontrado.</Text>
      </View>
    );
  }

  const categoriaNome = lab?.categoria?.nome;
  const features = Array.isArray(labFeatures[categoriaNome]) ? labFeatures[categoriaNome] : labFeatures['default'];

  // Selecionando imagem pela categoria
  const labImage = labImages[categoriaNome] || labImages.default;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} color="#1794B9" />
      </TouchableOpacity>

      <Image source={labImage} style={styles.labImage} resizeMode="cover" />

      <View style={styles.detailsContainer}>
        <Text style={styles.labName}>{lab.nome}</Text>
        <Text style={styles.labLocation}>{lab.localizacao || 'Localização não informada'} - Sala {lab.numero}</Text>

        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Ionicons name={feature.icon} size={24} color="#1794B9" />
              <Text style={styles.featureText}>{feature.name}</Text>
            </View>
          ))}
        </View>


        <TouchableOpacity
          onPress={() => navigation.navigate('Agendamento', { lab, labImage })}
          style={styles.continueButton}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LabDetailsScreen;
