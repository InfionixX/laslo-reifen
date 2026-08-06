import Modal from '../Modal';
import { useModal } from '../../context/modal';

const PrivacyModal = () => {
    const { activeModal, closeModal } = useModal();

    return (
        <Modal isOpen={activeModal === 'privacy'} onClose={closeModal} title="Datenschutzerklärung">
            <div className="space-y-4 text-sm">
                <h3 className="font-bold text-white">1. Datenschutz auf einen Blick</h3>
                <p><strong>Allgemeine Hinweise:</strong> Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>

                <h3 className="font-bold text-white">2. Datenerfassung auf dieser Website</h3>
                <p><strong>Cookies:</strong> Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an.</p>
                <p><strong>Kontaktformular:</strong> Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage gespeichert.</p>

                <h3 className="font-bold text-white">3. Analyse-Tools und Tools von Drittanbietern</h3>
                <p>Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden.</p>

                <h3 className="font-bold text-white">4. SSL- bzw. TLS-Verschlüsselung</h3>
                <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung.</p>
            </div>
        </Modal>
    );
};

export default PrivacyModal;
