import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import AsyncStorage from '@react-native-community/async-storage';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useFocusEffect(() => {
        loadFavorites();
    });

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(resp => {
            if (resp) {
                const favoritedTeachers = JSON.parse(resp);
                setFavorites(favoritedTeachers);
            }
        });
    }

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos"/>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited/>
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default Favorites;
