let xp = 0;
let health = 100;
let gold = 100;
let mana= 50;
let currentWeapon = 0;
let currentSpell = 0;
let fighting;
let monsterHealth;
let inventory = ["palo"];
let key = 0;
let open = 0;

const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const manaText = document.querySelector("#manaText");
const placeText = document.querySelector("#placeText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'palo',      power: 5 },
  { name: 'daga',      power: 30 },
  { name: 'martillo',  power: 50 },
  { name: 'espada',    power: 70 }
];
const spells=[
  { name: 'viento frio ༄',         power: 10},
  { name: 'veneno ♨',              power: 50},
  { name: 'escarcha congelante ❄', power: 80 },
  { name: 'fuego demoniaco',     power: 130 }
];
const monsters = [
  {
    name: "Serpiente",
    level: 15,
    health: 15
  },
  {
    name: "Hombre Lobo",
    level: 50,
    health: 60
  },
  {
    name: "Guerrero Mayor",
    level: 200,
    health: 300
  },
  {
    name: "Rey demonio",
    level: 150,
    health: 170
  },
  {
    name: "Dragon",
    level: 380,
    health: 500
  }
]

const locations = [
  {
    name: "ciudad", /*0*/
    "button text": ["⟰ Ir a la Tienda ", "◮ Ir a la cueva", "🃤 Ir a entrenar","♘ Ir al mercado","➷ Pelear contra el dragon"],
    "button functions": [goUno, goDos, goTres,  goCuatro, fightDragon],
    text: "Estas en la ciudad"
  },
  {
    name: "tienda",  /*1*/
    "button text": ["䷬ Ir a la ciudad ䷬", "+10 vida (10 oro) ❤", "+ 1 arma (10, 60, 100, 140 oro) 𒉔","+ 10 mana (5 oro) ㊅","+ 1 llave (40 oro) ⥉"],
    "button functions": [goCasa, buyHealth, buyWeapon, buyMana, buyKey],
    text: "Estas en la tienda"
  },
  {
    name: "cueva",  /*2*/
    "button text": ["䷬ Ir a la ciudad ䷬", "𓆘𓆘𓆘 Serpiente (daño:15 vida:15)", "➷ Golpear roca","𓃥𓃥𓃥 Hombre Lobo (daño:80 vida:60)","𓄃𓄃𓄃 Rey Demonio (daño:150  vida:170)"],
    "button functions":[goCasa, fightSnake, fightStone,  fightWolf, fightDemonKing],
    text: "Estas en la cueva"
  },
  {
    name: "entrenar",  /*3*/
    "button text": ["䷬ Ir a la ciudad ䷬", "𓀠𓀠𓀠 Entrenamiento Fisico (Ganas xp y mana, pero pierdes vida)", "≋ Mejorar hechizos (requiere 40 de xp )","𓀺𓀺𓀺 Meditar (Ganas vida pero pierdes mana)","➷ Guerrero supremo daño: 300 vida: 200"],
    "button functions": [goCasa, train, boostSpell,  meditation, fightWarrior],
    text: "Estas en la sala de entrenamiento"
  },
  {
    name: "mercado",  /*4*/
    "button text": ["䷬ Ir a la ciudad", "㊅ +10 mana (5 oro)", " ☢ Robar (si te atrapan podrian golpearte)","▤ Abrir tesoro","Prostituirse (⩾﹏⩽)"],
    "button functions": [goCasa, buyMana, steal,  treasure, prostitution],
    text: "Estas en el mercado"
  },
  {
    name: "pelear",  /*5*/
    "button text": ["䷬ Escapar", "𒉔 Atacar", "⤸ Esquivar","♨ Lanzar poder","⌧ Cubrirse"],
    "button functions": [goDos, attack, dodge,  spanSpell, dodge],
    text: "Estas en combate"
  },
  {
    name: "lose",  /*6*/
    "button text": ["Reiniciar ►", "Reiniciar ►", "Reiniciar ►","Reiniciar ►","Reiniciar ►"],
    "button functions": [restart , restart, restart, restart, restart],
    text: " (╥﹏╥) Yo sabia que no podias, anda a estudiar noma burro. ☠☠☠"
  },
  {
    name: "ganaste", /*7*/
    "button text": ["Reiniciar", "Reiniciar", "Reiniciar","Reiniciar","Reiniciar"],
    "button functions": [restart, restart, restart, restart, restart],
    text: "Ganaste... pero solo fue suerte "
  },
  {
    name: "Matar mounstruo", /*8*/
    "button text": ["IR A CIUDAD", "Vs Serpiente (daño:2 vida:15)", "Cofre Magico","Vs Hombre Lobo (daño:50 vida:60)","Vs Rey Demonio (daño:150  vida:300)"],
    "button functions": [goCasa, fightSnake, treasure,  fightWolf, fightDemonKing],
    text: "Mataste a tu oponente, gans experiencia y oro"
  }
  
];

