document.addEventListener('DOMContentLoaded', function() {
    const filterButton = document.getElementById('filter-button');

    function filterImmobilien() {
        // 1. Werte aus den Dropdowns/Inputs holen
        const vermarktungInput = document.getElementById('filter-vermarktung').value;
        const objektartInput = document.getElementById('filter-objektart').value;
        const preisInput = document.getElementById('filter-preis').value;

        // 2. Alle Kacheln holen
        const kacheln = document.querySelectorAll('.immobilien-kachel');
        let trefferAnzahl = 0;

        kacheln.forEach(kachel => {
            // Daten aus den data-Attributen der Kachel lesen
            const kachelVermarktung = kachel.getAttribute('data-vermarktung');
            const kachelObjektart = kachel.getAttribute('data-objektart');
            const kachelPreis = parseInt(kachel.getAttribute('data-preis'));

            let istSichtbar = true;

            // REGEL 1: Vermarktungsart (Kauf/Miete) prüfen
            if (vermarktungInput !== 'all' && vermarktungInput !== '' && kachelVermarktung !== vermarktungInput) {
                istSichtbar = false;
            }

            // REGEL 2: Objektart prüfen
            if (objektartInput !== 'all' && objektartInput !== '' && kachelObjektart !== objektartInput) {
                istSichtbar = false;
            }

            // REGEL 3: Preis prüfen (nur wenn ein Preis eingegeben wurde)
            if (preisInput && kachelPreis > parseInt(preisInput)) {
                istSichtbar = false;
            }

            // Sichtbarkeit anwenden
            if (istSichtbar) {
                kachel.style.display = "block"; // Oder "flex", je nach Design
                trefferAnzahl++;
            } else {
                kachel.style.display = "none";
            }
        });

        // Optional: Meldung wenn keine Treffer
        const noResultsMsg = document.getElementById('no-results-msg');
        if (trefferAnzahl === 0) {
            if(noResultsMsg) noResultsMsg.style.display = 'block';
        } else {
            if(noResultsMsg) noResultsMsg.style.display = 'none';
        }
    }

    if(filterButton) {
        filterButton.addEventListener('click', filterImmobilien);
    }
});