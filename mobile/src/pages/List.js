import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, Text, ScrollView, TouchableOpacity, StyleSheet, Image, AsyncStorage, Alert } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List({ navigation }) {

  //ESTADOS
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => { //USER LOGADO
      const socket = socketio('http://192.168.15.14:3333', {
        query: { user_id }
      })

      socket.on('booking_response', booking => { //booking EU QUE DEFINO
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'Aprovado!' : 'NEGADO.'}`)
      })
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => { //PEGANDO AS TECHS E JOGANDO NA VARIÁVEL storagedTechs
      const techsArray = storagedTechs.split(',').map(tech => tech.trim()); //SEPARANDO AS STRING PELA VÍRGULA E LIMPANDO OS ESPAÇOS

      setTechs(techsArray); //JOGANDO O ARRAY DE TECNOLOGIAS DENTRO DO ESTADO
    });
  }, []);

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate('Login')
  } 

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logo} />

        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>

        {/* 
        PERCORRO O ESTADO DE TECNOLOGIAS,
        DEFINO UMA PROPRIEDADE DA FORMA QUE EU QUISER, NESTE CASO (tech)
        O COMPONENT VAI SER DIFERENTE PARA CADA TECNOLOGIA DE INTERESSE DO USER 
        key: CADA FILHO DE DENTRO DE UMA ESTRUTURA DE REPETIÇÃO PRECISA TER UM "ID"
      */}
        <ScrollView>
          {techs.map(tech => <SpotList key={tech} tech={tech} />)}
        </ScrollView>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 35,
    resizeMode: "contain", //PARA QUE A IMAGEM FIQUE CONTIDO NO ESPAÇO DEFINIDO
    alignSelf: "center",
    marginTop: 40
  },
  logout: {
    alignItems: 'flex-end',
    marginTop: -30,
    marginRight: 15

  },
  logoutText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#f05a5b',
  },
});
