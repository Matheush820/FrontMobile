import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/AgendamentoScreenStyle';
import api from '../hooks/ApiAxios/ApiAxios';

const AgendamentoScreen = ({ route, navigation }) => {
  const { lab, professorId, categoriaId, labImage } = route.params;

  const [startDate, setStartDate] = useState(new Date());
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedHorarioId, setSelectedHorarioId] = useState('');
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);

  const [cursos, setCursos] = useState([]);
  const [horarios, setHorarios] = useState([]);

  const [loadingCursos, setLoadingCursos] = useState(false);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [confirming, setConfirming] = useState(false);

  // Buscar cursos
  useEffect(() => {
    const fetchCursos = async () => {
      setLoadingCursos(true);
      try {
        const response = await api.get('/api/cursos');
        setCursos(response.data);
      } catch (err) {
        console.error('Erro ao buscar cursos', err);
        Alert.alert('Erro', 'Não foi possível carregar os cursos.');
      } finally {
        setLoadingCursos(false);
      }
    };

    fetchCursos();
  }, []);

  // Buscar horários
  useEffect(() => {
    const fetchHorarios = async () => {
      setLoadingHorarios(true);
      try {
        const response = await api.get('/api/horarios');
        setHorarios(response.data);
      } catch (err) {
        console.error('Erro ao buscar horários', err);
        Alert.alert('Erro', 'Não foi possível carregar os horários.');
      } finally {
        setLoadingHorarios(false);
      }
    };

    fetchHorarios();
  }, []);

  const handleStartDateChange = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) {
      Alert.alert('Data inválida', 'Não é possível agendar para datas passadas.');
      setStartDatePickerVisible(false);
      return;
    }

    setStartDate(date);
    setStartDatePickerVisible(false);
  };

  const handleConfirm = async () => {
    if (!selectedCourseId || !selectedHorarioId) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setConfirming(true);
    try {
      const body = {
        data: startDate.toISOString().split('T')[0],
        professorId,
        cursoId: parseInt(selectedCourseId),
        laboratorioId: lab.id,
        horarioId: parseInt(selectedHorarioId),
        categoriaId,
      };

      await api.post('/api/reservas', body);

      Alert.alert('Sucesso', 'Agendamento realizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao fazer agendamento', error);
      const msg = error?.response?.data?.message || 'Erro ao realizar agendamento.';
      Alert.alert('Erro', msg);
    } finally {
      setConfirming(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {labImage ? (
          <Image source={labImage} style={styles.labImage} />
        ) : (
          <Text style={styles.noImageText}>Imagem não disponível</Text>
        )}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.labName}>{lab.nome}</Text>

      {/* Data */}
      <Text style={styles.sectionTitle}>Data de Agendamento</Text>
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateTimeBox}>
          <Text style={styles.boxLabel}>Data</Text>
          <TouchableOpacity onPress={() => setStartDatePickerVisible(true)}>
            <Text style={styles.dateText}>{startDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="date"
            date={startDate}
            onConfirm={handleStartDateChange}
            onCancel={() => setStartDatePickerVisible(false)}
          />
        </View>
      </View>

      {/* Curso */}
      <Text style={styles.sectionTitle}>Curso</Text>
      <View style={styles.pickerContainer}>
        {loadingCursos ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Picker
            selectedValue={selectedCourseId}
            onValueChange={(value) => setSelectedCourseId(value)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione um curso" value="" />
            {cursos.map((curso) => (
              <Picker.Item key={curso.id} label={curso.nome} value={curso.id.toString()} />
            ))}
          </Picker>
        )}
      </View>

      {/* Horário */}
      <Text style={styles.sectionTitle}>Horário</Text>
      <View style={styles.pickerContainer}>
        {loadingHorarios ? (
          <ActivityIndicator size="small" color="#000" />
        ) : (
          <Picker
            selectedValue={selectedHorarioId}
            onValueChange={(value) => setSelectedHorarioId(value)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione um horário" value="" />
            {horarios.map((horario) => {
              const hi = horario.horaInicio || { hour: 0, minute: 0 };
              const hf = horario.horaFim || { hour: 0, minute: 0 };

              const hiHour = hi.hour?.toString().padStart(2, '0') || '00';
              const hiMinute = hi.minute?.toString().padStart(2, '0') || '00';
              const hfHour = hf.hour?.toString().padStart(2, '0') || '00';
              const hfMinute = hf.minute?.toString().padStart(2, '0') || '00';

              return (
                <Picker.Item
                  key={horario.id}
                  label={`${horario.diaSemana} - ${hiHour}:${hiMinute} - ${hfHour}:${hfMinute}`}
                  value={horario.id.toString()}
                />
              );
            })}
          </Picker>
        )}
      </View>

      {/* Confirmar */}
      <TouchableOpacity
        style={[
          styles.confirmButton,
          (!selectedCourseId || !selectedHorarioId || confirming) ? styles.buttonDisabled : {},
        ]}
        onPress={handleConfirm}
        disabled={!selectedCourseId || !selectedHorarioId || confirming}
      >
        {confirming ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.confirmButtonText}>Confirmar Agendamento</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AgendamentoScreen;
