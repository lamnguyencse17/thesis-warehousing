import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
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

const YourAsset = () => {
  const [itemIndex, setIndexItem] = useState(-1);
  const {loading, error, data} = useQuery(queryYourAsset);
  useEffect(() => {
    if (!loading){
      console.log(data);
    }
  })
  const _renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.itemView}
          onPress={() => {
            setIndexItem(index);
          }}>
          <Text style={styles.textItem}>
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
