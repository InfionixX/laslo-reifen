import Modal from '../Modal';
import { useModal } from '../../context/ModalContext';

/**
 * Widerrufsbelehrung nach dem amtlichen Muster (Anlage 1 zu Art. 246a § 1
 * Abs. 2 Satz 2 EGBGB) mit den Gestaltungshinweisen für Kaufverträge, gefolgt
 * vom Muster-Widerrufsformular (Anlage 2).
 *
 * Der BGH gewährt die Gesetzlichkeitsfiktion nur bei UNVERÄNDERTER Übernahme
 * des Musters – Formulierungen daher bitte nicht "schöner" umschreiben.
 */
const WiderrufModal = () => {
    const { activeModal, closeModal } = useModal();

    return (
        <Modal isOpen={activeModal === 'widerruf'} onClose={closeModal} title="Widerrufsbelehrung" maxWidth="max-w-3xl">
            <div className="space-y-5 text-sm leading-relaxed">
                <section>
                    <h3 className="font-bold text-white mb-1">Widerrufsrecht</h3>
                    <p>
                        Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu
                        widerrufen.
                    </p>
                    <p className="mt-2">
                        Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter
                        Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
                    </p>
                    <p className="mt-2">
                        Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
                    </p>
                    <p className="mt-2">
                        Laszlo Jancso<br />
                        Mozartstraße 8<br />
                        96106 Ebern<br />
                        Deutschland<br />
                        Telefon:{' '}
                        <a href="tel:+4915171561144" className="text-brand-orange hover:underline">
                            +49 1517 1561144
                        </a>
                        <br />
                        E-Mail:{' '}
                        <a href="mailto:laszlo@magyar-gumis.de" className="text-brand-orange hover:underline">
                            laszlo@magyar-gumis.de
                        </a>
                    </p>
                    <p className="mt-2">
                        mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine
                        E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür
                        das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
                    </p>
                    <p className="mt-2">
                        Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des
                        Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">Folgen des Widerrufs</h3>
                    <p>
                        Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen
                        erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die
                        sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene,
                        günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn
                        Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags
                        bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das
                        Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde
                        ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung
                        Entgelte berechnet.
                    </p>
                    <p className="mt-2">
                        Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis
                        Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches
                        der frühere Zeitpunkt ist.
                    </p>
                    <p className="mt-2">
                        Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem
                        Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden
                        oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von
                        vierzehn Tagen absenden.
                    </p>
                    <p className="mt-2">Sie tragen die unmittelbaren Kosten der Rücksendung der Waren.</p>
                    <p className="mt-2">
                        Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust
                        auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht
                        notwendigen Umgang mit ihnen zurückzuführen ist.
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">Ausschluss bzw. vorzeitiges Erlöschen des Widerrufsrechts</h3>
                    <p>
                        Das Widerrufsrecht besteht nicht bei Verträgen zur Lieferung von Waren, die nicht
                        vorgefertigt sind und für deren Herstellung eine individuelle Auswahl oder Bestimmung durch
                        den Verbraucher maßgeblich ist oder die eindeutig auf die persönlichen Bedürfnisse des
                        Verbrauchers zugeschnitten sind (§ 312g Abs. 2 Nr. 1 BGB). Dies betrifft insbesondere
                        individuell konfigurierte Felgen sowie Komplettradsätze, die nach Ihren Vorgaben montiert
                        und ausgewuchtet werden.
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">Muster-Widerrufsformular</h3>
                    <p className="text-gray-400 italic mb-3">
                        (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden
                        Sie es zurück.)
                    </p>
                    <div className="border border-gray-700 rounded-lg p-4 bg-black/30 space-y-2">
                        <p>
                            An:<br />
                            Laszlo Jancso<br />
                            Mozartstraße 8<br />
                            96106 Ebern<br />
                            Deutschland<br />
                            E-Mail: laszlo@magyar-gumis.de
                        </p>
                        <p>
                            Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den
                            Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*)
                        </p>
                        <p>Bestellt am (*)/erhalten am (*)</p>
                        <p>Name des/der Verbraucher(s)</p>
                        <p>Anschrift des/der Verbraucher(s)</p>
                        <p>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)</p>
                        <p>Datum</p>
                        <p className="text-gray-400 italic">(*) Unzutreffendes streichen.</p>
                    </div>
                </section>
            </div>
        </Modal>
    );
};

export default WiderrufModal;
