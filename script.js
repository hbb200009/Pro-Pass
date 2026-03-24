checkSeasonReset();
            //YÜKLEME EKRANI
            let percent = 0;
            let interval = setInterval(()=>{

                percent += Math.random()*10; 

                if(percent >= 100){
                    percent = 100;
                    clearInterval(interval);

                    setTimeout(()=>{
                        document.getElementById("loadingScreen").style.opacity = "0";

                        setTimeout(()=>{
                            document.getElementById("loadingScreen").style.display="none";
                        },500);

                    },500);
                }

                document.getElementById("loadingPercent").innerText = Math.floor(percent)+"%";
                document.getElementById("loadingFill").style.width = percent+"%"; 

            },100);

            //DATA İLE ALMA
            let sifirlama = parseInt(localStorage.getItem("sifirlama")) || 0;
            let dogruSay = parseInt(localStorage.getItem("dogru")) || 0;  
            let yanlisSay = parseInt(localStorage.getItem("yanlis")) || 0;  
            let passPuan = parseInt(localStorage.getItem("passPuan")) || 0;   
            let rank = parseInt(localStorage.getItem("rank")) || 0;
            let costume = parseInt(localStorage.getItem("costume")) || 0;
            let gorev1 = parseInt(localStorage.getItem("gorev_1")) || 0;
            let gorev2 = parseInt(localStorage.getItem("gorev_2")) || 0;
            let gorev3 = parseInt(localStorage.getItem("gorev_3")) || 0;
            let gorev4 = parseInt(localStorage.getItem("gorev_4")) || 0;

            const MAKS_KADEME = 100;  
            const PUAN_PER_KADEME = 2;  
             
           // dogruSay = dogruSay = 0;  
           // yanlisSay = yanlisSay = 0;  
           // passPuan = passPuan = 0;   
           // rank = rank = 0;
           // costume = costume = 0;    
            
            //localStorage.setItem("gorev_1", 0); 
            //localStorage.setItem("gorev_2", 0);
            //localStorage.setItem("gorev_3", 0);
            //localStorage.setItem("gorev_4", 0);
     
            function getSeasonEnd(){
                return new Date(2026, 2, 23, 8, 0, 0);
            } //Yıl, ay, gün, saat, dakika, saniye

            function checkSeasonReset(){
                let now = new Date();
                let seasonEnd = getSeasonEnd();
                let sifirlama = parseInt(localStorage.getItem("sifirlama")) || 0;
                //
                //sifirlama = sifirlama = 0;
                if(now > seasonEnd && sifirlama == 0){

                    // RESET
                    localStorage.setItem("dogru", 0);
                    localStorage.setItem("yanlis", 0);
                    localStorage.setItem("passPuan", 0);
                    localStorage.setItem("rank", 0);
                    localStorage.setItem("costume", 0);
                    
                    
                    //for(let i = 1; i <= 4; i++){
                        //localStorage.setItem("gorev_" + i, 0);
                    //}

                    localStorage.setItem("sifirlama", 1);

                    console.log("SEZON BİTTİ RESET 🔥");
                }
            }
            checkSeasonReset();
            
            
            
            const content = document.getElementById("passContent");  
            
            //KADEMELER
            for(let i=0; i<=MAKS_KADEME; i++){  
                let tier = document.createElement("div");  
                tier.className = "tier";  
                tier.id = "t" + i;  
                tier.innerHTML = `  
                    <div class="reward" id="r${i}" onclick="sound_button()" type="button" data-bs-toggle="modal" data-bs-target="#rewardsModal">  
                    <img src="images/pass/pass_kademe.png" class="reward-img">  
                    <span class="reward-text" onclick="sound_button()">Kademe ${i}</span>  
                    </div>  
                    <div class="level-circle">${i}</div>  
                    `;  
                content.appendChild(tier);  
            }  
            
            //KADEME AYARLARI
            function guncelle() {  
                document.getElementById("dogru").innerText = dogruSay;  
                document.getElementById("yanlis").innerText = yanlisSay;  
            
                let kademe = Math.floor(passPuan / PUAN_PER_KADEME);  
                let kalan = passPuan % PUAN_PER_KADEME;  
                
                //KADEME ÖDÜLLERİ
                for(let i=0, tmm=0; i<=MAKS_KADEME; i++, tmm+=2){
                let circle = document.querySelector("#t"+i+" .level-circle");
                let r = document.getElementById("r" + i);
                let txt = r.querySelector(".reward-text");
                if(i <= kademe && passPuan > 0) {
                    r.classList.add("unlocked");
                    if(i == 0) {
                        txt.innerText = "DEKOR YÜKSELTMESI TOPLANDI!";
                    }
                    else if(i == 10) {
                        txt.innerText = "DEKOR YÜKSELTMESI TOPLANDI!";
                    }
                    else if(i == 30) {
                        txt.innerText = "DEKOR YÜKSELTMESI TOPLANDI!";
                    }
                    else if(i == 60) {
                        txt.innerText = "DEKOR YÜKSELTMESI TOPLANDI!";
                    }
                    else if(i == 100) {
                        txt.innerText = "DEKOR YÜKSELTMESI TOPLANDI!";
                    } else {
                        txt.innerText = tmm + " Puan Tamamlandı!";
                    }
                    
                    circle.classList.add("active");
                    
                } else {
                    r.classList.remove("unlocked");
                    txt.innerText = "Bu kademeyi açmak için " + tmm+ " puan daha gerekli";
                    circle.classList.remove("active");
                    if(tmm == 0) {
                        txt.innerText = "DEKOR YÜKSELTMESI!";
                    }
                    if(tmm == 20) {
                        txt.innerText = "DEKOR YÜKSELTMESI!";
                    }
                    if(tmm == 60) {
                        txt.innerText = "DEKOR YÜKSELTMESI!";
                    }
                    if(tmm == 120) {
                        txt.innerText = "DEKOR YÜKSELTMESI!";
                    }
                    if(tmm == 200) {
                        txt.innerText = "DEKOR YÜKSELTMESI!";
                    }
                }
            }

                //ORTALAMA VE HİZALAMA MANTIĞI
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
                const tag2 = document.getElementById("statusTagPass");  
                let midPoint;  
                if (kademe < MAKS_KADEME) {  
                    midPoint = currentX + (nextT.offsetLeft - currentT.offsetLeft) / 2;  
                } else {  
                    midPoint = currentX;  
                }  
                tag.style.left = midPoint + "px";  
                tag.innerText = kalan + "/2"; 
                tag2.innerText = kalan + "/2"; 
                currentT.scrollIntoView({ behavior: 'smooth', inline: 'center' });  // Odaklanma  

                //GUNCELLEME
                localStorage.setItem("dogru", dogruSay);  
                localStorage.setItem("yanlis", yanlisSay);  
                localStorage.setItem("passPuan", passPuan);  
            }  
            
            //DOGRU VE YANLIS PUANI EKLENMESİ
            function ekle(v) {  
                if(v > 0) {  
                               
                    dogruSay++; 
                    passPuan++;
                    if(passPuan == 1){
                        costume++;
                        changeItem(1);
                        changeItem(2);
                        changeItem(3);
                        changeItem(4);
                        changeItem(5);
                    }
                    if(passPuan == 20){
                        costume++;
                        changeItem(1);
                        changeItem(2);
                        changeItem(3);
                        changeItem(4);
                        changeItem(5);
                    }
                    if(passPuan == 60){
                        costume++;
                        changeItem(1);
                        changeItem(2);
                        changeItem(3);
                        changeItem(4);
                        changeItem(5);
                    }
                    if(passPuan == 120){
                        costume++;
                        changeItem(1);
                        changeItem(2);
                        changeItem(3);
                        changeItem(4);
                        changeItem(5);
                    }
                    if(passPuan == 200){
                        costume++;
                        changeItem(1);
                        changeItem(2);
                        changeItem(3);
                        changeItem(4);
                        changeItem(5);
                    }
                    if(rank >= 0 && rank < 3000){
                        rank+=50;
                        updateRankDisplay();
                    }
                    else if(rank >= 3000){
                        rank+=40;
                        updateRankDisplay();
                    }
                    
                    
                } else {  
                    if(passPuan > 0) { 
                    yanlisSay++;
                    if(rank >= 0 && rank < 3000){
                        rank-=10;
                        updateRankDisplay();
                    }
                    else if(rank >= 3000 && rank < 4500){
                        rank-=20;
                        updateRankDisplay();
                    }
                    else if(rank >= 4500){
                        rank-=25;
                        updateRankDisplay();
                    }
                }  
                }  
                guncelle();  
            }  
            
            window.addEventListener('resize', guncelle);  
            window.onload = guncelle; 
            
            //PASS İÇİN MODAL
            window.onload = guncelle;
            document.getElementById("passModal")
            .addEventListener("shown.bs.modal", function () {
                guncelle();
            });

            
            // ARKAPLAN EFEKTLERİ
            const particleCount = 100;

            for(let i=0;i<particleCount;i++){
                let ash=document.createElement("div");
                ash.className="ash";

                ash.style.left=Math.random()*100+"%";
                ash.style.animationDuration=(6+Math.random()*8)+"s";
                ash.style.animationDelay=Math.random()*5+"s";
                ash.style.opacity=Math.random();

                document.querySelector(".effects").appendChild(ash);
            }

            // RANK SİSTEMİ / RANK SİSTEMİ / RANK SİSTEMİ
            // LocalStorage’dan rank al
            

            // Rank güncelleme fonksiyonu
            function updateRankDisplay() {
                const img = document.getElementById("rankImg");
                const label = document.getElementById("rankLabel");
                const display = document.querySelector(".rank-display");
                const name = document.getElementById("rank_name");
                const body = document.querySelector(".body");

                label.innerText = `${rank}`;

                if(rank < 750){
                    img.src = "https://raw.githubusercontent.com/hbb200009/Pro-Pass/refs/heads/main/bronze.png";
                    img.style.width = "120vw";
                    img.style.marginLeft = "-10%";
                    name.style.marginTop = " -23%";
                    body.style.background = "linear-gradient(to bottom,#f07527,#000000)";
                    name.innerText = "BRONZ";
                    name.style.color = "#f07527";
                } else if(rank >= 750 && rank < 1500){
                    img.src = "https://raw.githubusercontent.com/hbb200009/Pro-Pass/refs/heads/main/silver.png";
                    img.style.width = "120vw";
                    img.style.marginLeft = "0%";
                    name.style.marginTop = " -21%";
                    body.style.background = "linear-gradient(to bottom,#949be3,#000000)";
                    name.innerText = "GÜMÜS";
                    name.style.color = "#949be3";
                } else if(rank >= 1500 && rank < 3000){
                    img.src = "https://raw.githubusercontent.com/hbb200009/Pro-Pass/refs/heads/main/gold.png";
                    img.style.width = "90vw";
                    img.style.marginLeft = "0%";
                    name.style.marginTop = " -7%";
                    body.style.background = "linear-gradient(to bottom,#ffd92e,#000000)";
                    name.innerText = "ALTIN";
                    name.style.color = "#ffd92e";
                } else if(rank >= 3000 && rank < 4500){
                    img.src = "https://raw.githubusercontent.com/hbb200009/Pro-Pass/refs/heads/main/diamond.png";
                    img.style.width = "120vw";
                    img.style.marginLeft = "0%";
                    name.style.marginTop = " -29%";
                    body.style.background = "linear-gradient(to bottom,#008bfa,#000000)";
                    name.innerText = "ELMAS";
                    name.style.color = "#008bfa";
                } else if(rank >= 4500 && rank < 6000){
                    img.src = "https://raw.githubusercontent.com/hbb200009/Pro-Pass/refs/heads/main/mythic.png";
                    img.style.width = "120vw";
                    img.style.marginLeft = "0%";
                    name.style.marginTop = " -23%";
                    body.style.background = "linear-gradient(to bottom,#9114af,#000000)";
                    name.innerText = "GIZEMLI";
                    name.style.color = "#9114aa";
                } else if(rank >= 6000 && rank < 8250){
                    img.src = "https://raw.githubusercontent.com/hbb200009/Pro-Pass/refs/heads/main/legendary.png";
                    img.style.width = "100vw";
                    img.style.marginLeft = "0%";
                    name.style.marginTop = " -15%";
                    body.style.background = "linear-gradient(to bottom,#f80000,#000000)";
                    name.innerText = "EFSANEVI";
                    name.style.color = "#f80000";
                } else {
                    img.src = "https://raw.githubusercontent.com/hbb200009/Pro-Pass/refs/heads/main/legendary.png";
                    img.style.width = "100vw";
                    img.style.marginLeft = "0%";
                    name.style.marginTop = " -15%";
                    body.style.background = "linear-gradient(to bottom,#f80000,#000000)";
                    name.innerText = "EFSANEVI";
                    name.style.color = "#f80000";
                }
                // Bar doluluk ve puan
                const fill = document.getElementById("rankFill");

                let prevThreshold = 0;
                let nextThreshold = 750;

                if(rank >= 750 && rank < 1500){ prevThreshold = 750; nextThreshold = 1500; }
                else if(rank >= 1500 && rank < 3000){ prevThreshold = 1500; nextThreshold = 3000; }
                else if(rank >= 3000 && rank < 4500){ prevThreshold = 3000; nextThreshold = 4500; }
                else if(rank >= 4500 && rank < 6000){ prevThreshold = 4500; nextThreshold = 6000; }
                else if(rank >= 6000 && rank < 8250){ prevThreshold = 6000; nextThreshold = 8250; }
                else if(rank >= 8250){ prevThreshold >= 8250; } // üst limit

                let progressPercent = 0;
                if(nextThreshold > prevThreshold){
                    progressPercent = ((rank - prevThreshold) / (nextThreshold - prevThreshold)) * 100;
                }

                fill.style.width = progressPercent + "%";
                document.getElementById("rankFillText").innerText = rank;


                localStorage.setItem("rank", rank);
            }

            // Rank artırma / azaltma örnek
            function addRank(value){
                rank += value;
                if(rank < 0) rank = 0;
                updateRankDisplay();
            }

            function changeItem(id){

            let img = document.getElementById("itemImage");
            let text = document.getElementById("itemText");

            let c1 = document.getElementById("costume1");
            let c2 = document.getElementById("costume2");
            let c3 = document.getElementById("costume3");
            let c4 = document.getElementById("costume4");
            let c5 = document.getElementById("costume5");
            let c6 = document.getElementById("costume6");
            
            if(id == 1){
                if(costume >= 1){
                    img.src = "https://raw.githubusercontent.com/hbb200009/Pro-Pass/refs/heads/main/level1.png";
                    text.innerText = "";
                    c1.classList.add("reward_button2");
                    c1.classList.remove("reward_button");
                } else if(costume >= 0){
                    img.src = "https://raw.githubusercontent.com/hbb200009/Pro-Pass/refs/heads/main/level1.png";
                    text.innerText = "Daha fazla dekor yükseltmesi topla";
                    c5.classList.add("reward_button");
                    c5.classList.remove("reward_button2");
                } else{
                    img.src = "https://raw.githubusercontent.com/hbb200009/Pro-Pass/refs/heads/main/level1.png";
                    text.innerText = "Daha fazla dekor yükseltmesi topla";
                    c1.classList.add("reward_button");
                    c1.classList.remove("reward_button2");
                }
            
            }

            if(id == 2){
                if(costume >= 2){
                    img.src = "https://raw.githubusercontent.com/hbb200009/Pro-Pass/refs/heads/main/level2.png";
                    text.innerText = "";
                    c2.classList.add("reward_button2");
                    c2.classList.remove("reward_button");
                } else{
                    img.src = "https://raw.githubusercontent.com/hbb200009/Pro-Pass/refs/heads/main/level2.png";
                    text.innerText = "Daha fazla dekor yükseltmesi topla";
                    c2.classList.add("reward_button");
                    c2.classList.remove("reward_button2");
                }
            }

            if(id == 3){
                if(costume >= 3){
                    img.src = "https://raw.githubusercontent.com/hbb200009/Pro-Pass/refs/heads/main/level3.jpg";
                    text.innerText = "";
                    c3.classList.add("reward_button2");
                    c3.classList.remove("reward_button");
                } else{
                    img.src = "https://raw.githubusercontent.com/hbb200009/Pro-Pass/refs/heads/main/level3.jpg";
                    text.innerText = "Daha fazla dekor yükseltmesi topla";
                    c3.classList.add("reward_button");
                    c3.classList.remove("reward_button2");
                }
            }

            if(id == 4){
                if(costume >= 4){
                    img.src = "https://raw.githubusercontent.com/hbb200009/Pro-Pass/refs/heads/main/level4.png";
                    text.innerText = "";
                    c4.classList.add("reward_button2");
                    c4.classList.remove("reward_button");
                } else{
                    img.src = "https://raw.githubusercontent.com/hbb200009/Pro-Pass/refs/heads/main/level4.png";
                    text.innerText = "Daha fazla dekor yükseltmesi topla";
                    c4.classList.add("reward_button");
                    c4.classList.remove("reward_button2");
                }
            }

            if(id >= 5){
                if(costume >= 5){
                    img.src = "https://raw.githubusercontent.com/hbb200009/Pro-Pass/refs/heads/main/level5.jpg";
                    text.innerText = "";
                    c5.classList.add("reward_button2");
                    c5.classList.remove("reward_button");
                }  else{
                    img.src = "https://raw.githubusercontent.com/hbb200009/Pro-Pass/refs/heads/main/level5.jpg";
                    text.innerText = "Daha fazla dekor yükseltmesi topla";
                    c5.classList.add("reward_button");
                    c5.classList.remove("reward_button2");
                }
            }

            if(id == 6){
                if(costume >= 0){
                    img.src = "images/pass/legendary.png";
                    text.innerText = "";
                    c6.classList.add("reward_button2");
                    c6.classList.remove("reward_button");
                } else{
                    img.src = "images/pass/legendary.png";
                    text.innerText = "Daha fazla dekor yükseltmesi topla";
                    c6.classList.add("reward_button");
                    c6.classList.remove("reward_button2");
                }
            }
            //const yazi = document.getElementById("sayac");
            //yazi.innerText = costume; 
            localStorage.setItem("costume", costume);
            }
             
            changeItem(5);
            changeItem(4);
            changeItem(3);
            changeItem(2);
            changeItem(1);

            //SEZON SONUNA KALAN SÜRE
            function getNextSeasonEnd(){
                let now = new Date();
                let next = new Date();
                let day = now.getDay(); 
                // 0 pazar 1 pazartesi
                let daysUntilMonday = (8 - day) % 7;
                next.setDate(now.getDate() + daysUntilMonday);
                next.setHours(8,0,0,0);
                // eğer pazartesi ama saat 08 geçmişse
                if(day === 1 && now.getHours() >= 8){
                    next.setDate(next.getDate() + 7);
                }
            return next;
            }
            function updateSeasonTimer(){
                let end = getNextSeasonEnd();
                let now = new Date();
                let diff = end - now;
                let days = Math.floor(diff / (1000*60*60*24));
                let hours = Math.floor((diff / (1000*60*60)) % 24);
                let minutes = Math.floor((diff / (1000*60)) % 60);
                let seconds = Math.floor((diff / 1000) % 60);
                document.getElementById("seasonTimer").innerText =`${days}g ${hours}sa ${minutes}d ${seconds}sn`;
            }
            
            
            //PRESTİJLER
            function updateGorevler(){
                let gorevler = document.querySelectorAll(".gorev");

                gorevler.forEach(g => {
                let id = g.dataset.id;

                let progress = parseInt(localStorage.getItem("gorev_" + id)) || 0;
                let max = 4;

                let fill = g.querySelector(".fill");
                let text = g.querySelector("span");

                fill.style.width = (progress / max) * 100 + "%";
                text.innerText = progress + "/" + max;

                if(progress >= max){
                    fill.style.background = "linear-gradient(to top,#ee7527,#da5c43)";
                }
                });
            }

            function gorevArttir(id){
                let key = "gorev_" + id;
                let progress = parseInt(localStorage.getItem(key)) || 0;

                if(progress < 4){
                    progress++;
                    localStorage.setItem(key, progress);
                }

                updateGorevler();
            }

            updateGorevler();

            //SES AYARLARI / SESLER / SES AYARLARI / SESLER / SES AYARLARI / SESLER
            const music = document.getElementById('sound-bg');
            function toggleMusic() {
                if (music.paused) {
                    music.play();
                } else {
                    music.pause();
                }
            }
            function sound_button(){
                const sound = document.getElementById("sound-button");
                sound.currentTime = 0; 
                sound.play();
            }
            function sound_play(){
                const sound = document.getElementById("sound-play"); 
                sound.play();
            }
            function sound_level3(){
                const level3 = document.getElementById("sound-level3"); 
                if (level3.paused) {
                    level3.play();
                } else {
                    level3.pause();
                }
            }
            window.addEventListener("load", () => {
                const sound = document.getElementById("sound-load");
                const opening = document.getElementById("sound-bg");
                //sound.play();
                setTimeout(function(){
                   // opening.play();
                },1999);
            });
            
            function opening(){
                const opening = document.getElementById("sound-bg");
                opening.play();
            }


            // İlk yükleme
            updateRankDisplay();
            setInterval(updateSeasonTimer,1000);
            updateSeasonTimer();
