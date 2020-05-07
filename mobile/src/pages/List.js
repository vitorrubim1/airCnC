import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image, AsyncStorage } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {

  //ESTADOS
  const [techs, setTechs] = useState([]);

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
    alignSelf: "center",
    marginTop: 40
  },
});
