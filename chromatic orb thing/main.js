const spellLevel = document.getElementById("spellLevel");
const damageType = document.getElementById("damageType");
const attackBonus = document.getElementById("attackBonus");
const innateSorcery = document.getElementById("innateSorcery");
const elvenAccuracy = document.getElementById("elvenAccuracy");
const wildMagic = document.getElementById("wildMagic");
const wildMagicButton = document.getElementById("wildMagicButton");
const wildMagicAmount = document.getElementById("wildMagicAmount");
const wildMagicResults = document.getElementById("wildMagicResults");
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
function getWildMagicEffect() {
    const roll = rollDie(100);

    let effect = "";

    if (roll <= 4) {
        effect = "Roll on this table at the start of each of your turns for the next minute, ignoring this result on subsequent rolls.";
    }
    else if (roll <= 8) {
        effect = "A Friendly creature appears in a random unoccupied space within 60 feet of you and disappears 1 minute later.";
    }
    else if (roll <= 12) {
        effect = "For the next minute, you regain 5 Hit Points at the start of each of your turns.";
    }
    else if (roll <= 16) {
        effect = "Creatures have Disadvantage on saving throws against the next spell you cast in the next minute that involves a saving throw.";
    }
    else if (roll <= 20) {
        effect = "You are subjected to a random effect that lasts for 1 minute. Roll 1d8.";
    }
    else if (roll <= 24) {
        effect = "For the next minute, all your spells with a casting time of an action have a casting time of a Bonus Action.";
    }
    else if (roll <= 28) {
        effect = "You are transported to the Astral Plane until the end of your next turn.";
    }
    else if (roll <= 32) {
        effect = "The next time you cast a spell that deals damage within the next minute, use the highest number possible for each damage die.";
    }
    else if (roll <= 36) {
        effect = "You have Resistance to all damage for the next minute.";
    }
    else if (roll <= 40) {
        effect = "You turn into a potted plant until the start of your next turn.";
    }
    else if (roll <= 44) {
        effect = "For the next minute, you can teleport up to 20 feet as a Bonus Action on each of your turns.";
    }
    else if (roll <= 48) {
        effect = "You and up to three creatures you choose within 30 feet of you have the Invisible condition for 1 minute.";
    }
    else if (roll <= 52) {
        effect = "A spectral shield hovers near you for the next minute, granting you a +2 bonus to AC and immunity to Magic Missile.";
    }
    else if (roll <= 56) {
        effect = "You can take one extra action on this turn.";
    }
    else if (roll <= 60) {
        effect = "You cast a random spell. If the spell normally requires Concentration, it doesn't require Concentration in this case.";
    }
    else if (roll <= 64) {
        effect = "For the next minute, any flammable, nonmagical object you touch that isn't being worn or carried by another creature bursts into flame.";
    }
    else if (roll <= 68) {
        effect = "If you die within the next hour, you immediately revive as if by the Reincarnate spell.";
    }
    else if (roll <= 72) {
        effect = "You have the Frightened condition until the end of your next turn.";
    }
    else if (roll <= 76) {
        effect = "You teleport up to 60 feet to an unoccupied space you can see.";
    }
    else if (roll <= 80) {
        effect = "A random creature within 60 feet of you has the Poisoned condition for 1d4 hours.";
    }
    else if (roll <= 84) {
        effect = "You radiate Bright Light in a 30-foot radius for the next minute.";
    }
    else if (roll <= 88) {
        effect = "Up to three creatures you can see within 30 feet take 1d10 Necrotic damage. You regain Hit Points equal to the damage dealt.";
    }
    else if (roll <= 92) {
        effect = "Up to three creatures you can see within 30 feet take 4d10 Lightning damage.";
    }
    else if (roll <= 96) {
        effect = "You and all creatures within 30 feet have Vulnerability to Piercing damage for the next minute.";
    }
    else {
        effect = "Roll 1d6 for the additional effect.";
    }

    return {
        roll: roll,
        effect: effect
    };
}

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

    if (innateSorcery.checked && elvenAccuracy.checked) {
        const secondRoll = rollDie(20);
        const thirdRoll = rollDie(20);

        return {
            rolls: [firstRoll, secondRoll, thirdRoll],
            chosen: Math.max(firstRoll, secondRoll, thirdRoll)
        };
    }

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

    //enemy count logic
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

    // Wild Magic roll
    let wildMagicRoll = null;
	let wildMagicSurge = false;
	let wildMagicEffect = null;

	if (wildMagic.checked) {
    wildMagicRoll = rollDie(20);
    wildMagicSurge = wildMagicRoll === 20;

		if (wildMagicSurge) {
        wildMagicEffect = getWildMagicEffect();
		}
	}

    const numberOfTargets = Math.min(maxTargets, enemies.length);
    const hitResults = [];
    let totalDamage = 0;
    let currentTarget = 0;

    for (let i = 0; i < numberOfTargets; i++) {
        const enemy = enemies[currentTarget];
        const attack = makeAttack();

        const isNatural20 = attack.chosen === 20;
        const isNatural1 = attack.chosen === 1;

        const hit = isNatural20 ||
            (!isNatural1 &&
            attack.chosen + Number(attackBonus.value) >= enemy.ac);

        // Double damage dice on a critical hit
        const damageDiceCount = isNatural20
            ? d8Count * 2
            : d8Count;

        const damageRolls = hit
            ? rollD8(damageDiceCount)
            : [];

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

        // bounce logic
        if (!hit || !hasMatchingD8(damageRolls)) {
            break;
        }

        currentTarget++;

        if (currentTarget >= enemies.length) {
            break;
        }
    }

    displayResults(
		hitResults,
		d8Count,
		maxTargets,
		totalDamage,
		wildMagicRoll,
		wildMagicSurge,
		wildMagicEffect
	);
}

