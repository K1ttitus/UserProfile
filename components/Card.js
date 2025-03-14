import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title, content, footer }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {content.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.icon}>{item.icon}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      ))}
      {footer && <View style={styles.footer}>{footer}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    flexDirection: 'row'
  },
  postButton: {
    marginLeft: 0,
    padding: 6,
    width: 65,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
  footer: {
    marginTop: 16,
  },
});

export default Card;
