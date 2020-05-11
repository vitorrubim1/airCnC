import React from 'react';
import { YellowBox } from 'react-native';
import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection',
  'Remote debugger'
])

export default function App() {
  return <Routes />
}
