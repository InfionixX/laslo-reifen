import Modal from '../Modal';
import { useModal } from '../../context/ModalContext';

/**
 * Datenschutzerklärung nach Art. 13/14 DSGVO.
 *
 * WICHTIG: Der Text beschreibt bewusst nur das, was diese Website tatsächlich
 * tut – aktuell keine Cookies, kein Tracking, keine eingebetteten Drittdienste
 * (Kartendienst entfernt, Bilder und Schriften lokal ausgeliefert). Wird später
 * ein Dienst eingebunden (Analytics, Maps, Chatbot, Google Fonts), MUSS der
 * entsprechende Abschnitt hier ergänzt werden.
 */
const PrivacyModal = () => {
    const { activeModal, closeModal } = useModal();

    return (
        <Modal isOpen={activeModal === 'privacy'} onClose={closeModal} title="Datenschutzerklärung" maxWidth="max-w-3xl">
            <div className="space-y-5 text-sm leading-relaxed">

                <section>
                    <h3 className="font-bold text-white mb-1">1. Verantwortlicher</h3>
                    <p>
                        Verantwortlicher im Sinne des Art. 4 Nr. 7 DSGVO ist:
                    </p>
                    <p className="mt-2">
                        Laszlo Jancso<br />
                        Mozartstraße 8<br />
                        96106 Ebern<br />
                        Deutschland<br />
                        Telefon:{' '}
                        <a href="tel:+4915171561144" className="text-brand-orange hover:underline">+49 1517 1561144</a>
                        <br />
                        E-Mail:{' '}
                        <a href="mailto:laszlo@magyar-gumis.de" className="text-brand-orange hover:underline">laszlo@magyar-gumis.de</a>
                    </p>
                    <p className="mt-2">
                        Ein Datenschutzbeauftragter ist nicht bestellt, da die Voraussetzungen des Art. 37 DSGVO
                        i. V. m. § 38 BDSG nicht vorliegen.
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">2. Allgemeines zur Datenverarbeitung</h3>
                    <p>
                        Wir verarbeiten personenbezogene Daten nur, soweit dies zur Bereitstellung einer
                        funktionsfähigen Website sowie zur Erbringung unserer Leistungen erforderlich ist. Die
                        Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO (Einwilligung),
                        lit. b DSGVO (Vertrag bzw. vorvertragliche Maßnahmen), lit. c DSGVO (rechtliche
                        Verpflichtung) oder lit. f DSGVO (berechtigte Interessen).
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">3. Hosting und Server-Logfiles</h3>
                    <p>
                        Diese Website wird gehostet von der STRATO GmbH, Otto-Ostrowski-Straße 7, 10249 Berlin
                        („Hoster“). Der Hoster verarbeitet die über diese Website erhobenen Daten in unserem Auftrag
                        auf Grundlage eines Vertrages zur Auftragsverarbeitung nach Art. 28 DSGVO. Die Server
                        befinden sich in Deutschland.
                    </p>
                    <p className="mt-2">
                        Beim Aufruf dieser Website erhebt der Hoster automatisch Informationen, die Ihr Browser
                        übermittelt und die technisch erforderlich sind, um Ihnen die Website anzuzeigen: aufgerufene
                        Seite, Datum und Uhrzeit des Abrufs, übertragene Datenmenge, Referrer-URL, Browsertyp und
                        -version, Betriebssystem sowie die IP-Adresse.
                    </p>
                    <p className="mt-2">
                        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im
                        technisch fehlerfreien Betrieb und in der Sicherheit der Website. Eine Zusammenführung dieser
                        Daten mit anderen Datenquellen findet nicht statt; eine Auswertung zu Marketingzwecken
                        erfolgt nicht. Die Logfiles werden nach spätestens 30 Tagen gelöscht, sofern sie nicht
                        ausnahmsweise zur Aufklärung eines konkreten Sicherheitsvorfalls benötigt werden.
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">4. SSL- bzw. TLS-Verschlüsselung</h3>
                    <p>
                        Diese Website nutzt eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung
                        erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt
                        und am Schloss-Symbol. Bei aktivierter Verschlüsselung können die Daten, die Sie an uns
                        übermitteln, nicht von Dritten mitgelesen werden.
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">5. Kontaktformular</h3>
                    <p>
                        Über unser Kontaktformular erheben wir folgende Daten: Name, E-Mail-Adresse, Telefonnummer
                        einschließlich Ländervorwahl, Betreff Ihrer Anfrage sowie Ihre Nachricht. Bei Anfragen zu
                        Reifen oder Felgen erheben wir zusätzlich die Schlüsselnummern Ihres Fahrzeugs (HSN und TSN
                        aus Ziffer 2.1 und 2.2 der Zulassungsbescheinigung Teil I), da eine passgenaue Beratung und
                        Angebotserstellung ohne diese Angaben nicht möglich ist.
                    </p>
                    <p className="mt-2">
                        Die Angabe von Name, E-Mail-Adresse, Telefonnummer und Nachricht ist erforderlich, um Ihre
                        Anfrage bearbeiten und Sie kontaktieren zu können. Ohne diese Angaben können wir Ihre Anfrage
                        nicht beantworten. Die Daten werden ausschließlich per E-Mail an uns übermittelt und nicht in
                        einer Datenbank auf der Website gespeichert.
                    </p>
                    <p className="mt-2">
                        <strong className="text-white">Rechtsgrundlage:</strong> Zielt Ihre Anfrage auf den Abschluss
                        eines Vertrages oder die Erstellung eines Angebots, ist Rechtsgrundlage Art. 6 Abs. 1 lit. b
                        DSGVO (vorvertragliche Maßnahmen). Bei allgemeinen Anfragen ohne Vertragsbezug ist
                        Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in der
                        Beantwortung Ihres Anliegens.
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">6. Kontaktaufnahme per E-Mail, Telefon oder Messenger</h3>
                    <p>
                        Wenn Sie uns per E-Mail, telefonisch oder über einen Messenger kontaktieren, werden Ihre
                        Angaben zur Bearbeitung des Anliegens gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
                        DSGVO bei vertragsbezogenen Anfragen, im Übrigen Art. 6 Abs. 1 lit. f DSGVO.
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">7. Speicherdauer und gesetzliche Aufbewahrungspflichten</h3>
                    <p>
                        Ihre Daten werden <strong className="text-white">für die Dauer der Auftragsabwicklung</strong>{' '}
                        gespeichert, also solange dies für die Bearbeitung Ihrer Anfrage, die Durchführung des
                        Vertrages und die Abwicklung etwaiger Gewährleistungsansprüche erforderlich ist. Danach werden
                        die Daten gelöscht, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
                    </p>
                    <p className="mt-2">
                        Kommt es zu einem Vertragsschluss, sind wir gesetzlich zur Aufbewahrung verpflichtet
                        (Art. 6 Abs. 1 lit. c DSGVO i. V. m. § 147 AO und § 257 HGB). Die Daten werden in diesem Fall
                        gesperrt und ausschließlich zur Erfüllung dieser Pflichten vorgehalten. Es gelten folgende
                        Fristen:
                    </p>
                    <ul className="mt-2 space-y-1 list-disc pl-5">
                        <li>
                            <strong className="text-white">8 Jahre</strong> für Buchungsbelege und Rechnungen
                            (§ 147 Abs. 1 Nr. 4 AO, § 257 Abs. 1 Nr. 4 HGB) – seit dem 1. Januar 2025 verkürzt von
                            zuvor zehn Jahren.
                        </li>
                        <li>
                            <strong className="text-white">6 Jahre</strong> für Handelsbriefe und sonstige
                            Geschäftsunterlagen, insbesondere geschäftliche Korrespondenz (§ 147 Abs. 1 Nr. 2 und 3,
                            Abs. 3 AO; § 257 Abs. 1 Nr. 2 und 3, Abs. 4 HGB).
                        </li>
                        <li>
                            <strong className="text-white">10 Jahre</strong> für Jahresabschlüsse, Handelsbücher und
                            Inventare.
                        </li>
                    </ul>
                    <p className="mt-2">
                        Die Fristen beginnen jeweils mit dem Schluss des Kalenderjahres, in dem der Beleg entstanden
                        bzw. die Aufzeichnung vorgenommen wurde (§ 147 Abs. 4 AO).
                    </p>
                    <p className="mt-2">
                        Anfragen, die zu keinem Vertragsschluss führen, löschen wir, sobald der Vorgang abgeschlossen
                        ist und sich aus den Umständen ergibt, dass der Sachverhalt abschließend geklärt ist –
                        spätestens nach sechs Monaten –, sofern keine gesetzlichen Aufbewahrungspflichten
                        entgegenstehen. Sie können der Speicherung jederzeit widersprechen oder eine erteilte
                        Einwilligung widerrufen.
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">8. Empfänger der Daten</h3>
                    <p>
                        Eine Weitergabe Ihrer Daten erfolgt nur, soweit dies zur Vertragsabwicklung erforderlich oder
                        gesetzlich vorgeschrieben ist. Empfänger können sein:
                    </p>
                    <ul className="mt-2 space-y-1 list-disc pl-5">
                        <li>
                            unser Hosting- und E-Mail-Dienstleister STRATO GmbH als Auftragsverarbeiter nach
                            Art. 28 DSGVO,
                        </li>
                        <li>
                            Versanddienstleister zur Zustellung der Ware, soweit Sie eine Lieferung beauftragen
                            (Art. 6 Abs. 1 lit. b DSGVO),
                        </li>
                        <li>Lieferanten und Hersteller, soweit dies zur Beschaffung der bestellten Ware notwendig ist,</li>
                        <li>
                            Steuerberatung, Finanzbehörden sowie ggf. Rechtsberatung im Rahmen gesetzlicher Pflichten
                            (Art. 6 Abs. 1 lit. c DSGVO).
                        </li>
                    </ul>
                    <p className="mt-2">
                        Eine Übermittlung in ein Drittland außerhalb der EU bzw. des EWR findet nicht statt, es sei
                        denn, Sie kontaktieren uns aus eigener Initiative über einen Messenger-Dienst (siehe Ziffer 10).
                        Ihre Daten werden nicht zu Werbezwecken an Dritte verkauft oder weitergegeben.
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">9. Cookies und lokale Speicherung</h3>
                    <p>
                        Diese Website verwendet ausschließlich{' '}
                        <strong className="text-white">technisch notwendige Cookies</strong>. Im Einzelnen:
                    </p>
                    <ul className="mt-2 space-y-1 list-disc pl-5">
                        <li>
                            <strong className="text-white">Sitzungs-Cookie des Webservers</strong> (z. B.
                            „PHPSESSID“), gesetzt von unserem Hoster STRATO. Es dient der Sitzungsverwaltung und
                            der Aufrechterhaltung der Verbindung während Ihres Besuchs. Das Cookie wird beim
                            Schließen des Browsers gelöscht.
                        </li>
                        <li>
                            <strong className="text-white">Eintrag im lokalen Speicher</strong> Ihres Browsers
                            („mg-cookie-notice-ack-v1“). Er speichert lediglich, dass Sie unseren Cookie-Hinweis zur
                            Kenntnis genommen haben, damit dieser nicht bei jedem Besuch erneut erscheint. Es handelt
                            sich nicht um ein Cookie; es werden keine Daten an unseren Server übertragen. Sie können
                            den Eintrag jederzeit über die Einstellungen Ihres Browsers löschen.
                        </li>
                    </ul>
                    <p className="mt-2">
                        Beide Speichervorgänge sind für den Betrieb der Website unbedingt erforderlich und daher nach
                        § 25 Abs. 2 Nr. 2 TDDDG einwilligungsfrei. Rechtsgrundlage für die anschließende Verarbeitung
                        ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in der technisch
                        fehlerfreien Bereitstellung der Website.
                    </p>
                    <p className="mt-2">
                        <strong className="text-white">Cookies von Drittanbietern setzen wir derzeit nicht ein.</strong>{' '}
                        Es findet keine Webanalyse, kein Tracking, keine Reichweitenmessung und kein Profiling statt;
                        Ihr Surfverhalten wird nicht ausgewertet. Sollten wir künftig einwilligungsbedürftige Cookies
                        einsetzen, holen wir Ihre Einwilligung zuvor über ein entsprechendes Auswahlfenster ein.
                    </p>
                    <p className="mt-2">
                        Alle Bilder und Gestaltungselemente werden von unserem eigenen Server ausgeliefert. Es werden
                        beim Seitenaufruf keine Inhalte von Content-Delivery-Netzwerken oder sonstigen Drittanbietern
                        nachgeladen; insbesondere ist kein Kartendienst eingebunden.
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">10. Social-Media-Links und WhatsApp</h3>
                    <p>
                        Auf unserer Website finden Sie Verweise zu unseren Profilen bei Instagram und Facebook sowie
                        einen WhatsApp-Link. Es handelt sich dabei ausschließlich um{' '}
                        <strong className="text-white">einfache Verlinkungen, nicht um eingebettete Plugins</strong>.
                        Beim bloßen Aufruf unserer Website werden daher keine Daten an die Betreiber dieser Dienste
                        übermittelt.
                    </p>
                    <p className="mt-2">
                        Erst wenn Sie aktiv auf einen dieser Links klicken, stellt Ihr Browser eine Verbindung zum
                        jeweiligen Anbieter her und übermittelt dabei Ihre IP-Adresse. Für die anschließende
                        Verarbeitung ist der jeweilige Anbieter verantwortlich; hierbei kann es zu einer Übermittlung
                        in die USA kommen. Bitte beachten Sie die Datenschutzhinweise der Anbieter (Meta Platforms
                        Ireland Ltd. für Instagram, Facebook und WhatsApp).
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">11. Ihre Rechte als betroffene Person</h3>
                    <p>Ihnen stehen gegenüber uns folgende Rechte zu:</p>
                    <ul className="mt-2 space-y-1 list-disc pl-5">
                        <li>Recht auf Auskunft über die verarbeiteten Daten (Art. 15 DSGVO),</li>
                        <li>Recht auf Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
                        <li>Recht auf Löschung (Art. 17 DSGVO),</li>
                        <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
                        <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO),</li>
                        <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO),</li>
                        <li>
                            Recht auf Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft
                            (Art. 7 Abs. 3 DSGVO).
                        </li>
                    </ul>
                    <p className="mt-2">
                        Zur Ausübung Ihrer Rechte genügt eine formlose Mitteilung an die unter Ziffer 1 genannten
                        Kontaktdaten.
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">12. Widerspruchsrecht nach Art. 21 DSGVO</h3>
                    <p>
                        Soweit wir Daten auf Grundlage berechtigter Interessen nach Art. 6 Abs. 1 lit. f DSGVO
                        verarbeiten, haben Sie das Recht, aus Gründen, die sich aus Ihrer besonderen Situation
                        ergeben, jederzeit gegen diese Verarbeitung Widerspruch einzulegen. Wir verarbeiten die Daten
                        dann nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe nachweisen, die Ihre
                        Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung,
                        Ausübung oder Verteidigung von Rechtsansprüchen.
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">13. Beschwerderecht bei der Aufsichtsbehörde</h3>
                    <p>
                        Unbeschadet anderweitiger Rechtsbehelfe steht Ihnen nach Art. 77 DSGVO ein Beschwerderecht bei
                        einer Aufsichtsbehörde zu. Die für uns zuständige Behörde ist:
                    </p>
                    <p className="mt-2">
                        Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)<br />
                        Promenade 18<br />
                        91522 Ansbach<br />
                        Telefon: 0981 180093-0<br />
                        E-Mail: poststelle@lda.bayern.de
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">14. Keine automatisierte Entscheidungsfindung</h3>
                    <p>
                        Eine automatisierte Entscheidungsfindung einschließlich Profiling nach Art. 22 DSGVO findet
                        nicht statt.
                    </p>
                </section>

                <section>
                    <h3 className="font-bold text-white mb-1">15. Aktualität dieser Erklärung</h3>
                    <p>
                        Diese Datenschutzerklärung ist aktuell gültig. Durch die Weiterentwicklung unserer Website
                        oder aufgrund geänderter gesetzlicher Vorgaben kann es notwendig werden, sie anzupassen.
                    </p>
                </section>
            </div>
        </Modal>
    );
};

export default PrivacyModal;
