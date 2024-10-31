import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  hamburger!: any;

  getHamburger(){
    console.log("hola 0")
    this.hamburger = document.querySelector(".hamburguer");
    console.log("hola")
    this.hamburger.onclick = function() {
      let navBar = document.querySelector(".nav-bar");
      navBar?.classList.toggle("active");
    }
  }
}
