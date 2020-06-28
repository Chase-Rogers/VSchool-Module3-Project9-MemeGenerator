import React, { useState, useEffect } from "react";

function MemeGenerator() {
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [allMemes, setAllMemes] = useState("");
    const [randomMeme, setrandomMeme] = useState(
        "http://i.imgflip.com/1bij.jpg"
    );

    const fetchMeme = () => {
        fetch("https://api.imgflip.com/get_memes")
            .then((response) => response.json())
            .then((response) => setAllMemes(response.data.memes))
            .catch();
    };

    useEffect(() => {
        fetchMeme();
    }, []);

    const getRandomImg = (event) => {
        event.preventDefault()
        const randomNum = Math.floor(Math.random() * Math.floor(allMemes.length));
        setrandomMeme(allMemes[randomNum].url);
    };

    const handleTop = (event) => {
        setTopText(event.target.value);
    };
    const handleBottom = (event) => {
        setBottomText(event.target.value);
    };
    return (
        <div>
            <form onSubmit={getRandomImg} className="meme-form">
                <input
                    type="text"
                    name="topText"
                    placeholder="top text"
                    value={topText}
                    onChange={handleTop}
                />
                <input
                    type="text"
                    name="bottomText"
                    placeholder="bottom text"
                    value={bottomText}
                    onChange={handleBottom}
                />
                <button>Gen</button>
            </form>
            <div className="meme">
                <img src={randomMeme} alt="" />
                <h2 className="top">{topText}</h2>
                <h2 className="bottom">{bottomText}</h2>
            </div>
        </div>
    );
}

export default MemeGenerator;
