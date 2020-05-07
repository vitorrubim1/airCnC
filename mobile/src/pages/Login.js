import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, Image, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
//AsyncStorage: localStorage DA WEB :)

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {

    //ESTADOS
    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        //VERIFICANDO SE NO AsyncStorage JÁ TEM UM USER LOGADO, SE TIVER MANDO ELE PRA LIST
        AsyncStorage.getItem('user').then(user =>{
            if(user){
                navigation.navigate('List'); 
            }
        });
    }, []);

    //FUNÇÃO ASSÍNCRONA QUE REALIZA LOGIN
    async function handleSubmit() {
        
        const response = await api.post('/sessions', {
            email //ENVIANDO O EMAIL, PARA LOGAR
        });
        const { _id } = response.data; //PEGANDO O ID QUE RETORNA DA REQUISIÇÃO A API
        
        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List') //navigation É O HISTORY DA WEB
    }

    return (
        <View style={styles.container}>
            <Image source={logo} />

            <KeyboardAvoidingView  //FAZENDO COM QUE O TECLADO DO IPHONE NÃO SE SOBREPONHA 
                behavior="padding"
                enabled={Platform.OS === 'ios'} //APENAS PRA IOS
                style={styles.form}
            >
                <Text style={styles.label}>
                    Seu email <Text style={styles.asterisk}>*</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email:"
                    placeholderTextColor="#999"
                    keyboardType="email-address" //DEFINE ESTE INPUT COMO DE EMAIL
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail} //DIFERENTE DA WEB
                />

                <Text style={styles.label}>
                    Tecnologias <Text style={styles.asterisk}>*</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias de interesse:"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity 
                    onPress={handleSubmit} //onSubmit da WEB 
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        alignSelf: 'stretch', //PARA OCUPAR O TAMANHO MÁXIMO POSSÍVEL
        paddingHorizontal: 30,
        marginTop: 30
    },
    label: {
        textTransform: "uppercase",
        fontWeight: "bold",
        color: "#555",
        marginBottom: 8,
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
    buttonText: {
        color: '#ffffffff',
        fontWeight: 'bold',
        fontSize: 16
    }
});