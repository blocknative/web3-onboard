export const shortenAddress = (addr: string) =>
  `${addr.slice(0, 4)}..${addr.slice(-4)}`;

export const formatBalance = (balance: string | undefined) => {
  if (!balance) return balance;
  const number = Number(balance);
  if (isNaN(number)) return balance;
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 6
  });
};

export const placeFirst = (array: string[], element: string) => {
  const index = array.indexOf(element);
  if (index !== -1) {
    array.splice(index, 1);
    array.unshift(element);
  }
  return array;
};
