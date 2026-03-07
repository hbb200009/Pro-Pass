let dogruSay = parseInt(localStorage.getItem("dogru")) || 0;
let yanlisSay = parseInt(localStorage.getItem("yanlis")) || 0;
let passPuan = parseInt(localStorage.getItem("passPuan")) || 0;
const MAKS_KADEME = 100;
const PUAN_PER_KADEME = 5;

const content = document.getElementById("passContent");

// Kademe Oluşturma
for(let i=0; i<=MAKS_KADEME; i++){
    let tier = document.createElement("div");
    tier.className = "tier";
    tier.id = "t" + i;
    tier.innerHTML = `<div class="reward" id="r${i}">MUCİZE ${i}</div><div class="level-circle">${i}</div>`;
    content.appendChild(tier);
}

function guncelle() {
    document.getElementById("dogru").innerText = dogruSay;
    document.getElementById("yanlis").innerText = yanlisSay;

    let kademe = Math.floor(passPuan / PUAN_PER_KADEME);
    let kalan = passPuan % PUAN_PER_KADEME;

    for(let i=0; i<=MAKS_KADEME; i++){
        let r = document.getElementById("r" + i);
        if(i <= kademe && passPuan > 0) {
            r.classList.add("unlocked");
            r.innerText = "ALINDI";
        } else {
            r.classList.remove("unlocked");
            r.innerText = "MUCİZE " + i;
        }
    }

    // WebView için güvenli hesaplama
    const t0 = document.getElementById("t0");
    const lastT = document.getElementById("t" + MAKS_KADEME);
    const currentT = document.getElementById("t" + Math.min(kademe, MAKS_KADEME));
    const nextT = document.getElementById("t" + Math.min(kademe + 1, MAKS_KADEME));

    // Track hizalama
    const trackBg = document.getElementById("trackBg");
    const trackFill = document.getElementById("trackFill");
    
    const startX = t0.offsetLeft + (t0.offsetWidth / 2);
    const endX = lastT.offsetLeft + (lastT.offsetWidth / 2);
    
    trackBg.style.left = startX + "px";
    trackBg.style.width = (endX - startX) + "px";

    // İlerleme hesaplama
    let currentMid = currentT.offsetLeft + (currentT.offsetWidth / 2);
    let fillWidth = currentMid - startX;

    if (kademe < MAKS_KADEME) {
        let gap = (nextT.offsetLeft - currentT.offsetLeft);
        fillWidth += (gap * (kalan / PUAN_PER_KADEME));
    }
    trackFill.style.width = fillWidth + "px";

    // Etiket (0/5) konumu - Tam Orta
    const tag = document.getElementById("statusTag");
    let tagMid;
    if(kademe < MAKS_KADEME) {
        tagMid = (currentT.offsetLeft + nextT.offsetLeft) / 2 + (currentT.offsetWidth / 2);
    } else {
        tagMid = currentMid;
    }
    tag.style.left = tagMid + "px";
    tag.innerText = kalan + "/5";

    // Otomatik odaklama
    currentT.scrollIntoView({ behavior: 'smooth', inline: 'center' });

    // Verileri kaydet
    localStorage.setItem("dogru", dogruSay);
    localStorage.setItem("yanlis", yanlisSay);
    localStorage.setItem("passPuan", passPuan);
}

function ekle(v) {
    if(v > 0) {
        if(passPuan < MAKS_KADEME * PUAN_PER_KADEME) { 
            dogruSay++; 
            passPuan++; 
        }
    } else {
        yanlisSay++;
    }
    guncelle();
}

// WebView'ın hazır olmasını bekle
window.addEventListener('load', () => {
    setTimeout(guncelle, 300);
});

// Ekran dönerse veya boyut değişirse tekrar hesapla
window.addEventListener('resize', guncelle);
