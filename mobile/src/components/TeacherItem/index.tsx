import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import unfavouriteIcon from '../../assets/images/icons/unfavorite.png';
import heartOutlineIcon from '../../assets/images/icons/heart.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import styles from './styles';
import { Linking } from 'expo/build/deprecated.web';
import AsyncStorage from '@react-native-community/async-storage';

export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher, favorited}) => {

    const [isFavorited, setIsFavorited] = useState(favorited);

    async function handleLinkToWhatsapp() {
        await Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    }

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites')
        let favoritesArray = [];
        if (favorites) {
            favoritesArray = JSON.parse(favorites);
        }

        if (isFavorited) {
            // Remover dos favoritos
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id;
            });

            favoritesArray.splice(favoriteIndex, 1);
            setIsFavorited(false);
        } else {
            // Adicionar aos favoritos
            favoritesArray.push(teacher);
            setIsFavorited(true);
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image style={styles.avatar}
                       source={{uri: teacher.avatar}}/>
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>
            <Text style={styles.bio}>{teacher.bio}</Text>
            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'  '}
                    <Text style={styles.priceValue}>
                        {teacher.cost}
                    </Text>
                </Text>
                <View style={styles.buttonsContainer}>
                    <RectButton
                        onPress={handleToggleFavorite}
                        style={[styles.favouriteButton,
                            isFavorited ? styles.favorited : {}]}>
                        {isFavorited
                            ? <Image source={unfavouriteIcon}/>
                            : <Image source={heartOutlineIcon}/>}

                    </RectButton>
                    <RectButton
                        style={styles.contactButton}
                        onPress={handleLinkToWhatsapp}
                    >
                        <Image source={whatsappIcon}/>
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
};

export default TeacherItem;
