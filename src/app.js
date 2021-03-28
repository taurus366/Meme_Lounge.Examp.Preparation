import {render} from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import {homePage} from './views/home.js';
import {loginPage} from './views/login.js';
import {register} from './views/register.js';
import {meme} from './views/createMemePage.js';


const main = document.querySelector('main');
setUserNav();

page('/' , decorateContext, homePage);
page('/login' , decorateContext, loginPage);
page('/register' , decorateContext, register);
page('/create/memes' , decorateContext, meme);

page.start();

function decorateContext(context,next) {
    context.render = (content)=> render(content, main);
    context.setUserNav = setUserNav;
    next();
}

function setUserNav() {
   const token = sessionStorage.getItem('authToken');
   if(token != null){
       document.querySelector('.user').style.display = '';
       document.querySelector('.guest').style.display = 'none';
    }else {
       document.querySelector('.user').style.display = 'none';
       document.querySelector('.guest').style.display = '';
   }
}

