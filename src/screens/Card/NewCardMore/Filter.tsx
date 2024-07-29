import React from 'react';
import {View, Text} from 'react-native';

type FilterProps = {};

const Filter: React.FC<FilterProps> = ({}) => {
  return (
    <View style={{backgroundColor: 'red'}}>
      <Text>Filter</Text>
    </View>
  );
};
export default Filter;
