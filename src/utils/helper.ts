export const formatNumber = (inputNumber: number) => {
    let formetedNumber = (Number(inputNumber)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    let splitArray = formetedNumber.split('.');
    if (splitArray.length > 1) {
        formetedNumber = splitArray[0];
    }
    return (formetedNumber);
};

export const sumArrNumber = (data: number[]) => data?.reduce((a: number, b: number) => a + b, 0) 