// initialize buttons
button1.onclick = goUno;
button2.onclick = goDos;
button3.onclick = goTres;
button4.onclick = goCuatro;
button5.onclick = goCinco;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button4.innerText = location["button text"][3];
  button5.innerText = location["button text"][4];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  button4.onclick = location["button functions"][3];
  button5.onclick = location["button functions"][4];
  text.innerHTML = location.text;
}

function goCasa() {
  
  update(locations[0]);
}
function goUno() {
  update(locations[1]);
}
function goDos() {
  update(locations[2]);
}
function goTres() {
  update(locations[3]);
}
function goCuatro() {
  update(locations[4]);
}
function goCinco() {
  update(locations[5]);
}
function buyHealth(){
  if(gold>=10){
    gold-=10;
    health+=10;
    healthText.innerText=health;
    goldText.innerText=gold;
    text.innerText="ganas 10 de vida";
  }else{
    text.innerText="anda a chambear misio de mierda";
  }
}
function buyWeapon(){
 if(currentWeapon<weapons.length-1){
   
   if(gold>=30){
      gold-=2*weapons[currentWeapon].power;
      currentWeapon++;
      let newWeapon=weapons[currentWeapon].name;
      inventory.push(newWeapon);
      text.innerText="Compraste una "+newWeapon+" con un daño de "+weapons[currentWeapon].power+" tu inventario es: "+inventory;
      goldText.innerText=gold;
    }else{
      text.innerText="vaya a cambear misio y la rcsm";
  }
 }else{
    text.innerText="Ya no hay armas por mejorar"
 }
}

function buyMana(){
  if(gold>=5){
    mana+=10;
  gold-=5;
  manaText.innerText=mana;
  goldText.innerText=gold;
    text.innerText="Ganas 10 de mana";
  }else{
    text.innerText="no hay mana para los pobres";
  }
}

function buyKey(){
 if(gold>=40){
    gold-=40;
    key++;  
    text.innerText="Obtuviste la llave, parece abrir un tesoro..."
   goldText.innerText=gold;
 }else{
   text.innerText="Ahora te doy la llave, pero en el culo... te falta oro";
 }
}

function treasure(){
  if(open<1){
     if (key>0){
        key--;
        open++;
        health+=120;
        gold+=15;
        mana+=80;
        manaText.innerText=mana;
        goldText.innerText=gold;
        healthText.innerText=health;
        text.innerText="+120 de vida + 15 de oro +80 de mana";
     }else{
        text.innerText="Ya recolectaste el contenido de este cofre";
     }
  }else{
    text.innerText="Ya recolectaste el contenido de este cofre"
  }
  
}

function fightSnake(){
  fighting=0;
  goFight();
}

function fightStone(){
  health-=0;
  text.innerText="-1 de vida, no seas burro como te vas a pelear con una piedra";
}


function fightWolf(){
  fighting=1;
  goFight();
}

function fightDemonKing(){
  fighting=3;
  goFight();
}

function fightWarrior(){
  fighting=2;
  goFight();
}

function fightDragon(){
  fighting=4;
  goFight();
}

function train(){
  xp+=0.5;
  mana+=0.5;
  health--;
  manaText.innerText=mana;
  xpText.innerText=xp;
  healthText.innerText=health;
  text.innerText="Ganas 0.5 de mana y xp, pero pierdes 1 de vida";
}

