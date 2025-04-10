const isUrl = (text: string): boolean => {
  const pattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/i;
  return pattern.test(text);
};

export default isUrl;
