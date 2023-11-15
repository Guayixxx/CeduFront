import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Chat } from '../models/chat';
import { Message } from '../models/message';
import { Chat1Service } from 'src/app/service/chat1/chat1.service';
import { UserService } from 'src/app/service/chat1/user.service';

@Component({
  selector: 'app-chatt',
  templateUrl: './chatt.component.html',
  styleUrls: ['./chatt.component.scss'],
})
export class ChattComponent implements OnInit {
  public totalHeight: number = 0;
  messageInput: string = '';
  userId: string = '';

  chatForm: FormGroup;
  chatObj: Chat = new Chat();
  messageObj: Message = new Message();
  // chatId: number = 22;
  public messageList: any = [];
  public chatList: any = [];
  replymessage: String = 'checking';
  public chatData: any;
  msg = 'Good work';
  chatId: any = sessionStorage.getItem('chatId');
  color = '';
  secondUserName = '';
  public alluser: any = [];
  check = sessionStorage.getItem('username');
  timesRun = 0;
  timesRun2 = 0;

  firstUserName = sessionStorage.getItem('username');
  senderEmail = sessionStorage.getItem('username');
  senderCheck = sessionStorage.getItem('username');

  constructor(
    private chat1Service: Chat1Service,
    private router: Router,
    private userService: UserService,
    private cdref: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.chatForm = new FormGroup({
      replymessage: new FormControl(),
    });
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
    const titles = document.querySelectorAll('.chat-list-header');
    document.body.setAttribute('data-theme', 'dark');
    titles.forEach((title: Element) => {
      title.addEventListener('click', () => {
        const result = title.nextElementSibling as HTMLElement;
        const activeSibling = result.classList.contains('active');
        title.classList.toggle('active');
        result.classList.toggle('active');

        if (!activeSibling) {
          for (let i = 0; i < result.children.length; i++) {
            this.totalHeight =
              this.totalHeight + result.children[i].scrollHeight + 40;
          }
        } else {
          this.totalHeight = 0;
        }

        result.style.maxHeight = this.totalHeight + 'px';
      });
    });

    const themeColors = document.querySelectorAll('.theme-color');

    themeColors.forEach((themeColor) => {
      themeColor.addEventListener('click', (e) => {
        themeColors.forEach((c) => c.classList.remove('active'));
        const theme = themeColor.getAttribute('data-color') ?? 'defaultTheme'; // Provide a default value
        document.body.setAttribute('data-theme', 'dark');
        themeColor.classList.add('active');
      });
    });

    setInterval(() => {
      this.chat1Service
        /*Se realiza una solicitud al servicio chat1Service para obtener 
        información sobre el chat actual. La información se obtiene utilizando el chatId  */
        .getChatById(sessionStorage.getItem('chatId'))
        .subscribe((data) => {
          this.chatData = data;
          /*Se extrae el nombre de usuario del segundo participante en el chat y se asigna a secondUserName.*/
          this.secondUserName = this.chatData.secondUserName;
          this.firstUserName = this.chatData.firstUserName;

          /*Se realiza otra solicitud para obtener todos los mensajes asociados al chat actual utilizando el chatId. */
          this.chat1Service
            .getAllMessagesByChatId(this.chatId)
            .subscribe((data) => {
              // console.log(data);
              this.chatData = data;
              this.messageList = this.chatData;
            });
        });
    }, 1000);

    /*Detecta cambios*/
    this.cdref.detectChanges();

    /*Se realiza una solicitud al servicio chat1Service para obtener la lista 
      de chats en los que el usuario actual (sessionStorage.getItem('username')) está involucrado*/
    let getByname = setInterval(() => {
        this.chat1Service
        .getChatByFirstUserNameOrSecondUserName(
          sessionStorage.getItem('username')
        )
        .subscribe((data) => {
          // console.log(data);
          this.chatData = data;
          this.chatList = this.chatData;
        });

      this.timesRun2 += 1;
      if (this.timesRun2 === 2) {
        clearInterval(getByname);
      }
    }, 1000);

    /* Se realiza una solicitud al servicio userService para obtener todos los usuarios.
     La respuesta se maneja en la función de suscripción. */
    let all = setInterval(() => {
      this.userService.getAll().subscribe((data) => {
        // console.log(data);
        this.alluser = data;
      });

      this.timesRun += 1;
      if (this.timesRun === 2) {
        clearInterval(all);
      }
    }, 1000);
  }

