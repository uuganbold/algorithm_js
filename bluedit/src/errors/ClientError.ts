export default class ClientError extends Error{

    public status:number;

    constructor(message:string, status=400) {
        super(message); 
        this.status=status;
        this.name = "ClientError";
      }

}