export default interface ITermin {
  Id: number;
  Title: string;
  Datum: Date; /* Date ist eine Objekt und Objekte sind nicht erlaubt in JSX/TSX. */
}