function meditation(){
  health+=2;
  mana-=0.5;
  healthText.innerText=health;
  manaText.innerText=mana;
  text.innerText="Ganas 2 de vida pero pierdes 0.5 de mana";
}

function steal(){
  if(health>20){
    if(Math.random()>.45){
       let ganancia=Math.floor(Math.random()*100);
       gold+=ganancia;
       goldText.innerText=gold;
       text.innerText="Eres todo un politico, robo exitoso, robaste: "+ganancia+" de oro";
     }else{
       health=1;
       healthText.innerText=health;
       text.innerText="Realmente eres un burro, tienes suerte de estar vivo";
     }
  }else{
    text.innerText="Como chucha quieres robar con tan poca vida? anda a prostituirte noma";
  }
}

function prostitution(){
 if(health>=1){ 
  num=Math.random();
  health--;
  healthText.innerText=health;
  if(num<0.06){
    text.innerText="Oh me vengooo (+50 de oro, -1 de vida)";
    gold+=10;
    goldText.innerText=gold;
  }else if(num<0.3){
    text.innerText="ves que si se pudo? ya vas entendiendo la puta vibra wey (+2 de oro, -1 de vida)";
    gold+=2;
    goldText.innerText=gold;
  }else if(num<0.75){
    text.innerText="Si tirar fuera un deporte, tu serias una persona invalida (+1 de oro, -1 de vida)";
    gold++;
    goldText.innerText=gold;
  }else if(num<0.95){
    text.innerText="Hasta para tirar hay que tener vocacion, pesimo servicio (+1 de oro, -1 de vida)";
    gold++;
    goldText.innerText=gold;
  }
 }else{
   lose();
 }
}

function boostSpell(){
  if(currentSpell<3){
    if(xp>=40){
       xp-=40;
       currentSpell++;
       text.innerText="Has mejorado "+spells[currentSpell].name;
       xpText.innerText=xp;
    }else{
       text.innerText="Eres chibolo todavia, anda a ganar xp burro";
    }  
  }else{ text.innerText="Has alcanzado el poder supremo";
  }
}

function goFight(){
  update (locations[5]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterHealthText.innerText = monsterHealth;
  monsterName.innerText = monsters[fighting].name;
}

function attack(){
  text.innerText="Atacaste con "+ weapons[currentWeapon].name+" hiciste "+weapons[currentWeapon].power+" de daño";
  health-=monsters[fighting].level;
  if(health<=0){
  lose();
  }
  monsterHealth-=weapons[currentWeapon].power;
  monsterHealthText.innerText=monsterHealth;
  healthText.innerText=health;
  if(monsterHealth<=0){
    if(fighting==4){
      win();
  }else{
    defeatMonster()
}
}
}

function dodge(){
  text.innerText="Es imbecil de tu adversario no te pudo meter puñete";
}
function spanSpell(){
   if (mana>=40){ 
      monsterHealth-=spells[currentSpell].power;
      monsterHealthText.innerText=monsterHealth;
      text.innerText="Lanzaste "+spells[currentSpell].name+" haces "+spells[currentSpell].power+" de daño";
      mana-=spells[currentSpell].power;
      manaText.innerText=mana;
      if(monsterHealth<=0){
         if(fighting==4){
            win();
         }else{
         defeatMonster()
         }
      }
   }else{
      text.innerText="no tienes mana burro";
   }
   }

function restart(){
 xp = 0;
 health = 100;
 gold = 100;
 mana= 50;
 currentWeapon = 0;
 inventory = ["palo"];
 key = 0;
  update(locations[0]);
  xpText.innerText=xp;
  goldText.innerText=gold;
  healthText.innerText=health;
  manaText.innerText=mana;
}
  
  function win(){
    text.innerText="Felicidades reconchatumadre ganaste"
    update(locations[7]);
  }
  
   function lose(){
    text.innerText="Ya sabia que no podias ganar, anda a aestudiar noma"
    update(locations[6]);
  }
  
   function defeatMonster(){
     gold+=monsters[fighting].level*2;
     xp+=monsters[fighting].level/10;
     goldText.innerText=gold;
     xpText.innerText=xp;
     update(locations[8])
   }