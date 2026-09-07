import Modal from '../Modal';
import { useModal } from '../../context/ModalContext';

/**
 * Pflichtangaben nach § 5 DDG (löst seit 14.05.2024 das TMG ab).
 * Der frühere Hinweis auf die EU-OS-Plattform ist entfallen – die Plattform
 * wurde am 20.07.2025 eingestellt, der Link darf nicht mehr geführt werden.
 */
const ImpressumModal = () => {
    const { activeModal, closeModal } = useModal();

    return (
        <Modal isOpen={activeModal === 'impressum'} onClose={closeModal} title="Impressum">
            <div className="space-y-5 text-sm leading-relaxed">
                <section>
                    <h3 className="font-bold text-white mb-1">Angaben gemäß § 5 DDG</h3>
                    <p>
                        Laszlo Jancso<br />
                        Mozartstraße 8<br />
                        96106 Ebern<br />
                        Deutschland
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">Kontakt</h3>
                    <p>
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
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">Umsatzsteuer</h3>
                    <p>
                        Als Kleinunternehmer im Sinne von § 19 Abs. 1 UStG wird keine Umsatzsteuer berechnet und
                        in Rechnungen nicht ausgewiesen. Eine Umsatzsteuer-Identifikationsnummer nach § 27 a UStG
                        liegt daher nicht vor.
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">Redaktionell verantwortlich (§ 18 Abs. 2 MStV)</h3>
                    <p>
                        Laszlo Jancso<br />
                        Mozartstraße 8<br />
                        96106 Ebern
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">Verbraucherstreitbeilegung</h3>
                    <p>
                        Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
                        Verbraucherschlichtungsstelle teilzunehmen (§ 36 Abs. 1 Nr. 1 VSBG).
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">Haftung für Inhalte</h3>
                    <p>
                        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach
                        den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter
                        jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen
                        oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
                        allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst
                        ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
                        von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">Haftung für Links</h3>
                    <p>
                        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
                        Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                        Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
                        Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
                        mögliche Rechtsverstöße überprüft; rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung
                        nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
                        konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
                        Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">Urheberrecht</h3>
                    <p>
                        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                        deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                        Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung
                        des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
                        privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht
                        vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere
                        werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
                        Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
                        Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                    </p>
                </section>
            </div>
        </Modal>
    );
};

export default ImpressumModal;
