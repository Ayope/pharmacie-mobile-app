import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Button } from 'react-native';

import pharmaciesData from '../../data/pharamcies.json';
import LogoutButton from '../auth/logout';

const PharmacyComponent = () => {

  const handlePharmacyPress = (pharmacy) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy.latitude},${pharmacy.longitude}`;
    Linking.openURL(url);
  };
  // add search

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pharmacy List</Text>
        <LogoutButton />
      </View>
      {pharmaciesData.map(pharmacy => (
        <TouchableOpacity key={pharmacy.id} onPress={() => handlePharmacyPress(pharmacy)}>
            <View key={pharmacy.id} style={styles.card}>
            <Image source={{ uri: pharmacy.images[0] }} style={styles.image} />
            <View style={styles.cardInfo}>
              <Text style={styles.name}>{pharmacy.name}</Text>
              <Text style={styles.address}>Address: {pharmacy.address}</Text>
              <Text style={styles.workingHours}>Opens From {pharmacy.openingHours} to {pharmacy.closingHours}</Text>
              <Text style={styles.phone}>Phone: {pharmacy.phone}</Text>
              <Text style={styles.email}>Email: {pharmacy.email}</Text>
            </View>
            </View>
        </TouchableOpacity>
      ))}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: "100%",
    marginTop: 25,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardInfo: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    marginBottom: 5,
  },
  workingHours: {
    marginBottom: 5,
  },
  distance: {
    marginBottom: 5,
  },
  phone: {
    marginBottom: 5,
  },
  email: {
    marginBottom: 5,
  },
});

export default PharmacyComponent;
