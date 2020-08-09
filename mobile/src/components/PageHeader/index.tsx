import React, { FC } from 'react';
import { Image, View, Text } from 'react-native';
import styles from './styles';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';


interface PageHeaderProps {
    title: string;
}

const PageHeader: FC<PageHeaderProps> = ({title}) => {
    const {navigate} = useNavigation();

    function handleGoBack() {
        navigate('Landing');
    }

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton
                    onPress={handleGoBack}>
                    <Image source={backIcon} resizeMethod='contain'/>
                </BorderlessButton>

                <Image source={logoImg} resizeMethod='contain'/>
            </View>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

export default PageHeader;