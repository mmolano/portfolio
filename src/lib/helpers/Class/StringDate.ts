import moment from "moment";
import 'moment/locale/fr';
import 'moment/locale/es';

class StringDate {
   private readonly date: string;

   constructor(dateString: string) {
      const dateValue = Date.parse(dateString);
      let language = localStorage.getItem('lang')?.toString();

      if (isNaN(dateValue)) {
         throw new Error("Invalid date string");
      }

      moment.locale(language);

      this.date = moment().format('ddd, LL');
   }

   public get fullDate() {
      return this.date;
   }

   public set newDateLL(date: Date) {
      moment(date).format('LL');
   };
}

export default StringDate;