class Message {
    constructor(sender, text, reaction_list=[], date=null){
        this.sender = sender;
        this.text = text;
        this.reaction_list = reaction_list;
        this.date = date;
    }
}

class Reaction {
    constructor(sender, emoji){
        this.sender = sender;
        this.emoji = emoji;
    }
}

