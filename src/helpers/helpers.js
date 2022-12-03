export default {
  getFormData(data) {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      let keyName = key;
      if (Array.isArray(data[key])) {
        keyName = key.toString() + '[]';
        data[key].forEach((value) => {
          if (value instanceof File) {
            formData.append(keyName, value);
          } else if (this.isObject(value)) {
            formData.append(keyName, JSON.stringify(value));
          } else {
            formData.append(keyName, value);
          }
        });
      } else if (this.isObject(data[keyName])) {
        if (data[keyName] instanceof File) {
          formData.append(keyName, data[keyName]);
        } else {
          formData.append(keyName, JSON.stringify(data[keyName]));
        }
      } else {
        if (data[key] !== null && data[key] !== undefined) {
          formData.append(keyName, data[key]);
        }
      }
    });
    return formData;
  },

  convertTime(context, time) {
    if (time) {
      // Check correct time format and split into components
      time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? context.$tr('am') : context.$tr('pm'); // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join(''); // return adjusted time or original string
    }
    return time;
  },

  isObject(variable) {
    return (
      typeof variable === 'object' &&
      !Array.isArray(variable) &&
      variable !== null
    );
  },
};
