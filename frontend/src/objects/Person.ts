export class Person {
  id!: string;
  firstName!: string;
  lastName!: string;
  birthDate!: string;

  static getFullName(p: Person) {
    return p.lastName + " " + p.firstName;
  }

  static getBirthDateString(p: Person) {
    return (new Date(p.birthDate)).toLocaleString().split(",")[0];
  }
}