const getChartColorsArray = (_colors: string) => {
  const colors: string[] = JSON.parse(_colors) as string[];
  return colors.map(function (value: string) {
    const newValue = value.replace(' ', '');
    if (newValue.indexOf(',') === -1) {
      let color = getComputedStyle(document.documentElement).getPropertyValue(newValue);

      if (color.indexOf('#') !== -1) color = color.replace(' ', '');
      if (color) return color;
      else return newValue;
    } else {
      const val = value.split(',');
      if (val.length === 2) {
        let rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
        rgbaColor = 'rgba(' + rgbaColor + ',' + val[1] + ')';
        return rgbaColor;
      } else {
        return newValue;
      }
    }
  });
};

export default getChartColorsArray;
