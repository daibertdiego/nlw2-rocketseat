import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import landingImage from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';


function Landing() {
    const navigation = useNavigation();

    function handleNavigateToGiveClasses() {
        navigation.navigate('GiveClasses');
    }

    function handleNavigateToStudyTabs() {
        navigation.navigate('Study');
    }

    return (
        <View style={styles.container}>
            <Image style={styles.banner} source={landingImage}/>
            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}> O que deseja fazer?</Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton
                    onPress={handleNavigateToStudyTabs}
                    style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon}/>
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton
                    onPress={handleNavigateToGiveClasses}
                    style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassesIcon}/>
                    <Text style={styles.buttonText}>Dar Aulas</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de 200 conexões já realizadas. {' '}
                <Image source={heartIcon}/>
            </Text>
        </View>
    );
}

export default Landing;
