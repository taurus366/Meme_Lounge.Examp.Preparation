import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import {logout as apiLogout} from './api/data.js';

import {homePage} from './views/home.js';
import {loginPage} from './views/login.js';
import {registerPage} from './views/register.js';
import {createMemePage} from './views/createMemePage.js';
import {editMemePage} from "./views/editMeme.js";
import {catalogPage} from "./views/catalog.js";
import {detailsPage} from "./views/details.js";
import {profilePage} from "./views/profile.js";
import {notify} from './notification.js';

function guestUserOnly(context,next) {
     const token = sessionStorage.getItem('authToken');
     if(token !== null){
         return context.page.redirect('/catalog');
     }
     next();
}

const main = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click',logout);
setUserNav();

page('/' , decorateContext,guestUserOnly, homePage);
page('/login' , decorateContext, loginPage);
page('/register' , decorateContext, registerPage);
page('/create' , decorateContext, createMemePage);
page('/edit/:id',decorateContext,editMemePage)
page('/catalog',decorateContext,catalogPage);
page('/details/:id',decorateContext,detailsPage);
page('/profile',decorateContext,profilePage);
//page('/catalog' , decorateContext, meme);

page.start();

function decorateContext(context,next) {
    context.render = (content)=> render(content, main);
    context.setUserNav = setUserNav;
    next();
}

function setUserNav() {
  // const token = sessionStorage.getItem('authToken');
   const email = sessionStorage.getItem('email');
   if(email != null){
       document.querySelector('div > .profile > span').textContent = `Welcome, ${email}`
       document.querySelector('.user').style.display = '';
       document.querySelector('.guest').style.display = 'none';
    }else {
       document.querySelector('.user').style.display = 'none';
       document.querySelector('.guest').style.display = '';
   }
}

async function logout() {
   await apiLogout();
   setUserNav();
   page.redirect('/');
}

