import dayjs from "dayjs";

export const getAge = (dateString: string) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export const formatDate = (date: string) => {
    return dayjs(date).format("dddd DD [de] MMMM");
  };