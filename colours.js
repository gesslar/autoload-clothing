const colours = [
    { colour: "white",        cssColour: "silver", },
    { colour: "red",          cssColour: "maroon", },
    { colour: "orange",       cssColour: "olive"   },
    { colour: "green",        cssColour: "green"   },
    { colour: "blue",         cssColour: "navy"    },
    { colour: "cyan",         cssColour: "teal"    },
    { colour: "magenta",      cssColour: "purple"  },
    { colour: "yellow",       cssColour: "yellow"  },
    { colour: "bold red",     cssColour: "red"     },
    { colour: "bold green",   cssColour: "lime"    },
    { colour: "bold blue",    cssColour: "blue"    },
    { colour: "bold cyan",    cssColour: "aqua"    },
    { colour: "bold magenta", cssColour: "fuschia" },
    { colour: "bold black",   cssColour: "gray"    },
    { colour: "bold white",   cssColour: "white"   },
];

const findCssColour = (selectedColour) => {
    const result = colours.filter(
        (data) => { return data.colour === selectedColour; }
    );
    return result.length ? result[0].cssColour : "silver";
};
