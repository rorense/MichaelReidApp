import { View, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { router } from 'expo-router'

const SearchInput = ({ initialQuery }: any) => {

    const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className='flex flex-row items-center justify-center space-x-4 w-[85vw] h-12 px-4 focus:border-secondary'>
        <TextInput
            className='mt-0.5 flex-1 font-DMSans'
            value={query}
            placeholder='Search your gallery'
            onChangeText={(e) => {setQuery(e)}}
        />
        <TouchableOpacity 
            onPress={() => {
                if(query === "") {
                    return Alert.alert("Missing keyword", "Please enter a search term");
                }

                router.push(`/${query}`);
            }}
        >
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
    </View>
  )
}

export default SearchInput;