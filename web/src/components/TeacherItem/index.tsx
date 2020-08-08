import React from 'react';
import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css'
import api from '../../services/api';

export interface Teacher {
    id: number;
    name: string;
    avatar: string;
    bio: string;
    cost: number;
    subject: string;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {
    function createNewConnection() {
        api.post('connections', {
            user_id: teacher.id
        });
    }

    return (
        <article className="teacher-item">
            <header>
                <img
                    src={teacher.avatar}
                />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>
                {teacher.bio}
            </p>
            <footer>
                <p>Preço/Hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a
                    target="_blank"
                    href={`https://wa.me/{teacher.whatsapp}`} onClick={createNewConnection}>
                    <img src={whatsAppIcon} alt="Whatsapp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
};

export default TeacherItem;
