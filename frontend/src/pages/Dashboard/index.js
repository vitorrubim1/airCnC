import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {

  const [spots, setSpots] = useState([]);

  useEffect(() => {
  
    async function loadSpots(){
      
      const user_id = localStorage.getItem('user'); //PEGANDO O ID DO USER LOGADO
      const response = await api.get('/dashboard', {
        headers: { user_id } //PASSANDO NO CABEÇALHO DA REQ O ID, PARA PEGAR DA API AS TECHS E EXIBIR SPOTS
      })
      // console.log(response.data);
      setSpots(response.data); //SETANDO O ESTADO COM O RESULTADO DA API
    }
    loadSpots();  
  }, []);

  return (
    <> {/*FRAGMENT*/}
      <ul className="spot-list">
        {spots.map(spot => ( //PERCORRENDO CADA SPOT  
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : 'Gratuito' }</span>
          </li>
        ))}
      </ul>

      <Link to="/new"> <button className="btn"> Cadastrar um novo Spot </button> </Link>
    </>
  );
}
