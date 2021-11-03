module.exports = {
    firstUpperCase: (nickname) => {
        const nick = nickname.toLowerCase();
        return nick.charAt(0).toUpperCase() + nick.slice(1);
    },

    lowerCase: (str) => {
        return str.toLowerCase();
    },
};
