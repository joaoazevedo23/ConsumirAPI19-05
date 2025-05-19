import { Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Tipagem do usuário da API
type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export default function HomeScreen() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar dados da API
  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const result = await response.json(); // transforma em array de objetos
      setData(result); // agora `result` é uma lista (array) de usuários
      setLoading(false);
    } catch (error) {
      console.error('Erro ao consumir API:', error);
      setLoading(false);
    }
  };

  // Carregar os dados assim que o componente for montado
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hellow World!!!!!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">API funcional, buscando os dados de um banco</ThemedText>
        {loading ? (
          <ThemedText>API aparecerá em breve...</ThemedText>
        ) : (
          data.map((user) => (
            <ThemedView key={user.id} style={styles.userCard}>
              <ThemedText style={styles.userText}>Name: {user.name}</ThemedText>
              <ThemedText style={styles.userText}>Email: {user.email}</ThemedText>
              <ThemedText style={styles.userText}>Phone: {user.phone}</ThemedText>
            </ThemedView>
          ))
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  userCard: {
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  userText: {
    color: '#000', // texto preto
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
