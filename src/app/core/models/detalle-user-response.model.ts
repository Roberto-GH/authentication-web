export class DetalleUserResponseModel {

  id: number;
  profile_img: string;    
  name: string;
  lastName: string;
  biography: string;
  phone: string;  
  email: string;  
  password: string;  
  roles: string[] = [];

  constructor(id: number, profile_img: string, name: string, lastName: string, biography: string, phone: string, email: string,  password: string, roles: string[] = []) {
    
      this.id = id;
      this.profile_img = profile_img;        
      this.name= name;
      this.lastName = lastName;
      this.biography = biography;
      this.phone= phone;  
      this.email= email;  
      this.password= password;  
      this.roles= roles;
      
  }

}
