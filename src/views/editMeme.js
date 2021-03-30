import {html} from '../../node_modules/lit-html/lit-html.js';
import {editMeme, getMemeById} from '../api/data.js';

const editMemeTemplate = (meme,onSubmit) => html`
    <section id="edit-meme">
        <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Meme</h1>
            <div class="container">
                <label for="title">Title</label>
                <input id="title" type="text" placeholder="Enter Title" name="title" .value=${meme.title}>
                <label for="description">Description</label>
                <textarea id="description" placeholder="Enter Description" name="description">
                            ${meme.description}
                        </textarea>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${meme.imageUrl}>
                <input type="submit" class="registerbtn button" value="Edit Meme" style="display:">
            </div>
        </form>
    </section>
`;

export async function editMemePage(context) {
    const memeId = context.params.id;
    const meme = await getMemeById(memeId);
    context.render(editMemeTemplate(meme,onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl');

       try {
           if (!title || !description || !imageUrl){
               throw new Error('All fields are required!')
           }

           await editMeme(memeId, {title, description, imageUrl})
           context.page.redirect('/catalog');
       }catch (e) {
           notify(e.message)
       }
    }

}