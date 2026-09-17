const spellLevel = document.getElementById("spellLevel");
const damageType = document.getElementById("damageType");
const attackBonus = document.getElementById("attackBonus");
const innateSorcery = document.getElementById("innateSorcery");
const enemyList = document.getElementById("enemyList");
const addEnemy = document.getElementById("addEnemy");
const rollButton = document.getElementById("rollButton");
const results = document.getElementById("results");
const rollResults = document.getElementById("rollResults");

let enemyNumber = 0;

// Add an enemy row to the page.
function addEnemyRow() {
    enemyNumber++;

    const enemy = document.createElement("div");
    enemy.className = "enemy";

    enemy.innerHTML = `
        <input type="text" class="enemy-name" value="Enemy ${enemyNumber}">
        <input type="number" class="enemy-ac" value="15" min="1">
        <button class="remove" title="Remove enemy">×</button>
    `;

    enemy.querySelector(".remove").addEventListener("click", function () {
        if (enemyList.children.length > 1) {
            enemy.remove();
        }
    });

    enemyList.appendChild(enemy);
}

addEnemy.addEventListener("click", addEnemyRow);

// Start with three enemies.
addEnemyRow();
addEnemyRow();
addEnemyRow();

function rollDie(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function rollD8(numberOfDice) {
    const rolls = [];

    for (let i = 0; i < numberOfDice; i++) {
        rolls.push(rollDie(8));
    }

    return rolls;
}

function hasMatchingD8(rolls) {
    const seen = {};

    for (const roll of rolls) {
        if (seen[roll]) {
            return true;
        }

        seen[roll] = true;
    }

    return false;
}

function makeAttack() {
    const firstRoll = rollDie(20);

    if (innateSorcery.checked) {
        const secondRoll = rollDie(20);

        return {
            rolls: [firstRoll, secondRoll],
            chosen: Math.max(firstRoll, secondRoll)
        };
    }

    return {
        rolls: [firstRoll],
        chosen: firstRoll
    };
}

function rollChromaticOrb() {
    const level = Number(spellLevel.value);
    const d8Count = 3 + (level - 1);

    // The 2024 rules allow a maximum number of leaps equal to the slot level.
    // That means the initial target plus the possible leaps gives level + 1 targets.
    const maxTargets = level + 1;

    const enemyRows = [...document.querySelectorAll(".enemy")];

    if (enemyRows.length === 0) {
        return;
    }

    const enemies = enemyRows.map(row => {
        return {
            name: row.querySelector(".enemy-name").value || "Enemy",
            ac: Number(row.querySelector(".enemy-ac").value)
        };
    });

    const numberOfTargets = Math.min(maxTargets, enemies.length);
    const hitResults = [];
    let totalDamage = 0;
    let currentTarget = 0;

    for (let i = 0; i < numberOfTargets; i++) {
        const enemy = enemies[currentTarget];
        const attack = makeAttack();

        const isNatural20 = attack.chosen === 20;
        const isNatural1 = attack.chosen === 1;
        const hit = isNatural20 || (!isNatural1 && attack.chosen + Number(attackBonus.value) >= enemy.ac);
        const damageDiceCount = isNatural20 ? d8Count * 2 : d8Count;
   	 	const damageRolls = hit ? rollD8(damageDiceCount) : [];
        const damage = hit
            ? damageRolls.reduce((sum, value) => sum + value, 0)
            : 0;

        if (hit) {
            totalDamage += damage;
        }

        hitResults.push({
            enemy,
            attack,
            hit,
            damageRolls,
            damage,
            isNatural20
        });

        // The orb can only leap when two or more damage dice match.
        // A miss ends the chain because there is no damage roll to trigger a leap.
        if (!hit || !hasMatchingD8(damageRolls)) {
            break;
        }

        currentTarget++;

        if (currentTarget >= enemies.length) {
            break;
        }
    }

    displayResults(hitResults, d8Count, maxTargets, totalDamage);
}

function displayResults(hitResults, d8Count, maxTargets, totalDamage) {
    results.classList.remove("hidden");

    document.getElementById("diceSummary").textContent = `${d8Count}d8`;
    document.getElementById("targetSummary").textContent = maxTargets;
    document.getElementById("totalDamage").textContent = totalDamage;

    rollResults.innerHTML = "";

    hitResults.forEach((result, index) => {
        const card = document.createElement("div");
        card.className = `roll-card ${result.hit ? "hit" : "miss"}`;

        const rollText = result.attack.rolls.length === 2
            ? `${result.attack.rolls[0]} / ${result.attack.rolls[1]} → ${result.attack.chosen}`
            : `${result.attack.chosen}`;

        let damageText = "";

        if (result.hit) {
            damageText = `
                <div class="roll-line">
                    Damage: <span class="damage">${result.damageRolls.join(" + ")} = ${result.damage}
                    ${damageType.value}</span>
                </div>
            `;
        } else {
            damageText = `<div class="roll-line">No damage dealt.</div>`;
        }

        let jumpText = "";

        if (result.hit && hasMatchingD8(result.damageRolls) && index < hitResults.length - 1) {
            jumpText = `<div class="jump">⚡ Matching d8s! The orb leaps to the next target.</div>`;
        }

        card.innerHTML = `
            <div class="roll-top">
                <h3>${result.enemy.name}</h3>
                <span class="badge ${result.hit ? "hit" : "miss"}">
                    ${result.hit ? "HIT" : "MISS"}
                </span>
            </div>

            <div class="roll-line">
                D20:
                <span class="d20">${rollText}</span>
                + ${attackBonus.value}
                vs AC ${result.enemy.ac}
            </div>

            ${damageText}
            ${jumpText}
        `;

        rollResults.appendChild(card);
    });

    results.scrollIntoView({ behavior: "smooth", block: "start" });
}

rollButton.addEventListener("click", rollChromaticOrb);
