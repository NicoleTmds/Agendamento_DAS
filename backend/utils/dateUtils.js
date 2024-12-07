const formatToISO = (date) => {
    const parsedDate = new Date(date); // Converte a data para um objeto Date
    if (isNaN(parsedDate.getTime())) { // Verifica se a data é inválida
        throw new Error('Data inválida');
    }
    return parsedDate.toISOString(); // Retorna a data em formato ISO
};

module.exports = formatToISO;
