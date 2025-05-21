import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/ResetPasswordScreenStyle';
import api from '../hooks/ApiAxios/ApiAxios';

const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const response = await api.put('/api/professores/resetar-senha', {
        email,
        novaSenha: password,
      });

      Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível redefinir a senha. Verifique os dados e tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#1C4C77" />
      </TouchableOpacity>

      {/* Topo */}
      <View style={styles.topSection}>
        <Image source={require('../assets/logo.png')} style={styles.logoImage} />
        <Text style={styles.logoText}>SalaFacil</Text>
        <Text style={styles.logoSubText}>Space</Text>
      </View>

      {/* Inputs */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Nova Senha"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirme a Nova Senha"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons
              name={showConfirmPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Botão */}
      <TouchableOpacity style={styles.loginButton} onPress={handleResetPassword}>
        <Text style={styles.loginButtonText}>Redefinir Senha</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordScreen;
