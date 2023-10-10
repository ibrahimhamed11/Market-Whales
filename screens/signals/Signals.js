import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { Card, Title, Paragraph, Avatar } from 'react-native-paper';
import { getAllSignals } from '../../utils/api/signals'; // Import your API functions
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment'; // Import the 'moment' library

const Signals = () => {
    const [signals, setSignals] = useState([]);
  
    useEffect(() => {
        const fetchData = async () => {
            const authToken = await AsyncStorage.getItem("token");
    
            try {
                const data = await getAllSignals(authToken);
                setSignals(data.signals);
            } catch (error) {
                console.error('Error fetching signals:', error);
            }
        };
    
        fetchData();
    }, []); 

    return (
        <ScrollView style={styles.container}>
            {signals.map(signal => (
                <Card key={signal._id} style={styles.card}>
                    <Card.Content>
                        <View style={styles.cardHeader}>
                            <View style={styles.pairInfo}>
                                <Avatar.Image
                                    source={{ uri: `path_to_images/${signal.pair}.png` }} // Replace with actual path to your images
                                    size={50} // Set the size of the avatar
                                    style={styles.avatar}
                                />
                                <Title style={styles.pairName}>{signal.pair}</Title>
                            </View>
                            <View style={styles.statusContainer}>
                                <View style={styles.status}>
                                    {signal.status === 'Pending' && <Icon name="clock-o" size={50} color="orange" />}
                                    {signal.status === 'Active' && <Icon name="check" size={50} color="green" />}
                                    {signal.status === 'Closed' && <Icon name="times" size={50} color="red" />}
                                    {signal.status === 'Profit' && <Icon name="check" size={50} color="green" />}
                                    {signal.status === 'Loss' && <Icon name="times" size={50} color="red" />}
                                    {signal.status === 'Expired' && <Icon name="clock-o" size={50} color="grey" />}
                                </View>
                                <Text style={styles.statusText}>{signal.status}</Text>
                            </View>
                        </View>
                 

                        <Card.Content style={styles.cardContent}>
    <View style={styles.row}>
        <Paragraph style={styles.boldDetail}>Action:</Paragraph>
        <Paragraph style={styles.value}>{signal.action}</Paragraph>
    </View>
    <View style={styles.row}>
        <Paragraph style={styles.boldDetail}>Entry Price:</Paragraph>
        <Paragraph style={styles.value}>{signal.entryPrice}</Paragraph>
    </View>
    <View style={styles.row}>
        <Paragraph style={styles.boldDetail}>Take Profit:</Paragraph>
        <Paragraph style={styles.value}>{signal.takeProfit}</Paragraph>
    </View>
    <View style={styles.row}>
        <Paragraph style={styles.boldDetail}>Stop Loss:</Paragraph>
        <Paragraph style={styles.value}>{signal.stopLoss}</Paragraph>
    </View>
    <View style={styles.row}>
        <Paragraph style={styles.boldDetail}>Date:</Paragraph>
        <Paragraph style={styles.value}>
            {moment(signal.date).locale('en').format('D MMMM - h:mm A')}
        </Paragraph>
    </View>
</Card.Content>


                    </Card.Content>



                </Card>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 30,
        
    },
    card: {
        marginBottom: 10,
      
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    pairInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        marginRight: 10,
    },
    pairName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    statusContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    status: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    innerCard: {
        marginTop: 10,
        elevation: 0, // Remove inner card shadow
    },
    statusText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    cardDetail: {
        fontSize: 18, 
        marginBottom: 8, 
    },
    cardContent: {
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    boldDetail: {
        fontWeight: 600,
        fontSize:16,
        width: 100, 
    },
    value: {
        marginLeft: 10, // Add some spacing between key and value
        fontSize:15
    },



});

export default Signals;
