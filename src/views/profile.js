import {html} from '../../node_modules/lit-html/lit-html.js';
import {getMyMeems} from '../api/data.js';

const profileTemplate = (meme,user) => html`
    <section id="user-profile-page" class="user-profile">
        <article class="user-info">
            <img id="user-avatar-url" alt="user-profile" src="/images/${sessionStorage.getItem('userGender')}.png">
            <div class="user-content">
                <p>Username: ${user.username}</p>
                <p>Email: ${user.email}</p>
                <p>My memes count: ${meme.length}</p>
            </div>
        </article>
        <h1 id="user-listings-title">User Memes</h1>
        <div class="user-meme-listings">
            <!-- Display : All created memes by this user (If any) -->
            ${Object.entries(meme).length > 0 ? meme.map(userMemeTemplate) : html`<p class="no-memes">No memes in database.</p>`}

            <!-- Display : If user doesn't have own memes  -->
            
        </div>
    </section>
`;

const userMemeTemplate = (meme) => html`
    <div class="user-meme">
        <p class="user-meme-title">${meme.title}</p>
        <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
        <a class="button" href="/details/${meme._id}">Details</a>
    </div>
`;

export async function profilePage(context) {
    // const userId = sessionStorage.getItem('userId');
    //const user =  await ge
    const memes = await getMyMeems();
    const user = {
        username:sessionStorage.getItem('username'),
        email:sessionStorage.getItem('email'),
    };

  //  console.log(Object.entries(memes).length)
    context.render(profileTemplate(memes,user));

}