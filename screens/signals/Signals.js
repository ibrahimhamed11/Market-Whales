import React, { useState, useEffect } from "react";
import { ScrollView, View, StyleSheet, Text, Dimensions,RefreshControl  } from "react-native";
import { Card, Title, Paragraph, Avatar } from "react-native-paper";
import { getAllSignals } from "../../utils/api/signals";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";

const window = Dimensions.get("window");
const cardWidth = window.width - 60;

const Signals = () => {
  const [signals, setSignals] = useState([]);
  const [refreshing, setRefreshing] = useState(false);




  const onRefresh = async () => {
    setRefreshing(true);
    const authToken = await AsyncStorage.getItem("token");

    try {
      const data = await getAllSignals(authToken);
      setSignals(data.signals);
    } catch (error) {
      console.error("Error fetching signals:", error);
    }

    setRefreshing(false);
  };



  useEffect(() => {
    const fetchData = async () => {
      const authToken = await AsyncStorage.getItem("token");

      try {
        const data = await getAllSignals(authToken);
        setSignals(data.signals);
      } catch (error) {
        console.error("Error fetching signals:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView
    style={styles.container}
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      
            {signals.map((signal) => (
        <Card key={signal._id} style={[styles.card, { width: cardWidth }]}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <View style={styles.pairInfo}>
                <Title style={styles.pairName}>{signal.pair}</Title>
              </View>
              <View style={styles.statusContainer}>
                <View style={styles.status}>
                  {signal.status === "Pending" && (
                    <Icon name="clock-o" size={50} color="orange" />
                  )}
                  {signal.status === "Active" && (
                    <Icon name="check" size={50} color="green" />
                  )}
                  {signal.status === "Closed" && (
                    <Icon name="times" size={50} color="red" />
                  )}
                  {signal.status === "Profit" && (
                    <Icon name="check" size={50} color="green" />
                  )}
                  {signal.status === "Loss" && (
                    <Icon name="times" size={50} color="red" />
                  )}
                  {signal.status === "Expired" && (
                    <Icon name="clock-o" size={50} color="grey" />
                  )}
                </View>
                <Text style={styles.statusText}>{signal.status}</Text>
              </View>
            </View>
            <Card.Content style={styles.cardContent}>
              <View style={styles.row}>
                <Paragraph style={styles.boldDetail}>Action</Paragraph>
                <Paragraph style={styles.value}>{signal.action}</Paragraph>
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.boldDetail}>Entry Price</Paragraph>
                <Paragraph style={styles.value}>{signal.entryPrice}</Paragraph>
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.boldDetail}>Take Profit</Paragraph>
                <Paragraph style={styles.value}>{signal.takeProfit}</Paragraph>
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.boldDetail}>Stop Loss</Paragraph>
                <Paragraph style={styles.value}>{signal.stopLoss}</Paragraph>
              </View>
              <View style={styles.row}>
                <Paragraph style={styles.boldDetail}>Date</Paragraph>
                <Paragraph style={styles.value}>
                  {moment(signal.date).locale("en").format("D MMMM - h:mm A")}
                </Paragraph>
              </View>
              {(signal.status === "Closed" ||
                signal.status === "Profit" ||
                signal.status === "Loss") &&
                signal.result !== 0 && (
                  <View style={styles.row}>
                    <Paragraph style={styles.boldDetail}>Result</Paragraph>
                    <Paragraph
                      style={[
                        styles.value,
                        signal.result < 0
                          ? styles.negativeValue
                          : styles.positiveValue,
                      ]}
                    >
                      {signal.result}
                    </Paragraph>
                    <Paragraph style={styles.value}>Point</Paragraph>
                  </View>
                )}
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
    marginBottom:100
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  pairInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  pairName: {
    fontSize: 25,
    fontWeight: "bold",
  },
  statusContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
  },
  innerCard: {
    marginTop: 10,
    elevation: 0,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  boldDetail: {
    fontWeight: "bold",
    fontSize: 18,
    width: 100,
  },
  value: {
    marginLeft: 20,
    fontSize: 18,
  },
  positiveValue: {
    color: "green",
    fontWeight: "bold",
  },
  negativeValue: {
    color: "red",
    fontWeight: "bold",
  },
});

export default Signals;
