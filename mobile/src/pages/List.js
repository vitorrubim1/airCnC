import React, { useState, useEffect, useReducer } from 'react';
import socketio from 'socket.io-client';
import { SafeAreaView, ScrollView, StyleSheet, Image, AsyncStorage, Alert } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
  
  //ESTADOS
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => { //USER LOGADO
      const socket = socketio('http://192.168.15.14:3333', {
        query: { user_id }
      })

      socket.on('booking_response', booking => { //booking EU QUE DEFINO
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'Aprovado!' : 'NEGADA.'}`)
      })
    }); 
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => { //PEGANDO AS TECHS E JOGANDO NA VARIÁVEL storagedTechs
      const techsArray = storagedTechs.split(',').map(tech => tech.trim()); //SEPARANDO AS STRING PELA VÍRGULA E LIMPANDO OS ESPAÇOS

      setTechs(techsArray); //JOGANDO O ARRAY DE TECNOLOGIAS DENTRO DO ESTADO
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 40,
    resizeMode: "contain", //PARA QUE A IMAGEM FIQUE CONTIDO NO ESPAÇO DEFINIDO
    marginTop: 40
  },
});
