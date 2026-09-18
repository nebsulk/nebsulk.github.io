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
        <input type="number" class="enemy-ac" value="1" min="1">
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
        const creatureRoll = rollDie(4);

        let creature = "";

        if (creatureRoll === 1) {
            creature = "Modron Duodrone";
        }
        else if (creatureRoll === 2) {
            creature = "Flumph";
        }
        else if (creatureRoll === 3) {
            creature = "Modron Monodrone";
        }
        else {
            creature = "Unicorn";
        }

        effect = `A creature that is Friendly toward you appears in a random unoccupied space within 60 feet of you. The creature is under the DM’s control and disappears 1 minute later. Roll 1d4 to determine the creature: on a 1, a Modron Duodrone appears; on a 2, a Flumph appears; on a 3, a Modron Monodrone appears; on a 4, a Unicorn appears. See the Monster Manual for the creature’s stat block." Roll 1d4: ${creatureRoll} — ${creature}.`;
    }
    else if (roll <= 12) {
        effect = "For the next minute, you regain 5 Hit Points at the start of each of your turns.";
    }
    else if (roll <= 16) {
        effect = "Creatures have Disadvantage on saving throws against the next spell you cast in the next minute that involves a saving throw.";
    }
    else if (roll <= 20) {
        const effectRoll = rollDie(8);

        let effectResult = "";

        if (effectRoll === 1) {
            effectResult = "You are surrounded by faint, ethereal music.";
        }
        else if (effectRoll === 2) {
            effectResult = "Your size increases by one size category.";
        }
        else if (effectRoll === 3) {
            effectResult = "You grow a long beard made of feathers.";
        }
        else if (effectRoll === 4) {
            effectResult = "You must shout when you speak.";
        }
        else if (effectRoll === 5) {
            effectResult = "Illusory butterflies flutter around you.";
        }
        else if (effectRoll === 6) {
            effectResult = "An eye appears on your forehead, granting Advantage on Wisdom (Perception) checks.";
        }
        else if (effectRoll === 7) {
            effectResult = "Pink bubbles float out of your mouth whenever you speak.";
        }
        else {
            effectResult = "Your skin turns a vibrant shade of blue.";
        }

        effect = `You are subjected to an effect that lasts for 1 minute unless its description says otherwise. Roll 1d8 to determine the effect: on a 1, you’re surrounded by faint, ethereal music only you and creatures within 5 feet of you can hear; on a 2, your size increases by one size category; on a 3, you grow a long beard made of feathers that remains until you sneeze, at which point the feathers explode from your face and vanish; on a 4, you must shout when you speak; on a 5, illusory butterflies flutter in the air within 10 feet of you; on a 6, an eye appears on your forehead, granting you Advantage on Wisdom (Perception) checks; on an 7, pink bubbles float out of your mouth whenever you speak; on an 8, your skin turns a vibrant shade of blue for 24 hours or until the effect is ended by a Remove Curse spell." Roll 1d8: ${effectRoll} — ${effectResult}`;
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
    const spellRoll = rollDie(10);

    let spell;

    if (spellRoll === 1) {
        spell = "Confusion";
    }
    else if (spellRoll === 2) {
        spell = "Fireball";
    }
    else if (spellRoll === 3) {
        spell = "Fog Cloud";
    }
    else if (spellRoll === 4) {
        spell = "Fly (cast on a random creature within 60 feet of you)";
    }
    else if (spellRoll === 5) {
        spell = "Grease";
    }
    else if (spellRoll === 6) {
        spell = "Levitate (cast on yourself)";
    }
    else if (spellRoll === 7) {
        spell = "Magic Missile (cast as a level 5 spell)";
    }
    else if (spellRoll === 8) {
        spell = "Mirror Image";
    }
    else if (spellRoll === 9) {
        spell = "Polymorph (cast on yourself)";
    }
    else if (spellRoll === 10) {
        spell = "See Invisibility";
    }

    effect = `You cast a random spell. If the spell normally requires Concentration, it doesn’t require Concentration in this case; the spell lasts for its full duration. Roll 1d10 to determine the spell. You rolled ${spellRoll}: ${spell}.`;
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
        const durationRoll = rollDie(4);

        effect = `A random creature within 60 feet of you has the Poisoned condition for 1d4 hours. Roll: ${durationRoll} hours.`;
    }
    else if (roll <= 84) {
        effect = "You radiate Bright Light in a 30-foot radius for the next minute.";
    }
    else if (roll <= 88) {
        const damageRoll = rollDie(10);

        effect = `Up to three creatures you can see within 30 feet take 1d10 Necrotic damage. You regain Hit Points equal to the damage dealt. Roll: ${damageRoll} damage.`;
    }
    else if (roll <= 92) {
        const damageRolls = [];
        let totalDamage = 0;

        for (let i = 0; i < 4; i++) {
            const dieRoll = rollDie(10);
            damageRolls.push(dieRoll);
            totalDamage += dieRoll;
        }

        effect = `Up to three creatures you can see within 30 feet take 4d10 Lightning damage. Rolls: ${damageRolls.join(" + ")} = ${totalDamage} Lightning damage.`;
    }
    else if (roll <= 96) {
        effect = "You and all creatures within 30 feet have Vulnerability to Piercing damage for the next minute.";
    }
    else {
        const additionalRoll = rollDie(6);

        effect = `oll 1d6: On a 1, you regain 2d10 Hit Points; on a 2, one ally of your choice within 300 feet of you regains 2d10 Hit Points; on a 3, you regain your lowest-level expended spell slot; on a 4, one ally of your choice within 300 feet of you regains their lowest-level expended spell slot; on a 5, you regain all your expended Sorcery Points; on a 6, all the effects of row 17–20 affect you simultaneously." Roll: ${additionalRoll}.`;
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
			= ${result.attack.chosen + Number(attackBonus.value)}
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
