import React, { useState } from 'react';
import { SafeAreaView, Alert, TouchableOpacity, StyleSheet, AsyncStorage, TextInput, Text, View } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {

  const id = navigation.getParam('id'); //pegando o id que a função handleNavigate manda

  //ESTADO
  const [date, setDate] = useState('');

  async function handleSubmit(){
    const user_id = await AsyncStorage.getItem('user');    
  
    await api.post(`/spots/${id}/bookings`, {
      date
    }, {
      headers: { user_id } //PASSANDO O ID DO USER LOGADO PELO CABEÇALHO DA REQ 
    })
      
    Alert.alert('Solicitação de reserva enviada.')
    navigation.navigate('List')
  }

  function handleCancel(){
    navigation.navigate('List')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>
        Data de interesse <Text style={styles.asterisk}>*</Text>
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Qual data você quer reservar?"
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
        value={date}
        onChangeText={setDate} //DIFERENTE DA WEB
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar reserva</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    margin: 30,
  },
  label: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#555",
    marginBottom: 8,
    marginTop: 50,
  },
  asterisk: {
    color: "red"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1
  },
  cancelButton: {
    backgroundColor: '#ccc',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffffff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
