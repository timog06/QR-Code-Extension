# QR-Code-Generator Chrome-Erweiterung

## Dokumentation

### Titelblatt

**QR-Code-Generator Chrome-Erweiterung**  
**Dokumentation des Prototyps**

**Name:** Timo Goedertier 
**Datum:** 16.04.2025

---

## Inhaltsverzeichnis

1. [Problembeschreibung](#problembeschreibung)
2. [Anforderungen an den Prototyp](#anforderungen-an-den-prototyp)
3. [Art und Vorgehensweise des Prototypings](#art-und-vorgehensweise-des-prototypings)
4. [Resultat](#resultat)
5. [Fazit und Reflexion](#fazit-und-reflexion)

---

## Problembeschreibung

Nutzer benötigen eine einfache Möglichkeit, Links und Texte direkt im Browser über einen Rechtsklick oder eine Tastenkombination (Alt+Shift+Q) in einen QR-Code zu konvertieren, um sie schnell weiterzuschicken.

## Anforderungen an den Prototyp

Für den Prototyp wurden folgende Anforderungen definiert:

1. **Funktional**: Der Nutzer kann per Rechtsklick auf markierten Text/Link einen QR-Code erzeugen.
2. **Funktional**: Der Nutzer kann per Tastenkombination (Alt+Shift+Q) den markierten Text in einen QR-Code umwandeln.
3. **Nicht-funktional**: Die QR-Code-Erzeugung erfolgt komplett lokal im Browser (kein externer Dienst).
4. **UI/UX**: Die erzeugten QR-Codes werden in einem Overlay/Fenster angezeigt, das leicht schließbar ist.

## Art und Vorgehensweise des Prototypings

Für die Entwicklung des Prototyps wurde ein evolutionärer Ansatz gewählt. Dabei wurde eine Chrome-Erweiterung entwickelt, die schrittweise um Funktionen erweitert wurde:

1. **Technologieauswahl**:
   - Chrome Extension API für die Integration in den Browser
   - JavaScript für die Programmlogik
   - HTML/CSS für die Benutzeroberfläche
   - QRCode.js als lokale Bibliothek zur QR-Code-Generierung

2. **Entwicklungsphasen**:
   - Phase 1: Grundlegende Erweiterungsstruktur und Manifest-Datei
   - Phase 2: Implementierung des Kontextmenüs für Rechtsklick-Funktionalität
   - Phase 3: Hinzufügen der Tastenkombination für schnellen Zugriff
   - Phase 4: Entwicklung der Popup-Benutzeroberfläche zur Anzeige der QR-Codes
   - Phase 5: Integration der lokalen QR-Code-Generierung
   - Phase 6: Hinzufügen von Download- und Kopierfunktionen
   - Phase 7: Tests und Fehlerbehebung

3. **Verwendete Tools**:
   - Visual Studio Code als Entwicklungsumgebung
   - Chrome DevTools für Debugging
   - Chrome Extensions Management für Tests

## Resultat

Der entwickelte Prototyp erfüllt alle definierten Anforderungen und bietet eine benutzerfreundliche Möglichkeit, QR-Codes direkt im Browser zu generieren.

### Hauptfunktionen:

1. **Kontextmenü-Integration**:
   - Rechtsklick auf markierten Text oder Links öffnet die Option "Generate QR Code"
   - ![Kontextmenü-Screenshot](link_zum_screenshot)

2. **Tastenkombination**:
   - Alt+Shift+Q (Windows/Linux) oder Command+Shift+Q (Mac) generiert einen QR-Code aus dem markierten Text
   - Eine Benachrichtigung bestätigt die erfolgreiche Generierung

3. **Popup-Benutzeroberfläche**:
   - Zeigt den generierten QR-Code in einem übersichtlichen Fenster an
   - Bietet Optionen zum Herunterladen oder Kopieren des QR-Codes
   - ![Popup-Screenshot](link_zum_screenshot)

4. **Lokale Verarbeitung**:
   - Alle Daten werden ausschließlich lokal verarbeitet
   - Keine Übertragung an externe Server

### Technische Umsetzung:

Die Erweiterung besteht aus folgenden Hauptkomponenten:

- **manifest.json**: Konfigurationsdatei der Erweiterung
- **background.js**: Service Worker für Hintergrundprozesse (Kontextmenü, Tastenkombination)
- **popup/**: Enthält die Dateien für die Benutzeroberfläche (HTML, CSS, JS)
- **lib/**: Enthält die QRCode.js-Bibliothek für die lokale QR-Code-Generierung

## Fazit und Reflexion

Der entwickelte Prototyp demonstriert erfolgreich, wie eine Browser-Erweiterung die Generierung von QR-Codes vereinfachen kann, ohne dabei Kompromisse bei der Datensicherheit einzugehen.

### Stärken:

- **Benutzerfreundlichkeit**: Die Erweiterung lässt sich intuitiv über Rechtsklick oder Tastenkombination bedienen.
- **Datenschutz**: Alle Daten werden lokal verarbeitet, ohne externe Dienste zu nutzen.
- **Effizienz**: Die direkte Integration in den Browser spart Zeit und zusätzliche Schritte.
- **Flexibilität**: Unterstützt verschiedene Arten von Inhalten (Text, URLs).

### Verbesserungspotenzial:

- **Designoptimierung**: Das visuelle Design könnte weiter verbessert werden.
- **Erweiterte Funktionen**: Zukünftige Versionen könnten zusätzliche Anpassungsoptionen für QR-Codes bieten.
- **Plattformübergreifende Unterstützung**: Erweiterung auf andere Browser wie Firefox oder Edge.

### Lessons Learned:

Die Entwicklung dieses Prototyps hat gezeigt, wie wichtig es ist, die Bedürfnisse der Nutzer in den Mittelpunkt zu stellen. Durch die direkte Integration in den Browser und die lokale Verarbeitung konnte eine Lösung geschaffen werden, die sowohl benutzerfreundlich als auch datenschutzkonform ist.

Die Chrome Extension API bietet leistungsstarke Möglichkeiten zur Erweiterung der Browser-Funktionalität, erfordert jedoch auch ein tiefes Verständnis der Sicherheitsmodelle und Berechtigungen von Browsern.

Insgesamt wurde das Ziel erreicht, eine praktische Lösung für die QR-Code-Generierung zu entwickeln, die den Anforderungen moderner Webnutzer entspricht.
