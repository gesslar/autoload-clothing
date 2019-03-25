const genders = [
    { gender: "male",   poss: "his", sub: "he",  obj: "him" },
    { gender: "female", poss: "her", sub: "she", obj: "her" },
];

const findGenderInformation = (gender) => {
    return genders.filter(
        (data) => { return data.gender === gender; }
    );
};
