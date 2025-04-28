const mansZimejums = document.getElementById("mansZimejums");
const ctx = mansZimejums.getContext("2d");

let bowl_x = 0;
let bowl_y = 0;
const bowlWidth = 50;
const bowlHeight = 50;

let kuka_x = 0;
let kuka_y = 0;
const kukaWidth = 20;
const kukaHeight = 20;

let punktuSkaits = 0;
// izveido mainīgo, laika skaitīšanai
let taimeris = 30;
let apturSpeli;

const bowlAtt = new Image();
bowlAtt.src = "bowl.png";

const kukaAtt = new Image();
kukaAtt.src = "kuka.png";

// izveido funkciju divu zīmējumu saskarei, divi attēlu mainīgie ar x un y
function atteluSaskare(x1, y1, bowlWidth, bowlHeight, x2, y2, kukaWidth, kukaHeight) {
    // pārāk tālu uz sāniem viens objekts no otra
    if (x1 >= x2 + kukaWidth || x1 + bowlWidth <= x2) return false;
    // pārāk zemu vai augstu viens objekts no otra, nesaskaras 
    if (y1 >= y2 + kukaHeight || y1 + bowlHeight <= y2) return false;
    //   ja neizpildās iepriekšminētie nosacījumi nav patiesi,tad
    return true;
}

function MyKeyDownHandler(MyEvent) {
    if (MyEvent.keyCode == 37 && bowl_x > 0) {
        bowl_x = bowl_x - 10;
    }
    if (MyEvent.keyCode == 39 && bowl_x + bowlWidth < mansZimejums.width) {
        bowl_x = bowl_x + 10;
    }
}

addEventListener("keydown", MyKeyDownHandler);

function Laukums() {
    // notīra zīmēšanas laukumu
    ctx.clearRect(0, 0, mansZimejums.width, mansZimejums.height);
    // tūlīt pēc canvas notīrīšanas ievieto score uzrakstu ar stilu
    ctx.fillStyle = "green";
    ctx.font = "15px Arial";
    ctx.fillText("Punktu skaits: " + punktuSkaits, 0, 20);
    // ievieto taimera uzrakstu ar tādu pašu stilu kā punktu skaita uzrakstu tikai citām y koordinātām, izmantojot metodi, kas palīdzēs mainīt laiku.

    ctx.fillText("Laiks: " + Math.round(taimeris), 0, 45);
    // uzraksts, kas parādīsies, kad laiks būs beidzies
    if (taimeris <= 0) {
        ctx.fillStyle = "red";
        ctx.font = "bold 40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Spēles beigas", mansZimejums.width / 2, mansZimejums.height / 2);
        ctx.textAlign = "left";
        // aptur spēli
        clearInterval(apturSpeli);
        return;
    }

    taimeris -= 1 / 40;

    bowl_y = mansZimejums.height - bowlHeight;

    ctx.drawImage(bowlAtt, bowl_x, bowl_y, bowlWidth, bowlHeight);

kuka_y = kuka_y + 3;
    if (kuka_y > mansZimejums.height) {
        kuka_y = 0;

        kuka_x = Math.random() * (mansZimejums.width - kukaWidth);
    }
    ctx.drawImage(kukaAtt, kuka_x, kuka_y, kukaWidth, kukaHeight);
    // attēlu sadursmes pārbaude
    if (atteluSaskare(bowl_x, bowl_y, bowlWidth, bowlHeight, kuka_x, kuka_y, kukaWidth, kukaHeight)) {
        punktuSkaits++;
        kuka_x = -kukaWidth;
        kuka_y = 0;
    }
}
apturSpeli = setInterval(Laukums, 25);
