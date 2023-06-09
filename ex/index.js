class PuzzleDemo {
    map_;
    polys_ = [];
    difficulty_ = "Easy";
    count_ = 0;
    pieceDiv_;
    timeDiv_;
    dataLoaded_ = false;
    NUM_PIECES_ = 10;
    countries_ = [];
    timer_ = 0;
    START_COLOR_ = "#3c79de";
    END_COLOR_ = "#037e29";
    constructor(map) {
        this.map_ = map;
        this.pieceDiv_ = document.createElement("div");
        this.timeDiv_ = document.createElement("div");
        this.createMenu_();
        this.setDifficultyStyle_();
        this.loadData_();
    }
    createMenu_() {
        const menuDiv = document.createElement("div");

        menuDiv.style.cssText =
            "margin: 40px 10px; border-radius: 8px; height: 320px; width: 180px;" +
            "background-color: white; font-size: 14px; font-family: Roboto;" +
            "text-align: center; color: grey;line-height: 32px; overflow: hidden";

        const titleDiv = document.createElement("div");

        titleDiv.style.cssText =
            "width: 100%; background-color: #4285f4; color: white; font-size: 20px;" +
            "line-height: 40px;margin-bottom: 24px";
        titleDiv.innerText = "Game Options";

        const pieceTitleDiv = document.createElement("div");

        pieceTitleDiv.innerText = "PIECE:";
        pieceTitleDiv.style.fontWeight = "800";

        const pieceDiv = this.pieceDiv_;

        pieceDiv.innerText = "0 / " + this.NUM_PIECES_;

        const timeTitleDiv = document.createElement("div");

        timeTitleDiv.innerText = "TIME:";
        timeTitleDiv.style.fontWeight = "800";

        const timeDiv = this.timeDiv_;

        timeDiv.innerText = "0.0 seconds";

        const difficultyTitleDiv = document.createElement("div");

        difficultyTitleDiv.innerText = "DIFFICULTY:";
        difficultyTitleDiv.style.fontWeight = "800";

        const difficultySelect = document.createElement("select");

        ["Easy", "Moderate", "Hard", "Extreme"].forEach((level) => {
            const option = document.createElement("option");

            option.value = level.toLowerCase();
            option.innerText = level;
            difficultySelect.appendChild(option);
        });
        difficultySelect.style.cssText =
            "border: 2px solid lightgrey; background-color: white; color: #4275f4;" +
            "padding: 6px;";
        difficultySelect.onchange = () => {
            this.setDifficulty_(difficultySelect.value);
            this.resetGame_();
        };

        const resetDiv = document.createElement("div");

        resetDiv.innerText = "Reset";
        resetDiv.style.cssText =
            "cursor: pointer; border-top: 1px solid lightgrey; margin-top: 18px;" +
            "color: #4275f4; line-height: 40px; font-weight: 800";
        resetDiv.onclick = this.resetGame_.bind(this);
        menuDiv.appendChild(titleDiv);
        menuDiv.appendChild(pieceTitleDiv);
        menuDiv.appendChild(pieceDiv);
        menuDiv.appendChild(timeTitleDiv);
        menuDiv.appendChild(timeDiv);
        menuDiv.appendChild(difficultyTitleDiv);
        menuDiv.appendChild(difficultySelect);
        menuDiv.appendChild(resetDiv);
        this.map_.controls[google.maps.ControlPosition.TOP_LEFT].push(menuDiv);
    }
    render() {
        if (!this.dataLoaded_) {
            return;
        }

        this.start_();
    }
    loadData_() {
        const xmlhttpRequest = new XMLHttpRequest();

        xmlhttpRequest.onreadystatechange = () => {
            if (
                xmlhttpRequest.status != 200 ||
                xmlhttpRequest.readyState != XMLHttpRequest.DONE
            )
                return;

            this.loadDataComplete_(JSON.parse(xmlhttpRequest.responseText));
        };

        xmlhttpRequest.open(
            "GET",
            "https://storage.googleapis.com/mapsdevsite/json/puzzle.json",
            true
        );
        xmlhttpRequest.send(null);
    }
    loadDataComplete_(data) {
        this.dataLoaded_ = true;
        this.countries_ = data;
        this.start_();
    }
    /**
     * @param {string} difficulty
     * @private
     */
    setDifficulty_(difficulty) {
        this.difficulty_ = difficulty;
        if (this.map_) {
            this.setDifficultyStyle_();
        }
    }
    setDifficultyStyle_() {
        const styles = {
            easy: [
                {
                    stylers: [{ visibility: "off" }],
                },
                {
                    featureType: "water",
                    stylers: [{ visibility: "on" }, { color: "#d4d4d4" }],
                },
                {
                    featureType: "landscape",
                    stylers: [{ visibility: "on" }, { color: "#e5e3df" }],
                },
                {
                    featureType: "administrative.country",
                    elementType: "labels",
                    stylers: [{ visibility: "on" }],
                },
                {
                    featureType: "administrative.country",
                    elementType: "geometry",
                    stylers: [{ visibility: "on" }, { weight: 1.3 }],
                },
            ],
            moderate: [
                {
                    stylers: [{ visibility: "off" }],
                },
                {
                    featureType: "water",
                    stylers: [{ visibility: "on" }, { color: "#d4d4d4" }],
                },
                {
                    featureType: "landscape",
                    stylers: [{ visibility: "on" }, { color: "#e5e3df" }],
                },
                {
                    featureType: "administrative.country",
                    elementType: "labels",
                    stylers: [{ visibility: "on" }],
                },
            ],
            hard: [
                {
                    stylers: [{ visibility: "off" }],
                },
                {
                    featureType: "water",
                    stylers: [{ visibility: "on" }, { color: "#d4d4d4" }],
                },
                {
                    featureType: "landscape",
                    stylers: [{ visibility: "on" }, { color: "#e5e3df" }],
                },
            ],
            extreme: [
                {
                    elementType: "geometry",
                    stylers: [{ visibility: "off" }],
                },
            ],
        };

        this.map_.set("styles", styles[this.difficulty_]);
    }
    resetGame_() {
        this.removeCountries_();
        this.count_ = 0;
        this.setCount_();
        this.startClock_();
        this.addRandomCountries_();
    }
    setCount_() {
        this.pieceDiv_.innerText = this.count_ + " / " + this.NUM_PIECES_;
        if (this.count_ == this.NUM_PIECES_) {
            this.stopClock_();
        }
    }
    stopClock_() {
        window.clearInterval(this.timer_);
    }
    startClock_() {
        this.stopClock_();

        const timeDiv = this.timeDiv_;

        if (timeDiv) timeDiv.textContent = "0.0 seconds";

        const t = new Date();

        this.timer_ = window.setInterval(() => {
            const diff = new Date().getTime() - t.getTime();

            if (timeDiv) timeDiv.textContent = (diff / 1000).toFixed(2) + " seconds";
        }, 100);
    }
    addRandomCountries_() {
        // Shuffle countries
        this.countries_.sort(() => {
            return Math.round(Math.random()) - 0.5;
        });

        const countries = this.countries_.slice(0, this.NUM_PIECES_);

        for (let i = 0, country; (country = countries[i]); i++) {
            this.addCountry_(country);
        }
    }
    addCountry_(country) {
        const options = {
            strokeColor: this.START_COLOR_,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: this.START_COLOR_,
            fillOpacity: 0.35,
            geodesic: true,
            map: this.map_,
            draggable: true,
            zIndex: 2,
            paths: country.start.map(google.maps.geometry.encoding.decodePath),
        };
        const poly = new google.maps.Polygon(options);

        google.maps.event.addListener(poly, "dragend", () => {
            this.checkPosition_(poly, country);
        });
        this.polys_.push(poly);
    }
    /**
     * Checks that every point in the polygon is inside the bounds.
     */
    boundsContainsPoly_(bounds, poly) {
        const b = new google.maps.LatLngBounds(
            new google.maps.LatLng(bounds[0][0], bounds[0][1]),
            new google.maps.LatLng(bounds[1][0], bounds[1][1])
        );
        const paths = poly.getPaths().getArray();

        for (let i = 0; i < paths.length; i++) {
            const p = paths[i].getArray();

            for (let j = 0; j < p.length; j++) {
                if (!b.contains(p[j])) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * Replace a poly with the correct 'end' position of the country.
     */
    replacePiece_(poly, country) {
        const options = {
            strokeColor: this.END_COLOR_,
            fillColor: this.END_COLOR_,
            draggable: false,
            zIndex: 1,
            paths: country.end.map(google.maps.geometry.encoding.decodePath),
        };

        poly.setOptions(options);
        this.count_++;
        this.setCount_();
    }
    checkPosition_(poly, country) {
        if (this.boundsContainsPoly_(country.bounds, poly)) {
            this.replacePiece_(poly, country);
        }
    }
    start_() {
        this.setDifficultyStyle_();
        this.resetGame_();
    }
    removeCountries_() {
        for (let i = 0, poly; (poly = this.polys_[i]); i++) {
            poly.setMap(null);
        }

        this.polys_ = [];
    }
}

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        disableDefaultUI: true,
        center: { lat: 10, lng: 60 },
        zoom: 2,
    });

    new PuzzleDemo(map);
}

const locations = [
    { lat: -31.56391, lng: 147.154312 },
    { lat: -33.718234, lng: 150.363181 },
    { lat: -33.727111, lng: 150.371124 },
    { lat: -33.848588, lng: 151.209834 },
    { lat: -33.851702, lng: 151.216968 },
    { lat: -34.671264, lng: 150.863657 },
    { lat: -35.304724, lng: 148.662905 },
    { lat: -36.817685, lng: 175.699196 },
    { lat: -36.828611, lng: 175.790222 },
    { lat: -37.75, lng: 145.116667 },
    { lat: -37.759859, lng: 145.128708 },
    { lat: -37.765015, lng: 145.133858 },
    { lat: -37.770104, lng: 145.143299 },
    { lat: -37.7737, lng: 145.145187 },
    { lat: -37.774785, lng: 145.137978 },
    { lat: -37.819616, lng: 144.968119 },
    { lat: -38.330766, lng: 144.695692 },
    { lat: -39.927193, lng: 175.053218 },
    { lat: -41.330162, lng: 174.865694 },
    { lat: -42.734358, lng: 147.439506 },
    { lat: -42.734358, lng: 147.501315 },
    { lat: -42.735258, lng: 147.438 },
    { lat: -43.999792, lng: 170.463352 },
];