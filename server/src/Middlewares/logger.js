class Logger {
    #getLog = "GET Products";
    #getByIdLog = "GET Product by id";

    static log = (message) => {
        console.log(message);
    }

    addGetLog = (req, res, next) => {
        console.log(this.#getLog);
        next();
    }

    addGetByIdLog = (req, res, next) => {
        const { id } = req.params;
        console.log(this.#getByIdLog, `Id = ${id}`);
        next();
    }
}

module.exports = Logger;