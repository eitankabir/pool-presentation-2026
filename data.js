const Data = {
  meta: {
    poolName: 'בריכת קהילת מפלסים',
    season: 'יוני–ספטמבר 2026',
  },

  budget: {
    totalExpenses: 320000,
    totalIncome: 22000,
    netCost: 298000,

    expenseLabels: ['מים וביוב', 'מצילים וניקיון', 'הפעלה וניהול', 'חשמל', 'כימיקלים', 'תחזוקה', 'אחר'],
    expenseValues: [81300, 76632, 68440, 29227, 21684, 18946, 23771],
    expenseColors: ['#2196f3', '#0d7a6b', '#e8a020', '#e85555', '#9b59b6', '#26c4a3', '#7f8c8d'],
    expensePct:    [25, 24, 21, 9, 7, 6, 8],

    income: { hydro: 10000, events: 12000 },
  },

  comparison: {
    y2025: { income: 7975,  expenses: 285116, investments: 17228, net: 294369 },
    y2026: { income: 22000, expenses: 314808, investments: 5192,  net: 298000 },
  },

  eventPricing: [
    { type: 'אירוע קהילתי',            before: 'תמחור שעתי מורכב',   after: '300 ₪' },
    { type: 'אירוע קטן (עד 100 משתתפים)', before: 'מדרגות + תוספות',    after: '900 ₪' },
    { type: 'אירוע גדול (עד 300 משתתפים)', before: 'חישובים מורכבים',   after: '3,000 ₪' },
    { type: 'שעת מציל',                before: 'כלולה במחיר',        after: 'נפרד — ישירות למציל' },
  ],
};
