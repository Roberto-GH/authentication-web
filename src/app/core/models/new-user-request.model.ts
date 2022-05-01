export class NewUserRequestModel {

  profile_img: string;  
  name: string;
  lastName: string;
  phone: string;  
  email: string;  
  password: string;  
  roles: string[] = [];

  constructor(profile_img: string, name: string, lastName: string, phone: string, email: string,  password: string, roles: string[] = []) {
    
      this.profile_img = profile_img;  
      this.name= name;
      this.lastName= lastName;
      this.phone= phone;  
      this.email= email;  
      this.password= password;  
      this.roles= roles;
      
  }

}