  loadChatByEmail(event: string, event1: string) {
    console.log(event, event1);
    // Elimina el valor asociado con la clave 'chatId' en el almacenamiento de sesión.
    // Esto se hace para eliminar cualquier chatId anterior que pueda haber estado almacenado
    sessionStorage.removeItem('chatId');

    // For checking the chat room by both the emails , if there is present then it will give the chat Id in sessionStorage
    this.chat1Service
        //Realiza una solicitud al servicio chat1Service para obtener información sobre un chat basado en dos nombres de usuario
      .getChatByFirstUserNameAndSecondUserName(event, event1)
      .subscribe((data) => {
        // console.log(data);
        this.chatData = data;
        this.chatId = this.chatData[0].chatId;
        console.log(this.chatId);
        sessionStorage.setItem('chatId', this.chatId);

        /* Realiza una solicitud al servicio para obtener detalles del chat con el chatId almacenado.
         La respuesta se maneja en la función de suscripción. */
        setInterval(() => {
          this.chat1Service.getChatById(this.chatId).subscribe((data) => {
            this.chatData = data;
            this.secondUserName = this.chatData.secondUserName;
            this.firstUserName = this.chatData.firstUserName;

            this.chat1Service
              .getAllMessagesByChatId(this.chatId)
              .subscribe((data) => {
                console.log(data);
                this.chatData = data;
                this.messageList = this.chatData;
              });
          });
        }, 1000);
      });
  }

  sendMessage() {
    console.log(this.chatForm.value);

    // Esto llama a el metodo que recarga el chat cada que el usuario envía el mensaje
    this.messageObj.replymessage = this.chatForm.value.replymessage; // Este objeto se utiliza para representar el mensaje que se va a enviar.
    this.messageObj.senderEmail = this.senderEmail ?? 'ValorPredeterminado';
    this.chatObj.chatId = this.chatId;
    this.messageObj.chat = this.chatObj;
    this.chat1Service
      .addMessageToChatRoom(this.messageObj)
      .subscribe((data) => {
        console.log(data);
        this.chatForm.reset();
        // Para obtener la lista de mensajes por el chatId
        this.chat1Service
          .getAllMessagesByChatId(this.chatId)
          .subscribe((data) => {
            console.log(data);
            this.chatData = data;
            this.messageList = this.chatData.messageList;
            this.secondUserName = this.chatData.secondUserName;
            this.firstUserName = this.chatData.firstUserName;
          });
      });
  }

  routeX() {
    // this.router.navigateByUrl('/navbar/recommendation-service');
    sessionStorage.clear();
    // window.location.reload();
    this.router.navigateByUrl('');
  }

  routeHome() {
    this.router.navigateByUrl('');
  }

  goToChat(username: any) {
    this.chat1Service
      //  Llama a un servicio (chat1Service) para obtener información sobre una sala de chat
      //  en función de los nombres de usuario proporcionados.
      .getChatByFirstUserNameAndSecondUserName(
        username,
        sessionStorage.getItem('username') ?? 'ValorPredeterminado'
      )
      .subscribe(
        (data) => {
          this.chatId = data.chatId;
          sessionStorage.setItem('chatId', this.chatId);
        },
        /* En caso de que haya un error y el código de estado sea 404 (No encontrado), 
        se ejecuta el bloque de código dentro de { ... }. En este caso, está creando 
        una nueva sala de chat utilizando el servicio  */
        (error) => {
          if (error.status == 404) {
            this.chatObj.firstUserName =
              sessionStorage.getItem('username') ?? 'ValorPredeterminado';
            this.chatObj.secondUserName = username;
            this.chat1Service.createChatRoom(this.chatObj).subscribe((data) => {
              this.chatData = data;
              this.chatId = this.chatData.chatId;
              sessionStorage.setItem('chatId', this.chatData.chatId);
            });
          } 
        }
      );
  }
}
