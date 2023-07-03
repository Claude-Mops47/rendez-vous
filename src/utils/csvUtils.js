import dayjs from "dayjs";


export const downloadAsCSV = (appointments, selecteDate) => {
  const csvContent = [
    "Agent$Date$Name$Telephone$Address$Date programmation$Commercial",
    ...(appointments?.value || []).map((item) => {
      const phone = item.phone.join(" / ");
      const agent = item.posted_by?.firstName;
      return [
        agent,
        dayjs(item.createdAt).format("DD/MM/YY HH:mm"),
        item.name,
        phone,
        item.address,
        dayjs(item.date).format("DD/MM/YY HH:mm"),
        item.commercial,
      ].join("$");
    }),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `${selecteDate}-appointments.csv`;
  link.click();

  return blob;
};
