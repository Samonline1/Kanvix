export const formatDate = (date) => {
  if (!date) return "No due date";
  return new Date(date).toLocaleDateString();
};
