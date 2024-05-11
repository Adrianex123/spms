export const pathNameFilter = (pathname: string) => {
  switch (true) {
    case pathname.includes("transactions"):
      return "Transactions";
    case pathname.includes("inventory"):
      return "Inventory";
    case pathname.includes("announcements"):
      return "Announcements";
    case pathname.includes("management"):
      return "Management";
    case pathname.includes("analytics"):
      return "Analytics";
    case pathname.includes("reports"):
      return "Reports";
    case pathname.includes("settings"):
      return "Settings";
    default:
      return "Dashboard";
  }
};
