const getTodayKey = () => {
    const today = new Date().toISOString().split("T")[0]; // "2025-06-16"
    return `dailyTracker-${today}`;
};

export { getTodayKey }
  