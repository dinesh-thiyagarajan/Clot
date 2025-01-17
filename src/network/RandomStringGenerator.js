const RandomStringGenerator = (length = 140) => {
    let token = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return token;
};

export default RandomStringGenerator;
