import React, { useState } from 'react';
import { Card, Searchbar } from 'react-native-paper';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import COLORS from '../../colors/colors';

const PaymentsTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPayments, setFilteredPayments] = useState([]);

  // Set the locale to English
  moment.locale('en');

  const payments = [
    {
      _id: '6555f5ec52188bed79f6d5f7',
      amount: 50,
      method: 'Credit Card',
      status: 'Approved',
      date: '2023-11-16T10:58:52.834Z',
      notes: 'Payment',
      userId: '65101f844e74113b6f5a70a7',
      __v: 0,
    },
    {
      _id: '6555f5ec52188bed79f6d5f7',
      amount: 50,
      method: 'Credit Card',
      status: 'Pending',
      date: '2023-11-16T10:58:52.834Z',
      notes: 'Payment',
      userId: '65101f844e74113b6f5a70a7',
      __v: 0,
    },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = payments.filter((payment) =>
      payment.method.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPayments(filtered);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return '#4CAF50'; // Green color for 'Approved'
      case 'Pending':
        return '#FFC107'; // Orange color for 'Pending'
      case 'Cancelled':
        return '#F44336'; // Red color for 'Cancelled'
      default:
        return '#2196F3'; // Blue color for other statuses
    }
  };

  const renderRow = (payment) => (
    <View style={styles.row} key={payment._id}>
      <View style={[styles.colorBar, { backgroundColor: getStatusColor(payment.status) }]} />
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardColumn}>
            <Text style={styles.cardText}>Method : {payment.method}</Text>
            <Text style={styles.cardText}>
  <Text >Amount : </Text>
  <Text style={{ fontWeight: 'bold' }}>${payment.amount}</Text>
</Text>
          </View>
          <View style={styles.cardColumn}>
          <Text style={[
  styles.cardText,
  { 
    fontWeight: 'bold',
    color: payment.status === 'Approved' ? '#4CAF50' : payment.status === 'Pending' ? '#FFC107' : 'black'
  }
]}>
  {payment.status}
</Text>
            <Text style={styles.cardText}>
              {moment(payment.date).format('DD/MM/YYYY - HH:mm')}
            </Text>
            <Text style={styles.cardText}>Notes : {payment.notes}</Text>
          </View>
        </View>
      </Card>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchBar}
      />

      <ScrollView>
        {searchQuery
          ? filteredPayments.map((payment) => renderRow(payment))
          : payments.map((payment) => renderRow(payment))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 1,
  },
  colorBar: {
    height: '100%',
    width: '3%',
  },
  card: {
    flex: 1,
    borderRadius: 0,
    overflow: 'hidden',
    backgroundColor: COLORS.darkcard,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  cardColumn: {
    flex: 1,
  },
  cardText: {
    color: '#FFF',
    fontSize: 16,
    margin: 3,
  },
});

export default PaymentsTable;
