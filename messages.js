const substituteMessage = (mess, audience, targetted, short, character, target = { name: "Teleifegorra", gender: "female" }) => {
    const capitalize = (lc) => {
        if(lc === null || lc === undefined || !lc.length) return "";
        lc.charAt(0).toUpperCase() + lc.slice(1);
    };

    const myGenderData = findGenderInformation(character.gender) || findGenderInformation("male");
    const targetGenderData = findGenderInformation(target.gender) || findGenderInformation("male");

    mess = mess.replace("SHORT", short);

    switch (audience) {
        case "self":
            if (targetted) {
                mess = mess.replace("^VNAME", target.name);
                mess = mess.replace("^VPOSS", capitalize(targetGenderData.poss));
                mess = mess.replace("^VOBJ",  capitalize(targetGenderData.obj));
                mess = mess.replace("^VSUB",  capitalize(targetGenderData.sub));

                mess = mess.replace("VNAME", target.name);
                mess = mess.replace("VPOSS", targetGenderData.poss);
                mess = mess.replace("VOBJ",  targetGenderData.obj);
                mess = mess.replace("VSUB",  targetGenderData.sub);
            }

            mess = mess.replace("^NAME", "You");
            mess = mess.replace("^SUB",  "You");
            mess = mess.replace("^OBJ",  "You");
            mess = mess.replace("^POSS", "Your");

            mess = mess.replace("NAME", "you");
            mess = mess.replace("SUB",  "you");
            mess = mess.replace("OBJ",  "you");
            mess = mess.replace("POSS", "your");
            break;
        case "target":
            if (targetted) {
                mess = mess.replace("^VNAME", "You");
                mess = mess.replace("^VSUB",  "You");
                mess = mess.replace("^VOBJ",  "You");
                mess = mess.replace("^VPOSS", "Your");

                mess = mess.replace("VNAME", "you");
                mess = mess.replace("VSUB",  "you");
                mess = mess.replace("VOBJ",  "you");
                mess = mess.replace("VPOSS", "your");
            }

            mess = mess.replace("^NAME", character.name);
            mess = mess.replace("^SUB",  capitalize(myGenderData.sub));
            mess = mess.replace("^OBJ",  capitalize(myGenderData.obj));
            mess = mess.replace("^POSS", capitalize(myGenderData.poss));

            mess = mess.replace("NAME", character.name);
            mess = mess.replace("SUB",  myGenderData.sub);
            mess = mess.replace("OBJ",  myGenderData.obj);
            mess = mess.replace("POSS", myGenderData.poss);
            break;
        case "room":
            if (targetted) {
                mess = mess.replace("^VNAME", target.name);
                mess = mess.replace("^VPOSS", capitalize(targetGenderData.poss));
                mess = mess.replace("^VOBJ",  capitalize(targetGenderData.obj));
                mess = mess.replace("^VSUB",  capitalize(targetGenderData.sub));

                mess = mess.replace("VNAME", target.name);
                mess = mess.replace("VPOSS", targetGenderData.poss);
                mess = mess.replace("VOBJ",  targetGenderData.obj);
                mess = mess.replace("VSUB",  targetGenderData.sub);
            }

            mess = mess.replace("^NAME", character.name);
            mess = mess.replace("^SUB",  capitalize(myGenderData.sub));
            mess = mess.replace("^OBJ",  capitalize(myGenderData.obj));
            mess = mess.replace("^POSS", capitalize(myGenderData.poss));

            mess = mess.replace("NAME", character.name);
            mess = mess.replace("SUB",  myGenderData.sub);
            mess = mess.replace("OBJ",  myGenderData.obj);
            mess = mess.replace("POSS", myGenderData.poss);
            break;
    }

    return mess;
};
