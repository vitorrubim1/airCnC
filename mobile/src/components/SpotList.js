import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import api from '../services/api';

//COMPONENTE QUE FOI DIVIDIDO
function SpotList({ tech, navigation }){

    //ESTADOS
    const [spots, setSpots] = useState();

    useEffect(() =>{
        //FUNÇÃO ASSÍNCRONA PARA CARREGAR OS SPOTS 
        async function loadSpots(){
            const response = await api.get('/spots', {
                params: { tech } //PASSANDO A TECNOLOGIA Q QUERO BUSCAR PELO PARAMS(url)
            });
            setSpots(response.data); //RES DA API ARMAZENADA DO ESTADO
        }

        loadSpots(); //PARA A FUNÇÃO EXECUTAR ASSIM QUE O COMPONENTE FOR EXIBIDO EM TELA 
    }, [])

    function handleNavigate(id){ //id DO SPOT QUE O USER CLICOU
        navigation.navigate('Book', { id })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
        
            <FlatList 
                style={styles.list}
                data={spots} //QUE É O ARRAY(ESTADO) Q CONTÉM AS INFO
                keyExtractor={spot => spot._id} //É O KEY IGUAL QUE VAI FAZER COM QUE CADA SPOT SEJA UNICO(ID) 
                horizontal //PARA QUE A LISTA SEJA HORIZONTAL, NÃO UM ABAIXO DO OUTRO
                showsVerticalScrollIndicator={false} //PARA NAO MOSTRAR A BARRA DE ROLAGEM
                renderItem={({ item }) => (
                    //item, TEM ACESSO A TODAS AS PROPRIEDADES DO SPOT, INCLUINDO O INDEX, SE É IMPAR OU PAR..
                    
                    //SPOT EM SI
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} /> 
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>
                            {item.price ? `R$${item.price}/dia` : 'Gratuito' }
                        </Text>
                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        marginTop: 30,
    },
    title:{
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },
    bold:{
        fontWeight: 'bold',
    },
    list:{
        paddingHorizontal: 20,

    },
    listItem:{
        marginRight: 15,
    },
    thumbnail:{
        height: 120,
        width: 200,
        resizeMode: 'cover', //para cobrir o tamanho
        borderRadius: 2,
    },
    company:{
        fontSize: 24,
        fontWeight: 'bold',
        color: "#333",
        marginTop: 10
    },
    price:{
        fontSize: 15,
        color: "#999",
        marginTop: 5,
    },
    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        marginTop: 15,
    },
    buttonText: {
        color: '#ffffffff',
        fontWeight: 'bold',
        fontSize: 15
    }
});

export default withNavigation(SpotList) //para ter acesso a propriedade navigation;