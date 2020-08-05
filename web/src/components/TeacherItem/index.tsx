import React from 'react';
import whatsAppIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css'

const TeacherItem = () => {
    return (
        <article className="teacher-item">
            <header>
                <img
                    src="data:image/jpeg;base64,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"
                />
                <div>
                    <strong>Diego Daibert</strong>
                    <span>Java</span>
                </div>
            </header>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at dignissim nisi. Aenean eu quam tempor, lacinia elit vel, lobortis turpis. Aenean in sapien a arcu pulvinar
                egestas. Praesent ut justo ac arcu lobortis accumsan vitae viverra nibh. Vivamus ac sapien eu est gravida convallis. Ut quis fringilla ante. Ut non elit ante.
            </p>
            <footer>
                <p>Preço/Hora
                    <strong>R$ 80.00</strong>
                </p>
                <button type="button">
                    <img src={whatsAppIcon} alt="Whatsapp"/>
                    Entrar em contato
                </button>
            </footer>
        </article>
    );
};

export default TeacherItem;
