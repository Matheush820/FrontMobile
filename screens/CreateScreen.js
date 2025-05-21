import React, { useState } from 'react';
import api from '../hooks/ApiAxios/ApiAxios.js';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/LoginScreenStyle.js';

const CreateScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Preenche tudo aí, pô!');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas tão diferentes, ajeita isso.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/api/professores', {
        nome: name,
        email: email,
        senha: password
      });

      console.log('Conta criada com sucesso:', response.data);
      navigation.navigate('Login');
    } catch (err) {
      console.error('Erro na API:', err);
      setError(err.response?.data?.message || 'Deu ruim ao conectar no servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={['#058EB8', '#006381']} style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/logo.png')} style={styles.logoImage} />
            <Text style={styles.logoText}>SalaFacil</Text>
            <Text style={styles.logoSubText}>Space</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Nome"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        {loading && <ActivityIndicator size="large" color="#00C896" />}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleSignUp} disabled={loading}>
            <Text style={styles.loginButtonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signUpLink}>Já tem uma conta? Então faz login.</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Todos os direitos reservados - Equipe SalaFacil</Text>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default CreateScreen;
