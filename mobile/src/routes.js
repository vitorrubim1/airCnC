import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';

const Routes = createAppContainer( //createAppContainer PRECISA ENVOLVER AS ROTAS
    createSwitchNavigator({ //NÃO PERMITE O USUÁRIO VOLTAR A TELA ARRASTANDO
        Login, 
        List,
        Book
    }) 
);

export default Routes;