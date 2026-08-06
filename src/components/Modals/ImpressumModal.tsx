import Modal from '../Modal';
import { useModal } from '../../context/modal';

const ImpressumModal = () => {
    const { activeModal, closeModal } = useModal();

    return (
        <Modal isOpen={activeModal === 'impressum'} onClose={closeModal} title="Impressum">
            <div className="space-y-4 text-sm">
                <h3 className="font-bold text-white">Angaben gemäß § 5 TMG</h3>
                <p>Laslo Reifen GmbH (Muster)<br />
                    Reifenstraße 123<br />
                    80331 München<br />
                    Deutschland</p>

                <h3 className="font-bold text-white">Vertreten durch:</h3>
                <p>Max Mustermann (Geschäftsführer)</p>

                <h3 className="font-bold text-white">Kontakt</h3>
                <p>Telefon: +49 123 456 789<br />
                    E-Mail: info@laslo-reifen.de</p>

                <h3 className="font-bold text-white">Registereintrag</h3>
                <p>Eintragung im Handelsregister.<br />
                    Registergericht: Amtsgericht München<br />
                    Registernummer: HRB 12345</p>

                <h3 className="font-bold text-white">Umsatzsteuer-ID</h3>
                <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                    DE 123 456 789</p>

                <h3 className="font-bold text-white">EU-Streitschlichtung</h3>
                <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" className="text-brand-orange hover:underline">https://ec.europa.eu/consumers/odr/</a>.</p>
            </div>
        </Modal>
    );
};

export default ImpressumModal;
