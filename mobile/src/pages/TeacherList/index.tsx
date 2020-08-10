import React, { useEffect, useState } from 'react';
import { ScrollView, TextInput, View, Text } from 'react-native';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

function TeacherList() {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(resp => {
            if (resp) {
                const favoritedTeachers = JSON.parse(resp);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => teacher.id);

                setFavorites(favoritedTeachersIds);
            }
        });
    }

    function handleToogleFiltersVisible() {
        setIsFilterVisible(!isFilterVisible);
    }

    async function handleFiltersSubmit() {
        const response = await api.get('/classes', {
            params: {
                subject,
                week_day,
                time
            }
        });
        setTeachers(response.data);
        loadFavorites();
    }

    return (
        <View style={styles.container}>
            <PageHeader title="Proffys disponíveis" headerRight={(
                <BorderlessButton onPress={handleToogleFiltersVisible}>
                    <Feather name="filter" size={20} color='#FFF'/>
                </BorderlessButton>
            )}>
                {isFilterVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholderTextColor="#c1bcc"
                            style={styles.input}
                            placeholder="Qual a matéria?"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da Semana</Text>
                                <TextInput
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    placeholderTextColor="#c1bcc"
                                    style={styles.input}
                                    placeholder="Qual o dia?"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholderTextColor="#c1bcc"
                                    style={styles.input}
                                    placeholder="Qual horário?"
                                />
                            </View>
                        </View>
                        <RectButton
                            style={styles.submitButton}
                            onPress={handleFiltersSubmit}
                        >
                            <Text style={styles.submitButtonText}>
                                Filtrar
                            </Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;
