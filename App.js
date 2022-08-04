//This is the code for login and logout using stack navigation  
import React, { createContext, useContext, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Our global authentication state, with default values
export const AuthContext = createContext({
  hasUser: false, 
  setUser: () => {},
});

const LoginScreen = () => {
  const { setUser } = useContext(AuthContext);
  const [name, setName] = useState('');

  return (
    
    <View style={styles.layout}>
    
      <Text style={{ marginVertical: 16 }}>
        {name ? `Hi ${name}!` : 'What is your name?'}
      </Text>

      <TextInput
        style={{ padding: 8, backgroundColor: '#cecece' }}
        onChangeText={text => setName(text)}
        secureTextEntry/>

        <Button title = "Login" onPress={() => setUser(true)}/>
    </View>
    
  );
};

const FeedScreen = () => {
  const { setUser } = useContext(AuthContext);

  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Logout</Text>
      <Button title = "Logout" onPress={() => setUser(false)}/>
    </View>
  );
};

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { hasUser } = useContext(AuthContext);

  return (
   <Stack.Navigator>
      {hasUser
        ? <Stack.Screen name="Logout" component={FeedScreen} />
        : <Stack.Screen name="Login" component={LoginScreen} />
      }
    </Stack.Navigator>
  );
  };

const App = () => {
  // This is linked to our global authentication state.
  const [hasUser, setUser] = useState(false);
  

  return (
    <AuthContext.Provider value={{ hasUser, setUser }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
});