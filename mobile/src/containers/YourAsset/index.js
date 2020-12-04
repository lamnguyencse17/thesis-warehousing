import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, Modal, Button} from 'react-native';
import styles from './styles';
import {gql, useQuery} from '@apollo/client';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ModalItem} from '@components';
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

  const _renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.itemView}
          onPress={() => {
            setIndexItem(index);
          }}>
          <Text>
            {index + 1}: {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  console.log('item', itemIndex);
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.titleText}>Your Assets</Text>
      </View>
      {loading == true ? (
        <></>
      ) : (
        <>
          <FlatList
            data={data.getManyAssetsOfSelf}
            renderItem={_renderItem}
            keyExtractor={(item) => item._id}
          />
          {itemIndex === -1 ? (
            <></>
          ) : (
            <ModalItem
              setIndexItem={setIndexItem}
              data={data.getManyAssetsOfSelf[itemIndex]}
            />
          )}
        </>
      )}
    </View>
  );
};

export default YourAsset;
