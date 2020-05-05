import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';
import './styles.css';

export default function New({ history }) {
  
  const [thumbnail, setThumbnail] = useState(null);
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');

  //CRIANDO UMA PREVIEW DA IMAGEM SELECIONADA PELO USUÁRIO
  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null; /*
      SE O USUÁRIO POR ALGUMA IMAGEM, EU MOSTRO NA LABEL DE IMAGE, SE NÃO DEIXO NULL
    */
  }, [thumbnail])

  //FUNÇÃO ASSÍNCRONA PARA CADASTRAR SPOTS
  async function handleSubmit(event) {
    event.preventDefault();

    const user_id = localStorage.getItem('user'); //USER LOGADO
  
    //ENVIANDO COMO MULTIPART E NÃO COMO JSON, POR CAUSA DA IMAGEM
    const data = new FormData();
    
    data.append('price', price)
    data.append('techs', techs)
    data.append('company', company)
    data.append('thumbnail', thumbnail) /*
      append(): PARA ADICIONAR UMA INFORMAÇÃO DENTRO DO OBJETO const data
    */

    await api.post('/spots', data, {
      headers: {user_id} //PASSANDO PELO CABEÇALHO DA REQ O USER LOGADO
    });
    
    history.push("/dashboard");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>

        <label 
          id="thumbnail" 
          style={{backgroundImage: `url(${preview})`}}
          className={thumbnail ? 'has-thumbnail' : ''} //CASO TENHA FOTO
        >
          <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
          <img src={camera} alt="selecione uma imagem"/>
        </label>

        <label htmlFor="company">Empresa <b>*</b> </label>
        <input
          type="text"
          id="company"
          placeholder="Sua empresa"
          value={company}
          onChange={event => setCompany(event.target.value)}
        />

        <label htmlFor="techs">
          Tecnologias <b>*</b> <span>(separadas por vírgula)</span>
        </label>
        <input
          type="text"
          id="techs"
          placeholder="Quais tecnologias usam?"
          value={techs}
          onChange={event => setTechs(event.target.value)}
        />

        <label htmlFor="price">
          Valor da diária <b>*</b> <span>(em branco para GRATUITO)</span> 
        </label>
        <input
          type="text"
          id="price"
          placeholder="Valor cobrado por dia:"
          value={price}
          onChange={event => setPrice(event.target.value)}
        />

        <button className="btn">Cadastrar</button>
      </form>
    </>
  );
}