function displayResults(hitResults,d8Count,maxTargets,totalDamage,wildMagicRoll,wildMagicSurge,wildMagicEffect) {
    results.classList.remove("hidden");

    document.getElementById("diceSummary").textContent = `${d8Count}d8`;
    document.getElementById("targetSummary").textContent = maxTargets;
    document.getElementById("totalDamage").textContent = totalDamage;

    rollResults.innerHTML = "";
	if (wildMagicRoll !== null) {
    const wildMagicCard = document.createElement("div");
    wildMagicCard.className = "roll-card";

    if (wildMagicSurge) 
		{
        wildMagicCard.innerHTML = `
            <div class="roll-top">
                <h3>Wild Magic</h3>
                <span class="badge hit">SURGE</span>
            </div>

            <div class="roll-line">
                Wild Magic D20:
                <span class="d20">${wildMagicRoll}</span>
            </div>

            <div class="roll-line">
                Effect Roll: <span class="damage">${wildMagicEffect.roll}</span>
            </div>

            <div class="roll-line">
                ${wildMagicEffect.effect}
            </div>
        `;
		} 
	else {
        wildMagicCard.innerHTML = `
            <div class="roll-top">
                <h3>Wild Magic</h3>
                <span class="badge miss">NO SURGE</span>
            </div>

            <div class="roll-line">
                Wild Magic D20:
                <span class="d20">${wildMagicRoll}</span>
            </div>
        `;
    }

    rollResults.appendChild(wildMagicCard);
}
	
	
    hitResults.forEach((result, index) => {
        const card = document.createElement("div");
        card.className = `roll-card ${result.hit ? "hit" : "miss"}`;

        const rollText = result.attack.rolls.length > 1
		? `${result.attack.rolls.join(" / ")} → ${result.attack.chosen}`
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

//wild magic sidebar
wildMagicButton.addEventListener("click", function() {

    const amount = Number(wildMagicAmount.value);

    wildMagicResults.innerHTML = "";

    for (let i = 0; i < amount; i++) {

        const result = getWildMagicEffect();

        const resultCard = document.createElement("div");
        resultCard.className = "wild-magic-result";

        resultCard.innerHTML = `
            <div class="wild-magic-roll">
                Roll: ${String(result.roll).padStart(2, "0")}
            </div>

            <div class="wild-magic-effect">
                ${result.effect}
            </div>
        `;

        wildMagicResults.appendChild(resultCard);
    }
});
