const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropdown_menu')

toggleBtn.onclick = function() {
    dropDownMenu.classList.toggle('open')
    const isOpen = dropDownMenu.classList.contains('open')

    toggleBtnIcon.classList = isOpen
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars'
}

var map = L.map('map', { zoomControl: false }).setView([35.7596, -78.5], 10);
map.scrollWheelZoom.disable();
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
shelters.forEach(v => {
    L.marker(v).addTo(map);
    L.circleMarker(v, { radius: 85 }).addTo(map);
});
homeless.forEach(v => {
    L.circleMarker(v, { radius: 1 }).addTo(map);
});

document.getElementById('addThing').addEventListener('click', () => {
    let h = homeless.slice();
    shelters.forEach(v => {
        for (let i = h.length - 1; i >= 0; i--) {
            let dist = (h[i][0] - v[0]) ** 2 + (h[i][1] - v[1]) ** 2;
            if (dist < 0.01) h.splice(i, 1);
        }
    });
    if (!h.length) alert('no more shelters needed!');
    let best;
    let bestC;
    h.forEach(v => {
        let c = 0;
        for (let i = h.length - 1; i >= 0; i--) {
            let dist = (h[i][0] - v[0]) ** 2 + (h[i][1] - v[1]) ** 2;
            if (dist < 0.01) c++;
        }
        if (!best || bestC < c) {
            best = v;
            bestC = c;
        }
    });
    shelters.push(best);
    console.log(best);
    var marker = L.marker(best).addTo(map);
    L.circleMarker(best, { radius: 85, fillColor: 'red' }).addTo(map);
    marker._icon.classList.add("huechange");
});