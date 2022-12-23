import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import ButtonWithNav from '../../components/Buttons/ButtonWithNav';
import { Card, TextInput, Text, Title  } from 'react-native-paper';

const Home = ({navigation}) =>{

    const [name, setName] = useState('')
    const [totalResults, setTotalResults] = useState()
    const [movieData, setMovieData] = useState([])
    const [movieTitle, setMovieTitle] = useState([])

    const [pageNum, setPageNum] = useState(1)

    const GetMovies = async (name, num) => {
        try {
            setMovieData([])
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=faac618f8b55fe67036720b29d0f430d&query=${name}&page=${num}`)
            const data = await response.json()
            console.log(JSON.stringify(data, null, 4))
            setPageNum(data.page)
            setTotalResults(data.total_pages)
            setMovieData(data.results)
        } catch (error) {
            console.error(error)
        }
    }

    return(
    <ScrollView>
        <View>
            <View style={styles.container}>
                <TextInput 
                    label='Search'
                    mode='outlined'
                    value={name}
                    onChangeText={(text) => {
                        setName(text)
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonBox}>
                    <ButtonWithNav text='Submit' icon='magnify' 
                        onPressIn={async () => {
                            {await GetMovies(name, 1)}
                        }} 
                    />
                </View>
            </View>
        </View>

        <View>
            <View>
                    { movieData ?
                    (
                        movieData.map((item) => 
                        <View style={styles.container}>
                            <Card mode='contained'>
                            <Card.Cover resizeMode='center' source={{uri: `https://image.tmdb.org/t/p/original/${item.poster_path}`}} />
                                <Card.Title title={item.original_title} />
                                <Card.Content>
                                </Card.Content>
                            </Card>
                        </View>
                        )
                    )
                    :
                    (
                        null
                    )
                    }
            </View>
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    buttonBox: {
        flexGrow: 1
    }
})

export default Home