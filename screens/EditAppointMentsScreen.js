import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/EditAppointMentsScreenStyle';

const labs = [
  { id: 1, course: 'TI', name: 'Laboratório Informática I', image: require('../assets/labTi.png') },
  { id: 2, course: 'TI', name: 'Laboratório Informática II', image: require('../assets/labTi.png') },
  { id: 4, course: 'Engenharia Civil', name: 'Laboratório de Engenharia Civil', image: require('../assets/labTi.png') },
];

const EditAppointmentScreen = ({ route }) => {
  const navigation = useNavigation();
  const { appointment } = route.params || {};

  const [title, setTitle] = useState(appointment?.title || '');
  const [date, setDate] = useState(appointment?.date || '');
  const [course, setCourse] = useState(appointment?.course || '');
  const [lab, setLab] = useState(labs.find(l => l.course === appointment?.course) || null);
  const [selectedLab, setSelectedLab] = useState(appointment?.lab || '');

  const handleCourseChange = (newCourse) => {
    setCourse(newCourse);
    const newLab = labs.find(l => l.course === newCourse) || null;
    setLab(newLab);
    setSelectedLab('');
  };

  const handleSave = () => {
    console.log('Salvar alterações:', { title, date, selectedLab, course });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.projectName}>SalaFácil</Text>
          <Text style={styles.projectSpace}>Space</Text>
        </View>
      </View>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={appointment?.name || ''} editable={false} />
      
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={appointment?.email || ''} editable={false} />
      
      
      
      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Data e Hora</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} />

      <Text style={styles.label}>Curso</Text>
      <TextInput style={styles.input} value={course} onChangeText={handleCourseChange} />

      <Text style={styles.label}>Selecione um Laboratório</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedLab}
          onValueChange={setSelectedLab}
          style={styles.picker}
        >
          <Picker.Item label="Selecione um Laboratório" value="" />
          {labs
            .filter(lab => lab.course === course)
            .map((lab, index) => (
              <Picker.Item key={index} label={lab.name} value={lab.name} />
            ))}
        </Picker>
      </View>

     

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditAppointmentScreen;
