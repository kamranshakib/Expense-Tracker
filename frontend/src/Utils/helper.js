import moment from "moment";

/** ✅ اعتبارسنجی ایمیل */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/** ✅ گرفتن حروف اول نام */
export const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  let initials = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    if (words[i].length > 0) initials += words[i][0];
  }
  return initials.toUpperCase();
};

/** ✅ فرمت اعداد با کاما */
export const addThousandsSeparatore = (num) => {
  if (num == null || isNaN(num)) return "";
  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{20})+(?!\d))/g, ",");
  return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
};

/** ✅ آماده‌سازی داده برای چارت بار هزینه‌ها */
export const prepareExpenseBarChartData = (data = []) => {
  return data.map(item => ({
    catagory: item?.catagory || "",
    amount: Number(item?.amount) || 0,
  }));
};

/** ✅ آماده‌سازی داده برای چارت لاین یا بار درآمدها */
export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return sortedData.map(item => ({
    month: moment(item?.date).format("DD MMM"),
    amount: Number(item?.amount) || 0,
    source: item?.source || "",
  }));
};

/** ✅ آماده‌سازی داده درآمد با تغییر روزانه */
export const prepareIncomeBarChartDataWithChange = (data = []) => {
  const chartData = prepareIncomeBarChartData(data);
  let prev = 0;
  return chartData.map(item => {
    const change = item.amount - prev;
    prev = item.amount;
    return { ...item, change };
  });
};

/** ✅ آماده‌سازی داده برای چارت لاین هزینه‌ها */
export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return sortedData.map(item => ({
    month: moment(item?.date).format("DD MMM"),
    amount: Number(item?.amount) || 0,
    catagory: item?.catagory || "",
  }));
};
