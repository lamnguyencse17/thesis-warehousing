import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, Modal, Button} from 'react-native';
import styles from './styles';
import {gql, useQuery} from '@apollo/client';
import {TouchableOpacity} from 'react-native-gesture-handler';

const queryYourAsset = gql`
  query Query {
    getManyAssetsOfSelf(limit: 5, offset: 0) {
      _id
      name
      quantity
      description
      owner
      unit
    }
  }
`;

const YourAsset = ({params}) => {
  //   const [data, setData] = useState([]);
  //   useSubscription(query, {
  //     onSubscriptionData: ({subscriptionData}) => {
  //       setData([...data, {...subscriptionData.data}]);
  //     },
  //   });

  const [modalVisible, setModalVisible] = useState(false);
  const [itemIndex, setIndexItem] = useState(-1);
  const {loading, error, data} = useQuery(queryYourAsset);
  useEffect(() => {
    if (loading == false) {
      console.log('data', data);
    }
  });

  const _renderItem = ({item, index}) => {
    console.log(data.getManyAssetsOfSelf[index].name);
    return (
      <View>
        <TouchableOpacity
          style={styles.itemView}
          onPress={(index) => {
            setModalVisible(true);
            setIndexItem(index);
          }}>
          <Text>
            {index + 1}: {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.titleText}>Your Assets</Text>
      </View>

      {loading == true ? (
        <></>
      ) : (
        <View>
          {itemIndex == -1 ? (
            <></>
          ) : (
            <Modal transparent={true}>
              <View style={styles.centerView}>
                <View style={styles.modalView}>
                  <Text>{data.getManyAssetsOfSelf[itemIndex].name}</Text>
                  <Button
                    onPress={() => {
                      setModalVisible(false);
                    }}
                    title="Bakc"></Button>
                </View>
              </View>
            </Modal>
          )}

          <FlatList
            data={data.getManyAssetsOfSelf}
            renderItem={_renderItem}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}
    </View>
  );
};

export default YourAsset;
