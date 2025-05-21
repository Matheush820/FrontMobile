import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // pra salvar o token
import api from '../hooks/ApiAxios/ApiAxios.js';
import styles from '../styles/LoginScreenStyle.js';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [buttonAnimation] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', {
        email: email,
        senha: password
      });

      const { token } = response.data;

      if (token) {
        // Armazena o token
        await AsyncStorage.setItem('token', token);
        console.log('Login bem-sucedido, token salvo:', token);

        navigation.navigate('Home');
      } else {
        setError('Login falhou: Token não retornado.');
      }
    } catch (err) {
      console.error('Erro na API:', err);
      setError(err.response?.data?.message || 'Erro ao se conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const animateButton = () => {
    Animated.spring(buttonAnimation, {
      toValue: 1,
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start();
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
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Senha"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#aaa" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Password')}>
          <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {loading && <ActivityIndicator size="large" color="#00C896" />}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.loginButton,
              {
                transform: [
                  {
                    translateX: buttonAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 50],
                    }),
                  },
                ],
              },
            ]}
            onPress={() => {
              handleLogin();
              animateButton();
            }}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
          <Text style={styles.signUpLink}>Não tem conta? Clique aqui para se cadastrar.</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>Todos os direitos reservados - Equipe SalaFacil</Text>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default LoginScreen;
