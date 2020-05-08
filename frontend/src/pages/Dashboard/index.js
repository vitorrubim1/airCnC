import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';

import './styles.css';

export default function Dashboard() {

  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem('user'); //ID DO USER
  const socket = useMemo(() => socketio('http://localhost:3333', { //useMemo P/ MEMORIZAR O SOCKET
    query: { user_id }, //PASSANDO PRO SERVIDOR
  }), [user_id]); //SO REFAZER O ID DE CONEXÃO QUANDO O USER MUDAR

  useEffect(() => {
    socket.on('booking_request', data => {
      setRequests([...requests, data]);
    })
  }, [requests, socket]);

  useEffect(() => {

    async function loadSpots() {

      const user_id = localStorage.getItem('user'); //PEGANDO O ID DO USER LOGADO
      const response = await api.get('/dashboard', {
        headers: { user_id } //PASSANDO NO CABEÇALHO DA REQ O ID, PARA PEGAR DA API AS TECHS E EXIBIR SPOTS
      })
      // console.log(response.data);
      setSpots(response.data); //SETANDO O ESTADO COM O RESULTADO DA API
    }
    loadSpots();
  }, []);

  async function handleAccept(id){
    await api.post(`/bookings/${id}/approvals`)
    
    //REMOVENDO DA LISTA
    setRequests(requests.filter(request => request._id !== id));
  }

  async function handleReject(id){  
    await api.post(`/bookings/${id}/rejections`)
    
    //REMOVENDO DA LISTA
    setRequests(requests.filter(request => request._id !== id));
  }

  return (
    <> {/*FRAGMENT*/}

      <ul className="notifications">
        {requests.map(request => (
          <li key={request._id}>
            <p className="notificationsMessage">
              <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
            </p>
            <button className="accept" onClick={() => handleAccept(request._id)}>Aceitar</button>
            <button className="reject" onClick={() => handleReject(request._id)}>Rejeitar</button>
          </li>
        ))}
      </ul>

      <ul className="spot-list">
        {spots.map(spot => ( //PERCORRENDO CADA SPOT  
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : 'Gratuito'}</span>
          </li>
        ))}
      </ul>

      <Link to="/new"> <button className="btn"> Cadastrar um novo Spot </button> </Link>
    </>
  );
}
