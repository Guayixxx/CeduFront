import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chat } from '../models/chat';
import { User } from '../models/user';
import { Chat1Service } from 'src/app/service/chat1/chat1.service';
import { UserService } from 'src/app/service/chat1/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  chatId: any = 0;
  registerForm: FormGroup;
  loginForm: FormGroup;
  successregister: boolean = false;
  registermsg = "";
  alert = "";
  loginmsg = "";
  alert2 = "";
  successlogin: boolean = false;
  public userObj: User = new User();
  public alluser: any = [];
  secondUsername = "";
  chatObj: Chat = new Chat();
  public chatData: any = [];
  check = "";
  loggedIn: boolean = false;
  loggedOut: boolean = true;
  chatbox: boolean = true;

  logout() {
    this.loggedIn = false;
    this.loggedOut = true;
    sessionStorage.clear();
    
    this.router.navigateByUrl('');
  }

  constructor(private router: Router, private userService: UserService, private chat1Service: Chat1Service) {
    this.registerForm = new FormGroup({
      username: new FormControl("", [Validators.required])
    });
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required])
    });
  }

  /*este código actualiza continuamente la lista de usuarios en el componente cada segundo */
  ngOnInit(): void {

    /* Llama al método getAll del servicio userService, 
    que realiza una solicitud HTTP para obtener una lista de usuarios. */
    setInterval(() => {
      this.userService.getAll().subscribe((data) => {
        // console.log(data);

        this.alluser = data;

      })
    }, 1000);

  }

  adduser() {
    if (this.registerForm.valid) {
      this.userObj.userName = this.registerForm.value.username;
      this.userService.adduser(this.userObj).subscribe(
        (data: any) => {
          console.log(data);

          this.successregister = true;
          this.alert = "success";
          this.registermsg = "Successsfully added";

          this.registerForm.reset();

        },
        (error) => {
          console.log(error.error);
          if (error.status == 409) {
            this.successregister = true;
            this.alert = "danger";
            this.registermsg = "Already registered"
          } else {
            this.successregister = true;
            this.alert = "danger";
            this.registermsg = "Error"
          }

        }
      )
    }

  }

  login() {
    if (this.loginForm.valid) {
      this.userService.getUserByUsername(this.loginForm.value.username).subscribe(
        (data: any) => {
          console.log(data);

          this.successlogin = true;
          this.alert2 = "success";
          this.loginmsg = "Successsfully LoggedIn";

          sessionStorage.setItem("username", this.loginForm.value.username);
          this.check = this.loginForm.value.username;
          this.loginForm.reset();

          this.loggedIn = true;
          this.loggedOut = false;

          // this.router.navigateByUrl('/chat');
        },
        (error) => {
          console.log(error.error);
          if (error.status == 404) {
            this.successlogin = true;
            this.alert2 = "danger";
            this.loginmsg = "Not a registerd user"
          } else {
            this.successlogin = true;
            this.alert2 = "danger";
            this.loginmsg = "Error"
          }

        }
      )
    }


  }

  goToChat(username: any) {
    // Llama al método 'getChatByFirstUserNameAndSecondUserName' del servicio 'chat1Service'
    // para obtener información sobre la sala de chat entre el usuario actual y el usuario seleccionado.
    this.chat1Service.getChatByFirstUserNameAndSecondUserName(username, sessionStorage.getItem("username") ?? 'ValorPredeterminado').subscribe(
      (data) => {
        this.chatData = data;
        this.chatId = this.chatData[0].chatId;
        // Almacena el ID de la sala de chat en sessionStorage.
        sessionStorage.setItem("chatId", this.chatId);
        this.router.navigateByUrl('/chat');
      },
      (error) => {
        if (error.status == 404) {
          this.chatObj.firstUserName = sessionStorage.getItem("username") ?? 'ValorPredeterminado';
          this.chatObj.secondUserName = username;
          this.chat1Service.createChatRoom(this.chatObj).subscribe(
            (data) => {
              this.chatData = data;
              sessionStorage.setItem("chatId", this.chatData[0].chatId);
              // this.router.navigateByUrl('/chat');
              console.log("2")
            })
        } else {
          // this.router.navigateByUrl('/chat');
          console.log("3")
        }
      });

  }

}
