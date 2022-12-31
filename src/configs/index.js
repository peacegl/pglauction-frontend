import {appIntl} from '@crema/utility/helper/Utils';
import jwtAxios from '@crema/services/auth/jwt-auth';
const merge = (a, b, p) =>
  a.filter((aa) => !b.find((bb) => aa[p] === bb[p])).concat(b);

export function CommonConfigs() {
  return {
    phoneRegExp: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    emailReqExp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    youtubeRegExp:
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
  };
}

export async function getData(
  url,
  content,
  loading,
  setData,
  setExtra = undefined,
) {
  try {
    loading(true);
    const res = await jwtAxios.get(url, {params: content});
    if (res.status === 200 && res.data.result) {
      setData(res.data.data);
      if (setExtra) setExtra(res.data);
    }
    loading(false);
  } catch (error) {
    loading(false);
  }
}

export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {type: mime});
}

// Create our number formatter.
export function moneyFormater(number, currency = 'AED') {
  const formater = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return formater.format(number);
}

// Create our number formatter.
export function numberFormater(number, decimal = 0) {
  const formater = new Intl.NumberFormat('en-US', {
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return formater.format(number, decimal);
}

export function range(start, end, step) {
  return Array.from(
    Array.from(Array(Math.ceil((end - start) / step)).keys()),
    (x) => start + x * step,
  );
}

export async function availableChecking(
  url,
  params,
  actions,
  onSuccess,
  onFail,
) {
  try {
    const res = await jwtAxios.get(url, {
      params: params,
    });
    if (res.status === 200) {
      onSuccess(res, actions);
      return res.data.result;
    }
    onFail(actions);
    return false;
  } catch (error) {
    onFail(actions);
    return false;
  }
}

export async function jwtMethod(
  method,
  url,
  content,
  successStatus,
  loading,
  setData,
  setExtra = undefined,
) {
  try {
    loading(true);
    const res = await jwtAxios[method](url, content);
    if (res.status === successStatus && res.data.result) {
      setData(res.data.data);
      if (setExtra) setExtra(res.data);
    }
    loading(false);
  } catch (error) {
    loading(false);
  }
}
