const aISOString = date => {
    // convierte la fecha a formato ISO

    const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
      return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds());
    };
export default aISOString;