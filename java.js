let dogruSay = parseInt(localStorage.getItem("dogru")) || 0;
let yanlisSay = parseInt(localStorage.getItem("yanlis")) || 0;
let passPuan = parseInt(localStorage.getItem("passPuan")) || 0;
const MAKS_KADEME = 100;
const PUAN_PER_KADEME = 5;

dogruSay = dogruSay = 0;
yanlisSay = yanlisSay = 0;
passPuan = passPuan = 0;

const content = document.getElementById("passContent");

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
            r.innerText = "ALINDI ✅";
        } else {
            r.classList.remove("unlocked");
            r.innerText = "MUCİZE " + i;
        }
    }

    // --- ORTALAMA VE HİZALAMA MANTIĞI ---
    const t0 = document.getElementById("t0");
    const currentT = document.getElementById("t" + Math.min(kademe, MAKS_KADEME));
    const nextT = document.getElementById("t" + Math.min(kademe + 1, MAKS_KADEME));
    
    let startX = t0.offsetLeft + (t0.offsetWidth / 2);
    let currentX = currentT.offsetLeft + (currentT.offsetWidth / 2);
    let progressX = currentX - startX;

    if (kademe < MAKS_KADEME) {
        let birimMesafe = (nextT.offsetLeft - currentT.offsetLeft) / PUAN_PER_KADEME;
        progressX += (birimMesafe * kalan);
    }

    // Çizgi genişliği
    document.getElementById("trackFill").style.width = progressX + "px";

    // --- 0/5 ETİKETİNİ TAM ORTAYA SABİTLEME ---
    const tag = document.getElementById("statusTag");
    let midPoint;
    
    if (kademe < MAKS_KADEME) {
        // Şu anki kademe ile bir sonraki kademenin merkezleri arasındaki orta nokta
        midPoint = currentX + (nextT.offsetLeft - currentT.offsetLeft) / 2;
    } else {
        midPoint = currentX;
    }
    
    tag.style.left = midPoint + "px";
    tag.innerText = kalan + "/5";

    // Odaklanma
    currentT.scrollIntoView({ behavior: 'smooth', inline: 'center' });

    localStorage.setItem("dogru", dogruSay);
    localStorage.setItem("yanlis", yanlisSay);
    localStorage.setItem("passPuan", passPuan);
}

function ekle(v) {
    if(v > 0) {
        if(passPuan < MAKS_KADEME * PUAN_PER_KADEME) { dogruSay++; passPuan++; }
    } else {
        if(passPuan > 0) { yanlisSay++; }
        // passPuan--;
    }
    guncelle();
}

window.addEventListener('resize', guncelle);
window.onload = guncelle;
