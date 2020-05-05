import React, { useState } from 'react';
import api from '../../services/api';

// import { Container } from './styles';

export default function Login({ history }) {

    const [email, setEmail] = useState('');

    //FUNÇÃO ASSÍNCRONA
    async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post('/sessions', { email }); //ARMAZANDO NA CONST RESPONSE O RESULTADO DA API
    // console.log(response);

    const { _id } = response.data; //id DO USER
    localStorage.setItem('user', _id);

    history.push("/dashboard", );
  }



  return (
    <> {/*FRAGMENT*/}
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
        </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email <b>*</b></label>
        <input
          type="email"
          id="email"
          placeholder="Seu melhor email:"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <button className="btn" type="submit">Entrar</button>
      </form>
    </>
  );
}
