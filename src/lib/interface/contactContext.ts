export interface ErrorContactIF {
   id: string | number;
   message: string;
}

export interface FormIF {
   name: string;
   subject: string;
   message: string;
   mail: string;
   errors?: ErrorContactIF[];
}