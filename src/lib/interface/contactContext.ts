export interface ErrorContactIF {
   id: string | number,
   message: string,
}

export type FormIF = {
   name: string,
   subject: string,
   message: string,
   mail: string,
   errors?: ErrorContactIF[],
}