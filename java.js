let dogruSay = parseInt(localStorage.getItem("dogru")) || 0;
let yanlisSay = parseInt(localStorage.getItem("yanlis")) || 0;
let passPuan = parseInt(localStorage.getItem("passPuan")) || 0;
const MAKS_KADEME = 100;
const PUAN_PER_KADEME = 5;

const content = document.getElementById("passContent");

// 100 Kademe Oluştur
for(let i=0; i<=MAKS_KADEME; i++){
    let tier = document.createElement("div");
    tier.className = "tier";
    tier.id = "t" + i;
    tier.innerHTML = <div class="reward" id="r${i}">MUCİZE ${i}</div><div class="level-circle">${i}</div>;
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

    const t0 = document.getElementById("t0");
    const currentT = document.getElementById("t" + Math.min(kademe, MAKS_KADEME));
    const nextT = document.getElementById("t" + Math.min(kademe + 1, MAKS_KADEME));
    const lastT = document.getElementById("t" + MAKS_KADEME);

    // Track genişliğini ayarla
    const totalTrackWidth = lastT.offsetLeft - t0.offsetLeft;
    document.getElementById("trackBg").style.width = totalTrackWidth + "px";
    document.getElementById("trackBg").style.left = (t0.offsetLeft + t0.offsetWidth/2) + "px";

    // İlerleme
    let progressX = currentT.offsetLeft - t0.offsetLeft;
    if (kademe < MAKS_KADEME) {
        let step = (nextT.offsetLeft - currentT.offsetLeft) / PUAN_PER_KADEME;
        progressX += (step * kalan);
    }
    document.getElementById("trackFill").style.width = progressX + "px";

    // Tag (0/5)
    const tag = document.getElementById("statusTag");
    let mid;
    if(kademe < MAKS_KADEME) {
        mid = (currentT.offsetLeft + nextT.offsetLeft) / 2 + (currentT.offsetWidth / 2);
    } else {
        mid = currentT.offsetLeft + (currentT.offsetWidth / 2);
    }
    tag.style.left = mid + "px";
    tag.innerText = kalan + "/5";

    // Scroll Odaklama (Mobilde merkeze alması için)
    currentT.scrollIntoView({ behavior: 'smooth', inline: 'center' });

    localStorage.setItem("dogru", dogruSay);
    localStorage.setItem("yanlis", yanlisSay);
    localStorage.setItem("passPuan", passPuan);
}

function ekle(v) {
    if(v > 0) {
        if(passPuan < MAKS_KADEME * PUAN_PER_KADEME) { dogruSay++; passPuan++; }
    } else {
        // -1 puanı sadece istatistik için bıraktım, kademeden düşürmez (isteğin üzerine)
        yanlisSay++;
    }
    guncelle();
}

window.onload = () => setTimeout(guncelle, 100); // WebView yüklenmesi için kısa gecikme
window.onresize = guncelle;
