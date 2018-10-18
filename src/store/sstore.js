import {observable, action} from "mobx";

class SStore {
    @observable author = 'none'
    @action
    setAuthor(author){
        // console.log(author)
        this.author = author  
    }
    @observable authors_story = []
    @action 
    setAuthorsStory(authors){
        this.authors_story = authors
        // console.log(authors)  //[]
    }
}

const sStore = new SStore()
export default sStore